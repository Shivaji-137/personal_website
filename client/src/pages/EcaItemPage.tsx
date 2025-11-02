import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { ecaData } from '@/data/ecaData';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';

const EcaItemPage = () => {
  const { id } = useParams<{ id: string }>();
  const item = ecaData.find((e) => e.id === id);
  const [markdown, setMarkdown] = useState<string>('');

  useEffect(() => {
    const load = async () => {
      if (item && item.kind === 'blog') {
        try {
          const res = await fetch(item.link);
          const text = await res.text();
          setMarkdown(text);
        } catch (err) {
          setMarkdown('Error loading content.');
        }
      }
    };
    load();
  }, [item]);

  if (!item) {
    return (
      <div className="min-h-screen bg-[#08080a] text-white flex items-center justify-center">
        <p className="text-lg">ECA item not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08080a] text-white overflow-x-hidden">
      <Header />
      <main className="pt-20 px-4 max-w-4xl mx-auto">
        <div className="mb-6">
          <Link to="/Myodyssey" className="text-[#FF65A3] hover:underline text-sm">
            ← Back to My Odyssey
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-gradient mb-6">{item.title}</h1>
        <p className="text-sm text-gray-400 mb-4">{item.date}</p>

        <div className="mb-8">
          {item.cover && (
            <div className="mb-6">
              <img src={item.cover} alt={`${item.title} cover`} className="w-full h-64 object-cover rounded" />
            </div>
          )}

          {item.kind === 'video' ? (
            <video controls className="w-full max-h-[60vh]">
              <source src={item.link} type="video/mp4" />
            </video>
          ) : item.kind === 'image' ? (
            <img src={item.link} alt={item.title} className="w-full object-contain" />
          ) : (
            <article className="prose prose-invert max-w-none">
              <ReactMarkdown rehypePlugins={[rehypeRaw, remarkGfm]}>{markdown}</ReactMarkdown>
            </article>
          )}
        </div>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default EcaItemPage;
