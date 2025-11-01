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
    title: "CNN Visualization Educational App",
    description: "This project is an interactive educational application for understanding Convolutional Neural Networks (CNNs). It provides visualizations, comparisons, and hands-on demonstrations of CNNs implemented from scratch and using popular deep learning libraries like TensorFlow and PyTorch.",
    image: "gwave.jpg",
    tags: ["Python", "CNN", "Pytorch", "Streamlit", "Data Visualization", "Tensorflow", "Neural Network"],
    category: "Data Science",
    link: "https://shivaji-interactiveguide-to-cnn.streamlit.app/",
    github: "https://github.com/Shivaji-137/CNN-Visual-Learning-",
    certificate: "",
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
    title: "Nepal Foreign Trade Analytics Dashboard",
    description: "This dashboard shows Nepal’s foreign trade from fiscal year 2071/72 to 2081/82 (Bikram Sambat). It explains how much Nepal imported and exported each year, the difference between them (trade balance), and changes in major products. The charts and summaries help understand how Nepal’s trade has changed over time.",
    image: "gwave.jpg",
    tags: ["Python", "Nepal Trade", "Dashboard", "Streamlit", "Data Visualization"],
    category: "Data Science",
    link: "https://nepaltradedata.netlify.app/",
    github: "https://github.com/Shivaji-137/nepal-foreign-trade-dashboard",
    certificate: "",
    information:[{"In python using streamlit":"https://nepal-foreign-trade-dashboard.streamlit.app/"}]
  },
  {
    title: "TargetScoreAI",
    description: "An innovative educational technology platform that leverages AI to provide personalized IELTS preparation with adaptive learning, real-time feedback, and comprehensive progress tracking, in collaboration with Mahesh Kumar Neupane",
    image: "blog_images/targetscoreai.png",
    tags: ["AI/ML", "React", "TypeScript", "NLP", "Educational Tech"],
    category: "Data Science",
    link: "https://targetscoreai.xyz/",
    github: "",
    certificate: "",
    information:[
      {"Visit Project":"https://targetscoreai.xyz/"},
      {"View Showcase":"https://s1-showcase.lovable.app/"}
    ],
    achievements: [
      {
        title: "2nd Overall in Asia",
        details: ["Lovable Shipped Competition"]
      },
      {
        title: "1st Global Position",
        details: ["Weekly Showcase Winner"]
      }
    ]
  },
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
