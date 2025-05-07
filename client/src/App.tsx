import { Routes, Route } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ui/theme-provider";

import HomePage from "@/pages/HomePage";
import ProjectsPage from "@/pages/ProjectsPage";
import ResearchPage from "@/pages/ResearchPage";
import BlogPage from "@/pages/BlogPage";
import BlogPostPage from "@/pages/BlogPostPage";
import CVPage from "@/pages/CVPage";
import MyOdysseyPage from "@/pages/MyOdysseyPage"; 
import ContactPage from "@/pages/ContactPage";
import NotFound from "@/pages/not-found";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/research" element={<ResearchPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blogpost/:id" element={<BlogPostPage />} />
            <Route path="/cv" element={<CVPage />} />
            <Route path="/Myodyssey" element={<MyOdysseyPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
