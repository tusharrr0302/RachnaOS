import { useFocusGroupSimulation } from './hooks/useFocusGroupSimulation';
import SimulationInputForm from './components/SimulationInputForm';
import FocusGroupGrid from './components/FocusGroupGrid';
import TierBreakdownChart from './components/TierBreakdownChart';
import VernacularPacingAnalysis from './components/VernacularPacingAnalysis';
import AggregatedVerdict from './components/AggregatedVerdict';
import BrandValuationImpact from './components/BrandValuationImpact';
import SuggestedImprovements from './components/SuggestedImprovements';
import TopCreatorPerspective from './components/TopCreatorPerspective';

export default function AudienceLabPage() {
  const { loading, loadingStep, personaResults, synthesis, runSimulation } = useFocusGroupSimulation();

  return (
    <div className="min-h-screen bg-[#F8F7FF]">
      <div className="border-b border-gray-200 bg-white px-6 py-4 flex items-center gap-3">
        <img src="/logo.png" alt="RachnaOS" className="h-8 w-auto" />
        <div>
          <h1 className="text-xl font-bold text-[#0E0E1A]">AudienceLab 2.0</h1>
          <p className="text-sm text-[#6B6B80]">Pre-publish Virtual Focus Group</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <SimulationInputForm onSimulate={runSimulation} loading={loading} loadingStep={loadingStep} />
        </div>

        <div className="lg:col-span-2 space-y-6">
          {!personaResults && !loading && (
            <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center shadow-sm">
              <h2 className="text-lg font-bold text-[#0E0E1A] mb-2">Simulate before you publish</h2>
              <p className="text-sm text-gray-500">
                Submit a title, hook, and optional thumbnail to see how 6 distinct Indian viewer personas will react.
              </p>
            </div>
          )}

          {loading && (
            <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center shadow-sm flex flex-col items-center justify-center">
              <div className="w-10 h-10 border-4 border-[#4540C8] border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-sm font-semibold text-[#4540C8]">{loadingStep}</p>
            </div>
          )}

          {synthesis && (
            <div className="space-y-6">
              <TopCreatorPerspective perspective={synthesis.topCreatorPerspective} />
              <AggregatedVerdict verdict={synthesis.overallVerdict} />
            </div>
          )}

          {personaResults && <FocusGroupGrid personaResults={personaResults} />}

          {synthesis && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TierBreakdownChart predictedCTR={synthesis.predictedCTR} />
              <VernacularPacingAnalysis analysis={synthesis.vernacularPacingAnalysis} />
              <BrandValuationImpact impact={synthesis.brandValuationImpact} />
              <SuggestedImprovements improvements={synthesis.suggestedImprovements} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
