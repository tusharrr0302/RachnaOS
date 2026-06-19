const OpenAI = require("openai");
const { PERSONA_AGENTS } = require("./personas");

// Initialize clients
const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const synthesisSystemPrompt = `You are a senior Indian YouTube content strategist synthesizing focus-group data into one clear, actionable report.
        
You MUST respond with a valid JSON object matching exactly this schema:
{
  "overallVerdict": "string",
  "predictedCTR": {
    "tier1": "string", "tier2": "string", "tier3": "string", "blended": "string"
  },
  "predictedRetention": {
    "tier1": "string", "tier2": "string", "tier3": "string"
  },
  "vernacularPacingAnalysis": {
    "verdict": "string",
    "riskTimestamps": [
      {
        "approxPosition": "string",
        "issue": "string",
        "affectedTiers": ["string"]
      }
    ]
  },
  "thumbnailFeedback": "string",
  "hookFeedback": "string",
  "suggestedImprovements": ["string"],
  "brandValuationImpact": {
    "verdict": "string",
    "ratePotential": "string (Lowers rate, Neutral, Increases rate, Significantly increases rate)",
    "reasoning": "string"
  },
  "bestPerformingPersonas": ["string"],
  "worstPerformingPersonas": ["string"]
}`;

function buildMessageContent({ title, hook, scriptOutline, thumbnailBase64, thumbnailMimeType }) {
  const textContent = `Evaluate this YouTube video concept as your persona would react to it:

TITLE: "${title}"
HOOK (first 5-15 seconds): "${hook}"
SCRIPT OUTLINE: ${scriptOutline || "Not provided"}

React authentically.`;

  const content = [
    { type: "text", text: textContent }
  ];

  if (thumbnailBase64) {
    content.push({
      type: "image_url",
      image_url: {
        url: `data:${thumbnailMimeType || "image/jpeg"};base64,${thumbnailBase64}`
      }
    });
  }

  return content;
}

// ─────────────────────────────────────────────
// RUN FULL FOCUS GROUP SIMULATION
// ─────────────────────────────────────────────
exports.runFocusGroupSimulation = async (input) => {
  const content = buildMessageContent(input);

  // Step 1: All 6 persona agents run IN PARALLEL on GROQ
  const personaResults = await Promise.all(
    PERSONA_AGENTS.map(async (persona) => {
      try {
        const hasImage = !!input.thumbnailBase64;
        // Groq vision model for thumbnails, versatile for text-only
        const model = hasImage ? "llama-3.2-90b-vision-preview" : "llama-3.3-70b-versatile";
        
        const systemInstruction = `${persona.systemPrompt}
        
You MUST respond with a valid JSON object using the exact following schema:
{
  "personaId": "string",
  "reaction": "string (Authentic first-person reaction)",
  "wouldClick": boolean,
  "clickReason": "string",
  "predictedAction": "string (one of: click_and_watch_full, click_then_drop_early, click_then_skip_to_end, scroll_past, share_with_friend)",
  "estimatedRetentionDropPoint": "string",
  "languageOrCulturalNote": "string",
  "sentimentScore": number (0-100)
}`;

        const response = await groq.chat.completions.create({
          model: model,
          messages: [
            { role: "system", content: systemInstruction },
            { role: "user", content: content }
          ],
          response_format: { type: "json_object" },
          temperature: 0.8,
        });

        const text = response.choices[0].message.content;
        const reaction = JSON.parse(text);
        return { ...persona, ...reaction };
      } catch (err) {
        console.error(`Persona ${persona.id} failed on Groq:`, err.message);
        return { ...persona, error: true, reaction: "This agent failed to respond." };
      }
    })
  );

  // Step 2: Synthesis agent reads all 6 reactions and produces one unified report using GPT-4o
  const synthesisPrompt = `You are RachnaOS's MASTER SYNTHESIS AGENT for AudienceLab.
You receive 6 independent persona reactions to the same video concept and must produce ONE unified focus-group report.

Pay special attention to the VERNACULAR EDGE: where Tier-2/Tier-3 personas react differently from Tier-1 personas
due to language, pacing, or cultural fit — this gap is RachnaOS's single most valuable insight.

PERSONA REACTIONS:
${JSON.stringify(personaResults, null, 2)}

VIDEO CONCEPT:
Title: "${input.title}"
Hook: "${input.hook}"
Script Outline: ${input.scriptOutline || "Not provided"}

Produce the synthesized JSON report.`;

  const synthesisResponse = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: synthesisSystemPrompt },
      { role: "user", content: synthesisPrompt }
    ],
    response_format: { type: "json_object" },
    temperature: 0.7,
  });

  const synthesis = JSON.parse(synthesisResponse.choices[0].message.content);

  return { personaResults, synthesis };
};
