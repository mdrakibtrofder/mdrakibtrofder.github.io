import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Index from "./pages/Index";
import BackToTop from "./components/BackToTop";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Section page wrapper component
const SectionPage = ({ sectionId }: { sectionId: string }) => {
  // Scroll to section on mount
  if (typeof window !== 'undefined') {
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 100);
  }
  
  return <Index />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Index />
        <BackToTop />
        <Routes>
          {/* Match valid paths without rendering anything extra */}
          <Route path="/" element={null} />
          <Route path="/home" element={null} />
          <Route path="/about" element={null} />
          <Route path="/skills" element={null} />
          <Route path="/experience" element={null} />
          <Route path="/education" element={null} />
          <Route path="/projects" element={null} />
          <Route path="/certificates" element={null} />
          <Route path="/volunteer" element={null} />
          <Route path="/teaching" element={null} />
          <Route path="/mentorship" element={null} />
          <Route path="/workshops" element={null} />
          <Route path="/supervision" element={null} />
          <Route path="/non-academic-program" element={null} />
          <Route path="/contact" element={null} />
          <Route path="/vlogs" element={null} />
          <Route path="/writings" element={null} />
          <Route path="/technical-content" element={null} />
          {/* Only show 404 for truly invalid paths */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
