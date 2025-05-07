export interface ECAItem {
    id: string;
    type: 'blog';
    title: string;
    description?: string;
    tags: string[];
    date: string;
    link: string;
  }
  
  export const ecaData: ECAItem[] = [
    {
      id: 'eca1',
      type: 'blog',
      title: 'Robotics Competition',
      description: 'A leadership journey organizing TEDx events with a diverse team of students and mentors.',
      tags: ['robotics', 'engineering'],
      date: '2024-04-12',
      link: '/markdown/2.md', // This enables linking to the blog post

    },
    
  ];
  
  