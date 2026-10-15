import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import Header from '@/components/Header';
const base = '/guides/spherical-harmonics/';
const resource = (url: string) => url.startsWith('./') ? base + url.slice(2) : url;
export default function SphericalHarmonicsGuidePage() {
  const [markdown, setMarkdown] = useState(''), [error, setError] = useState(false);
  useEffect(() => {
    document.title = 'Spherical Harmonics: Complete Learning Guide | Physics Lab';
    window.scrollTo(0, 0);
    const controller = new AbortController();
    fetch(base + 'README.md', { signal: controller.signal }).then(r => {
      if (!r.ok) throw new Error('Guide unavailable');
      return r.text();
    }).then(setMarkdown).catch(e => { if (e.name !== 'AbortError') setError(true); });
    return () => controller.abort();
  }, []);
  return <div className="min-h-screen bg-[#080d17] text-slate-200"><Header/>
    <main className="mx-auto max-w-5xl px-4 pb-16 pt-28 sm:px-8">
      <a href="/#/phd-physics/spherical-harmonics" className="text-sm text-cyan-300 hover:underline">← Back to the explorer</a>
      <div className="my-5 flex flex-wrap gap-3 text-xs">
        <a href={base+'README.md'} download="spherical-harmonics-guide.md" className="rounded-full border border-cyan-300/40 px-4 py-2 text-cyan-200">Download guide (.md)</a>
        <a href={base+'all-degree-order-pairs.md'} download className="rounded-full border border-slate-600 px-4 py-2">Download complete ℓ, m atlas (.md)</a>
      </div>
      {error ? <p role="alert">The guide could not load. Please try reloading, or use the Markdown download above.</p> : !markdown ? <p role="status">Loading learning guide…</p> :
      <article className="prose prose-invert max-w-none prose-headings:text-cyan-50 prose-p:leading-8 prose-a:text-cyan-300 prose-img:rounded-xl prose-table:text-sm [&_.katex-display]:max-w-full [&_.katex-display]:overflow-x-auto [&_.katex-display]:overflow-y-hidden [&_pre]:max-w-full [&_table]:block [&_table]:overflow-x-auto [&_img]:w-full [&_code]:break-words [&_pre_code]:break-normal">
        <ReactMarkdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeKatex]} components={{
          a: ({ href='', children }) => <a href={resource(href)} download={href.endsWith('.md') || undefined}>{children}</a>,
          img: ({ src='', alt }) => <img src={resource(src)} alt={alt} loading="lazy"/>,
        }}>{markdown}</ReactMarkdown>
      </article>}
    </main>
  </div>;
}
