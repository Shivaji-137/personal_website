export interface Project {
    title: string;
    description: string;
    image: string;
    tags: string[];
    category:string;
    link: string;
    github: string;
    certificate:string;
    information: { [key: string]: string }[];
  }
export const projects: Project[] = [
  {
    title: "Demonstration of Astronomical Software Tools Project",
    description: "A comprehensive list of software tools and libraries that are essential for astronomical research and data analysis",
    image: "gwave.jpg",
    tags: ["Python", "Software", "Astronomy", "Physics"],
    category: "General Physics",
    link: "#",
    github: "https://github.com/Shivaji-137/Astronomical-Software",
    certificate: "",
    information:[]
  },
  {
    title: "Google Scholar and arXiv Scraper for personal use only",
    description: "This command line script (works in windows, linux) allows you to search for authors and titles on Google Scholar, open URLs in a browser, download available PDFs, and clear the console screen.",
    image: "cmb.jpg",
    tags: ["Python", "Web scraping", "Beautifulsoup", "Google Scholars", "ArXiv", "Pandas", "Command terminal"],
    category: "",
    link: "#",
    github: "https://github.com/Shivaji-137/Google-Scholars-Scraper",
    certificate:"",
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
    certificate:"/certificates/freecodecamp_Relationdatabase_certificate.png",
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
    category: "",
    link: "#",
    github: "https://github.com/Shivaji-137/filesharingLANetworkOver_wifi",
    certificate:"",
    information:[]
  }
];
