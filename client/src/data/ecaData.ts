export interface ECAItem {
  id: string;
  // kind can be 'blog' (markdown/article), 'video' or 'image'
  kind: 'blog' | 'video' | 'image';
  title: string;
  description?: string;
  tags: string[];
  date: string;
  // link points to a public asset or markdown in /markdown/
  link: string;
  // optional cover image (public path)
  cover?: string;
}

export const ecaData: ECAItem[] = [
  // Moved items: Digital Resilience (writing) and Live Physics Demonstration (media)
  {
    id: 'eca-digital-resilience',
    kind: 'blog',
    title: 'Digital Resilience Initiative — Strengthening Online Safety in Sindhuli',
    description: 'Community cybersecurity outreach and awareness program (Bhiman, Sindhuli).',
    tags: ['cybersecurity', 'community'],
    date: '2024-01-09',
    link: '/markdown/5.md',
    cover: '/blog_images/475083042_576946158569996_4307589784819904570_n.jpg',
  },
  {
    id: 'eca-physics-demo',
    title: "Live Physics Demonstration — SXPC Nepal",
    description: "Highlights from the live physics demonstration (Chladni plate, optics, mechanics) at St. Xavier's College.",
    tags: ['physics', 'demonstration', 'sxpc'],
    date: '2024-02-02',
    // use the markdown writeup instead of raw video per request
    kind: 'blog',
    link: '/markdown/5-physics-exhibition.md',
    cover: '/blog_images/cladiniplate2.jpg',
  },
];
  



  


