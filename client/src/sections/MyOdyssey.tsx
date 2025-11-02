import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { fadeIn, staggerContainer } from '@/lib/animations';
import { imageData } from '@/data/odysseyImages';
import { videoData } from '@/data/odysseyVideos';
import { writingData } from '@/data/odysseyWritings';
import { ecaData } from '@/data/ecaData';

const categories = ['All', 'Nature', 'Adventure', 'Culture', 'Academic', 'Community'];


const MyOdyssey = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useNavigate();

  const filterItems = (items: any[]) =>
    items.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.tags && item.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase())));
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });

  const openEcaItem = (eca: any) => {
    // navigate to separate page for ECA item
    return (<Link to={`/blogpost/${post.id}`} className="w-full"> </Link> )
  };

  return (
    <section id = "myodyssey" className="py-20 relative z-10">
      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="space-y-12"
        >
          <motion.div variants={fadeIn('up')} className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gradient">My Odyssey</h2>
            <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
              A collection of moments from my journey — photos, videos, writings, and extracurricular highlights.
            </p>
          </motion.div>

          {/* Search + Category */}
          <motion.div
            variants={fadeIn('up')}
            className="flex flex-col md:flex-row gap-4 items-center justify-between"
          >
            <Input
              type="text"
              placeholder="Search by title, tags, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#141B34] border-[#5D3E7C] text-white w-full md:w-1/2"
            />
            <Tabs
              defaultValue="All"
              value={activeCategory}
              onValueChange={setActiveCategory}
              className="w-full md:w-auto"
            >
              <TabsList className="bg-[#141B34] border border-[#5D3E7C] p-1 flex overflow-x-auto">
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
          {/* <p>Updating soon ......</p> */}

          <Tabs defaultValue="eca">
            <TabsList className="justify-center mb-8 flex flex-wrap gap-2">
              <TabsTrigger value="eca">🏅 Extracurricular</TabsTrigger>
            </TabsList>

            {/* ECA (Extracurricular) content only */}
            <TabsContent value="eca">
              <motion.div
                variants={fadeIn('up')}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {(() => {
                  const items = filterItems(ecaData);
                  if (items.length === 0) return <div className="col-span-full text-center text-gray-400">No Extracurricular items found.</div>;
                  return items.map((eca) => (
                    <button
                      type="button"
                      key={eca.id}
                      onClick={() => openEcaItem(eca)}
                      className="block transition hover:scale-[1.02] text-left"
                    >
                      <Card className="bg-[#141B34] border border-[#5D3E7C] hover:border-[#FF65A3]">
                        {eca.cover && (
                          /* cover thumbnail */
                          <img src={eca.cover} alt={`${eca.title} cover`} className="w-full h-40 object-cover rounded-t" />
                        )}
                        <CardHeader>
                          <div className="flex justify-between items-center mb-2">
                            <Badge className="bg-[#5D3E7C] text-white">{eca.kind}</Badge>
                            <span className="text-sm text-gray-400">{eca.date}</span>
                          </div>
                          <CardTitle className="text-white">{eca.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="text-gray-300">
                          {eca.description}
                        </CardContent>
                        <CardFooter className="flex gap-2 flex-wrap">
                          {eca.tags.map((tag: string, i: number) => (
                            <span key={i} className="text-xs text-[#FF65A3]">#{tag}</span>
                          ))}
                        </CardFooter>
                      </Card>
                    </button>
                  ));
                })()}
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
      {/* modal removed — ECA items navigate to their own page */}
    </section>
  );
};

export default MyOdyssey;
