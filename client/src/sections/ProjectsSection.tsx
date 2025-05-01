import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fadeIn, staggerContainer } from '@/lib/animations';
import { projects } from '@/data/projects';

const categories = ['All', 'General Physics', 'Data Science'];

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedIndexes, setExpandedIndexes] = useState<number[]>([]);

  const toggleExpand = (index: number) => {
    setExpandedIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const filteredProjects = projects.filter(
    (project) =>
      activeCategory === 'All' || project.category === activeCategory
  );

  return (
    <section id="projects" className="py-20 relative z-10">
      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="space-y-16"
        >
          {/* Header */}
          <motion.div
            variants={fadeIn('up')}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Projects
            </h2>
            <p className="text-lg text-gray-300">
              Exploring the universe through computational physics and software
              development. Here are some of my key projects combining physics
              and programming.
            </p>
          </motion.div>

          {/* Tabs */}
          <motion.div variants={fadeIn('up')} className="mb-8">
            <Tabs
              defaultValue="All"
              value={activeCategory}
              onValueChange={setActiveCategory}
              className="w-full"
            >
              <TabsList className="bg-[#141B34] border border-[#5D3E7C] p-1 w-full flex justify-center overflow-x-auto">
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

          {/* Timeline */}
          <motion.div
            variants={fadeIn('up')}
            className="relative flex flex-col items-center"
          >
            <div className="absolute w-1 bg-[#d4db9c] h-full left-1/2 transform -translate-x-1/2 z-0"></div>

            {filteredProjects.map((project, index) => {
              const isRight = index % 2 === 0;
              const isExpanded = expandedIndexes.includes(index);
              const hasInformation = project.information.length > 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isRight ? 100 : -100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className={`relative w-full md:w-1/2 px-4 py-3 z-10 ${
                    isRight ? 'self-start md:pl-10' : 'self-end md:pr-10'
                  }`}
                >
                  <div
                    className={`absolute top-6 w-3.5 h-3.5 rounded-full bg-[#d4db9c] border-2 border-[#d4db9c] z-12 ${
                      isRight ? 'right-[-7px]' : 'left-[-7px]'
                    } shadow-[0_0_1px_#d4db9c,0_0_1px_#d4db9c]`}
                  ></div>

                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Card className="bg-[#080a0a] border-[#d4db9c] border transition-all duration-300 overflow-hidden">
                      <CardHeader className="pb-1 pt-4">
                        <CardTitle className="text-xl md:text-2xl text-white">
                          {project.title}
                          {project.title.startsWith('Relational') && (
                            <Button className="ml-2">
                              <a
                                href={project.certificate}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <i className="ri-external-link-line mr-2 px-1"></i>
                                Show certificate
                              </a>
                            </Button>
                          )}
                        </CardTitle>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {project.tags.map((tag, i) => (
                            <Badge
                              key={i}
                              variant="secondary"
                              className="bg-[#5D3E7C] text-white hover:bg-[#7B52A4]"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardHeader>

                      <CardContent className="pt-0 pb-2">
                        {isExpanded && (
                          <>
                            <CardDescription className="text-gray-300 text-base mb-3">
                              {project.description}
                            </CardDescription>
                            {hasInformation && (
                              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                                {project.information.map((content, i) => (
                                  <a
                                    key={i}
                                    href={Object.entries(content)[0][1]}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <li className="text-white hover:bg-[#FF65A3] px-1">
                                      {Object.entries(content)[0][0]}
                                    </li>
                                  </a>
                                ))}
                              </ul>
                            )}
                          </>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleExpand(index)}
                          className="text-[#FF65A3] mt-2 hover:bg-transparent hover:underline"
                        >
                          {isExpanded ? 'Hide Details' : 'Show Details'}
                        </Button>
                      </CardContent>

                      <CardFooter className="flex justify-between pt-1 pb-4">
                        <div></div>
                        <Button
                          variant="outline"
                          className="border-[#5D3E7C] text-[#FF65A3] hover:bg-[#5D3E7C] hover:text-white"
                        >
                          <i className="ri-github-line mr-2"></i>
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Code
                          </a>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeIn('up')} className="text-center">
            <p className="text-gray-300 mb-6">
              I'm always working on new projects combining physics and software.
              Check my GitHub for the latest updates!
            </p>
            <Button className="bg-[#5D3E7C] text-white hover:bg-[#FF65A3] px-8">
              <a
                href="https://github.com/Shivaji-137"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="ri-github-line mr-2"></i> View All Projects
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;

