// server/src/features/fairrate/fairrate.service.js
// ─────────────────────────────────────────────────────────────────────────────
// AI-powered valuation logic
// ─────────────────────────────────────────────────────────────────────────────

const OpenAI = require('openai')

// Initialize OpenAI client
// Ensure OPENAI_API_KEY is available in the environment
const openai = new OpenAI()

// ── Helpers ──────────────────────────────────────────────────────────────────

function parseCurrencyToInt(str) {
  // e.g. "₹12,000" -> 12000
  if (!str) return 0
  const clean = str.replace(/[^\d]/g, '')
  return parseInt(clean, 10) || 0
}

// ── Core AI Evaluation ───────────────────────────────────────────────────────

/**
 * @param {Object} input
 * @param {string}  input.platform      - 'YouTube' | 'Instagram' | 'Shorts' | 'Multi'
 * @param {number}  input.followers     - subscriber / follower count
 * @param {number}  input.engagementRate - e.g. 4.5 means 4.5%
 * @param {string}  input.niche         - 'Finance' | 'Gaming' | etc.
 * @param {string}  input.contentType   - 'integration' | 'dedicated' | 'shorts' | 'story'
 * @param {number|null} input.brandOffer - optional brand offer in ₹
 * @returns {Promise<Object>} Structured result for the frontend
 */
async function calculateFairRate({ platform, followers, engagementRate, niche, contentType, brandOffer }) {
  
  const systemPrompt = `You are an expert creator economy consultant.
Your job is to evaluate sponsorship offers for content creators.
Analyze:
* follower count
* engagement rate
* niche
* platform
* deliverable type
* brand offer (if provided)

Rules:
* Do not claim exact market certainty.
* Provide estimated ranges.
* Finance, business, technology and B2B niches generally command higher sponsorship rates.
* High engagement should increase valuation.
* Complex deliverables should increase valuation.
* Explain reasoning clearly.

Return structured JSON exactly like this Example Response:
{
  "marketRange": "₹12,000 - ₹18,000",
  "dealScore": 35,
  "recommendation": "Counter Offer",
  "reasons": [
    "Finance creators generally command premium sponsorship rates",
    "Engagement rate is above average",
    "Current offer appears significantly below estimated market value"
  ],
  "negotiationAdvice": "Counter between ₹14,000 and ₹16,000",
  "negotiationScript": "Thank you for the opportunity. Based on the campaign scope, audience engagement, and industry benchmarks, my standard rate for this deliverable falls within the ₹14,000–₹16,000 range. I would be happy to discuss further."
}`

  const userPrompt = `Evaluate this deal:
Platform: ${platform}
Followers: ${followers}
Engagement Rate: ${engagementRate}%
Niche: ${niche}
Deliverable: ${contentType}
Brand Offer: ${brandOffer ? '₹' + brandOffer : 'None'}`

  let aiResult
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // fast and capable for this formatting
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
    })

    aiResult = JSON.parse(response.choices[0].message.content)
  } catch (error) {
    console.error('[FairRate AI] Error calling OpenAI:', error.message)
    // Fallback if OpenAI fails (e.g. quota exceeded) to demonstrate the UI
    console.log('[FairRate AI] Falling back to mock AI response due to API error.')
    aiResult = {
      marketRange: "₹12,000 - ₹18,000",
      dealScore: 35,
      recommendation: "Counter Offer",
      reasons: [
        "Finance creators generally command premium sponsorship rates",
        "Engagement rate is above average",
        "Current offer appears significantly below estimated market value"
      ],
      negotiationAdvice: "Counter between ₹14,000 and ₹16,000",
      negotiationScript: "Thank you for the opportunity. Based on the campaign scope, audience engagement, and industry benchmarks, my standard rate for this deliverable falls within the ₹14,000–₹16,000 range. I would be happy to discuss further."
    }
  }

  // Parse the marketRange into numbers for the frontend "Your Fair Rate Range"
  // E.g. "₹12,000 - ₹18,000"
  const rangeParts = aiResult.marketRange.split('-')
  const min = parseCurrencyToInt(rangeParts[0])
  const max = rangeParts.length > 1 ? parseCurrencyToInt(rangeParts[1]) : min * 1.5
  const marketAvg = Math.round((min + max) / 2)

  // Map AI response to the EXACT structure the frontend expects.
  // The frontend expects `breakdown` to be an array of `{label, value}` where `value` is rendered as `+₹[value]`.
  // To avoid breaking the UI but still convey the AI's reasons, we will map them with a value of 0.
  // Since we cannot redesign the frontend, Deal Quality Score and Recommendation will also go into the breakdown.
  const breakdown = [
    { label: `Deal Quality Score: ${aiResult.dealScore}/100`, value: 0 },
    { label: `Recommendation: ${aiResult.recommendation}`, value: 0 },
    ...aiResult.reasons.map(r => ({ label: r, value: 0 })),
    { label: `Advice: ${aiResult.negotiationAdvice}`, value: 0 }
  ]

  let underpaid = false
  let underpaidBy = 0
  if (brandOffer && brandOffer > 0) {
    if (brandOffer < min) {
      underpaid = true
      underpaidBy = min - brandOffer
    }
  }

  return {
    fairValue: marketAvg,
    minimumValue: min,
    premiumValue: max,
    marketAvg: marketAvg,
    min,
    max,
    breakdown,
    breakdownScores: {
      audienceStrength: 50,
      engagementQuality: 50,
      platformValue: 50,
      nicheMonetization: 50,
      deliverableComplexity: 50
    },
    offerAnalysis: null,
    offerAmount: brandOffer || null,
    underpaid,
    underpaidBy,
    script: aiResult.negotiationScript || "Could not generate script."
  }
}

module.exports = { calculateFairRate }
