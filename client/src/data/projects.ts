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
    title: "Galaxies & AGN Multi-Survey Explorer",
    description: "This dashboard is a comprehensive Streamlit web application integrates data from multiple surveys to provide a unified platform for galaxy and AGN analysis",
    image: "project_image/galaxy_app.png",
    tags: ["Python", "Astronomy", "Gaia", "SDSS", "Data Visualization", "Research", "Spectral Analysis", "AGN", "Image Analysis"],
    category: "General Physics",
    link: "https://galaxy-visualization-analysis.streamlit.app",
    github: "https://github.com/Shivaji-137/galaxy_visualizationapp",
    certificate: "",
    information:[]
  },
  {
    title: "Cosmic Microwave Background Explorer using CAMB",
    description: "This dashboard is an interactive web application for exploring Cosmic Microwave Background (CMB) power spectra using CAMB with adjustable cosmological parameters",
    image: "project_image/camb_app.png",
    tags: ["Python", "Astronomy", "CMB", "CAMB", "Data Visualization", "Research", "Spectral Analysis", "Cosmological parameters"],
    category: "General Physics",
    link: "https://cmb-explorer-camb.streamlit.app/",
    github: "https://github.com/Shivaji-137/CMB_Explorer",
    certificate: "",
    information:[]
  },
  {
    title: "Novascope",
    description: "This dashboard is a Streamlit web app that I use to turn raw scientific datasets into clean, interactive plots within a couple of clicks. Drop in CSV, TXT, DAT, NPZ, FITS, or HDF5 files, pick a plot style, and the visuals update immediately. I work with a lot of data from different sources—simulations, telescope observations, and lab equipment. Every time I got a new file, I had to write custom code just to see a basic chart. This wasted time and slowed down my actual work. NovaScope fixes that problem: just drop in your file, look at your data, and pick the chart you want. No coding required unless you want to customize something." ,
    image: "project_image/novascope.png",
    tags: ["Python", "FITS", "HDF5", "CSV", "Data Visualization", "Research", "Data Analysis", "3D Plot", "Data Insights"],
    category: "Data Science",
    link: "https://novascope-datavisualization.streamlit.app/",
    github: "https://github.com/Shivaji-137/NovaScope/",
    certificate: "",
    information:[]
  },
{
    title: "GAAH Research Dashboard",
    description: "This dashboard is part of my active independent research project titled “Machine Learning Framework for Time-Resolved Mobility Edges in 1D Quasiperiodic Systems.”",
    image: "project_image/energyplot.png",
    tags: ["Python", "Condensed Matter Physics", "Streamlit", "Data Visualization", "Quantum Mechanics", "GAAH model", "Quasiperiodic crystal", "Mobility Edge"],
    category: "General Physics",
    link: "https://gaahmodelml-researchproject.streamlit.app/",
    github: "https://github.com/Shivaji-137/gaah-dashboard/",
    certificate: "",
    information:[]
  },

{
    title: "CNN Visualization Educational App",
    description: "This project is an interactive educational application for understanding Convolutional Neural Networks (CNNs). It provides visualizations, comparisons, and hands-on demonstrations of CNNs implemented from scratch and using popular deep learning libraries like TensorFlow and PyTorch.",
    image: "project_image/cnn.png",
    tags: ["Python", "CNN", "Pytorch", "Streamlit", "Data Visualization", "Tensorflow", "Neural Network"],
    category: "Data Science",
    link: "https://shivaji-interactiveguide-to-cnn.streamlit.app/",
    github: "https://github.com/Shivaji-137/CNN-Visual-Learning-",
    certificate: "",
    information:[]
  },
  {
    title: "Nepal Foreign Trade Analytics Dashboard",
    description: "This dashboard shows Nepal’s foreign trade from fiscal year 2071/72 to 2081/82 (Bikram Sambat). It explains how much Nepal imported and exported each year, the difference between them (trade balance), and changes in major products. The charts and summaries help understand how Nepal’s trade has changed over time.",
    image: "project_image/nepalforeingtrade.png",
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
    image: "project_image/targetscoreai.png",
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
    title: "Relational Database Project - Provided by freeCodeCamp",
    description: "This project is provided by freeCodeCamp to help master relational databases, bash shell scripting and git.",
    image: "project_image/rldbts.png",
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
    title: "Exoplanet Data Dashboard",
    description: "Explore various properties of exoplanets and their host stars using this interactive dashboard. Features include filtered datasets, distribution charts, scatter plots, and custom plotting options. Built with Astroquery and Streamlit using data from the NASA Exoplanet Archive.",
    image: "project_image/exoplanet.png",
    tags: ["Python", "Streamlit", "Astroquery", "Data Visualization", "Astronomy"],
    category: "General Physics",
    link: "https://shivaji-exoplanet-dashboard.streamlit.app/",
    github: "",
    certificate: "",
    information:[
      {"Data Source - NASA Exoplanet Archive":"https://exoplanetarchive.ipac.caltech.edu/"},
      {"Astroquery":"https://astroquery.readthedocs.io/"},
      {"Streamlit":"https://streamlit.io/"}
    ]
  },
  {
    title: "Demonstration of Astronomical Software Tools Project",
    description: "A comprehensive list of software tools and libraries that are essential for astronomical research and data analysis",
    image: "",
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
    image: "",
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
    image: "",
    tags: ["Python", "Flask", "File Sharing", "Wifi", "Command terminal"],
    category: "",
    link: "#",
    github: "https://github.com/Shivaji-137/filesharingLANetworkOver_wifi",
    certificate:"",
    information:[]
  }
];
