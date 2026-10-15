import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StarBackground from '@/components/StarBackground';
import ScrollToTop from '@/components/ScrollToTop';

const PhDPhysicsPage = () => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Physics Lab | Shivaji.dev';
  }, []);

  return (
    <div className="min-h-screen bg-[#08080a] text-white overflow-x-hidden">
      <StarBackground />
      <Header />
      <main className="pt-20 pb-16 relative z-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-8">
            <p className="text-[#FF65A3] uppercase tracking-[0.28em] text-xs font-medium mb-3">Physics Lab</p>
            <h1 className="font-space font-bold text-4xl md:text-5xl text-white mb-4">Physics Topics &amp; Simulations</h1>
            <p className="max-w-3xl mx-auto text-lg text-gray-300">Explore foundational physics topics and open focused visual simulations when you are ready to investigate a model.</p>
          </motion.div>

          <nav className="mb-10 flex flex-wrap justify-center gap-2" aria-label="Physics subsections">
            {[
              ['Classical Mechanics', '#classical-mechanics'],
              ['Electricity & Magnetism', '#electricity-magnetism'],
              ['Astrophysics', '#astrophysics'],
            ].map(([label, href]) => (
              <button type="button" key={href} onClick={() => setSelectedSection(href.slice(1))} aria-pressed={selectedSection === href.slice(1)} className="rounded-full border border-[#3a2d48] bg-[#120d1d]/80 px-4 py-2 text-xs uppercase tracking-[0.16em] text-gray-300 transition hover:border-[#FF65A3] hover:text-white">
                {label}
              </button>
            ))}
          </nav>

          {(!selectedSection || selectedSection === 'classical-mechanics') && <section id="classical-mechanics" className="mb-10 scroll-mt-24">
            <SectionHeading title="Classical Mechanics" />
            <div className="mb-4 grid gap-4 md:grid-cols-3"><ProjectCard href="/#/phd-physics/dynamical-phase-diagrams" title="Dynamical Phase Diagrams" description="Compute frequency–force heatmaps, detect periods one through nine, inspect Poincaré sections, and estimate Lyapunov exponents in a driven Duffing system." icon="ri-grid-line" color="yellow" /><ProjectCard href="/#/phd-physics/duffing-oscillator" title="Duffing Oscillator &amp; Hysteresis" description="Bend nonlinear resonance curves, inspect coexisting response branches, and animate history-dependent frequency sweeps and jumps." icon="ri-line-chart-line" color="yellow" /><ProjectCard href="/#/phd-physics/driven-oscillator" title="The Linear Damped, Driven Oscillator" description="Explore amplitude resonance, the exact damping-dependent peak shift, and the phase lag of a sinusoidally driven linear oscillator." icon="ri-pulse-line" color="yellow" /></div>
          </section>}

          {(!selectedSection || selectedSection === 'electricity-magnetism') && <section id="electricity-magnetism" className="mb-12 scroll-mt-24">
            <SectionHeading title="Electricity & Magnetism" />
            <div className="mb-4 grid gap-4 md:grid-cols-3"><ProjectCard href="/#/phd-physics/spherical-harmonics" title="Spherical Harmonics Explorer" description="Rotate a signed 3D sphere, link angular maps and lobe models, and explore nodal geometry, phase conventions, and multipole angular structure through degree 64." icon="ri-global-line" color="cyan" /><ProjectCard href="/#/phd-physics/legendre-polynomials" title="Legendre Polynomial Explorer" description="Compare ordinary and associated Legendre functions with linked plots, exact polynomial expansions, roots, derivative construction, phase conventions and normalization through degree 64." icon="ri-line-chart-line" color="cyan" /></div>
          </section>}

          {(!selectedSection || selectedSection === 'astrophysics') && <section id="astrophysics" className="scroll-mt-24">
            <SectionHeading title="Astrophysics" />
            <div className="grid gap-4 md:grid-cols-3">
              <ProjectCard href="/#/phd-physics/simultaneity-wavefronts" title="The Simultaneity &amp; Wavefront Canvas" description="Position two flashing bulbs, follow spherical light fronts in two inertial frames, and distinguish emission-time differences from signal reception." icon="ri-flashlight-line" color="pink" />
              <ProjectCard href="/#/phd-physics/lorentz-dashboard" title="The Interactive Lorentz Dashboard" description="Map spacetime events between inertial frames, inspect tilted coordinate axes, and verify the Lorentz-invariant interval." icon="ri-space-ship-line" color="cyan" />
              <ProjectCard href="/#/phd-physics/distance-photometry" title="Distance, Flux &amp; Stellar Colors" description="Drag a star through space, measure inverse-square dimming in UBV bands, and explore distance-independent colors and bolometric corrections." icon="ri-sun-line" color="pink" />
              <ProjectCard href="/#/phd-physics/planck-comparisons" title="Planck Function vs. Historical Approximations" description="Compare Planck, Rayleigh–Jeans and Wien spectra across decades of wavelength, measure approximation errors, and integrate isotropic luminosity." icon="ri-line-chart-line" color="cyan" />
              <ProjectCard href="/#/phd-physics/ubv-photometry" title="UBV Photometry Filters" description="Overlay adjustable ultraviolet, blue and visual response curves, integrate stellar flux, and explore distance-independent color indices." icon="ri-filter-3-line" color="pink" />
              <ProjectCard href="/#/phd-physics/telescope-diffraction" title="Telescope Resolving Power &amp; Diffraction Limits" description="Adjust aperture and wavelength, inspect Airy patterns, and compare two stars at the Rayleigh criterion." icon="ri-telescope-line" color="cyan" />
              <ProjectCard href="/#/phd-physics/binary-virial" title="Binary System &amp; Virial Theorem" description="Explore a 3D barycentric orbit, calculate reduced mass, and verify the time-averaged relationship between kinetic and potential energy." icon="ri-planet-line" color="pink" />
              <ProjectCard href="/#/phd-physics/hydrostatic-equilibrium" title="Hydrostatic Equilibrium" description="Probe a stellar interior, solve Lane–Emden polytropes, and compare pressure support, gravity, and mass-continuity profiles." icon="ri-sun-line" color="cyan" />
              <ProjectCard href="/#/phd-physics/blackbody-radiation" title="Blackbody Radiation Curve" description="Adjust stellar temperature, follow Wien’s peak wavelength, and compare spectra and visible colors from Betelgeuse to Rigel." icon="ri-spectrum-line" color="yellow" />
              <ProjectCard href="/#/phd-physics/stellar-parallax" title="Stellar Parallax Model" description="Orbit the Sun, compare January and July sky positions, and drag a nearby star to explore the inverse distance–parallax relationship." icon="ri-telescope-line" color="pink" />
              <ProjectCard href="/#/phd-physics/kepler-laws" title="Kepler’s Laws Demonstrator" description="Shape elliptical orbits, compare equal-time swept areas, and plot planetary periods on an interactive log-log graph." icon="ri-planet-line" color="cyan" />
              <ProjectCard href="/#/phd-physics/eclipsing-binary" title="Eclipsing Binary Star" description="Open the Keplerian orbit, light curve, radial velocity, and stellar parameter model." icon="ri-sun-line" color="yellow" />
              <ProjectCard href="/#/phd-physics/celestial-coordinate-spheres" title="Celestial Coordinate Spheres" description="Manipulate a sky sphere and compare local altitude-azimuth with fixed right ascension-declination coordinates." icon="ri-earth-line" color="cyan" />
              <ProjectCard href="/#/phd-physics/ptolemaic-vs-copernican" title="Ptolemaic vs. Copernican Orbits" description="Compare epicycles and deferents with the heliocentric explanation of apparent retrograde motion." icon="ri-ancient-gate-line" color="pink" />
            </div>
          </section>}
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

const SectionHeading = ({ title }: { title: string }) => (
  <div className="mb-4 flex items-center gap-3"><span className="h-px flex-1 bg-[#3a2d48]" /><h2 className="font-space text-xl font-semibold text-white">{title}</h2><span className="h-px flex-1 bg-[#3a2d48]" /></div>
);

const ProjectCard = ({ href, title, description, icon, color }: { href: string; title: string; description: string; icon: string; color: 'yellow' | 'cyan' | 'pink' }) => (
  <a href={href} target="_blank" rel="noreferrer" className={`group rounded-2xl border p-5 transition ${color === 'yellow' ? 'border-[#5D3E7C] bg-[#120d1d]/80 hover:border-[#FFD15C] hover:bg-[#1a1225]' : color === 'cyan' ? 'border-[#2b6075] bg-[#0d1820]/80 hover:border-[#8be9fd] hover:bg-[#102532]' : 'border-[#63304f] bg-[#1d101d]/80 hover:border-[#FF65A3] hover:bg-[#281426]'}`}>
    <span className="mb-3 flex items-center justify-between"><i className={`${icon} text-2xl ${color === 'yellow' ? 'text-[#FFD15C]' : color === 'cyan' ? 'text-[#8be9fd]' : 'text-[#FF65A3]'}`} /><i className={`ri-external-link-line text-gray-500 transition ${color === 'yellow' ? 'group-hover:text-[#FFD15C]' : color === 'cyan' ? 'group-hover:text-[#8be9fd]' : 'group-hover:text-[#FF65A3]'}`} /></span>
    <h3 className="mb-2 font-space text-lg text-white">{title}</h3><p className="text-sm leading-relaxed text-gray-400">{description}</p>
  </a>
);

export default PhDPhysicsPage;
