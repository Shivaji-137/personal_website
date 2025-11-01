import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
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
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  // close modal on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

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
                    // clicking the card opens a focused large view modal
                    onClick={(e) => {
                      // don't open modal when clicking links or buttons inside the card
                      const target = e.target as HTMLElement;
                      if (target.closest('a, button')) return;
                      setSelectedProject(index);
                    }}
                    className="cursor-pointer"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedProject(index);
                      }
                    }}
                  >
                    <Card className="bg-[#080a0a] border-[#d4db9c] border transition-all duration-300 overflow-hidden">
                      <CardHeader className="pb-1 pt-4">
                        <CardTitle className="text-xl md:text-2xl text-white">
                          {project.title}
                          {project.certificate && project.certificate.length > 0 && (
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

            {/* Large modal view for a selected project */}
            {selectedProject !== null && (
              (() => {
                const project = filteredProjects[selectedProject];
                if (!project) return null;
                return (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                    <div
                      className="fixed inset-0 bg-black/70"
                      onClick={() => setSelectedProject(null)}
                      aria-hidden="true"
                    ></div>

                    <div className="relative z-60 max-w-4xl w-full bg-[#080a0a] border border-[#d4db9c] rounded-lg p-6 overflow-auto max-h-[90vh]">
                      <button
                        onClick={() => setSelectedProject(null)}
                        className="absolute top-3 right-3 text-gray-300 hover:text-white bg-transparent p-2 rounded"
                        aria-label="Close project details"
                      >
                        <i className="ri-close-line text-2xl"></i>
                      </button>

                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{project.title}</h3>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, i) => (
                          <Badge
                            key={i}
                            variant="secondary"
                            className="bg-[#5D3E7C] text-white"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <p className="text-gray-300 mb-4">{project.description}</p>

                      {project.achievements && project.achievements.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-white mb-3">Achievements</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {project.achievements.map((ach, i) => (
                              <div
                                key={i}
                                className="p-4 bg-gradient-to-r from-[#0b1220] to-[#081018] border border-[#2b2b3a] rounded-lg shadow-sm"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="text-lg font-semibold text-[#FF65A3]">{ach.title}</div>
                                  <div className="text-sm text-gray-400">&nbsp;</div>
                                </div>
                                <ul className="mt-2 text-gray-300 list-none pl-0">
                                  {ach.details.map((d, j) => (
                                    <li key={j} className="text-sm text-gray-200/90">{d}</li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {project.information && project.information.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-white mb-2">Resources</h4>
                          <ul className="list-disc pl-5 space-y-2 text-gray-300">
                            {project.information.map((content, i) => (
                              <li key={i}>
                                <a
                                  href={Object.entries(content)[0][1]}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-white hover:underline"
                                >
                                  {Object.entries(content)[0][0]}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="flex gap-3 mt-4">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 border border-[#5D3E7C] text-[#FF65A3] hover:bg-[#5D3E7C] hover:text-white rounded"
                          >
                            <i className="ri-github-line mr-2"></i> View Code
                          </a>
                        )}

                        {project.certificate && (
                          <a
                            href={project.certificate}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 bg-[#5D3E7C] text-white hover:bg-[#FF65A3] rounded"
                          >
                            <i className="ri-external-link-line mr-2"></i> Certificate
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })()
            )}
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

