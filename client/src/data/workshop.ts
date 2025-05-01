export interface Workshop {
    title: string;
    organization: string;
    date: string;
    certificate?: string;
  }
  
  export const workshop: Workshop[] = [
    {
      title: "XI WWlet Wavelets and Applications in Signal and PDEs",
      organization: "SBMAC, Brazil",
      date: "Oct 20, 2023 (Online)",
      certificate: "/personal_website/certificates/wavelet_brazil_certificate"
    },
    {
      title: "Workshop on Remote Sensing in Climate Sciences (RSCS2023)",
      organization: "Tribhuvan University in cooperation with UGC Nepal, St. Xavier’s College, Kathmandu and Nepal Physical Society",
      date: "8-9 April 2023"
    },
    {
      title: "Hands-on Workshop on Latex Training",
      organization: "St. Xavier’s College, Kathmandu",
      date: "18-19 June, 2023"
    },
    {
      title: "A mini-workshop on particle physics and science communication",
      organization: "St. Xavier’s College in collaboration with ICTP Physics",
      date: "9-11 August 2023"
    },
    {
      title: "Workshop on Basics of Quantum Espresso (QE) Software",
      organization: "St. Xavier’s College",
      date: "11-13 Oct 2023"
    }
  ];
  