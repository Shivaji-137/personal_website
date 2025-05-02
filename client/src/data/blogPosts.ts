export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  markdownPath: string;
  image?: string;
};


export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Python Libraries Every Physics Student Should Know",
    excerpt: "",
    date: "April 28, 2025",
    readTime: "8 min read",
    category: "Programming",
    tags: ["Python", "NumPy", "SciPy", "Physics Simulations"],
    markdownPath: "/markdown/1.md", // ✅ relative to public folder
    image: "/personal_website/blog_images/python_library.png"
  },
];


