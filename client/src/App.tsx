import HydrostaticEquilibriumPage from '@/pages/HydrostaticEquilibriumPage';
import SphericalHarmonicsPage from '@/pages/SphericalHarmonicsPage';
import DynamicalPhasePage from '@/pages/DynamicalPhasePage';
import DuffingOscillatorPage from '@/pages/DuffingOscillatorPage';
import DrivenOscillatorPage from '@/pages/DrivenOscillatorPage';
import SimultaneityPage from '@/pages/SimultaneityPage';
import LorentzDashboardPage from '@/pages/LorentzDashboardPage';
import DistancePhotometryPage from '@/pages/DistancePhotometryPage';
import PlanckComparisonsPage from '@/pages/PlanckComparisonsPage';
import UBVPhotometryPage from "@/pages/UBVPhotometryPage";
import TelescopeDiffractionPage from "@/pages/TelescopeDiffractionPage";
import BinaryVirialPage from "@/pages/BinaryVirialPage";
import BlackbodyRadiationPage from "@/pages/BlackbodyRadiationPage";
import StellarParallaxPage from "@/pages/StellarParallaxPage";
import KeplerLawsPage from "@/pages/KeplerLawsPage";
import EclipsingBinaryPage from "@/pages/EclipsingBinaryPage";
import CelestialCoordinateSpheresPage from "@/pages/CelestialCoordinateSpheresPage";
import PtolemaicCopernicanPage from "@/pages/PtolemaicCopernicanPage";
import { Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ui/theme-provider";

import HomePage from "@/pages/HomePage";
import PhDPhysicsPage from "@/pages/PhDPhysicsPage";
import ProjectsPage from "@/pages/ProjectsPage";
import ResearchPage from "@/pages/ResearchPage";
import BlogPage from "@/pages/BlogPage";
import BlogPostPage from "@/pages/BlogPostPage";
import CVPage from "@/pages/CVPage";
import NotesPage from "@/pages/NotesPage"; 
import MyOdysseyPage from "@/pages/MyOdysseyPage"; 
import EcaItemPage from '@/pages/EcaItemPage';
import ContactPage from "@/pages/ContactPage";
import NotFound from "@/pages/not-found";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/phd-physics/eclipsing-binary" element={<EclipsingBinaryPage />} />
            <Route path="/phd-physics/celestial-coordinate-spheres" element={<CelestialCoordinateSpheresPage />} />
            <Route path="/phd-physics/ptolemaic-vs-copernican" element={<PtolemaicCopernicanPage />} />
            <Route path="/phd-physics/kepler-laws" element={<KeplerLawsPage />} />
            <Route path="/phd-physics/stellar-parallax" element={<StellarParallaxPage />} />
            <Route path="/phd-physics/dynamical-phase-diagrams" element={<DynamicalPhasePage />} />
            <Route path="/phd-physics/duffing-oscillator" element={<DuffingOscillatorPage />} />
            <Route path="/phd-physics/driven-oscillator" element={<DrivenOscillatorPage />} />
            <Route path="/phd-physics/simultaneity-wavefronts" element={<SimultaneityPage />} />
            <Route path="/phd-physics/lorentz-dashboard" element={<LorentzDashboardPage />} />
            <Route path="/phd-physics/distance-photometry" element={<DistancePhotometryPage />} />
            <Route path="/phd-physics/planck-comparisons" element={<PlanckComparisonsPage />} />
            <Route path="/phd-physics/blackbody-radiation" element={<BlackbodyRadiationPage />} />
            <Route path="/phd-physics/binary-virial" element={<BinaryVirialPage />} />
            <Route path="/phd-physics/telescope-diffraction" element={<TelescopeDiffractionPage />} />
            <Route path="/phd-physics/ubv-photometry" element={<UBVPhotometryPage />} />
            <Route path="/phd-physics/spherical-harmonics" element={<SphericalHarmonicsPage />} />
            <Route path="/phd-physics/hydrostatic-equilibrium" element={<HydrostaticEquilibriumPage />} />
            <Route path="/phd-physics" element={<PhDPhysicsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/research" element={<ResearchPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blogpost/:id" element={<BlogPostPage />} />
            <Route path="/cv" element={<CVPage />} />
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/Myodyssey" element={<MyOdysseyPage />} />
            <Route path="/eca/:id" element={<EcaItemPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
