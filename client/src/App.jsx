import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Suspense, lazy } from 'react'

// Layouts
import PublicLayout from './layouts/PublicLayout'
import CreatorLayout from './layouts/CreatorLayout'

// Pages - Public
import LandingPage from './pages/LandingPage'
import SignInPage from './pages/auth/SignInPage'
import SignUpPage from './pages/auth/SignUpPage'
import OnboardingPage from './pages/auth/OnboardingPage'

// Pages - Creator (lazy loaded)
const WorkspaceListPage    = lazy(() => import('./features/workspace/WorkspaceListPage'))
const WorkspaceProjectPage = lazy(() => import('./features/workspace/WorkspaceProjectPage'))
const AudienceLabPage = lazy(() => import('./pages/creator/AudienceLabPage'))
const AudienceLabResultPage = lazy(() => import('./pages/creator/AudienceLabResultPage'))
const FairRatePage = lazy(() => import('./pages/creator/FairRatePage'))
const ShieldPage = lazy(() => import('./pages/creator/ShieldPage'))
const ExpertConnectPage = lazy(() => import('./pages/creator/ExpertConnectPage'))
const MarketplacePage = lazy(() => import('./pages/creator/MarketplacePage'))
const AcademyPage = lazy(() => import('./pages/creator/AcademyPage'))
const AcademyLessonPage = lazy(() => import('./pages/creator/AcademyLessonPage'))
const AnalyticsPage = lazy(() => import('./pages/creator/AnalyticsPage'))
const SettingsPage = lazy(() => import('./pages/creator/SettingsPage'))

// Pages - Other roles
const FreelancerDashboard = lazy(() => import('./pages/freelancer/FreelancerDashboard'))
const ExpertDashboard = lazy(() => import('./pages/expert/ExpertDashboard'))
const ManagerDashboard = lazy(() => import('./pages/manager/ManagerDashboard'))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
})

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-rachna-surface">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 rounded-2xl bg-rachna-indigo flex items-center justify-center animate-pulse">
        <span className="text-white font-display font-bold text-xl">र</span>
      </div>
      <p className="text-rachna-muted text-sm font-medium">Loading RachnaOS...</p>
    </div>
  </div>
)

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<LandingPage />} />
            </Route>

            {/* Auth routes */}
            <Route path="/sign-in" element={<SignInPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />

            {/* Creator routes */}
            <Route path="/creator" element={<CreatorLayout />}>
              <Route index element={<Navigate to="/creator/workspace" replace />} />
              <Route path="workspace" element={<WorkspaceListPage />} />
              <Route path="workspace/:id" element={<WorkspaceProjectPage />} />
              <Route path="audience-lab" element={<AudienceLabPage />} />
              <Route path="audience-lab/:testId" element={<AudienceLabResultPage />} />
              <Route path="fair-rate" element={<FairRatePage />} />
              <Route path="shield" element={<ShieldPage />} />
              <Route path="expert-connect" element={<ExpertConnectPage />} />
              <Route path="marketplace" element={<MarketplacePage />} />
              <Route path="academy" element={<AcademyPage />} />
              <Route path="academy/:moduleId" element={<AcademyLessonPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>

            {/* Freelancer routes */}
            <Route path="/freelancer/*" element={<FreelancerDashboard />} />

            {/* Expert routes */}
            <Route path="/expert/*" element={<ExpertDashboard />} />

            {/* Manager routes */}
            <Route path="/manager/*" element={<ManagerDashboard />} />

            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
