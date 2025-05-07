import { useState } from 'react';
import { motion } from 'framer-motion';
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

const categories = ['All', 'Nature', 'Adventure'];


const MyOdyssey = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filterItems = (items: any[]) =>
    items.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.tags && item.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase())));
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });

  return (
    <section className="py-16 px-4 container mx-auto space-y-12">
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
        <p>Updating soon ......</p>

        {/*
         <Tabs defaultValue="photos">
          <TabsList className="justify-center mb-8 flex flex-wrap gap-2">
            <TabsTrigger value="photos">📸 Photos</TabsTrigger>
            <TabsTrigger value="videos">🎥 Videos</TabsTrigger>
            <TabsTrigger value="writings">✍️ Writings</TabsTrigger>
            <TabsTrigger value="eca">🏅 ECA</TabsTrigger>
          </TabsList>

          
          <TabsContent value="photos">
            <motion.div
              variants={fadeIn('up')}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filterItems(imageData).map((img) => (
                <Card key={img.id} className="bg-[#141B34] border border-[#5D3E7C] hover:border-[#FF65A3]">
                  <img src={img.src} alt={img.title} className="w-full h-48 object-cover rounded-t" />
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <Badge className="bg-[#5D3E7C] text-white">{img.category}</Badge>
                      <span className="text-sm text-gray-400">{img.date}</span>
                    </div>
                    <CardTitle className="text-white">{img.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-300">{img.description}</CardContent>
                  <CardFooter className="flex gap-2 flex-wrap">
                    {img.tags.map((tag: string, i: number) => (
                      <span key={i} className="text-xs text-[#FF65A3]">#{tag}</span>
                    ))}
                  </CardFooter>
                </Card>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="videos">
            <motion.div
              variants={fadeIn('up')}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filterItems(videoData).map((video) => (
                <Card key={video.id} className="bg-[#141B34] border border-[#5D3E7C] hover:border-[#FF65A3]">
                  <video controls className="w-full h-48 object-cover rounded-t">
                    <source src={video.src} type="video/mp4" />
                  </video>
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <Badge className="bg-[#5D3E7C] text-white">{video.category}</Badge>
                      <span className="text-sm text-gray-400">{video.date}</span>
                    </div>
                    <CardTitle className="text-white">{video.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-300">{video.description}</CardContent>
                  <CardFooter className="flex gap-2 flex-wrap">
                    {video.tags.map((tag: string, i: number) => (
                      <span key={i} className="text-xs text-[#FF65A3]">#{tag}</span>
                    ))}
                  </CardFooter>
                </Card>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="writings">
            <motion.div
              variants={fadeIn('up')}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {writingData.map((item) => (
                <Card key={item.id} className="bg-[#141B34] border border-[#5D3E7C] hover:border-[#FF65A3]">
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <Badge className="bg-[#5D3E7C] text-white">{item.type}</Badge>
                      <span className="text-sm text-gray-400">{item.date}</span>
                    </div>
                    <CardTitle className="text-white">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-300 whitespace-pre-wrap">{item.content.slice(0, 200)}...</CardContent>
                  <CardFooter className="flex gap-2 flex-wrap">
                    {item.tags.map((tag: string, i: number) => (
                      <span key={i} className="text-xs text-[#FF65A3]">#{tag}</span>
                    ))}
                  </CardFooter>
                </Card>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="eca">
            <motion.div
              variants={fadeIn('up')}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filterItems(ecaData).map((eca) => (
                eca.type === 'blog' && eca.link ? (
                  <a
                    href={eca.link}
                    key={eca.id}
                    className="block transition hover:scale-[1.02]"
                  >
                    <Card className="bg-[#141B34] border border-[#5D3E7C] hover:border-[#FF65A3]">
                      <CardHeader>
                        <div className="flex justify-between items-center mb-2">
                          <Badge className="bg-[#5D3E7C] text-white">{eca.type}</Badge>
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
                  </a>
                ) : null
              ))}
            </motion.div>
          </TabsContent> 
          */}

        {/* </Tabs> */}
      </motion.div>
    </section>
  );
};

export default MyOdyssey;
