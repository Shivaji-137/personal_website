export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string[];
  tags: string[];
  markdownPath: string;
  image?: string;
};


export const blogPosts: BlogPost[] = [
  {
    id: 2,
    title: "A comprehensive list of astronomical software tools and libraries",
    excerpt: "",
    date: "April 28, 2025",
    readTime: "8 min read",
    category: ["Programming", "Physics"],
    tags: ["Python", "Astropy", "DS9", "Lightkurve"],
    markdownPath: "/markdown/2.md", // ✅ relative to public folder
    image: "/blog_images/assets/img/jwst_pillar_ofcreation.jpg"

  },
  {
    id: 3,
    title: "The Python Libraries Every Physics Student Should Know",
    excerpt: "",
    date: "April 28, 2025",
    readTime: "8 min read",
    category: ["Programming", "Physics"],
    tags: ["Python", "NumPy", "SciPy", "Physics Simulations"],
    markdownPath: "/markdown/3.md", // ✅ relative to public folder
    image: "/blog_images/python_library.png"
  },
];


