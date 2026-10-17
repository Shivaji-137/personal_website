import { useInView } from '@/hooks/use-intersection-observer';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import profileImage from '../assets/shivaji.jpg';

const tools = ['Python', 'MATLAB', 'JavaScript', 'C++', 'HTML/CSS', 'LaTeX', 'SQL'];
const interests = [
  { name: 'Physics', icon: 'ri-planet-line' },
  { name: 'Programming', icon: 'ri-code-s-slash-line' },
  { name: 'Data Analysis', icon: 'ri-bar-chart-line' },
  { name: 'Teaching', icon: 'ri-presentation-line' },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.05 });
  const reduceMotion = useReducedMotion();
  const reveal = {
    initial: reduceMotion ? false as const : { opacity: 0, y: 16 },
    animate: isInView ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.5 },
  };

  return (
    <section id="about" ref={sectionRef} aria-labelledby="about-heading" className="relative scroll-mt-24 py-20 md:py-28 section-transition">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div {...reveal} className="mx-auto mb-12 max-w-6xl md:mb-16">
          <div className="mb-4 flex items-center gap-3" aria-hidden="true">
            <span className="h-px w-10 bg-[#FF65A3]" />
            <span className="font-space text-[11px] uppercase tracking-[.24em] text-[#FF9BC2]">A little about me</span>
          </div>
          <h2 id="about-heading" className="font-space text-3xl font-bold tracking-tight text-white md:text-5xl">About Me</h2>
        </motion.div>

        <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)] lg:gap-14">
          <motion.div {...reveal} className="mx-auto w-full max-w-sm lg:sticky lg:top-28">
            <div className="flex overflow-hidden rounded-2xl border border-white/10 bg-[#101626] lg:block">
              <div className="relative w-28 shrink-0 self-stretch sm:w-36 lg:aspect-[4/5] lg:w-full">
                <img src={profileImage} alt="Shivaji Chaulagain" loading="lazy" width="960" height="1280" className="absolute inset-0 h-full w-full object-cover object-[50%_40%]" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b1026]/70 via-transparent to-transparent" />
              </div>
              <div className="p-5 sm:p-6">
                <p className="font-space text-lg font-semibold text-white">Shivaji Chaulagain</p>
                <p className="mt-1 text-sm leading-6 text-slate-400">Physics &amp; Astronomy</p>
                <a href="https://pa.as.uky.edu/users/sch515" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-xs text-[#FFD15C] transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFD15C]">
                  University of Kentucky profile <i className="ri-arrow-right-up-line" aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-white/10 pt-5">
              {interests.map(({ name, icon }) => (
                <div key={name} className="flex items-center gap-2.5 text-xs text-slate-300">
                  <i className={`${icon} text-base text-[#D1B2E8]`} aria-hidden="true" />{name}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div {...reveal} className="min-w-0">
            <h3 className="max-w-2xl font-space text-2xl font-semibold leading-tight tracking-tight text-[#FFD15C] sm:text-3xl lg:text-[2.2rem]">
              Exploring the Physics of the Universe
            </h3>
            <p className="mt-6 text-lg leading-[1.85] text-slate-200">
              I'm a graduate student, doing Phd in Physics (specialization in Astronomy) at the University of Kentucky, USA, driven by curiosity and a passion for understanding the universe through data.
            </p>

            <div className="mt-8 border-l-2 border-[#8be9fd]/50 pl-5 sm:pl-6">
              <h4 className="mb-3 font-space text-xs font-medium uppercase tracking-[.18em] text-[#8be9fd]">Research interests</h4>
              <p className="text-[15px] leading-[1.9] text-slate-300">
                My research interest focuses on computational astronomy as well as observational astronomy. I am particularly interested in studying overall structure of the universe, galaxy formation and evolution, and the behavior of celestial objects. I also have a strong interest in data analysis, machine learning, and visualization techniques to extract meaningful insights from complex datasets. Beyond astronomy, my interests extend to quantum mechanics, classical mechanics, and other areas of physics that illuminate the fundamental principles governing the universe.
              </p>
            </div>

            <div className="mt-9 border-t border-white/10 pt-7">
              <div>
                <h4 className="mb-3 flex items-center gap-2 font-space text-sm font-semibold text-white"><i className="ri-presentation-line text-[#FF9BC2]" aria-hidden="true" />Teaching &amp; mentorship</h4>
                <p className="text-sm leading-[1.9] text-slate-400">
                  I am also a graduate teaching assistant at the University of Kentucky, where I instruct and mentor students in physics laboratories, helping them develop a strong foundation in experimental techniques and scientific inquiry.
                </p>
              </div>
            </div>

            <div className="mt-9 grid gap-7 rounded-2xl border border-white/[.08] bg-[#101626]/70 p-5 sm:grid-cols-[1.05fr_1fr] sm:p-6">
              <div className="min-w-0">
                <h4 className="mb-4 font-space text-[11px] font-medium uppercase tracking-[.18em] text-[#FFD15C]">Education</h4>
                <p className="font-space text-sm font-semibold text-white">Undergraduate in Physics</p>
                <p className="mt-2 text-sm leading-6 text-slate-400">St. Xavier's College, Tribhuvan University, Nepal</p>
                <p className="mt-3 text-xs tabular-nums tracking-wide text-slate-500">2019–2024</p>
              </div>
              <div className="min-w-0 border-t border-white/10 pt-5 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
                <h4 className="mb-4 font-space text-[11px] font-medium uppercase tracking-[.18em] text-[#FFD15C]">Programming Skills</h4>
                <ul aria-label="Programming skills" className="flex list-none flex-wrap gap-2">
                  {tools.map(tool => <li key={tool} className="rounded-md border border-white/10 bg-white/[.03] px-2.5 py-1.5 text-xs text-slate-300">{tool}</li>)}
                </ul>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/projects" className="inline-flex items-center gap-2 rounded-lg bg-[#FFD15C] px-5 py-3 font-space text-sm font-semibold text-[#11131a] transition-colors hover:bg-[#ffe39a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFD15C]">View Projects <i className="ri-arrow-right-line" aria-hidden="true" /></Link>
              <Link to="/cv" className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-5 py-3 font-space text-sm text-slate-200 transition-colors hover:border-white/50 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#FFD15C]"><i className="ri-file-text-line" aria-hidden="true" /> View CV</Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
