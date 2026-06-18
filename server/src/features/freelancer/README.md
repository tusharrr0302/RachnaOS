# Freelancer Feature

## Overview
The Freelancer feature provides a complete dashboard experience for freelancers on RachnaOS, covering project management, proposals, earnings, time tracking, messaging, reviews, portfolio, and marketplace access.

## Routes

### Frontend (`/freelancer/*`)
| Route | Component | Description |
|-------|-----------|-------------|
| `/freelancer/dashboard` | `FreelancerDashboard` | Overview with stat cards, active projects, opportunities, right panel |
| `/freelancer/projects` | `FreelancerProjectsPage` | Active + past projects with progress tracking |
| `/freelancer/proposals` | `FreelancerProposalsPage` | Submitted proposals and their status |
| `/freelancer/tasks` | `FreelancerTasksPage` | Tasks across all projects with priority filter |
| `/freelancer/earnings` | `FreelancerEarningsPage` | Earnings charts, payout history |
| `/freelancer/time-tracking` | `FreelancerTimeTrackingPage` | Interactive timer, billable hours log |
| `/freelancer/messages` | `FreelancerMessagesPage` | Chat threads with creators |
| `/freelancer/reviews` | `FreelancerReviewsPage` | Ratings and client feedback |
| `/freelancer/portfolio` | `FreelancerPortfolioPage` | Work samples with upload modal |
| `/freelancer/resources` | `FreelancerResourcesPage` | Guides, templates, legal docs |
| `/freelancer/profile` | `FreelancerProfilePage` | Edit profile, skills, hourly rate |
| `/freelancer/marketplace` | `MarketplacePage` | Browse open gigs from creators |

### Backend (`/api/freelancer/*`, `/api/marketplace/*`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/freelancer/dashboard-stats` | Overview stat numbers |
| GET | `/api/freelancer/projects` | Active + past projects |
| GET | `/api/freelancer/proposals` | Submitted proposals |
| GET | `/api/freelancer/tasks` | Tasks across projects |
| GET | `/api/freelancer/earnings` | Earnings history + chart data |
| GET | `/api/freelancer/reviews` | Reviews received |
| GET | `/api/freelancer/portfolio` | Portfolio items |
| POST | `/api/freelancer/portfolio` | Upload portfolio item |
| GET | `/api/marketplace/opportunities` | Browse open gigs (filterable) |
| POST | `/api/marketplace/proposals` | Submit a proposal |

## Database Tables
- `freelancer_proposals` — submitted proposals with status
- `freelancer_portfolio` — work samples
- `marketplace_opportunities` — open gigs from creators

See `supabase/migrations/001_freelancer_tables.sql` for full schema with RLS policies.

## Mock Data
All pages work with full mock data (`client/src/pages/freelancer/mockData.js`) without any live API calls. Freelancer persona: **Aditya Singh, Video Editor**, Delhi.

## Design Language
- Primary: `rachna-indigo` (#4540C8)
- Font: Poppins 800 for headings, Inter for body
- Currency: ₹ (Indian Rupee) throughout
- Cards with Framer Motion fade-up + hover lift animations
- Recharts for earnings/chart visualizations
