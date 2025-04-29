import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { fadeIn, staggerContainer } from '@/lib/animations';
import { useState } from 'react';

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image?: string;
};

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Python Libraries Every Physics Student Should Know",
    excerpt: "Essential Python libraries for physics simulations, data analysis, and visualization that every student should master.",
    date: "April 28, 2025",
    readTime: "8 min read",
    category: "Programming",
    tags: ["Python", "NumPy", "SciPy", "Physics Simulations"]
  },
];

const categories = ["All", "Physics", "Quantum Physics", "Mathematics", "Programming"];

const BlogSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section id="blog" className="py-20 relative z-10">
      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="space-y-12"
        >
          <motion.div variants={fadeIn('up')} className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Physics Blog
            </h2>
            <p className="text-lg text-gray-300">
              Exploring the fascinating world of physics through accessible explanations and insights.
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            variants={fadeIn('up')}
            className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8"
          >
            <div className="w-full md:w-1/3">
              <Input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#141B34] border-[#5D3E7C] text-white"
              />
            </div>
            <Tabs
              defaultValue="All"
              value={activeCategory}
              onValueChange={setActiveCategory}
              className="w-full md:w-auto"
            >
              <TabsList className="bg-[#141B34] border border-[#5D3E7C] p-1 w-full md:w-auto flex overflow-x-auto">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="data-[state=active]:bg-[#5D3E7C] data-[state=active]:text-white px-4"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </motion.div>

          {/* Blog Posts Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  variants={fadeIn('up', index * 0.1)}
                  className="h-full"
                >
                  <Card className="bg-[#141B34] border-[#5D3E7C] border h-full flex flex-col hover:border-[#FF65A3] transition-colors">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start mb-2">
                        <Badge className="bg-[#5D3E7C] text-white hover:bg-[#7B52A4]">
                          {post.category}
                        </Badge>
                        <div className="text-sm text-gray-400">
                          {post.date} • {post.readTime}
                        </div>
                      </div>
                      <CardTitle className="text-xl text-white">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <CardDescription className="text-gray-300 text-base mb-4">
                        {post.excerpt}
                      </CardDescription>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag, i) => (
                          <span key={i} className="text-xs text-[#FF65A3]">
                            #{tag.replace(/\s+/g, '')}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
			  <Button
			    asChild
			    className="bg-[#5D3E7C] text-white hover:bg-[#FF65A3] w-full"
			  >
			    <Link to={`/blogpost/${post.id}`} className="w-full">
			      Read more
			    </Link>
			  </Button>
  		     </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div variants={fadeIn('up')} className="text-center py-16">
              <h3 className="text-xl text-gray-300 mb-4">No posts found matching your criteria</h3>
              <Button
                variant="outline"
                className="border-[#5D3E7C] text-[#FF65A3] hover:bg-[#5D3E7C] hover:text-white"
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                }}
              >
                Reset Filters
              </Button>
            </motion.div>
          )}

          {/* Pagination (Placeholder) */}
          {filteredPosts.length > 0 && (
            <motion.div variants={fadeIn('up')} className="flex justify-center mt-12">
              <div className="flex items-center space-x-2">
                <Button variant="outline" className="border-[#5D3E7C] text-white" disabled>
                  <i className="ri-arrow-left-line mr-1"></i> Previous
                </Button>
                <Badge className="bg-[#5D3E7C] text-white px-4 py-1">
                  Page 1 of 1
                </Badge>
                <Button variant="outline" className="border-[#5D3E7C] text-white" disabled>
                  Next <i className="ri-arrow-right-line ml-1"></i>
                </Button>
              </div>
            </motion.div>
          )}

          {/* Newsletter CTA */}
          <motion.div variants={fadeIn('up')} className="text-center mt-8">
            <p className="text-gray-300 mb-6">
              Want to stay updated with my latest physics articles and research? Subscribe to my newsletter!
            </p>
            <Button className="bg-[#5D3E7C] text-white hover:bg-[#FF65A3] px-8">
              Subscribe <i className="ri-mail-line ml-2"></i>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;

