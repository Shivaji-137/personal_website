import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fadeIn, staggerContainer } from '@/lib/animations';
import { Separator } from "@/components/ui/separator";

const researchProjects = [
  {
    title: "A Comparative Data Analysis Of Gravitational Wave Signals From Binary Stars Coalescence Of GW170817, GW190521, and GW190814",
    description:
      "The study done for undergraduate thesis seeks to examine gravitational wave signals collected by observatories such as LIGO and Virgo using modern computer techniques, including Fourier transforms and numerical simulations.",
    status: "Completed",
    year: "2024",
    area: "Astronomy",
    supervisor: "Dr. Shreeram Nagarkoti"
  }
];

const publications = [
  {
    title: "Comparative Study of Soft and Hard Boundary Constraints in Physics-Informed Neural Networks",
    authors: [
      "Anish Dhamala*, Sarthak Bhattarai, Basanta Gurung, Chhuldim Hyolmo, Mahesh Kumar Neupane, Rupak Raj Lamichhane, ",
      <span key="shivaji" className="font-semibold text-white">Shivaji Chaulagain</span>,
      ", and Bijay Sijapati Magar"
    ],
    journal: "Heliyon (Elsevier)",
    year: "September 2025",
    status: "Submitted",
    description:
      "This paper introduces a comparative framework for solving the Schrödinger equation using Physics-Informed Neural Networks (PINNs) with both soft and hard boundary constraints. It investigates the role of embedded physical and mathematical constraints in unsupervised neural network training, assessing performance across harmonic oscillator, Coulomb, and screened Coulomb potentials. The results demonstrate that while soft-constrained models effectively capture excited states, hard-constrained models converge faster when guided by physically informed ansatz structures. Adaptive learning rate scheduling further enhances both computational efficiency and predictive accuracy.",
    contribution:
      "I contributed to the model design, numerical benchmarking, adaptive learning rate integration, and assisted in manuscript writing and result validation.",
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
          {/* Header */}
          <motion.div variants={fadeIn('up')} className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Research
            </h2>
            <p className="text-lg text-gray-300">
              My research focuses on quantum mechanics, cosmology, and the integration of machine learning & deep learning into physics modeling and analysis.
            </p>
          </motion.div>

          {/* Research Projects */}
          <motion.div variants={fadeIn('up')}>
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-white">
              Current & Past Research Projects
            </h3>

            <div className="space-y-8">
              {researchProjects.map((project, index) => (
                <motion.div key={index} variants={fadeIn('up', index * 0.1)}>
                  <Card className="bg-[#141B34] border-[#5D3E7C] border hover:border-[#FF65A3] transition-colors">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl md:text-2xl text-white">
                          {project.title}
                        </CardTitle>
                        <Badge
                          className={`${
                            project.status === 'Completed'
                              ? 'bg-green-700 hover:bg-green-600'
                              : 'bg-[#5D3E7C] hover:bg-[#7B52A4]'
                          } text-white`}
                        >
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
                        <a href="/research_file/finalfourthyearproject_shivaji.pdf">
                          Read paper <i className="ri-external-link-line ml-1"></i>
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <Separator className="bg-[#5D3E7C]" />

          {/* Publications */}
          <motion.div variants={fadeIn('up')}>
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-white">
              Publications
            </h3>

            <div className="space-y-8">
              {publications.map((pub, index) => (
                <motion.div key={index} variants={fadeIn('up', index * 0.1)}>
                  <Card className="bg-[#141B34] border-[#5D3E7C] border hover:border-[#FF65A3] transition-colors">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl md:text-2xl text-white">
                          {pub.title}
                        </CardTitle>
                        <Badge className="bg-blue-700 hover:bg-blue-600 text-white">
                          {pub.status}
                        </Badge>
                      </div>

                      {/* Authors under title */}
                      <p className="text-gray-300 text-sm mt-2">{pub.authors}</p>

                      {/* Journal and year */}
                      <div className="flex flex-wrap gap-2 text-sm text-gray-400 mt-2">
                        <span>{pub.journal}</span>
                        <span>•</span>
                        <span>{pub.year}</span>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <CardDescription className="text-gray-300 text-base mb-4 leading-relaxed">
                        {pub.description}
                      </CardDescription>
                      <p className="text-sm text-gray-400 mb-3">
                        <span className="font-semibold">Contribution:</span> {pub.contribution}
                      </p>
                      {pub.link && (
                        <Button variant="link" className="text-[#FF65A3] p-0 h-auto">
                          <a href={pub.link} target="_blank" rel="noopener noreferrer">
                            View Paper <i className="ri-external-link-line ml-1"></i>
                          </a>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div variants={fadeIn('up')} className="text-center">
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
