// src/data/courses.ts

export interface Course {
    title: string;
    source: string;
    date: string;
    certificate?: string;
    note?: string;
  }
  
  export const courses: Course[] = [
    {
      title: "Machine Learning with Python",
      source: "Coursera",
      date: "Feb 28 2024",
      certificate: "/certificates/machineLearningwithPython_certificate.pdf",
    },
    {
      title: "Complete Your First Project in SQL",
      source: "Linkedin Learning",
      date: "Feb 05 2025",
      certificate: "/certificates/CertificateOfCompletion_Complete Your First Project in SQL.pdf",
    },
    {
      title: "Data Analysis with Python",
      source: "Coursera",
      date: "March 2 2024",
      certificate: "/certificates/dataAnalysisWithPythonCoursera_certificate.pdf",
    },
    {
      title: "Introduction to Deep Learning and Neural Networks with Keras",
      source: "Coursera",
      date: "March 15 2024",
      certificate: "/certificates/introduction_to_deepLearning_withKeras_certificate.pdf",
    },
    {
      title: "Introduction to R",
      source: "Great Learning Academy",
      date: "March 2024",
      certificate: "/certificates/great_learning_IntroductiontoR_certificate.jpg",
    },
    {
      title: "Data Visualization with R",
      source: "Great Learning Academy",
      date: "March 2024",
      certificate: "/certificates/great_learning_certificateData_visualization_with_R.jpg",
    },
    {
      title: "Advanced Learning Algorithm",
      source: "Coursera",
      date: "July 28 2024",
      certificate: "/certificates/CourseraAdvancedLearningALgorithm.pdf",
    },
    {
      title: "OpenCV Bootcamp",
      source: "OpenCV University",
      date: "August 7 2024",
      certificate: "/certificates/OpenCV Free OpenCV Bootcamp Certificate _ OpenCV.pdf",
    },
    {
      title: "MATLAB Onramp",
      source: "MathWorks Training Services",
      date: "November 1 2024",
      certificate: "/certificates/matlabbasictrainingcourse_certificate.pdf",
    },
    {
      title: "Building Computer Vision Applications with Python",
      source: "Linkedin Learning",
      date: "Jan 28 2025",
      certificate: "/certificates/CertificateOfCompletion_Building Computer Vision Applications with Python.pdf",
    },
    {
      title: "Computers, Waves, Simulations",
      source: "Ludwig-Maximilians-Universität München (Coursera)",
      date: "2024-ongoing",
      note: "A Practical Introduction to Numerical Methods using Python",
    },
    {
      title: "Data-driven Astronomy",
      source: "The University of Sydney (Coursera)",
      date: "2024",
    },
  ];
  