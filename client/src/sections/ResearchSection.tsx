import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fadeIn, staggerContainer } from '@/lib/animations';
import { Separator } from "@/components/ui/separator";

const researchProjects = [
  {
    title: "A Comparative Data Analysis Of Gravitational Wave Signals From Binary Stars Coalescence Of GW170817, GW190521, and GW190814",
    description: "The study seeks to examine gravitational wave signals collected by observatories such as LIGO and Virgo using modern computer techniques, including Fourier transforms and numerical simulations.",
    status: "Completed",
    year: "2024",
    area: "Astronomy",
    supervisor: "Dr. Shreeram Nagarkoti"
  }
  // {
  //   title: "Statistical Analysis of CMB Anisotropies",
  //   description: "Statistical methods for analyzing temperature fluctuations in the cosmic microwave background radiation.",
  //   status: "Completed",
  //   year: "2023",
  //   area: "Cosmology & Statistical Physics",
  //   supervisor: "Dr. Michael Chen"
  // },
  // {
  //   title: "Quantum Information in Black Hole Physics",
  //   description: "Investigating the relationships between quantum information theory and black hole thermodynamics.",
  //   status: "In Progress",
  //   year: "2023-Present",
  //   area: "Quantum Physics & General Relativity",
  //   supervisor: "Prof. Elizabeth Taylor"
  // }
];

const publications = [
  {
    title: "",
    authors: "",
    journal: "",
    year: "",
    link: ""
  },
  {
    title: "",
    authors: "",
    journal: "",
    year: "",
    link: ""
  }
];

const ResearchSection = () => {
  return (
    <section id="research" className="py-20 relative z-10">
      <div className="container mx-auto px-4">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="space-y-16"
        >
          <motion.div 
            variants={fadeIn('up')}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Research
            </h2>
            <p className="text-lg text-gray-300">
              My physics research focuses on gravitational waves, cosmology, and the intersection of quantum theory with general relativity.
            </p>
          </motion.div>
          
          {/* Research Projects */}
          <motion.div variants={fadeIn('up')}>
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-white">
              Current & Past Research Projects
            </h3>
            
            <div className="space-y-8">
              {researchProjects.map((project, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn('up', index * 0.1)}
                >
                  <Card className="bg-[#141B34] border-[#5D3E7C] border hover:border-[#FF65A3] transition-colors">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl md:text-2xl text-white">
                          {project.title}
                        </CardTitle>
                        <Badge className={`${
                          project.status === 'Completed' 
                            ? 'bg-green-700 hover:bg-green-600' 
                            : 'bg-[#5D3E7C] hover:bg-[#7B52A4]'
                        } text-white`}>
                          {project.status}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-2 text-sm text-gray-400">
                        <span>{project.year}</span>
                        <span>•</span>
                        <span>{project.area}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-300 text-base mb-4">
                        {project.description}
                      </CardDescription>
                      <p className="text-sm text-gray-400">
                        <span className="font-semibold">Supervisor:</span> {project.supervisor}
                         
                      </p>
                      <Button variant="link" className="text-[#FF65A3] p-0 h-auto">
                        <a href = "/personal_website/research_file/finalfourthyearproject_shivaji.pdf">Read paper <i className="ri-external-link-line ml-1"></i></a>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <Separator className="bg-[#5D3E7C]" />
          
          {/* Publications */}
          {/* <motion.div variants={fadeIn('up')}>
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-white">
              Publications
            </h3>
            
            <div className="space-y-6">
              {publications.map((pub, index) => (
                <motion.div
                  key={index}
                  variants={fadeIn('up', index * 0.1)}
                  className="bg-[#080a0a] border-[#5D3E7C] border rounded-lg p-6 hover:border-[#FF65A3] transition-colors"
                >
                  <h4 className="text-xl font-semibold text-white mb-2">
                    {pub.title}
                  </h4>
                  <p className="text-gray-300 mb-1">{pub.authors}</p>
                  <p className="text-gray-400 mb-4">
                    <span>{pub.journal}</span>
                    <span> </span>
                    <span>{pub.year}</span>
                  </p>
                  <Button variant="link" className="text-[#FF65A3] p-0 h-auto">
                    {/* Read paper  */}
                    {/* <i className="ri-external-link-line ml-1"></i> */}
                  {/* </Button>
                </motion.div>
              ))}
            </div>
          </motion.div> */} 
          
          <motion.div 
            variants={fadeIn('up')}
            className="text-center"
          >
            <p className="text-gray-300 mb-6">
              Interested in collaborating on physics research? Feel free to reach out!
            </p>
            <Button className="bg-[#5D3E7C] text-white hover:bg-[#FF65A3] px-8">
              Contact Me
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResearchSection;