export interface SchoolProgram {
    title: string;
    date: string;
    organization: string;
    location?: string;
    content: string[];
    verify: string;
  }
  
  export const school: SchoolProgram[] = [
    {
      title: "Summer School on Gravitational-Wave Astronomy ",
      date:"1-12 July 2024 (Online)",
      organization: " International Centre for Theoretical Sciences (ICTS)",
      location: "Bengaluru, India",
      content: ["The astrophysics of neutron stars and binaries", 
        "Ultralight boson clouds around black holes", "Rapidly spinning neutron stars and emission mechanisms",
        "Searches for continuous GWs: Methods and results"
      ],
      verify:"https://www.icts.res.in/event/page/28801"
    },
    {
      title: "AI Winter Workshop 2025 ",
      date:"Jan 13 – 16, 2025 (Online)",
      organization: "Center for the Fundamental Physics of the Universe, Brown University/Department of Physics",
      location: "",
      content: [" Introductory Module",
        "Development and Deployment of Graph Neural Networks in Particle Physics",
        "Physics-Inspired Operator Learning for Inverse Scattering with Application to Ground Penetrating Radar",
        "Unsupervised Learning to Find Interacting and Starburst Galaxies",
        "Overview of Large Language Models (LLMs) and RAG",
        "Auto-Encoders for Data Compression in Dark Matter Direct Detection Experiments",
        "Generative AI, Agents, and Industry Applications"
      ],
      verify:"https://indico.physics.brown.edu/event/34/registrations/participants"
    }
  ];
  