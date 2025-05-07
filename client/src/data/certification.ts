export interface Certification {
    title: string;
    issuer: string;
    date: string;
    certificate?: string;
  }
  
  export const certifications: Certification[] = [
    {
      title: "Introduction to Quantum Computing",
      issuer: "St. Xavier's Physics Council (SXPC-Nepal)",
      date: "13-18 April 2023",
      certificate: "/certificates/Quantum_computing_certificate.png" // update with actual path
    }
  ];
  