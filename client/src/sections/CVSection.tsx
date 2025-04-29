import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fadeIn, staggerContainer } from '@/lib/animations';
import { Separator } from "@/components/ui/separator";
import { useNavigate } from 'react-router-dom';

// Import the CV PDF - we need to set this up properly in the project
// import cvPdf from "@assets/shivajiCV.pdf";
const navigate = useNavigate();
const education = [
  {
    degree: "Undergraduate in Physics",
    institution: "St. Xavier's College (Tribhuvan University)",
    location: "Kathmandu, Nepal",
    year: "2019 - 2024",
    details: [
      "Percentage: 74.5",
      "Key Coursework:",
      "Key coursework: Research Methodology, Quantum Mechanics, Classical Mechanics, Electricity and Magnetism, Electronics, Nuclear Physics and Solid State Physics, Statistical Physics, Computational Physics, Mathematical Physics, Thermodynamics, Optics, Econophysics, Space Science, Applied Statistics, Probaility & Inference",
    ]
  }
];

const skills = {
  programming: ["Python", "R", "C", "JavaScript", "HTML/CSS", "LaTeX", "SQL"],
  physics: ["Gravitational Wave Analysis", "Quantum Mechanics", "Computational Physics", "Data Analysis", "Teaching with clear concept and practical examples with interactivity through coding and visualization"],
  software: ["NumPy", "Astropy", "Pandas", "Matplotlib", "TensorFlow", "Microsoft Powerpoint", "Git", "Linux"],
  languages: ["English", "Nepali (Native)"]
};

const experiences = [
  {
    title: "2024 Aspire Leaders Program",
    organization: "Aspire Institute Inc.",
    location: "Online (Participant)",
    period: "May - August 2024 (9 weeks)",
    responsibilities: [
      "Emerged with increased self confidence, sharpened crticial thinking skills, refined communication skills, and a desire to create a social impact among a global community "
    ]
  },
  {
    title: "The President",
    organization: "The Renaissance Library (Public Library)",
    location: "Bhiman, Sindhuli",
    period: "2022 - 2024",
    responsibilities: [
      "Established Mini library in three public places (Bhiman Hospital, Bhiman Police Area and Ward Municpality office) as 1 year plan but was extended later for another year.",
      "Conducted a cybersecurity awareness program in presence of field expertise as an event speaker, and class 9, 10 students of all school in Bhiman area as a target audience."    ]
  },
  {
    title: "Teacher",
    organization: "Scholar's Academy School",
    location: "Bhiman, Sindhuli",
    period: "2019-2020",
    responsibilities: [
      "Taught math and science to lower secondary and secondary level students."   
    ]
  },
  {
    title: "Tutor",
    organization: "Space Academy",
    location: "Narephant, Kathmandu, Nepal",
    period: "2024-2025",
    responsibilities: [
      "Taught BE (Engineering) Physics I, Math I",
      "Taught class 10 Science and Math",
      "Taught plus 2 Physics and Math."   
    ]
  }
];

const certifications = [
  {
    title: "Introduction to Quantum Computing",
    issuer: "St. Xavier's Physics Council (SXPC-Nepal)",
    date: "13-18 April 2023"
  }
];

const summerschool_gw = ["The astrophysics of neutron stars and binaries", 
  "Ultralight boson clouds around black holes", "Rapidly spinning neutron stars and emission mechanisms",
  "Searches for continuous GWs: Methods and results"
 ]

const ai_winterschool = [" Introductory Module",
  "Development and Deployment of Graph Neural Networks in Particle Physics",
  "Physics-Inspired Operator Learning for Inverse Scattering with Application to Ground Penetrating Radar",
  "Unsupervised Learning to Find Interacting and Starburst Galaxies",
  "Overview of Large Language Models (LLMs) and RAG",
  "Auto-Encoders for Data Compression in Dark Matter Direct Detection Experiments",
  "Generative AI, Agents, and Industry Applications"
]

const CVSection = () => {
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
              <Button className="bg-[#5D3E7C] text-white hover:bg-[#FF65A3] px-8 mr-4">
                <i className="ri-download-line mr-2"></i> Download CV
              </Button>
              {/* <a href={cvPdf} target="_blank" rel="noopener noreferrer" className="inline-block">
                <Button className="bg-transparent border border-[#5D3E7C] text-white hover:bg-[#5D3E7C]">
                  <i className="ri-eye-line mr-2"></i> View Full CV
                </Button>
              </a> */}
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
                className="space-y-8"
              >
                {education.map((edu, index) => (
                  <Card key={index} className="bg-[#080a0a] border-[#5D3E7C] border p-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                        <p className="text-lg text-gray-300">{edu.institution}</p>
                        <p className="text-gray-400">{edu.location}</p>
                      </div>
                      <p className="text-[#FF65A3] font-semibold mt-2 md:mt-0">{edu.year}</p>
                    </div>
                    
                    <ul className="list-none pl-0 space-y-2 text-gray-300">
                      {edu.details.map((detail, i) => (
                        detail.startsWith('Key coursework') ? (                          
                          detail.split(":", 2)[1].split(",").map((course, i) => (
                            <li key={i} className="pl-7 before:content-['-'] before:mr-2 before:text-gray-300">
                              {course.trim()}
                            </li>
                          ))                          
                        ) : (
                          <li key={i} className="flex items-center text-xl">
                              <span className="mr-2">•</span>
                              {detail}
                          </li>
                        )
                      ))}                       
                    </ul>
                  </Card>
                ))}
              </motion.div>
            </TabsContent>
            
            {/* Experience */}
            <TabsContent value="experience" className="mt-0">
              <motion.div 
                variants={fadeIn('up')}
                className="space-y-8"
              >
                {experiences.map((exp, index) => (
                  <Card key={index} className="bg-[#080a0a] border-[#5D3E7C] border p-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                        <p className="text-lg text-gray-300">{exp.organization}</p>
                        <p className="text-gray-400">{exp.location}</p>
                      </div>
                      <p className="text-[#FF65A3] font-semibold mt-2 md:mt-0">{exp.period}</p>
                    </div>
                    <ul className="list-disc pl-5 space-y-2 text-gray-300">
                      {exp.responsibilities.map((responsibility, i) => (
                        <li key={i}>{responsibility}</li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </motion.div>
            </TabsContent>
            
            {/* Skills */}
            <TabsContent value="skills" className="mt-0">
              <motion.div 
                variants={fadeIn('up')}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                <Card className="bg-[#080a0a] border-[#d4db9c] border p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Programming Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.programming.map((skill, i) => (
                      <span key={i} className="bg-[#5D3E7C] text-white px-3 py-1 rounded-md text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </Card>
                
                <Card className="bg-[#080a0a] border-[#d4db9c] border p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Physics Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.physics.map((skill, i) => (
                      <span key={i} className="bg-[#5D3E7C] text-white px-3 py-1 rounded-md text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </Card>
                
                <Card className="bg-[#080a0a] border-[#d4db9c] border p-6">
                  <h3 className="text-xl font-bold text-white mb-4">Software & Tools</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.software.map((skill, i) => (
                      <span key={i} className="bg-[#5D3E7C] text-white px-3 py-1 rounded-md text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </Card>
                
                <Card className="bg-[#080a0a] border-[#d4db9c] border p-6">
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
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {certifications.map((cert, index) => (
                  <Card key={index} className="bg-[#080a0a] border-[#d4db9c] border p-6">
                    <h3 className="text-lg font-semibold text-white mb-2">{cert.title}</h3>
                    <p className="text-gray-300">{cert.issuer}</p>
                    <p className="text-gray-400 text-sm mt-2">{cert.date}</p>
                    <a 
                    href="/personal_website/certificates/Quantum_computing_certificate.png"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF65A3] hover:text-[#5D3E7C] text-sm mt-2 inline-flex items-center"
                  >
                    <i className="ri-award-line mr-1"></i> Show Certificate
                  </a>
                  </Card>
                ))}
              </motion.div>
            </TabsContent>

            {/* Online Courses */}
            <TabsContent value="courses" className="mt-0">
              <motion.div 
                variants={fadeIn('up')}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                
                <Card className="bg-[#080a0a] border-[#d4db9c] border p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Machine Learning with Python</h3>
                  <p className="text-gray-300">Coursera</p>
                  <p className="text-gray-400 text-sm mt-2">Feb 28 2024</p>
                  <a 
                    href="/personal_website/certificates/machineLearningwithPython_certificate.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF65A3] hover:text-[#5D3E7C] text-sm mt-2 inline-flex items-center"
                  >
                    <i className="ri-award-line mr-1"></i> Show Certificate
                  </a>
                </Card>

                <Card className="bg-[#080a0a] border-[#d4db9c] border p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Complete Your First Project in SQL</h3>
                  <p className="text-gray-300">Linkedin Learning</p>
                  <p className="text-gray-400 text-sm mt-2">Feb 05 2025</p>
                  <a 
                    href="/personal_website/certificates/CertificateOfCompletion_Complete Your First Project in SQL.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF65A3] hover:text-[#5D3E7C] text-sm mt-2 inline-flex items-center"
                  >
                    <i className="ri-award-line mr-1"></i> Show Certificate
                  </a>
                </Card>

                <Card className="bg-[#080a0a] border-[#d4db9c] border p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Data Analysis with Python</h3>
                  <p className="text-gray-300">Coursera</p>
                  <p className="text-gray-400 text-sm mt-2">March 2 2024</p>
                  <a 
                    href="/personal_website/certificates/dataAnalysisWithPythonCoursera_certificate.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF65A3] hover:text-[#5D3E7C] text-sm mt-2 inline-flex items-center"
                  >
                    <i className="ri-award-line mr-1"></i> Show Certificate
                  </a>
                </Card>
                <Card className="bg-[#080a0a] border-[#d4db9c] border p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Introduction to Deep Learning and Neural Networks with Keras</h3>
                  <p className="text-gray-300">Coursera</p>
                  <p className="text-gray-400 text-sm mt-2">March 15 2024</p>
                  <a 
                    href="/personal_website/certificates/introduction_to_deepLearning_withKeras_certificate.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF65A3] hover:text-[#5D3E7C] text-sm mt-2 inline-flex items-center"
                  >
                    <i className="ri-award-line mr-1"></i> Show Certificate
                  </a>
                </Card>
                <Card className="bg-[#080a0a] border-[#d4db9c] border p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Introduction to R</h3>
                  <p className="text-gray-300">Great Learning Academy</p>
                  <p className="text-gray-400 text-sm mt-2">March 2024</p>
                  <a 
                    href="/personal_website/certificates/great_learning_IntroductiontoR_certificate.jpg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF65A3] hover:text-[#5D3E7C] text-sm mt-2 inline-flex items-center"
                  >
                    <i className="ri-award-line mr-1"></i> Show Certificate
                  </a>
                </Card>
                <Card className="bg-[#080a0a] border-[#d4db9c] border p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Data Visualization with R</h3>
                  <p className="text-gray-300">Great Learning Academy</p>
                  <p className="text-gray-400 text-sm mt-2">March 2024</p>
                  <a 
                    href="/personal_website/certificates/great_learning_certificateData_visualization_with_R.jpg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF65A3] hover:text-[#5D3E7C] text-sm mt-2 inline-flex items-center"
                  >
                    <i className="ri-award-line mr-1"></i> Show Certificate
                  </a>
                </Card>
                <Card className="bg-[#080a0a] border-[#d4db9c] border p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Advanced Learning Algorithm</h3>
                  <p className="text-gray-300">Coursera</p>
                  <p className="text-gray-400 text-sm mt-2">July 28 2024</p>
                  <a 
                    href="/personal_website/certificates/CourseraAdvancedLearningALgorithm.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF65A3] hover:text-[#5D3E7C] text-sm mt-2 inline-flex items-center"
                  >
                    <i className="ri-award-line mr-1"></i> Show Certificate
                  </a>
                </Card>
                <Card className="bg-[#080a0a] border-[#d4db9c] border p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">OpenCV Bootcamp</h3>
                  <p className="text-gray-300">OpenCV University</p>
                  <p className="text-gray-400 text-sm mt-2">August 7 2024</p>
                  <a 
                    href="/personal_website/certificates/OpenCV Free OpenCV Bootcamp Certificate _ OpenCV.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF65A3] hover:text-[#5D3E7C] text-sm mt-2 inline-flex items-center"
                  >
                    <i className="ri-award-line mr-1"></i> Show Certificate
                  </a>
                </Card>
                <Card className="bg-[#080a0a] border-[#d4db9c] border p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">MATLAB Onramp</h3>
                  <p className="text-gray-300">MathWorks Training Services</p>
                  <p className="text-gray-400 text-sm mt-2">November 1 2024</p>
                  <a 
                    href="/personal_website/certificates/matlabbasictrainingcourse_certificate.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF65A3] hover:text-[#5D3E7C] text-sm mt-2 inline-flex items-center"
                  >
                    <i className="ri-award-line mr-1"></i> Show Certificate
                  </a>
                </Card>
                <Card className="bg-[#080a0a] border-[#d4db9c] border p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Building Computer Vision
                  Applications with Python</h3>
                  <p className="text-gray-300">Linkedin Learning</p>
                  <p className="text-gray-400 text-sm mt-2">Jan 28, 2025</p>
                  <a 
                    href="/personal_website/certificates/CertificateOfCompletion_Building Computer Vision Applications with Python.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF65A3] hover:text-[#5D3E7C] text-sm mt-2 inline-flex items-center"
                  >
                    <i className="ri-award-line mr-1"></i> Show Certificate
                  </a>
                </Card>
                <Card className="bg-[#080a0a] border-[#d4db9c] border p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Computers, Waves, Simulations</h3>
                  <p className="text-gray-300">Ludwig-Maximilians-Universität München (Coursera)</p>
                  <p className="text-gray-400 text-sm mt-2">2024-ongoing</p>
                  <p className="text-gray-300 mt-2">A Practical Introduction to Numerical Methods using Python</p>
                </Card>
                <Card className="bg-[#080a0a] border-[#d4db9c] border p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Data-driven Astronomy</h3>
                  <p className="text-gray-300">The University of Sydney (Coursera)</p>
                  <p className="text-gray-400 text-sm mt-2">2024</p>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Workshop */}
          <TabsContent value="workshop" className="mt-0">
              <motion.div 
                variants={fadeIn('up')}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                <Card className="bg-[#080a0a] border-[#d4db9c] border p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">XI WWlet Wavelets and Applications in Signal and PDEs</h3>
                  <p className="text-gray-300">SBMAC, Brazil</p>
                  <p className="text-gray-400 text-sm mt-2">Oct 20, 2023 (Online)</p>
                  <a 
                    href="/personal_website/certificates/wavelet_brazil_certificate"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF65A3] hover:text-[#5D3E7C] text-sm mt-2 inline-flex items-center"
                  >
                    <i className="ri-award-line mr-1"></i> Show Certificate
                  </a>
                </Card>

                <Card className="bg-[#080a0a] border-[#d4db9c] border p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Workshop on Remote Sensing in Climate Sciences (RSCS2023)</h3>
                  <p className="text-gray-300">Tribhuvan University in
                  cooperation with UGC Nepal, St. Xavier’s College, Kathmandu and Nepal Physical Sociey</p>
                  <p className="text-gray-400 text-sm mt-2">8-9 April 2023</p>
                </Card>

                <Card className="bg-[#080a0a] border-[#d4db9c] border p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Hands-on Workshop on Latex Training</h3>
                  <p className="text-gray-300">St. Xavier’s College, Kathmandu</p>
                  <p className="text-gray-400 text-sm mt-2">18-19 June, 2023</p>
                </Card>

                <Card className="bg-[#080a0a] border-[#d4db9c] border p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">A mini-workshop on particle physics and science communication</h3>
                  <p className="text-gray-300">St. Xavier’s College in
                  collaboration with ICTP Physics</p>
                  <p className="text-gray-400 text-sm mt-2">9-11 August 2023</p>
                </Card>

                <Card className="bg-[#080a0a] border-[#d4db9c] border p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Workshop on Basics of Quantum Espresso (QE) Software</h3>
                  <p className="text-gray-300">St. Xavier’s College</p>
                  <p className="text-gray-400 text-sm mt-2">11-13 Oct 2023</p>
                </Card>

                
              </motion.div>
            </TabsContent>

            {/* Summer school */}
          <TabsContent value="summerschool" className="mt-0">
              <motion.div 
                variants={fadeIn('up')}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                <Card className="bg-[#080a0a] border-[#d4db9c] border p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Summer School on Gravitational-Wave Astronomy <br></br> <a 
                    href="https://www.icts.res.in/program/gws2024"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF65A3] hover:text-[#5D3E7C] text-sm mt-2 inline-flex items-center"
                  >
                    <i className="ri-award-line mr-1"></i> learn more
                  </a></h3>
                  <p className="text-gray-300">ICTS, Bengaluru, India</p>
                  <p className="text-gray-400 text-sm mt-2">1-12 July 2024 (Online)</p>
                  <a 
                    href="https://www.icts.res.in/event/page/28801"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF65A3] hover:text-[#5D3E7C] text-sm mt-2 inline-flex items-center"
                  >
                    <i className="ri-award-line mr-1"></i> Verify my participant
                  </a>
                  <p className="text-gray-400 text-sm mt-2">Courses:</p>

                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                      {summerschool_gw.map((courses, i) => (
                        <li key={i}>{courses}</li>
                      ))}
                  </ul>
                </Card>

                <Card className="bg-[#080a0a] border-[#d4db9c] border p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">AI Winter Workshop 2025 <br></br> <a 
                    href="https://indico.physics.brown.edu/event/34/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF65A3] hover:text-[#5D3E7C] text-sm mt-2 inline-flex items-center"
                  >
                    <i className="ri-award-line mr-1"></i> Learn more
                  </a></h3>
                  <p className="text-gray-300">Center for the Fundamental Physics of the Universe, Brown University/Department of Physics</p>
                  <p className="text-gray-400 text-sm mt-2">Jan 13 – 16, 2025
                  (Online)</p>
                  <a 
                    href="https://indico.physics.brown.edu/event/34/registrations/participants"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FF65A3] hover:text-[#5D3E7C] text-sm mt-2 inline-flex items-center"
                  >
                    <i className="ri-award-line mr-1"></i> Verify my participant
                  </a>
                  <p className="text-gray-400 text-sm mt-2">Module Courses:</p>

                  <ul className="list-disc pl-5 space-y-2 text-gray-300">
                      {ai_winterschool.map((courses, i) => (
                        <li key={i}>{courses}</li>
                      ))}
                  </ul>
                </Card>

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
            <Button variant="link" className="bg-[#5D3E7C] text-white hover:bg-[#FF65A3] px-8" onClick={()=> navigate('/contact')}>
              Contact Me
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CVSection;
