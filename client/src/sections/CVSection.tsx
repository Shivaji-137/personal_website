import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fadeIn, staggerContainer } from '@/lib/animations';
import { useState } from 'react';
import { education } from "@/data/education";
import { skills } from "@/data/skills";
import { certifications } from "@/data/certification";
import { school } from "@/data/school";
import { workshop } from "@/data/workshop";
import { courses } from "@/data/online_courses";
import { experiences } from "@/data/experience";


// Import the CV PDF - we need to set this up properly in the project
// import cvPdf from "@assets/shivajiCV.pdf";


const CVSection = () => {
  const [expanded, setExpanded] = useState(false);
  return (
    <section id="cv" className="py-20 relative z-10">
      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="space-y-12"
        >
          <motion.div 
            variants={fadeIn('up')}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Curriculum Vitae
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              My academic and professional journey in physics and computation
            </p>
            <div className="flex justify-center">
              <a href="/personal_website/shivajiCV.pdf" download>
                <Button className="bg-[#5D3E7C] text-white hover:bg-[#FF65A3] px-8 mr-4">
                  <i className="ri-download-line mr-2"></i> Download CV
                </Button>
              </a>
            </div>
          </motion.div>
          
          <Tabs defaultValue="education" className="w-full">
            <TabsList className="bg-[#141B34] border border-[#5D3E7C] p-1 w-full flex justify-center mb-8 overflow-x-auto">
              <TabsTrigger value="education" className="data-[state=active]:bg-[#5D3E7C] data-[state=active]:text-white px-4">
                Education
              </TabsTrigger>
              <TabsTrigger value="experience" className="data-[state=active]:bg-[#5D3E7C] data-[state=active]:text-white px-4">
                Experience
              </TabsTrigger>
              <TabsTrigger value="skills" className="data-[state=active]:bg-[#5D3E7C] data-[state=active]:text-white px-4">
                Skills
              </TabsTrigger>
              <TabsTrigger value="certifications" className="data-[state=active]:bg-[#5D3E7C] data-[state=active]:text-white px-4">
                Certifications
              </TabsTrigger>
              <TabsTrigger value="courses" className="data-[state=active]:bg-[#5D3E7C] data-[state=active]:text-white px-4">
                Online Courses
              </TabsTrigger>
              <TabsTrigger value="workshop" className="data-[state=active]:bg-[#5D3E7C] data-[state=active]:text-white px-4">
                Workshops
              </TabsTrigger>
              <TabsTrigger value="summerschool" className="data-[state=active]:bg-[#5D3E7C] data-[state=active]:text-white px-4">
                School
              </TabsTrigger>
            </TabsList>
            
            {/* Education */}
            <TabsContent value="education" className="mt-0">
              <motion.div 
                variants={fadeIn('up')}
                className="relative flex flex-col items-center"
              >
                {/* Vertical line */}
                <div className="absolute w-1 bg-[#d4db9c] h-full left-1/2 transform -translate-x-1/2 z-0"></div>

                {education.map((exp, index) => {
                  const isRight = index % 2 === 0;
                  const [expanded, setExpanded] = useState(false); // ← local to each item doesn't persist across renders

                  return (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: isRight ? 100 : -100 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                      className={`relative w-full md:w-1/2 px-4 py-6 z-10 ${isRight ? 'self-start md:pl-10' : 'self-end md:pr-10'}`}
                    >
                      {/* Physics-style dot badge */}
                      <div
                        className={`absolute top-16 w-3.5 h-3.5 rounded-full bg-[#d4db9c] border-2 border-[#d4db9c] z-12
                          ${isRight ? 'right-[-7px]' : 'left-[-7px]'}
                          shadow-[0_0_1px_#d4db9c,0_0_1px_#d4db9c]`}
                      ></div>
                      <div className="bg-[#080a0a] border-[#d4db9c] border p-2 md:p-6 rounded-xl shadow-md hover:scale-[1.02] transition-all duration-300 hover:border-[#d4db9c] hover:shadow-[0_0_5px_#d4db9c]">
                        <h3 className="text-lg font-bold text-white mb-1">{exp.degree}</h3>
                        <p className="text-xs text-gray-300">{exp.institution}</p>
                        <p className="text-xs text-gray-400">{exp.location}</p>
                        <p className="text-xs text-[#FF65A3] mt-1 font-medium">{exp.year}</p>

                        {/* Toggle button */}
                        {exp.details && exp.details.length > 0 && (
                          <>
                            <button
                              onClick={() => setExpanded(!expanded)}
                              className="text-[#d4db9c] hover:text-white text-sm mt-3 focus:outline-none transition-colors"
                            >
                              {expanded ? 'Hide details ▲' : 'Show details ▼'}
                            </button>

                            {expanded && (
                              <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-300 text-sm transition-all duration-300 ease-in-out">
                                {exp.details.map((content, i) => (
                                  <li key={i}>{content}</li>
                                ))}
                              </ul>
                            )}
                          </>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </TabsContent>
            
            
            {/* Experience */}
            <TabsContent value="experience" className="mt-0">
              <motion.div 
                variants={fadeIn('up')}
                className="relative flex flex-col items-center"
              >
                {/* Vertical line */}
                <div className="absolute w-1 bg-[#d4db9c] h-full left-1/2 transform -translate-x-1/2 z-0"></div>

                {experiences.map((exp, index) => {
                  const isRight = index % 2 === 0;
                  const [expanded, setExpanded] = useState(false); // ← local to each item doesn't persist across renders

                  return (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: isRight ? 100 : -100 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                      className={`relative w-full md:w-1/2 px-4 py-6 z-10 ${isRight ? 'self-start md:pl-10' : 'self-end md:pr-10'}`}
                    >
                      {/* Physics-style dot badge */}
                      <div
                        className={`absolute top-16 w-3.5 h-3.5 rounded-full bg-[#d4db9c] border-2 border-[#d4db9c] z-12
                          ${isRight ? 'right-[-7px]' : 'left-[-7px]'}
                          shadow-[0_0_1px_#d4db9c,0_0_1px_#d4db9c]`}
                      ></div>
                      <div className="bg-[#080a0a] border-[#d4db9c] border p-2 md:p-6 rounded-xl shadow-md hover:scale-[1.02] transition-all duration-300 hover:border-[#d4db9c] hover:shadow-[0_0_5px_#d4db9c]">
                        <h3 className="text-lg font-bold text-white mb-1">{exp.title}</h3>
                        <p className="text-xs text-gray-300">{exp.organization}</p>
                        <p className="text-xs text-gray-400">{exp.location}</p>
                        <p className="text-xs text-[#FF65A3] mt-1 font-medium">{exp.period}</p>
                        {exp.certificate && (
                        <p><a
                              href={exp.certificate}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#38979c] hover:text-[#5D3E7C] text-xs mt-2 inline-flex items-center"
                            >
                              <i className="ri-award-line mr-1"></i> Show certificate
                        </a></p>
                        )}

                        {/* Toggle button */}
                        {exp.responsibilities && exp.responsibilities.length > 0 && (
                          <>
                            <button
                              onClick={() => setExpanded(!expanded)}
                              className="text-[#d4db9c] hover:text-white text-xs mt-3 focus:outline-none transition-colors"
                            >
                              {expanded ? 'Hide Responsibilities ▲' : 'Show Responsibilities ▼'}
                            </button>

                            {expanded && (
                              <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-300 text-sm transition-all duration-300 ease-in-out">
                                {exp.responsibilities.map((responsibility, i) => (
                                  <li key={i}>{responsibility}</li>
                                ))}
                              </ul>
                            )}
                          </>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </TabsContent>

            
            {/* Skills */}
            <TabsContent value="skills" className="mt-0">
              <motion.div 
                variants={fadeIn('up')}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                <Card className="bg-[#080a0a] border-[#d4db9c] border p-6 transition-all duration-300 transform hover:scale-[1.02] hover:border-[#d4db9c] hover:shadow-[0_0_5px_#d4db9c]">
                  <h3 className="text-xl font-bold text-white mb-4">Programming Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.programming.map((skill, i) => (
                      <span key={i} className="bg-[#5D3E7C] text-white px-3 py-1 rounded-md text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </Card>
                
                <Card className="bg-[#080a0a] border-[#d4db9c] border p-6 transition-all duration-300 transform hover:scale-[1.02] hover:border-[#d4db9c] hover:shadow-[0_0_5px_#d4db9c]">
                  <h3 className="text-xl font-bold text-white mb-4">Physics Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.physics.map((skill, i) => (
                      <span key={i} className="bg-[#5D3E7C] text-white px-3 py-1 rounded-md text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </Card>
                
                <Card className="bg-[#080a0a] border-[#d4db9c] border p-6 transition-all duration-300 transform hover:scale-[1.02] hover:border-[#d4db9c] hover:shadow-[0_0_5px_#d4db9c]">
                  <h3 className="text-xl font-bold text-white mb-4">Software & Tools</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.software.map((skill, i) => (
                      <span key={i} className="bg-[#5D3E7C] text-white px-3 py-1 rounded-md text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </Card>
                
                <Card className="bg-[#080a0a] border-[#d4db9c] border p-6 transition-all duration-300 transform hover:scale-[1.02] hover:border-[#d4db9c] hover:shadow-[0_0_5px_#d4db9c]">
                  <h3 className="text-xl font-bold text-white mb-4">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.languages.map((skill, i) => (
                      <span key={i} className="bg-[#5D3E7C] text-white px-3 py-1 rounded-md text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </TabsContent>
            
            {/* Certifications */}
            <TabsContent value="certifications" className="mt-0">
              <motion.div 
                variants={fadeIn('up')}
                className="relative flex flex-col items-center"
              >
                {/* Vertical line */}
                <div className="absolute w-1 bg-[#d4db9c] h-full left-1/2 transform -translate-x-1/2 z-0"></div>

                {certifications.map((cert, index) => {
                  const isRight = index % 2 === 0;
                  return (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: isRight ? 100 : -100 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                      className={`relative w-full md:w-1/2 px-4 py-6 z-10 ${isRight ? 'self-start md:pl-10' : 'self-end md:pr-10'}`}
                    >
                      {/* Physics-style dot badge */}
                      <div
                        className={`absolute top-16 w-3.5 h-3.5 rounded-full bg-[#d4db9c] border-2 border-[#d4db9c] z-12
                          ${isRight ? 'right-[-7px]' : 'left-[-7px]'}
                          shadow-[0_0_1px_#d4db9c,0_0_1px_#d4db9c]`}
                      ></div>

                      <div className="bg-[#080a0a] border-[#d4db9c] border p-4 md:p-6 rounded-xl shadow-md hover:scale-[1.02] transition-all duration-300 hover:border-[#FF65A3] hover:shadow-[0_0_5px_#FF65A3]">
                        <h3 className="text-lg font-semibold text-white mb-1">{cert.title}</h3>
                        <p className="text-gray-300 text-sm">{cert.issuer}</p>
                        <p className="text-gray-400 text-xs mt-1">{cert.date}</p>
                        {cert.certificate && (
                          <a
                            href={cert.certificate}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#FF65A3] hover:text-[#5D3E7C] text-sm mt-2 inline-flex items-center"
                          >
                            <i className="ri-award-line mr-1"></i> Show Certificate
                          </a>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </TabsContent>

            {/*Courses */}
            <TabsContent value="courses" className="mt-0">
                <motion.div 
                  variants={fadeIn('up')}
                  className="relative flex flex-col items-center"
                >
                  {/* Vertical line */}
                  <div className="absolute w-1 bg-[#d4db9c] h-full left-1/2 transform -translate-x-1/2 z-0"></div>
                  

                  {courses.map((course, index) => {
                    const isRight = index % 2 === 0;
                    return (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: isRight ? 100 : -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className={`relative w-full md:w-1/2 px-4 py-6 z-10 ${isRight ? 'self-start md:pl-10' : 'self-end md:pr-10'}`}
                      >
                        {/* Physics-style dot badge */}
                        <div
                          className={`absolute top-16 w-3.5 h-3.5 rounded-full bg-[#d4db9c] border-2 border-[#d4db9c] z-12
                            ${isRight ? 'right-[-7px]' : 'left-[-7px]'}
                            shadow-[0_0_1px_#d4db9c,0_0_1px_#d4db9c]`}
                        ></div>

                        <div className="bg-[#080a0a] border-[#d4db9c] border p-4 md:p-6 rounded-xl shadow-md hover:scale-[1.02] transition-all duration-300 hover:border-[#d4db9c] hover:shadow-[0_0_5px_#d4db9c]">
                          <h3 className="text-lg font-semibold text-white mb-1">{course.title}</h3>
                          <p className="text-gray-300 text-sm">{course.source}</p>
                          <p className="text-gray-400 text-xs mt-1">{course.date}</p>
                          {course.note && (
                            <p className="text-gray-300 text-sm mt-2">{course.note}</p>
                          )}
                          {course.certificate && (
                            <a
                              href={course.certificate}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#FF65A3] hover:text-[#5D3E7C] text-sm mt-2 inline-flex items-center"
                            >
                              <i className="ri-award-line mr-1"></i> Show Certificate
                            </a>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </TabsContent>


            {/* Workshop */}
            <TabsContent value="workshop" className="mt-0">
                <motion.div 
                  variants={fadeIn('up')}
                  className="relative flex flex-col items-center"
                >
                  {/* Vertical line */}
                  <div className="absolute w-1 bg-[#d4db9c] h-full left-1/2 transform -translate-x-1/2 z-0"></div>

                  {workshop.map((item, index) => {
                    const isRight = index % 2 === 0;
                    return (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: isRight ? 100 : -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className={`relative w-full md:w-1/2 px-4 py-6 z-10 ${isRight ? 'self-start md:pl-10' : 'self-end md:pr-10'}`}
                      >
                        {/* Physics-style dot badge */}
                      <div
                        className={`absolute top-16 w-3.5 h-3.5 rounded-full bg-[#d4db9c] border-2 border-[#d4db9c] z-12
                          ${isRight ? 'right-[-7px]' : 'left-[-7px]'}
                          shadow-[0_0_1px_#d4db9c,0_0_1px_#d4db9c]`}
                      ></div>

                        <div className="bg-[#080a0a] border-[#d4db9c] border p-4 md:p-6 rounded-xl shadow-md hover:scale-[1.02] transition-all duration-300 hover:border-[#d4db9c] hover:shadow-[0_0_5px_#d4db9c]">
                          <h3 className="text-lg font-semibold text-white mb-1">{item.title}</h3>
                          <p className="text-gray-300 text-sm">{item.organization}</p>
                          <p className="text-gray-400 text-xs mt-1">{item.date}</p>
                          
                          {item.certificate && (
                            <a
                              href={item.certificate}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#FF65A3] hover:text-[#5D3E7C] text-sm mt-2 inline-flex items-center"
                            >
                              <i className="ri-award-line mr-1"></i> Show Certificate
                            </a>
                          )}
                          
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </TabsContent>



            {/* school */}
            <TabsContent value="summerschool" className="mt-0">
              <motion.div 
                variants={fadeIn('up')}
                className="relative flex flex-col items-center"
              >
                {/* Vertical line */}
                <div className="absolute w-1 bg-[#d4db9c] h-full left-1/2 transform -translate-x-1/2 z-0"></div>

                {school.map((exp, index) => {
                  const isRight = index % 2 === 0;
                  const [expanded, setExpanded] = useState(false); // ← local to each item doesn't persist across renders

                  return (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: isRight ? 100 : -100 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                      className={`relative w-full md:w-1/2 px-4 py-6 z-10 ${isRight ? 'self-start md:pl-10' : 'self-end md:pr-10'}`}
                    >
                      {/* Physics-style dot badge */}
                      <div
                        className={`absolute top-16 w-3.5 h-3.5 rounded-full bg-[#d4db9c] border-2 border-[#d4db9c] z-12
                          ${isRight ? 'right-[-7px]' : 'left-[-7px]'}
                          shadow-[0_0_1px_#d4db9c,0_0_1px_#d4db9c]`}
                      ></div>
                      <div className="bg-[#080a0a] border-[#d4db9c] border p-2 md:p-6 rounded-xl shadow-md hover:scale-[1.02] transition-all duration-300 hover:border-[#d4db9c] hover:shadow-[0_0_5px_#d4db9c]">
                        <h3 className="text-lg font-bold text-white mb-1">{exp.title}</h3>
                        <p className="text-xs text-gray-300">{exp.organization}</p>
                        <p className="text-xs text-gray-400">{exp.location}</p>
                        <p className="text-xs text-[#FF65A3] mt-1 font-medium">{exp.date}</p>

                        <p><a
                              href={exp.verify}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#38979c] hover:text-[#5D3E7C] text-xs mt-2 inline-flex items-center"
                            >
                              <i className="ri-award-line mr-1"></i> Verify my participant
                        </a></p>
                           
                          

                        {/* Toggle button */}
                        {exp.content && exp.content.length > 0 && (
                          <>
                            <button
                              onClick={() => setExpanded(!expanded)}
                              className="text-[#d4db9c] hover:text-white text-sm mt-3 focus:outline-none transition-colors"
                            >
                              {expanded ? 'Hide school coures ▲' : 'Show school courses ▼'}
                            </button>

                            {expanded && (
                              <ul className="list-disc pl-5 mt-4 space-y-2 text-gray-300 text-sm transition-all duration-300 ease-in-out">
                                {exp.content.map((content, i) => (
                                  <li key={i}>{content}</li>
                                ))}
                              </ul>
                            )}
                          </>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </TabsContent>


          </Tabs>

          <motion.div 
            variants={fadeIn('up')}
            className="text-center mt-12"
          >
            <p className="text-gray-300 mb-6">
              Want to discuss potential collaborations or have questions about my experience?
            </p>
            <Button variant="link" className="bg-[#5D3E7C] text-white hover:bg-[#FF65A3] px-8">
              <a href='\contact'>Contact Me</a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CVSection;
