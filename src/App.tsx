import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { Navigation } from "@/components/Navigation";

// Portfolio pages
import Home from "./pages/Home";
import PortfolioAbout from "./pages/portfolio/About";
import Experience from "./pages/Experience";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";

// Blog pages
import BlogHome from "./pages/blog/BlogHome";
import BlogArchive from "./pages/blog/BlogArchive";
import BlogPost from "./pages/blog/BlogPost";
import BlogFeedback from "./pages/blog/BlogFeedback";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return null;
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-background">
          <Navigation />
          <main>
            <Routes>
              {/* Universal landing */}
              <Route path="/" element={<Home />} />

              {/* Portfolio mode routes */}
              <Route path="/portfolio/about" element={<PortfolioAbout />} />
              <Route path="/portfolio/experience" element={<Experience />} />
              <Route path="/portfolio/projects" element={<Projects />} />
              <Route path="/portfolio/skills" element={<Skills />} />

              {/* Legacy flat routes — redirect-friendly aliases */}
              <Route path="/experience" element={<Experience />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/skills" element={<Skills />} />

              {/* Blog mode routes */}
              <Route path="/blog" element={<BlogHome />} />
              <Route path="/blog/archive" element={<BlogArchive />} />
              <Route path="/blog/feedback" element={<BlogFeedback />} />
              <Route path="/blog/:slug" element={<BlogPost />} />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
    </QueryClientProvider>
    <Analytics />
  </HelmetProvider>
);

export default App;
