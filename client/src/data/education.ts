export interface Education {
    degree: string;
    institution: string;
    location: string;
    year: string;
    details: string[];
  }
  
  export const education: Education[] = [
    {
      degree: "Undergraduate in Physics",
      institution: "St. Xavier's College (Tribhuvan University)",
      location: "Kathmandu, Nepal",
      year: "2019 - 2024",
      details: [
        "Percentage: 74.5",
        "Key Coursework:",
        "Research Methodology, Quantum Mechanics, Classical Mechanics, Electricity and Magnetism, Electronics, Nuclear Physics and Solid State Physics, Statistical Physics, Computational Physics, Mathematical Physics, Thermodynamics, Optics, Econophysics, Space Science, Applied Statistics, Probability & Inference"
      ]
    }
  ];
  