import { useInView } from '@/hooks/use-intersection-observer';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import profileImage from '../assets/photo_2025-04-21_21-23-59.jpg';

const AboutSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="about" ref={sectionRef} className="py-20 relative section-transition">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-space font-bold text-3xl md:text-4xl text-white mb-4">About Me</h2>
          <div className="w-20 h-1 bg-[#FF65A3] mx-auto"></div>
        </motion.div>
        
        <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl mx-auto">
          <motion.div 
            className="w-full md:w-1/3"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <div className="w-full h-100 bg-[#1E2A45] rounded-lg overflow-hidden relative">
                <img 
                  src={profileImage} 
                  alt="Shivaji Chaulagain" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1026] to-transparent opacity-60"></div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#5D3E7C] rounded-md transform rotate-6 -z-10"></div>
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-[#FF65A3] rounded-md transform -rotate-12 -z-10"></div>
            </div>
          </motion.div>
          
          <motion.div 
            className="w-full md:w-2/3"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h3 
              className="font-space font-semibold text-2xl md:text-3xl mb-6 text-[#FFD15C]"
              variants={itemVariants}
            >
              Exploring the Physics of the Universe
            </motion.h3>
            <motion.p 
              className="text-lg mb-6 text-gray-300"
              variants={itemVariants}
            >
              I'm an undergraduate physics student passionate about gravitational wave analysis and data visualization. With a growing background in physics and programming, I enjoy exploring the intersection of scientific analysis and computational methods.
            </motion.p>
            <motion.p 
              className="text-lg mb-4 text-gray-300"
              variants={itemVariants}
            >
              My undergraduate thesis focuses on gravitational wave signals from binary star coalescences, while my development work aims to create accessible tools that help visualize and understand complex astronomical data. I believe that making physics concepts accessible through visualization is key to inspiring more students to pursue scientific research.
            </motion.p>

            <motion.div 
              className="mb-6"
              variants={itemVariants}
            >
              <h4 className="font-space font-medium text-xl text-[#FFD15C] mb-3">Education</h4>
              <div className="bg-[#1E2A45] bg-opacity-40 p-4 rounded-lg mb-4">
                <h5 className="font-space font-medium text-white">Undergraduate in Physics</h5>
                <p className="text-gray-300">St. Xavier's College, Tribhuvan University, Nepal | 2019-2024</p>
              </div>
            </motion.div>

            <motion.div 
              className="mb-6"
              variants={itemVariants}
            >
              <h4 className="font-space font-medium text-xl text-[#FFD15C] mb-3">Programming Skills</h4>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-[#1E2A45] text-gray-300 px-3 py-1 rounded-md">Python</span>
                <span className="bg-[#1E2A45] text-gray-300 px-3 py-1 rounded-md">MATLAB</span>
                <span className="bg-[#1E2A45] text-gray-300 px-3 py-1 rounded-md">JavaScript</span>
                <span className="bg-[#1E2A45] text-gray-300 px-3 py-1 rounded-md">C++</span>
                <span className="bg-[#1E2A45] text-gray-300 px-3 py-1 rounded-md">HTML/CSS</span>
                <span className="bg-[#1E2A45] text-gray-300 px-3 py-1 rounded-md">LaTeX</span>
                <span className="bg-[#1E2A45] text-gray-300 px-3 py-1 rounded-md">SQL</span>
              </div>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
              variants={itemVariants}
            >
              <div className="bg-[#1E2A45] bg-opacity-50 p-4 rounded-lg text-center">
                <i className="ri-planet-line text-3xl text-[#FFD15C] mb-2"></i>
                <h4 className="font-space font-medium">Physics</h4>
              </div>
              <div className="bg-[#1E2A45] bg-opacity-50 p-4 rounded-lg text-center">
                <i className="ri-code-s-slash-line text-3xl text-[#FF65A3] mb-2"></i>
                <h4 className="font-space font-medium">Programming</h4>
              </div>
              <div className="bg-[#1E2A45] bg-opacity-50 p-4 rounded-lg text-center">
                <i className="ri-bar-chart-line text-3xl text-[#5D3E7C] mb-2"></i>
                <h4 className="font-space font-medium">Data Analysis</h4>
              </div>
              <div className="bg-[#1E2A45] bg-opacity-50 p-4 rounded-lg text-center">
                <i className="ri-presentation-line text-3xl text-[#FFD15C] mb-2"></i>
                <h4 className="font-space font-medium">Teaching</h4>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              variants={itemVariants}
            >
              <button
                onClick={() => navigate('/projects')}
                className="bg-[#5D3E7C] hover:bg-[#FF65A3] text-white font-medium px-6 py-2 rounded-md transition-colors font-space inline-flex items-center"
              >
                <i className="ri-article-line mr-2"></i> View Projects
              </button>
              <button
                onClick={() => navigate('/cv')}
                className="border border-[#FF65A3] text-[#FF65A3] hover:bg-[#FF65A3] hover:text-white font-medium px-6 py-2 rounded-md transition-colors font-space inline-flex items-center"
              >
                <i className="ri-file-text-line mr-2"></i> View CV
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
