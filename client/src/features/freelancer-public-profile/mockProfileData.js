// client/src/features/freelancer-public-profile/mockProfileData.js

export const COVER_PRESETS = {
  indigo: 'linear-gradient(135deg, #4540C8 0%, #9B7FD8 100%)',
  violet: 'linear-gradient(135deg, #7C3AED 0%, #C4B5FD 100%)',
  dark:   'linear-gradient(135deg, #0F0E24 0%, #4540C8 100%)',
  warm:   'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
  cool:   'linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%)',
  earthy: 'linear-gradient(135deg, #1D9E75 0%, #34D399 100%)',
}

export const PRESET_TOOLS = [
  { name: 'Premiere Pro',    icon: '🎬' },
  { name: 'After Effects',   icon: '✨' },
  { name: 'DaVinci Resolve', icon: '🎨' },
  { name: 'Figma',           icon: '🖊️' },
  { name: 'Canva',           icon: '🖼️' },
  { name: 'Final Cut Pro',   icon: '🎥' },
  { name: 'Photoshop',       icon: '📸' },
  { name: 'Illustrator',     icon: '✏️' },
  { name: 'CapCut',          icon: '📱' },
  { name: 'Audition',        icon: '🎧' },
]

export const ALL_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export const MOCK_PROFILE = {
  username: 'aditya-singh',
  name: 'Aditya Singh',
  roleTitle: 'Video Editor & Motion Designer',
  location: 'Delhi, India',
  languages: ['Hindi', 'English'],
  isAvailable: true,
  bio: 'I help YouTube creators and brands tell better stories through sharp editing, cinematic color grades, and punchy motion graphics. 4+ years crafting content for travel vlogs, tech channels, and D2C brands across India.',
  specializations: ['Long-form Editing', 'Color Grading', 'Reels', 'Motion Graphics', 'YouTube Thumbnails'],
  tools: [
    { name: 'Premiere Pro',    icon: '🎬' },
    { name: 'After Effects',   icon: '✨' },
    { name: 'DaVinci Resolve', icon: '🎨' },
    { name: 'Figma',           icon: '🖊️' },
    { name: 'Canva',           icon: '🖼️' },
  ],
  services: [
    {
      id: '1',
      name: 'YouTube Video Edit',
      description: 'Full edit for YouTube videos up to 20 min — rough cut, sound design, color grade, captions.',
      priceFrom: 8000,
      deliveryDays: 5,
      tags: ['Video Editing', 'Color Grade', 'Captions'],
    },
    {
      id: '2',
      name: 'Reels Package (10×)',
      description: 'Short-form content for Instagram/YouTube Shorts — hook-forward, trend-aligned cuts.',
      priceFrom: 12000,
      deliveryDays: 7,
      tags: ['Reels', 'Shorts', 'Social Media'],
    },
    {
      id: '3',
      name: 'Motion Graphics Pack',
      description: 'Custom animated intros, lower-thirds, transitions and end screens for your channel.',
      priceFrom: 15000,
      deliveryDays: 10,
      tags: ['Motion Graphics', 'After Effects', 'Animation'],
    },
  ],
  skills: [
    {
      category: 'Editing',
      items: [
        { name: 'Video Editing',  level: 'Expert' },
        { name: 'Audio Mixing',   level: 'Intermediate' },
        { name: 'Color Grading',  level: 'Expert' },
      ],
    },
    {
      category: 'Design',
      items: [
        { name: 'Motion Graphics',   level: 'Expert' },
        { name: 'Thumbnail Design',  level: 'Intermediate' },
        { name: 'Figma / UI',        level: 'Beginner' },
      ],
    },
  ],
  workStyleTags: [
    'Fast Turnaround ⚡',
    'Open to Feedback 🙌',
    'Meme Understander 😂',
    'Delhi Wala Chaos Expert 🌪️',
    'Deadline Crusher 🎯',
  ],
  workingWithMe: "You send me the footage and a rough idea. I come back with something that hits different — punchy cuts, mood-matching color, and transitions that don't look like 2012. I'm proactive about revision notes and I won't ghost you mid-project.",
  availabilityDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  preferredDuration: 'both',
  rateMin: 8000,
  rateMax: 50000,
  socialLinks: {
    youtube:   'https://youtube.com/@aditya-edits',
    instagram: 'https://instagram.com/aditya.edits',
    linkedin:  'https://linkedin.com/in/aditya-singh-edit',
    behance:   'https://behance.net/adityasingh',
  },
  coverPreset: 'indigo',
  coverImageUrl: null,
  stats: {
    projectsCompleted: 23,
    totalEarnings: '₹1.2L+',
    avgRating: 4.9,
    responseTime: '< 2 hrs',
    repeatClients: 68,
  },
  reviews: [
    {
      id: '1',
      reviewer: 'Rohit Verma',
      reviewerAvatar: 'RV',
      project: '24 Hours Surviving in Delhi',
      rating: 5.0,
      text: 'Amazing work! Delivered high quality edit and understood the vision perfectly. Will definitely hire again.',
      date: '15 May 2024',
    },
    {
      id: '2',
      reviewer: 'Meera Kapoor',
      reviewerAvatar: 'MK',
      project: 'Mini Documentary Project',
      rating: 4.8,
      text: 'Very professional and creative. The color grading was exactly what we needed for the cinematic look.',
      date: '10 May 2024',
    },
  ],
}
