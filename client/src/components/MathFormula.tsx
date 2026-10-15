import { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
/** Local, accessible LaTeX rendering; display equations scroll within narrow panels. */
export default function MathFormula({ tex, block = false }: { tex: string; block?: boolean }) {
  const html = useMemo(() => katex.renderToString(tex.replace(/(\d+(?:\.\d+)?)e([+-]?\d+)/g, '$1\\times10^{$2}'), { displayMode: block, throwOnError: false, strict: 'error' }), [tex, block]);
  return <span className={block ? 'block max-w-full overflow-x-auto py-2 text-sm' : 'inline-block max-w-full overflow-x-auto align-middle text-[.95em]'} dangerouslySetInnerHTML={{ __html: html }}/>;
}
