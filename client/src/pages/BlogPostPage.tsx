import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { blogPosts } from '@/data/blogPosts';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StarBackground from '@/components/StarBackground';
import ScrollToTop from '@/components/ScrollToTop';

const BlogPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find((p) => p.id.toString() === id);

  const [markdown, setMarkdown] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadMarkdown = async () => {
      if (post?.markdownPath) {
        document.title = `${post.title} | Shivaji`;
        setLoading(true);
        try {
          const res = await fetch(post.markdownPath);
          const text = await res.text();
          setMarkdown(text);
        } catch (error) {
          console.error("Error loading markdown:", error);
          setMarkdown("Error loading content.");
        } finally {
          setLoading(false);
        }
      } else {
        setMarkdown("This post has no content yet.");
        setLoading(false);
      }
    };

    loadMarkdown();
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#08080a] text-white flex items-center justify-center">
        <p className="text-lg">Post not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08080a] text-white overflow-x-hidden">
      {/* <StarBackground /> */}
      <Header />

      <main className="pt-20 px-4 max-w-4xl mx-auto">
        {/* Top Back to Blog Link */}
        <div className="mb-6">
          <Link to="/blog" aria-label="Back to Blog Posts" className="text-[#FF65A3] hover:underline text-sm">
            ← Back to Blog
          </Link>
        </div>

        {/* Post Header */}
        <h1 className="text-4xl font-bold text-gradient mb-6">{post.title}</h1>
        <p className="text-sm text-gray-400 mb-4">
          {post.date} • {post.readTime} • {post.category}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {post.tags.map((tag, i) => (
            <span key={i} className="text-xs text-[#FF65A3]">
              #{tag.replace(/\s+/g, '')}
            </span>
          ))}
        </div>

        {/* Markdown Content */}
        <article className="prose prose-invert max-w-none mb-12">
          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : (
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
              {markdown}
            </ReactMarkdown>
          )}
        </article>

        {/* Bottom Back to Blog Button */}
        <div className="text-center">
          <Link to="/blog" aria-label="Return to Blog Overview">
            <button className="bg-[#5D3E7C] hover:bg-[#FF65A3] text-white px-6 py-2 rounded-full transition">
              ← Back to Blog
            </button>
          </Link>
        </div>
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default BlogPostPage;
