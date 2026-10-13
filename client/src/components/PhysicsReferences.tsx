import { physicsReferences, type PhysicsProject } from '@/data/physicsReferences';

export default function PhysicsReferences({ project }: { project: PhysicsProject }) {
  return (
    <section id="references" aria-label="References and further reading" className="mt-6 rounded-2xl border border-slate-700 bg-[#0d1523]/95 p-5 md:p-7">
      <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Explore the foundations</p>
      <h2 className="mt-2 text-2xl font-semibold text-white">References &amp; further reading</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {physicsReferences[project].sources.map(source => (
          <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer" className="group flex items-start justify-between gap-4 rounded-xl border border-slate-700 bg-black/20 p-4 transition hover:border-cyan-300/60 hover:bg-cyan-300/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300">
            <span className="font-semibold text-white underline decoration-slate-600 underline-offset-4 transition group-hover:text-cyan-200">{source.title}</span>
            <span className="text-cyan-300" aria-hidden="true">↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        ))}
      </div>
    </section>
  );
}
