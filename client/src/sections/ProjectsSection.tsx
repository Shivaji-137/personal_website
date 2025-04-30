import { motion } from 'framer-motion';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fadeIn, staggerContainer } from '@/lib/animations';

const categories = ["All", "General Physics", "Data Science"];

const projects = [
  {
    title: "Demonstration of Astronomical Software Tools Project",
    description: "A comprehensive list of software tools and libraries that are essential for astronomical research and data analysis",
    image: "gwave.jpg",
    tags: ["Python", "Software", "Astronomy", "Physics"],
    category: "General Physics",
    link: "#",
    github: "https://github.com/Shivaji-137/Astronomical-Software",
    information:[]
  },
  {
    title: "Google Scholar and arXiv Scraper for personal use only",
    description: "This command line script (works in windows, linux) allows you to search for authors and titles on Google Scholar, open URLs in a browser, download available PDFs, and clear the console screen.",
    image: "cmb.jpg",
    tags: ["Python", "Web scraping", "Beautifulsoup", "Google Scholars", "ArXiv", "Pandas", "Command terminal"],
    link: "#",
    github: "https://github.com/Shivaji-137/Google-Scholars-Scraper",
    information:[]
  },
  {
    title: "Relational Database Project - Provided by freeCodeCamp",
    description: "This project is provided by freeCodeCamp to help master relational databases, bash shell scripting and git.",
    image: "quantum.jpg",
    tags: ["SQL", "PostgreSQL", "Bash shell", "Linux","Git"],
    category:"Data Science",
    link: "#",
    github: "https://github.com/Shivaji-137/Project_database_with_bashScript",
    information:[
      {"Build a Periodic Table Database":"https://github.com/Shivaji-137/Project_database_with_bashScript/tree/main/Build%20a%20Periodic%20Table%20Database"},
      {"Build a Salon Appointment Scheduler":"https://github.com/Shivaji-137/Project_database_with_bashScript/tree/main/Build%20a%20Salon%20Appointment%20Scheduler"},
      {"Celestial_bodies_database_project":"https://github.com/Shivaji-137/Project_database_with_bashScript/tree/main/Celestial_bodies_database_project"},
      {"Worldcup_database_project":"https://github.com/Shivaji-137/Project_database_with_bashScript/tree/main/Worldcup_database_project"}
    ]
  },
  {
    title: "File sharing Network Over Same wifi - Scripts",
    description: "A server_run.py is for accessing, downloading the files of your pc from another pc or mobile phones and uploading the files to the pc via wifi (no pendrive, additional secondary storage device needed), connected in same network (in same wifi/router)",
    image: "cmb.jpg",
    tags: ["Python", "Flask", "File Sharing", "Wifi", "Command terminal"],
    link: "#",
    github: "https://github.com/Shivaji-137/filesharingLANetworkOver_wifi",
    information:[]
  }
];

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProjects = projects.filter(project => 
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
          <motion.div 
            variants={fadeIn('up')}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Physics & Software Projects
            </h2>
            <p className="text-lg text-gray-300">
              Exploring the universe through computational physics and software development. Here are some of my key projects combining physics and programming.
            </p>
          </motion.div>

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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={index}
                variants={fadeIn('up', index * 0.1)}
                className="h-full"
              >
                <Card className="bg-[#141B34] border-[#5D3E7C] border h-full flex flex-col hover:border-[#FF65A3] transition-colors">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl md:text-2xl text-white">
                      {project.title}
                      <br></br>
                      {project.title.startsWith("Relational") && (
                        <Button>
                          <a href='/personal_website/my_learning_certificate/freecodecamp_Relationdatabase_certificate.png'><i className="ri-external-link-line mr-2 px-1"></i> Show certificate</a>
                        </Button>
                      )}

                    </CardTitle>
                    
                    
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.tags.map((tag, i) => (
                        <Badge key={i} variant="secondary" className="bg-[#5D3E7C] text-white hover:bg-[#7B52A4]">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription className="text-gray-300 text-base">
                      {project.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <ul className="list-disc pl-5 space-y-2 text-gray-300">
                        {project.information.map((content, i) => (
                          <a href={Object.entries(content)[0][1]}><li className="text-white hover:bg-[#FF65A3] px-1" key={i}>{Object.entries(content)[0][0]}</li></a>
                        ))}
                    </ul>
                    <Button variant="outline" className="border-[#5D3E7C] text-[#FF65A3] hover:bg-[#5D3E7C] hover:text-white">
                      <i className="ri-github-line mr-2"></i><a href={project.github}>Code</a> 
                    </Button>

    
                    
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            variants={fadeIn('up')}
            className="text-center"
          >
            <p className="text-gray-300 mb-6">
              I'm always working on new projects combining physics and software. Check my GitHub for the latest updates!
            </p>
            <Button className="bg-[#5D3E7C] text-white hover:bg-[#FF65A3] px-8">
              <a href="https://github.com/Shivaji-137"><i className="ri-github-line mr-2"></i> View All Projects</a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;