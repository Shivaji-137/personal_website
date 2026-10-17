export type PhysicsProject = 'planetary' | 'coordinates' | 'binary' | 'kepler' | 'parallax' | 'blackbody' | 'virial' | 'diffraction' | 'photometry' | 'planck' | 'distancePhotometry' | 'lorentz' | 'simultaneity' | 'oscillator' | 'duffing' | 'dynamicalMap' | 'hydrostatic' | 'harmonics' | 'legendre' | 'imageSphere' | 'greenFunction' | 'sphereBoundary' | 'phy611';
type Source = { title: string; url: string };
export const physicsReferences: Record<PhysicsProject, { sources: Source[] }> = {
  phy611: { sources: [
  {
    "title": "PHY611 Fall 2026 \u2014 Assignment 1",
    "url": "https://www.pa.uky.edu/~straley/PHY611/1Assignment.docx"
  },
  {
    "title": "PHY611 Fall 2026 \u2014 Assignment 2",
    "url": "https://www.pa.uky.edu/~straley/PHY611/2Assignment.docx"
  },
  {
    "title": "PHY611 Fall 2026 \u2014 Assignment 3",
    "url": "https://www.pa.uky.edu/~straley/PHY611/3Assignment.pdf"
  },
  {
    "title": "PHY611 Fall 2026 \u2014 Assignment 4",
    "url": "https://www.pa.uky.edu/~straley/PHY611/4Assnt.pdf"
  },
  {
    "title": "PHY611 Fall 2026 \u2014 Assignment 5",
    "url": "https://www.pa.uky.edu/~straley/PHY611/5Assnt.pdf"
  },
  {
    "title": "PHY611 Fall 2026 \u2014 Assignment 6",
    "url": "https://www.pa.uky.edu/~straley/PHY611/6Assnt.pdf"
  },
  {
    "title": "PHY611 Fall 2026 \u2014 Assignment 7",
    "url": "https://www.pa.uky.edu/~straley/PHY611/7Assnt.pdf"
  },
  {
    "title": "PHY611 Fall 2026 \u2014 Assignment 8",
    "url": "https://www.pa.uky.edu/~straley/PHY611/8Assnt.pdf"
  },
  {
    "title": "PHY611 Fall 2026 \u2014 Assignment 9",
    "url": "https://www.pa.uky.edu/~straley/PHY611/9Assnt.pdf"
  },
  {
    "title": "PHY611 Fall 2026 \u2014 Assignment 10",
    "url": "https://www.pa.uky.edu/~straley/PHY611/10Assnt.pdf"
  },
  {
    "title": "PHY611 Fall 2026 \u2014 Assignment 11",
    "url": "https://www.pa.uky.edu/~straley/PHY611/11Assnt.pdf"
  },
  {
    "title": "PHY611 Fall 2026 \u2014 Assignment 12",
    "url": "https://www.pa.uky.edu/~straley/PHY611/12Assnt.pdf"
  },
  {
    "title": "PHY611 Fall 2026 \u2014 Assignment 13",
    "url": "https://www.pa.uky.edu/~straley/PHY611/13Assnt.pdf"
  },
  {
    "title": "Joseph P. Straley \u2014 PHY611 Fall 2026 course",
    "url": "https://www.pa.uky.edu/~straley/PHY611/index.htm"
  },
  {
    "title": "Generating functions and orthogonal polynomials \u2014 NIST DLMF",
    "url": "https://dlmf.nist.gov/18.12"
  }
] },
  sphereBoundary: { sources: [
  {
    "title": "Dielectric sphere with exterior charge \u2014 worked harmonic expansion",
    "url": "https://www.wtamu.edu/~cbaird/all_homework_solutions/Jackson_4_9_Homework_Solution.pdf"
  },
  {
    "title": "Charge inside a conducting shell \u2014 University of Pisa",
    "url": "https://osiris.df.unipi.it/~macchi/FISICA2/PROBLEMS/shellcharge.pdf"
  },
  {
    "title": "Conductors in electrostatic equilibrium \u2014 OpenStax",
    "url": "https://openstax.org/books/university-physics-volume-2/pages/6-4-conductors-in-electrostatic-equilibrium"
  },
  {
    "title": "Dielectric interface conditions \u2014 University of Virginia",
    "url": "https://galileoandeinstein.phys.virginia.edu/Elec_Mag/2022_Lectures/EM_28_Dielectrics_II.html"
  },
  {
    "title": "Dielectric sphere boundary problem \u2014 University of Florida",
    "url": "https://www.phys.ufl.edu/~thorn/homepage/emsol07.pdf"
  },
  {
    "title": "Electromagnetic theory lectures \u2014 University of Florida",
    "url": "https://www.phys.ufl.edu/~thorn/homepage/emlectures.pdf"
  },
  {
    "title": "Dielectric sphere surface-charge distribution \u2014 research paper",
    "url": "https://pubs.rsc.org/en/content/articlehtml/2013/cp/c3cp53522c"
  },
  {
    "title": "Electric field of a conducting shell \u2014 UT Austin",
    "url": "https://farside.ph.utexas.edu/teaching/302l/lectures/node25.html"
  },
  {
    "title": "Charged sphere potential \u2014 Georgia State University",
    "url": "https://hyperphysics.gsu.edu/hbase/electric/potsph.html"
  },
  {
    "title": "Grounded sphere image construction \u2014 UT Austin",
    "url": "https://farside.ph.utexas.edu/teaching/em/lectures/node64.html"
  },
  {
    "title": "Electrostatic uniqueness theorem \u2014 UT Austin",
    "url": "https://farside.ph.utexas.edu/teaching/em/lectures/node62.html"
  },
  {
    "title": "Isolated neutral sphere \u2014 UT Austin",
    "url": "https://farside.ph.utexas.edu/teaching/355/Surveyhtml/node85.html"
  },
  {
    "title": "Legendre generating function \u2014 NIST DLMF",
    "url": "https://dlmf.nist.gov/18.12.E11"
  },
  {
    "title": "Electrodynamics and dielectric boundary problems \u2014 Caltech",
    "url": "https://sites.astro.caltech.edu/~golwala/ph106bc/ph106bc_notes_2023.pdf"
  },
  {
    "title": "Electrostatic interfaces and potentials \u2014 MIT",
    "url": "https://ocw.mit.edu/courses/6-013-electromagnetics-and-applications-fall-2005/resources/lec5/"
  }
] },
  greenFunction: { sources: [
  {
    "title": "Exterior spherical Dirichlet Green function \u2014 UT Austin",
    "url": "https://farside.ph.utexas.edu/teaching/jk1/lectures/node24.html"
  },
  {
    "title": "Reciprocity and symmetry \u2014 University of Virginia",
    "url": "https://galileoandeinstein.phys.virginia.edu/Elec_Mag/2022_Lectures/EM_09_Reciprocation_Theorem.html"
  },
  {
    "title": "Green function worked boundary problem \u2014 UT Austin (PDF)",
    "url": "https://web2.ph.utexas.edu/~vadim/Classes/2024f-emt/sol02.pdf"
  },
  {
    "title": "Electrostatic uniqueness theorem \u2014 UT Austin",
    "url": "https://farside.ph.utexas.edu/teaching/em/lectures/node62.html"
  },
  {
    "title": "Image construction \u2014 UT Austin",
    "url": "https://farside.ph.utexas.edu/teaching/em/lectures/node64.html"
  },
  {
    "title": "Point-source image methods \u2014 MIT lecture 5",
    "url": "https://www.ocw.mit.edu/courses/6-013-electromagnetics-and-applications-fall-2005/resources/lec5/"
  },
  {
    "title": "Electrodynamics and Green functions \u2014 Caltech (PDF)",
    "url": "https://sites.astro.caltech.edu/~golwala/ph106bc/ph106bc_notes_2023.pdf"
  },
  {
    "title": "Graduate electrodynamics \u2014 University of Toronto (PDF)",
    "url": "https://www.physics.utoronto.ca/~phy1510f/p151020_cumullect.pdf"
  },
  {
    "title": "Dirac delta integral representations \u2014 NIST DLMF",
    "url": "https://dlmf.nist.gov/1.17"
  },
  {
    "title": "Legendre generating function \u2014 NIST DLMF",
    "url": "https://dlmf.nist.gov/18.12.E11"
  },
  {
    "title": "Plane and parallel-plate image methods \u2014 University of Virginia",
    "url": "https://galileoandeinstein.phys.virginia.edu/Elec_Mag/2022_Lectures/EM_08_Images.html"
  },
  {
    "title": "Plane and parallel-plate Green-function exercises \u2014 University of Kentucky (PDF)",
    "url": "https://www.pa.uky.edu/~murthy/courses/PHY611/hw2.pdf"
  },
  {
    "title": "Point charge and dipole near a conducting sphere \u2014 research paper",
    "url": "https://arxiv.org/abs/physics/0405122"
  },
  {
    "title": "Multiple-sphere potentials \u2014 research paper",
    "url": "https://arxiv.org/abs/0906.1617"
  },
  {
    "title": "Electrostatics and potentials \u2014 MIT mathematics",
    "url": "https://ocw.mit.edu/ans7870/18/18.013a/textbook/HTML/chapter28/section04.html"
  }
] },
  imageSphere: { sources: [
  {
    "title": "Method of images: grounded sphere \u2014 UT Austin",
    "url": "https://farside.ph.utexas.edu/teaching/em/lectures/node64.html"
  },
  {
    "title": "Insulated neutral sphere \u2014 UT Austin",
    "url": "https://farside.ph.utexas.edu/teaching/355/Surveyhtml/node85.html"
  },
  {
    "title": "Electrostatic uniqueness theorem \u2014 UT Austin",
    "url": "https://farside.ph.utexas.edu/teaching/em/lectures/node62.html"
  },
  {
    "title": "Electric potential and method of images \u2014 MIT lecture 5",
    "url": "https://www.ocw.mit.edu/courses/6-013-electromagnetics-and-applications-fall-2005/resources/lec5/"
  },
  {
    "title": "Point charges and spheres \u2014 MIT field theory textbook (PDF)",
    "url": "https://ocw.mit.edu/courses/res-6-002-electromagnetic-field-theory-a-problem-solving-approach-spring-2008/c54b9fc62fd06b36f657dd7f0b08771d_MITRES_6_002S08_Part1.pdf"
  },
  {
    "title": "Image methods \u2014 MIT electromagnetic interactions (PDF)",
    "url": "https://ocw.mit.edu/courses/22-105-electromagnetic-interactions-fall-2005/0c448dade1727bbb9f182e3c2a048668_lecture2.pdf"
  },
  {
    "title": "Electrodynamics: sphere image solution \u2014 Caltech (PDF)",
    "url": "https://sites.astro.caltech.edu/~golwala/ph106bc/ph106bc_notes_2023.pdf"
  },
  {
    "title": "Neutral sphere worked problem \u2014 UT Austin (PDF)",
    "url": "https://web2.ph.utexas.edu/~vadim/Classes/2018f/sol05.pdf"
  },
  {
    "title": "Gauss law and boundary conditions \u2014 MIT (PDF)",
    "url": "https://ocw.mit.edu/courses/6-007-electromagnetic-energy-from-motors-to-lasers-spring-2011/6454b42bacb9b79c50bebc714e76df6e_MIT6_007S11_lec05.pdf"
  },
  {
    "title": "Electrostatic visualizations \u2014 MIT",
    "url": "https://ocw.mit.edu/courses/8-02t-electricity-and-magnetism-spring-2005/pages/visualizations/electrostatics1/"
  },
  {
    "title": "Capacitance of an isolated sphere \u2014 UT Austin",
    "url": "https://farside.ph.utexas.edu/teaching/355/Surveyhtml/node84.html"
  },
  {
    "title": "Mirror-equation analogy for the sphere image \u2014 research paper",
    "url": "https://arxiv.org/abs/1107.3885"
  },
  {
    "title": "Point charge and dipole near a sphere \u2014 research paper",
    "url": "https://arxiv.org/abs/physics/0405122"
  },
  {
    "title": "Potential of multiple conducting spheres \u2014 research paper",
    "url": "https://arxiv.org/abs/0906.1617"
  },
  {
    "title": "Electrostatics and potentials \u2014 MIT mathematics",
    "url": "https://ocw.mit.edu/ans7870/18/18.013a/textbook/HTML/chapter28/section04.html"
  }
] },
  legendre: { sources: [
    { title: "Differential equations and endpoint singularities \u2014 NIST DLMF", url: "https://dlmf.nist.gov/14.2" },
    { title: "Ferrers functions on the real interval \u2014 NIST DLMF", url: "https://dlmf.nist.gov/14.3" },
    { title: "Integer degree, Rodrigues formulas and generating functions \u2014 NIST DLMF", url: "https://dlmf.nist.gov/14.7" },
    { title: "Behavior at the endpoints \u2014 NIST DLMF", url: "https://dlmf.nist.gov/14.8" },
    { title: "Connection formulas and negative orders \u2014 NIST DLMF", url: "https://dlmf.nist.gov/14.9" },
    { title: "Recurrences and derivatives \u2014 NIST DLMF", url: "https://dlmf.nist.gov/14.10" },
    { title: "Zeros and interlacing \u2014 NIST DLMF", url: "https://dlmf.nist.gov/14.16" },
    { title: "Integrals and orthogonality \u2014 NIST DLMF", url: "https://dlmf.nist.gov/14.17" },
    { title: "Addition theorems and sums \u2014 NIST DLMF", url: "https://dlmf.nist.gov/14.18" },
    { title: "Spherical harmonics and normalization \u2014 NIST DLMF", url: "https://dlmf.nist.gov/14.30" },
    { title: "Numerical methods of computation \u2014 NIST DLMF", url: "https://dlmf.nist.gov/14.32" },
    { title: "Classical orthogonal polynomials \u2014 NIST DLMF", url: "https://dlmf.nist.gov/18.3" },
    { title: "Legendre functions and normalization \u2014 GNU Scientific Library", url: "https://www.gnu.org/software/gsl/doc/html/specfunc.html" },
    { title: "Associated Legendre functions and the Condon\u2013Shortley phase \u2014 SciPy", url: "https://docs.scipy.org/doc/scipy/reference/generated/scipy.special.lpmv.html" },
    { title: "Electromagnetic multipole expansion \u2014 MIT lecture notes (PDF)", url: "https://ocw.mit.edu/courses/8-07-electromagnetism-ii-fall-2012/6a67040c6a90f70c8164cdea63473a30_MIT8_07F12_ln8.pdf" },
  ] },
  harmonics: { sources: [
    { title: "Spherical harmonics: definitions, conjugation and orthogonality \u2014 NIST DLMF", url: "https://dlmf.nist.gov/14.30" },
    { title: "Associated-Legendre recurrence relations \u2014 NIST DLMF", url: "https://dlmf.nist.gov/14.10" },
    { title: "Integer-degree Legendre functions \u2014 NIST DLMF", url: "https://dlmf.nist.gov/14.7" },
    { title: "Zeros of Legendre functions \u2014 NIST DLMF", url: "https://dlmf.nist.gov/14.16" },
    { title: "Stable methods of computation \u2014 NIST DLMF", url: "https://dlmf.nist.gov/14.32" },
    { title: "Normalized Legendre functions \u2014 GNU Scientific Library", url: "https://www.gnu.org/software/gsl/doc/html/specfunc.html" },
    { title: "Efficient computation of associated Legendre functions \u2014 GSL technical report (PDF)", url: "https://www.gnu.org/software/gsl/tr/tr001.pdf" },
    { title: "Complex spherical harmonics and low-degree examples \u2014 SciPy", url: "https://docs.scipy.org/doc/scipy/reference/generated/scipy.special.sph_harm_y.html" },
    { title: "Real harmonics, normalization and phase conventions \u2014 SHTOOLS", url: "https://shtools.github.io/SHTOOLS/fortran-real-spherical-harmonics.html" },
    { title: "Conversion of normalization and Condon\u2013Shortley conventions \u2014 SHTOOLS", url: "https://shtools.github.io/SHTOOLS/convert.html" },
    { title: "Complex-to-real harmonic conversion \u2014 SHTOOLS", url: "https://shtools.github.io/SHTOOLS/pyshctor.html" },
    { title: "Angular momentum and spherical harmonics \u2014 MIT lecture notes (PDF)", url: "https://ocw.mit.edu/courses/5-61-physical-chemistry-fall-2007/50aa3822fda81d32245a6d1ea631ee1a_lecture19.pdf" },
    { title: "Spherical coordinates and angular momentum \u2014 MIT OpenCourseWare", url: "https://ocw.mit.edu/courses/5-73-introductory-quantum-mechanics-i-fall-2005/resources/sec7/" },
    { title: "Electromagnetic multipole expansion \u2014 MIT lecture notes (PDF)", url: "https://ocw.mit.edu/courses/8-07-electromagnetism-ii-fall-2012/6a67040c6a90f70c8164cdea63473a30_MIT8_07F12_ln8.pdf" },
    { title: "SHTools: Tools for Working with Spherical Harmonics \u2014 original research paper", url: "https://agupubs.onlinelibrary.wiley.com/doi/full/10.1029/2018GC007529" },
  ] },
  hydrostatic: { sources: [
    { title: "Hydrostatic equilibrium and stellar structure \u2014 University of Maryland (PDF)", url: "https://www.astro.umd.edu/~jph/A320_Stellar_Structure.pdf" },
    { title: "The Solar Interior: Theory \u2014 OpenStax", url: "https://openstax.org/books/astronomy-2e/pages/16-3-the-solar-interior-theory" },
    { title: "The Structure and Composition of the Sun \u2014 OpenStax", url: "https://openstax.org/books/astronomy-2e/pages/15-1-the-structure-and-composition-of-the-sun" },
    { title: "Hydrostatic equilibrium and central temperature \u2014 JILA", url: "https://jila.colorado.edu/~ajsh/courses/astr1120_03/text/chapter5/Hydrostatic.htm" },
    { title: "Pressure support in main-sequence stars \u2014 JILA", url: "https://jila.colorado.edu/~ajsh/courses/astr1120_03/text/chapter5/l5S1.htm" },
    { title: "Stellar structure lecture notes \u2014 Yale (PDF)", url: "https://www.astro.yale.edu/vdbosch/astro320_summary16.pdf" },
    { title: "Stellar structure modeling \u2014 UMass Amherst (PDF)", url: "https://people.umass.edu/wqd/astro643/B_model.pdf" },
    { title: "Stellar structure and polytropes \u2014 University of Tokyo (PDF)", url: "https://www-utap.phys.s.u-tokyo.ac.jp/naoki.yoshida/ISYA25/Lec1.pdf" },
    { title: "Stellar structure \u2014 James Lattimer, Stony Brook (PDF)", url: "https://www.astro.sunysb.edu/lattimer/PHY688/struc.pdf" },
    { title: "Undergraduate stellar structure notes \u2014 Princeton", url: "https://www.astro.princeton.edu/~burrows/classes/403/notes.html" },
    { title: "Graduate stellar structure notes \u2014 Princeton", url: "https://www.astro.princeton.edu/~burrows/classes/514/notes.html" },
    { title: "Lane\u2019s original 1870 paper on the theoretical temperature of the Sun", url: "https://ajsonline.org/article/62347-on-the-theoretical-temperature-of-the-sun-under-the-hypothesis-of-a-gaseous-mass-maintaining-its-volume-by-its-internal-heat-and-depending-on-the-la" },
    { title: "A well-balanced numerical scheme for stellar structure \u2014 Astronomy & Astrophysics", url: "https://doi.org/10.1051/0004-6361/201834180" },
    { title: "Generalized Lane\u2013Emden equations as boundary-value problems \u2014 MNRAS", url: "https://academic.oup.com/mnras/article/523/2/2059/7170050" },
    { title: "Newtonian and relativistic polytropes \u2014 research paper", url: "https://arxiv.org/abs/1102.2393" },
  ] },
  dynamicalMap: { sources: [
    { title: "Duffing oscillator — Scholarpedia", url: "https://www.scholarpedia.org/article/Duffing_oscillator" },
    { title: "Nonlinear dynamics lecture notes — UC San Diego (PDF)", url: "https://courses.physics.ucsd.edu/2009/Spring/physics221a/LECTURES/221_COURSE.pdf" },
    { title: "Nonlinear vibrations lecture notes — ChaosBook project (PDF)", url: "https://chaosbook.org/projects/Hoyos/nlvibe45.pdf" },
    { title: "Nonlinear dynamics: forced Duffing response — HKUST (PDF)", url: "https://www.math.hkust.edu.hk/~machas/hmc-math164-nonlinear-dynamics.pdf" },
    { title: "Harmonic balance for bifurcation analysis of nonlinear mechanical systems", url: "https://arxiv.org/abs/1604.05621" },
    { title: "Steady-state responses and stability of the softening Duffing oscillator", url: "https://www.jstage.jst.go.jp/article/jsmec1997/41/3/41_3_532/_article/-char/en" },
    { title: "Nonlinear dynamics in nanomechanical oscillators — Technion (PDF)", url: "https://buks.net.technion.ac.il/files/2012/07/387.pdf" },
    { title: "Driven oscillators, transient phenomena and resonance — MIT", url: "https://ocw.mit.edu/courses/8-03sc-physics-iii-vibrations-and-waves-fall-2016/pages/part-i-mechanical-vibrations-and-waves/lecture-3/" },
    { title: "Lyapunov exponent: variational equations and numerical algorithms — Scholarpedia", url: "https://www.scholarpedia.org/article/Lyapunov_exponent" },
    { title: "Numerical calculation of largest Lyapunov exponent — J. C. Sprott, Wisconsin", url: "https://sprott.physics.wisc.edu/chaos/lyapexp.htm" },
    { title: "From order to chaos: bifurcations and phase diagrams in a Duffing–Holmes circuit (2026)", url: "https://arxiv.org/abs/2604.16674" },
    { title: "Computing Lyapunov exponents from the variational system — research paper", url: "https://eprints.soton.ac.uk/23344/" },
    { title: "Oseledets theorem — Scholarpedia", url: "https://www.scholarpedia.org/article/Oseledec_theorem" },
    { title: "Attractor dimensions — Scholarpedia", url: "https://www.scholarpedia.org/article/Attractor_dimensions" },
    { title: "Bifurcation structure of coupled periodically driven double-well Duffing oscillators", url: "https://arxiv.org/abs/nlin/0304022" },
  ] },
  duffing: { sources: [
    { title: "Duffing oscillator — Scholarpedia", url: "https://www.scholarpedia.org/article/Duffing_oscillator" },
    { title: "Multiple-scale analysis — Scholarpedia", url: "https://www.scholarpedia.org/article/Multiple_scale_analysis" },
    { title: "Nonlinear dynamics lecture notes — UC San Diego (PDF)", url: "https://courses.physics.ucsd.edu/2009/Spring/physics221a/LECTURES/221_COURSE.pdf" },
    { title: "Nonlinear vibrations lecture notes — ChaosBook project (PDF)", url: "https://chaosbook.org/projects/Hoyos/nlvibe45.pdf" },
    { title: "Nonlinear dynamics: forced Duffing response — HKUST (PDF)", url: "https://www.math.hkust.edu.hk/~machas/hmc-math164-nonlinear-dynamics.pdf" },
    { title: "Harmonic balance for bifurcation analysis of nonlinear mechanical systems", url: "https://arxiv.org/abs/1604.05621" },
    { title: "An asymmetric Duffing oscillator: hysteretic behaviour and jump phenomena", url: "https://eprints.soton.ac.uk/79141/" },
    { title: "Steady-state responses and stability of the softening Duffing oscillator", url: "https://www.jstage.jst.go.jp/article/jsmec1997/41/3/41_3_532/_article/-char/en" },
    { title: "Nonlinear dynamics in nanomechanical oscillators — Technion (PDF)", url: "https://buks.net.technion.ac.il/files/2012/07/387.pdf" },
    { title: "Duffing revisited: phase-shift control and internal resonance", url: "https://arxiv.org/abs/1412.3300" },
    { title: "Frequency stabilization by synchronization of Duffing oscillators", url: "https://arxiv.org/abs/1608.00416" },
    { title: "Driven oscillators, transient phenomena and resonance — MIT", url: "https://ocw.mit.edu/courses/8-03sc-physics-iii-vibrations-and-waves-fall-2016/pages/part-i-mechanical-vibrations-and-waves/lecture-3/" },
    { title: "Driven damped harmonic oscillation — University of Texas at Austin", url: "https://farside.ph.utexas.edu/teaching/315/Waves/node15.html" },
    { title: "Resonance — Feynman Lectures, Caltech", url: "https://www.feynmanlectures.caltech.edu/I_23.html" },
    { title: "Transients — Feynman Lectures, Caltech", url: "https://www.feynmanlectures.caltech.edu/I_24.html" },
  ] },
  oscillator: { sources: [
    { title: "Driven damped harmonic oscillation — University of Texas at Austin", url: "https://farside.ph.utexas.edu/teaching/315/Waves/node15.html" },
    { title: "Damped harmonic oscillation — University of Texas at Austin", url: "https://farside.ph.utexas.edu/teaching/315/Waves/node12.html" },
    { title: "Resonance and quality factor — University of Texas at Austin", url: "https://farside.ph.utexas.edu/teaching/336k/Newton/node21.html" },
    { title: "Forced oscillations — OpenStax University Physics", url: "https://openstax.org/books/university-physics-volume-1/pages/15-6-forced-oscillations" },
    { title: "Damped oscillations — OpenStax University Physics", url: "https://openstax.org/books/university-physics-volume-1/pages/15-5-damped-oscillations" },
    { title: "Driven oscillators, transients and resonance — MIT OpenCourseWare", url: "https://ocw.mit.edu/courses/8-03sc-physics-iii-vibrations-and-waves-fall-2016/pages/part-i-mechanical-vibrations-and-waves/lecture-3/" },
    { title: "Driven oscillations — MIT lecture notes (PDF)", url: "https://ocw.mit.edu/courses/res-8-009-introduction-to-oscillations-and-waves-summer-2017/mitres_8_009su17_lec5.pdf" },
    { title: "The harmonic oscillator — Feynman Lectures, Caltech", url: "https://www.feynmanlectures.caltech.edu/I_21.html" },
    { title: "Resonance — Feynman Lectures, Caltech", url: "https://www.feynmanlectures.caltech.edu/I_23.html" },
    { title: "Transients — Feynman Lectures, Caltech", url: "https://www.feynmanlectures.caltech.edu/I_24.html" },
    { title: "Linear systems and review — Feynman Lectures, Caltech", url: "https://www.feynmanlectures.caltech.edu/I_25.html" },
    { title: "Second-order differential equation applications — OpenStax Calculus", url: "https://openstax.org/books/calculus-volume-3/pages/7-3-applications" },
    { title: "RLC series circuits and mechanical oscillator analogy — OpenStax", url: "https://openstax.org/books/university-physics-volume-2/pages/14-6-rlc-series-circuits" },
    { title: "Teaching the forced damped oscillator using RLC inverse modelling — research paper", url: "https://arxiv.org/abs/1908.01891" },
    { title: "Oscillations and waves — Richard Fitzpatrick, University of Texas at Austin", url: "https://farside.ph.utexas.edu/teaching/315/Waves/" },
  ] },
  simultaneity: { sources: [
    { title: "Invariance of physical laws \u2014 OpenStax University Physics", url: "https://openstax.org/books/university-physics-volume-3/pages/5-1-invariance-of-physical-laws" },
    { title: "Relativity of simultaneity \u2014 OpenStax University Physics", url: "https://openstax.org/books/university-physics-volume-3/pages/5-2-relativity-of-simultaneity" },
    { title: "Time dilation \u2014 OpenStax University Physics", url: "https://openstax.org/books/university-physics-volume-3/pages/5-3-time-dilation" },
    { title: "The Lorentz transformation \u2014 OpenStax University Physics", url: "https://openstax.org/books/university-physics-volume-3/pages/5-5-the-lorentz-transformation" },
    { title: "Relativistic velocity transformation \u2014 OpenStax University Physics", url: "https://openstax.org/books/university-physics-volume-3/pages/5-6-relativistic-velocity-transformation" },
    { title: "On the electrodynamics of moving bodies \u2014 Einstein (1905), original paper", url: "https://onlinelibrary.wiley.com/doi/10.1002/andp.19053221004" },
    { title: "Introduction to relativity and spacetime physics \u2014 MIT lecture notes", url: "https://ocw.mit.edu/courses/8-033-introduction-to-relativity-and-spacetime-physics-fall-2024/resources/lecture-notes/" },
    { title: "Dynamics and relativity \u2014 David Tong, Cambridge (PDF)", url: "https://www.damtp.cam.ac.uk/user/tong/relativity/dynrel.pdf" },
    { title: "Lorentz transformation \u2014 University of Texas at Austin", url: "https://farside.ph.utexas.edu/teaching/355/Surveyhtml/node135.html" },
    { title: "Spacetime and inertial frames \u2014 University of Texas at Austin", url: "https://farside.ph.utexas.edu/teaching/em/lectures/node113.html" },
    { title: "Spacetime and light cones \u2014 Einstein Online", url: "https://www.einstein-online.info/en/spacetime/" },
    { title: "Defining now: simultaneity and synchronized clocks — Einstein Online", url: "https://www.einstein-online.info/en/spotlight/now/" },
    { title: "Spherical waves — University of Texas at Austin", url: "https://farside.ph.utexas.edu/teaching/315/Waves/node55.html" },
    { title: "Relativity of simultaneity — John D. Norton, University of Pittsburgh", url: "https://sites.pitt.edu/~jdnorton/teaching/HPS_0410/chapters_June_6_2024/Special_relativity_rel_sim/index.html" },
    { title: "Discovering the relativity of simultaneity — John D. Norton (PDF)", url: "https://d-scholarship.pitt.edu/2674/1/Simultaneity_Einstein.pdf" },
  ] },
  lorentz: { sources: [
    { title: "Invariance of physical laws \u2014 OpenStax University Physics", url: "https://openstax.org/books/university-physics-volume-3/pages/5-1-invariance-of-physical-laws" },
    { title: "Relativity of simultaneity \u2014 OpenStax University Physics", url: "https://openstax.org/books/university-physics-volume-3/pages/5-2-relativity-of-simultaneity" },
    { title: "Time dilation \u2014 OpenStax University Physics", url: "https://openstax.org/books/university-physics-volume-3/pages/5-3-time-dilation" },
    { title: "Length contraction \u2014 OpenStax University Physics", url: "https://openstax.org/books/university-physics-volume-3/pages/5-4-length-contraction" },
    { title: "The Lorentz transformation \u2014 OpenStax University Physics", url: "https://openstax.org/books/university-physics-volume-3/pages/5-5-the-lorentz-transformation" },
    { title: "Relativistic velocity transformation \u2014 OpenStax University Physics", url: "https://openstax.org/books/university-physics-volume-3/pages/5-6-relativistic-velocity-transformation" },
    { title: "Relativistic momentum \u2014 OpenStax University Physics", url: "https://openstax.org/books/university-physics-volume-3/pages/5-8-relativistic-momentum" },
    { title: "Relativistic energy \u2014 OpenStax University Physics", url: "https://openstax.org/books/university-physics-volume-3/pages/5-9-relativistic-energy" },
    { title: "On the electrodynamics of moving bodies \u2014 Einstein (1905), original paper", url: "https://onlinelibrary.wiley.com/doi/10.1002/andp.19053221004" },
    { title: "Introduction to relativity and spacetime physics \u2014 MIT lecture notes", url: "https://ocw.mit.edu/courses/8-033-introduction-to-relativity-and-spacetime-physics-fall-2024/resources/lecture-notes/" },
    { title: "Dynamics and relativity \u2014 David Tong, Cambridge (PDF)", url: "https://www.damtp.cam.ac.uk/user/tong/relativity/dynrel.pdf" },
    { title: "Lorentz transformation \u2014 University of Texas at Austin", url: "https://farside.ph.utexas.edu/teaching/355/Surveyhtml/node135.html" },
    { title: "Spacetime and inertial frames \u2014 University of Texas at Austin", url: "https://farside.ph.utexas.edu/teaching/em/lectures/node113.html" },
    { title: "Spacetime and light cones \u2014 Einstein Online", url: "https://www.einstein-online.info/en/spacetime/" },
    { title: "Theory of Special Relativity \u2014 lecture notes on four-vectors and Lorentz transformations", url: "https://arxiv.org/abs/1511.02121" },
  ] },
  distancePhotometry: { sources: [
    { title: 'Revised photonic passbands and zero points — Bessell & Murphy (2012)', url: 'https://arxiv.org/abs/1112.2698' },
    { title: 'Filter Profile Service — Spanish Virtual Observatory', url: 'https://svo2.cab.inta-csic.es/svo/theory/fps/' },
    { title: 'Synthetic photometry units and zero points — STScI pysynphot', url: 'https://ssb.stsci.edu/doc/stsci_python_x/pysynphot.doc/html/units.html' },
    { title: 'Flux conversions and AB magnitudes — STScI HST notebooks', url: 'https://spacetelescope.github.io/hst_notebooks/notebooks/WFC3/flux_conversion_tool/flux_conversion_tool.html' },
    { title: 'Interstellar dust, reddening and color excess — NASA/IPAC NED', url: 'https://ned.ipac.caltech.edu/level5/Mathis/Mathis2_1_1.html' },
    { title: "Colors of stars — OpenStax Astronomy", url: "https://openstax.org/books/astronomy-2e/pages/17-2-colors-of-stars" },
    { title: "The spectra of stars and brown dwarfs — OpenStax Astronomy", url: "https://openstax.org/books/astronomy-2e/pages/17-3-the-spectra-of-stars-and-brown-dwarfs" },
    { title: "The brightness of stars — OpenStax Astronomy", url: "https://openstax.org/books/astronomy-2e/pages/17-1-the-brightness-of-stars" },
    { title: "Guide to CCD/CMOS photometry — AAVSO (PDF)", url: "https://www.aavso.org/sites/default/files/Phot_Guide_v2_0.pdf" },
    { title: "Guide to photometric uncertainty — AAVSO (PDF)", url: "https://mintaka.aavso.org/sites/default/files/publications/Uncertainty-V9.pdf" },
    { title: "Synthetic photometry units — synphot documentation", url: "https://synphot.readthedocs.io/en/stable/synphot/units.html" },
    { title: "Synthetic photometry walkthrough — STScI Roman notebooks", url: "https://spacetelescope.github.io/roman_notebooks/notebooks/synphot/synphot.html" },
    { title: "IAU 2015 Resolution B2: bolometric magnitude zero points", url: "https://arxiv.org/abs/1510.06262" },
    { title: "On the zero point constant of the bolometric correction scale \u2014 Eker et al.", url: "https://arxiv.org/abs/2103.03258" },
    { title: "Radiation fundamentals: intensity, flux and luminosity \u2014 NRAO", url: "https://www.cv.nrao.edu/~sransom/web/Ch2.html" },
  ] },
  planck: { sources: [
    { title: 'Wien wavelength displacement constant — NIST CODATA', url: 'https://physics.nist.gov/cgi-bin/cuu/Value?bwien' },
    { title: 'Blackbody radiation and Wien’s law — NIST technical notes (PDF)', url: 'https://nvlpubs.nist.gov/nistpubs/Legacy/TN/nbstechnicalnote910-8.pdf' },
    { title: "Blackbody radiation — OpenStax University Physics", url: "https://openstax.org/books/university-physics-volume-3/pages/6-1-blackbody-radiation" },
    { title: "Colors of stars — OpenStax Astronomy", url: "https://openstax.org/books/astronomy-2e/pages/17-2-colors-of-stars" },
    { title: "The spectra of stars and brown dwarfs — OpenStax Astronomy", url: "https://openstax.org/books/astronomy-2e/pages/17-3-the-spectra-of-stars-and-brown-dwarfs" },
    { title: "The electromagnetic spectrum — OpenStax Astronomy", url: "https://openstax.org/books/astronomy-2e/pages/5-2-the-electromagnetic-spectrum" },
    { title: "Blackbody radiation distributions in different spectral domains", url: "https://arxiv.org/abs/0901.1863" },
    { title: "Dimensional analysis and the derivation of Planck’s radiation law", url: "https://arxiv.org/abs/0801.2197" },
    { title: "Optical radiation measurements: radiometry concepts — NIST (PDF)", url: "https://nvlpubs.nist.gov/nistpubs/Legacy/TN/nbstechnicalnote910-7.pdf" },
    { title: "Measuring the Stefan–Boltzmann constant: historical context — NIST", url: "https://nvlpubs.nist.gov/nistpubs/sp958-lide/html/007-009.html" },
    { title: "Planck’s original energy-distribution paper (1901) — Annalen der Physik", url: "https://onlinelibrary.wiley.com/doi/abs/10.1002/andp.19013090310" },
    { title: "Radiation fundamentals: intensity, flux and blackbody emission — NRAO", url: "https://www.cv.nrao.edu/~sransom/web/Ch2.html" },
    { title: "Planck and the quantum nature of light — OpenStax", url: "https://openstax.org/books/physics/pages/21-1-planck-and-quantum-nature-of-light" },
    { title: "CODATA recommended physical constants (2022, PDF) — NIST", url: "https://physics.nist.gov/cuu/pdf/all.pdf" },
    { title: "Blackbody radiation lecture notes — University of Kentucky (PDF)", url: "https://www.pa.uky.edu/~kwng/phy361/class/class10.pdf" },
  ] },
  photometry: { sources: [
    { title: 'Revised photonic passbands and zero points — Bessell & Murphy (2012)', url: 'https://arxiv.org/abs/1112.2698' },
    { title: 'Filter Profile Service — Spanish Virtual Observatory', url: 'https://svo2.cab.inta-csic.es/svo/theory/fps/' },
    { title: 'Synthetic photometry units and zero points — STScI pysynphot', url: 'https://ssb.stsci.edu/doc/stsci_python_x/pysynphot.doc/html/units.html' },
    { title: 'Flux conversions and AB magnitudes — STScI HST notebooks', url: 'https://spacetelescope.github.io/hst_notebooks/notebooks/WFC3/flux_conversion_tool/flux_conversion_tool.html' },
    { title: 'Interstellar dust, reddening and color excess — NASA/IPAC NED', url: 'https://ned.ipac.caltech.edu/level5/Mathis/Mathis2_1_1.html' },
    { title: "Colors of stars — OpenStax Astronomy", url: "https://openstax.org/books/astronomy-2e/pages/17-2-colors-of-stars" },
    { title: "The spectra of stars and brown dwarfs — OpenStax Astronomy", url: "https://openstax.org/books/astronomy-2e/pages/17-3-the-spectra-of-stars-and-brown-dwarfs" },
    { title: "The brightness of stars — OpenStax Astronomy", url: "https://openstax.org/books/astronomy-2e/pages/17-1-the-brightness-of-stars" },
    { title: "Guide to CCD/CMOS photometry — AAVSO (PDF)", url: "https://www.aavso.org/sites/default/files/Phot_Guide_v2_0.pdf" },
    { title: "Guide to photometric uncertainty — AAVSO (PDF)", url: "https://mintaka.aavso.org/sites/default/files/publications/Uncertainty-V9.pdf" },
    { title: "Photoelectric photometry guide — AAVSO (PDF)", url: "https://archive.aavso.org/sites/default/files/publications_files/pep_guide/PEP_Guide_2.0.pdf" },
    { title: "Synthetic photometry units — synphot documentation", url: "https://synphot.readthedocs.io/en/stable/synphot/units.html" },
    { title: "Synthetic photometry walkthrough — STScI Roman notebooks", url: "https://spacetelescope.github.io/roman_notebooks/notebooks/synphot/synphot.html" },
    { title: "Instrument throughput and sensitivity — STScI STIS", url: "https://www.stsci.edu/hst/instrumentation/stis/performance/throughput" },
    { title: "Gravity and limb-darkening coefficients for UBVRI and other passbands — Claret & Bloemen (PDF)", url: "https://www.aanda.org/articles/aa/pdf/2011/05/aa16451-11.pdf" },
  ] },
  diffraction: { sources: [
    { title: 'Circular apertures and resolution — OpenStax University Physics', url: 'https://openstax.org/books/university-physics-volume-3/pages/4-5-circular-apertures-and-resolution' },
    { title: 'Bessel functions: definitions and power series — NIST DLMF', url: 'https://dlmf.nist.gov/10.2' },
    { title: 'Bessel-function zeros — NIST DLMF', url: 'https://dlmf.nist.gov/10.21' },
    { title: 'Large-argument Bessel expansions — NIST DLMF', url: 'https://dlmf.nist.gov/10.17' },
    { title: "Single-slit diffraction — OpenStax University Physics", url: "https://openstax.org/books/university-physics-volume-3/pages/4-1-single-slit-diffraction" },
    { title: "Double-slit diffraction — OpenStax University Physics", url: "https://openstax.org/books/university-physics-volume-3/pages/4-3-double-slit-diffraction" },
    { title: "Telescopes — OpenStax Astronomy", url: "https://openstax.org/books/astronomy/pages/6-1-telescopes" },
    { title: "Bessel-function power series — NIST DLMF", url: "https://dlmf.nist.gov/10.8" },
    { title: "Computational methods for Bessel functions — NIST DLMF", url: "https://dlmf.nist.gov/10.74" },
    { title: "Bessel functions reference — NIST Dataplot (PDF)", url: "https://www.itl.nist.gov/div898/software/dataplot/refman2/ch6/bessx.pdf" },
    { title: "Active and adaptive optics: diffraction limits — ESO", url: "https://www.eso.org/sci/facilities/develop/ao/what_ao.html" },
    { title: "Principles of optical interferometry — ESO lecture notes (PDF)", url: "https://www.eso.org/sci/meetings/2017/VLTI-2017/principlesOI.pdf" },
    { title: "MICADO: diffraction-limited imaging with the ELT — Davies et al.", url: "https://doi.eso.org/10.18727/0722-6691/5217" },
    { title: "First successful adaptive optics tests — ESO historical account", url: "https://eso.org/public/news/eso8908/" },
    { title: "Gaia EDR3: modelling and calibration of point and line spread functions", url: "https://arxiv.org/abs/2012.02069" },
  ] },
  virial: { sources: [
    { title: 'Two-body problem and reduced mass — University of Texas at Austin', url: 'https://farside.ph.utexas.edu/teaching/celestial/Celestial/node11.html' },
    { title: 'Kepler problem and bound orbital energy — University of Texas at Austin', url: 'https://farside.ph.utexas.edu/teaching/336k/lectures/node43.html' },
    { title: 'Virial identity and gravitational dynamics exercises — University of Texas at Austin', url: 'https://farside.ph.utexas.edu/teaching/celestial/Celestialhtml/node21.html' },
    { title: 'Proof of the virial theorem — UCLA lecture notes (PDF)', url: 'https://www.astro.ucla.edu/~wright/A275.pdf' },
    { title: "The laws of planetary motion — OpenStax Astronomy", url: "https://openstax.org/books/astronomy-2e/pages/3-1-the-laws-of-planetary-motion" },
    { title: "Newton’s universal law of gravitation — OpenStax Astronomy", url: "https://openstax.org/books/astronomy-2e/pages/3-3-newtons-universal-law-of-gravitation" },
    { title: "Orbits in the Solar System — OpenStax Astronomy", url: "https://openstax.org/books/astronomy-2e/pages/3-4-orbits-in-the-solar-system" },
    { title: "Measuring stellar masses — OpenStax Astronomy", url: "https://openstax.org/books/astronomy-2e/pages/18-2-measuring-stellar-masses" },
    { title: "Gravitational potential energy and total energy — OpenStax University Physics", url: "https://openstax.org/books/university-physics-volume-1/pages/13-3-gravitational-potential-energy-and-total-energy" },
    { title: "Elliptic orbits — University of Texas at Austin", url: "https://farside.ph.utexas.edu/teaching/celestial/Celestial/node33.html" },
    { title: "Accurate masses and radii of normal stars — Torres, Andersen & Giménez", url: "https://arxiv.org/abs/0908.2624" },
    { title: "Nominal values for selected solar and planetary quantities — Prša et al.", url: "https://arxiv.org/abs/1605.09788" },
    { title: "The tensor virial theorem — Galaxiesbook", url: "https://galaxiesbook.org/chapters/III-03.-Equilibria-of-Elliptical-Galaxies-and-Dark-Matter-Halos_1-The-tensor-virial-theorem.html" },
    { title: "Classical dynamics lecture notes (PDF) — University of Texas at Austin", url: "https://farside.ph.utexas.edu/teaching/301/301.pdf" },
    { title: "Planetary physical parameters — NASA/JPL", url: "https://ssd.jpl.nasa.gov/planets/phys_par.html" },
  ] },
  blackbody: { sources: [
    { title: 'Wien wavelength displacement constant — NIST CODATA', url: 'https://physics.nist.gov/cgi-bin/cuu/Value?bwien' },
    { title: 'Blackbody radiation and Wien’s law — NIST technical notes (PDF)', url: 'https://nvlpubs.nist.gov/nistpubs/Legacy/TN/nbstechnicalnote910-8.pdf' },
    { title: 'CIE 1931 color-matching functions — CIE', url: 'https://cie.co.at/datatable/cie-1931-colour-matching-functions-2-degree-observer' },
    { title: 'Analytic CIE color-matching approximations — Wyman, Sloan & Shirley (PDF)', url: 'https://jcgt.org/published/0002/02/01/paper.pdf' },
    { title: 'Betelgeuse effective temperature — Levesque & Massey (2020)', url: 'https://arxiv.org/abs/2002.10463' },
    { title: 'Rigel’s atmosphere and stellar wind — Chesneau et al. (2014)', url: 'https://arxiv.org/abs/1405.0907' },
    { title: "Blackbody radiation — OpenStax University Physics", url: "https://openstax.org/books/university-physics-volume-3/pages/6-1-blackbody-radiation" },
    { title: "Colors of stars — OpenStax Astronomy", url: "https://openstax.org/books/astronomy-2e/pages/17-2-colors-of-stars" },
    { title: "The spectra of stars and brown dwarfs — OpenStax Astronomy", url: "https://openstax.org/books/astronomy-2e/pages/17-3-the-spectra-of-stars-and-brown-dwarfs" },
    { title: "The electromagnetic spectrum — OpenStax Astronomy", url: "https://openstax.org/books/astronomy-2e/pages/5-2-the-electromagnetic-spectrum" },
    { title: "The effective temperature scale of Galactic red supergiants", url: "https://arxiv.org/abs/astro-ph/0504337" },
    { title: "Blackbody radiation distributions in different spectral domains", url: "https://arxiv.org/abs/0901.1863" },
    { title: "Dimensional analysis and the derivation of Planck’s radiation law", url: "https://arxiv.org/abs/0801.2197" },
    { title: "Optical radiation measurements: radiometry concepts — NIST (PDF)", url: "https://nvlpubs.nist.gov/nistpubs/Legacy/TN/nbstechnicalnote910-7.pdf" },
    { title: "Measuring the Stefan–Boltzmann constant: historical context — NIST", url: "https://nvlpubs.nist.gov/nistpubs/sp958-lide/html/007-009.html" },
  ] },
  parallax: { sources: [
    { title: 'Measuring stellar distances by parallax — ESA', url: 'https://www.esa.int/ESA_Multimedia/Images/2013/06/Measuring_stellar_distances_by_parallax' },
    { title: 'Cosmic distances and the parsec — ESA', url: 'https://www.esa.int/Science_Exploration/Space_Science/Gaia/Cosmic_distances' },
    { title: 'Surveying the Stars — OpenStax Astronomy', url: 'https://openstax.org/books/astronomy-2e/pages/19-2-surveying-the-stars' },
    { title: 'Parallax and the cosmic distance ladder — University of Nebraska–Lincoln', url: 'https://astro.unl.edu/naap/distance/parallax.html' },
    { title: 'Stellar Distances — ESA teachers’ notes (PDF)', url: 'https://sci.esa.int/c/portal/doc.cfm?fobjectid=37855' },
    { title: 'Estimating distances from parallaxes IV — Bailer-Jones et al. (2018)', url: 'https://arxiv.org/abs/1804.10121' },
    { title: "How Gaia studies the Milky Way — ESA", url: "https://www.esa.int/Science_Exploration/Space_Science/Gaia/How_does_Gaia_study_the_Milky_Way" },
    { title: "Gaia DR3 contents and documentation — ESA", url: "https://www.cosmos.esa.int/web/gaia/dr3" },
    { title: "Gaia DR3: summary of content and survey properties", url: "https://arxiv.org/abs/2208.00211" },
    { title: "Gaia EDR3: summary of contents and survey properties", url: "https://arxiv.org/abs/2012.01533" },
    { title: "Gaia EDR3: catalogue validation", url: "https://arxiv.org/abs/2012.06242" },
    { title: "Gaia DR2: the astrometric solution", url: "https://arxiv.org/abs/1804.09366" },
    { title: "Gaia EDR3: parallax bias versus magnitude, colour and position", url: "https://arxiv.org/abs/2012.01742" },
    { title: "Gaia parallax and proper motion — ESA", url: "https://www.cosmos.esa.int/web/gaia/iow_20250115" },
    { title: "International Celestial Reference System — USNO", url: "https://aa.usno.navy.mil/faq/ICRS_doc" },
  ] },
  kepler: { sources: [
    { title: 'Kepler’s orbital model and equal-area derivation — University of Texas at Austin', url: 'https://farside.ph.utexas.edu/Books/Syntaxis/Almagest/node29.html' },
    { title: 'Kepler’s third law — Newtonian derivation', url: 'https://farside.ph.utexas.edu/teaching/336k/Newtonhtml/node41.html' },
    { title: 'JPL planetary elements at J2000', url: 'https://ssd.jpl.nasa.gov/planets/approx_pos.html' },
    { title: 'JPL planetary physical parameters and sidereal orbital periods', url: 'https://ssd.jpl.nasa.gov/planets/phys_par.html' },
    { title: 'A Modern Almagest — full derivations (PDF)', url: 'https://farside.ph.utexas.edu/Books/Syntaxis/Almagest.pdf' },
    { title: "The laws of planetary motion — OpenStax Astronomy", url: "https://openstax.org/books/astronomy-2e/pages/3-1-the-laws-of-planetary-motion" },
    { title: "Newton’s universal law of gravitation — OpenStax Astronomy", url: "https://openstax.org/books/astronomy-2e/pages/3-3-newtons-universal-law-of-gravitation" },
    { title: "Orbits in the Solar System — OpenStax Astronomy", url: "https://openstax.org/books/astronomy-2e/pages/3-4-orbits-in-the-solar-system" },
    { title: "Elliptic orbits — University of Texas at Austin", url: "https://farside.ph.utexas.edu/teaching/celestial/Celestial/node33.html" },
    { title: "Two-body problem and reduced mass — University of Texas at Austin", url: "https://farside.ph.utexas.edu/teaching/celestial/Celestial/node11.html" },
    { title: "Gravitational potential energy and total energy — OpenStax University Physics", url: "https://openstax.org/books/university-physics-volume-1/pages/13-3-gravitational-potential-energy-and-total-energy" },
    { title: "The birth of modern astronomy — OpenStax Astronomy", url: "https://openstax.org/books/astronomy-2e/pages/2-4-the-birth-of-modern-astronomy" },
    { title: "Orbit determination and ephemerides — NASA/JPL", url: "https://ssd.jpl.nasa.gov/orbits.html" },
    { title: "Planetary orbits — University of Texas at Austin", url: "https://farside.ph.utexas.edu/teaching/301/lectures/node155.html" },
    { title: "Classical dynamics lecture notes (PDF) — University of Texas at Austin", url: "https://farside.ph.utexas.edu/teaching/301/301.pdf" },
  ] },
  planetary: { sources: [
    { title: 'Model of Ptolemy', url: 'https://farside.ph.utexas.edu/Books/Syntaxis/Almagest/node31.html' },
    { title: 'Model of Kepler', url: 'https://farside.ph.utexas.edu/Books/Syntaxis/Almagest/node29.html' },
    { title: 'De revolutionibus orbium coelestium (1543)', url: 'https://www.loc.gov/exhibits/exploring-the-early-americas/interactives/heavens-and-earth/heavens/artifact10-heaven.html' },
    { title: 'Almagest manuscripts and Renaissance transmission', url: 'https://www.loc.gov/exhibits/vatican/math.html' },
    { title: 'Copernicus’s Model of the Solar System', url: 'https://farside.ph.utexas.edu/Books/Syntaxis/Almagest/node4.html' },
    { title: "The Ptolemaic system — Rice University Galileo Project", url: "https://galileo.library.rice.edu/sci/theories/ptolemaic_system.html" },
    { title: "Ancient Greek astronomy and cosmology — Library of Congress", url: "https://www.loc.gov/collections/finding-our-place-in-the-cosmos-with-carl-sagan/articles-and-essays/modeling-the-cosmos/ancient-greek-astronomy-and-cosmology" },
    { title: "Ptolemaic epicycle machine — Harvard Science Demonstrations", url: "https://sciencedemonstrations.fas.harvard.edu/presentations/ptolemaic-epicycle-machine" },
    { title: "Ancient astronomy — OpenStax Astronomy", url: "https://openstax.org/books/astronomy-2e/pages/2-2-ancient-astronomy" },
    { title: "The birth of modern astronomy — OpenStax Astronomy", url: "https://openstax.org/books/astronomy-2e/pages/2-4-the-birth-of-modern-astronomy" },
    { title: "The laws of planetary motion — OpenStax Astronomy", url: "https://openstax.org/books/astronomy-2e/pages/3-1-the-laws-of-planetary-motion" },
    { title: "Newton’s universal law of gravitation — OpenStax Astronomy", url: "https://openstax.org/books/astronomy-2e/pages/3-3-newtons-universal-law-of-gravitation" },
    { title: "Orbits in the Solar System — OpenStax Astronomy", url: "https://openstax.org/books/astronomy-2e/pages/3-4-orbits-in-the-solar-system" },
    { title: "Geometric model of Copernicus — University of Texas at Austin", url: "https://farside.ph.utexas.edu/Books/Syntaxis/Almagest/node32.html" },
    { title: "Approximate planetary positions — NASA/JPL", url: "https://ssd.jpl.nasa.gov/planets/approx_pos.html" },
  ] },
  coordinates: { sources: [
    { title: 'Computing Altitude and Azimuth', url: 'https://aa.usno.navy.mil/faq/alt_az' },
    { title: 'Computing Approximate Sidereal Time', url: 'https://aa.usno.navy.mil/faq/GAST' },
    { title: 'Horizontal Coordinates', url: 'https://farside.ph.utexas.edu/Books/Syntaxis/Almagest/node16.html' },
    { title: 'NOVAS C3.0 User’s Guide — Circular 180', url: 'https://aa.usno.navy.mil/downloads/Circular_180C_C.pdf' },
    { title: "Celestial sphere — University of Texas at Austin", url: "https://farside.ph.utexas.edu/Books/Syntaxis/Almagest/node8.html" },
    { title: "Celestial motions — University of Texas at Austin", url: "https://farside.ph.utexas.edu/Books/Syntaxis/Almagest/node9.html" },
    { title: "Celestial coordinates: right ascension and declination — University of Texas at Austin", url: "https://farside.ph.utexas.edu/Books/Syntaxis/Almagest/node10.html" },
    { title: "Ecliptic circle — University of Texas at Austin", url: "https://farside.ph.utexas.edu/Books/Syntaxis/Almagest/node11.html" },
    { title: "Ecliptic coordinates — University of Texas at Austin", url: "https://farside.ph.utexas.edu/Books/Syntaxis/Almagest/node12.html" },
    { title: "Local horizon and meridian — University of Texas at Austin", url: "https://farside.ph.utexas.edu/Books/Syntaxis/Almagest/node15.html" },
    { title: "Meridian transits — University of Texas at Austin", url: "https://farside.ph.utexas.edu/Books/Syntaxis/Almagest/node17.html" },
    { title: "The sky above — OpenStax Astronomy", url: "https://openstax.org/books/astronomy-2e/pages/2-1-the-sky-above" },
    { title: "International Celestial Reference System — USNO", url: "https://aa.usno.navy.mil/faq/ICRS_doc" },
    { title: "IAU reference systems and Earth rotation — USNO Circular 179 (PDF)", url: "https://aa.usno.navy.mil/downloads/Circular_179_bw.pdf" },
    { title: "Sidereal time calculator — USNO", url: "https://aa.usno.navy.mil/data/siderealtime" },
  ] },
  binary: { sources: [
    { title: 'IAU 2015 nominal solar and planetary constants', url: 'https://arxiv.org/abs/1510.07674' },
    { title: 'Keplerian orbit derivation — University of Texas at Austin', url: 'https://farside.ph.utexas.edu/Books/Syntaxis/Almagest/node29.html' },
    { title: 'Realization of Accurate Close-Binary Light Curves: Application to MR Cygni', url: 'https://adsabs.harvard.edu/pdf/1971ApJ...166..605W' },
    { title: 'Analytic Lightcurves for Planetary Transit Searches', url: 'https://arxiv.org/abs/astro-ph/0210099' },
    { title: 'ellc: A fast, flexible light curve model for detached eclipsing binary stars and transiting exoplanets', url: 'https://arxiv.org/abs/1603.08484' },
    { title: 'ellc source code and examples', url: 'https://github.com/pmaxted/ellc' },
    { title: "Measuring stellar masses — OpenStax Astronomy", url: "https://openstax.org/books/astronomy-2e/pages/18-2-measuring-stellar-masses" },
    { title: "Two-body problem and reduced mass — University of Texas at Austin", url: "https://farside.ph.utexas.edu/teaching/celestial/Celestial/node11.html" },
    { title: "Accurate masses and radii of normal stars — Torres, Andersen & Giménez", url: "https://arxiv.org/abs/0908.2624" },
    { title: "Nominal values for selected solar and planetary quantities — Prša et al.", url: "https://arxiv.org/abs/1605.09788" },
    { title: "Analytic transit light curves for arbitrary limb darkening — Agol, Luger & Foreman-Mackey", url: "https://arxiv.org/abs/1908.03222" },
    { title: "JKTEBOP eclipsing-binary modelling code — John Southworth", url: "https://www.astro.keele.ac.uk/jkt/codes/jktebop.html" },
    { title: "PHOEBE: Physics of Eclipsing Binaries", url: "https://phoebe-project.org/" },
    { title: "Gravity and limb-darkening coefficients — Claret & Bloemen (2011, PDF)", url: "https://www.aanda.org/articles/aa/pdf/2011/05/aa16451-11.pdf" },
    { title: "Power-2 limb-darkening coefficients for photometric systems", url: "https://arxiv.org/abs/2206.11098" },
  ] },
};
