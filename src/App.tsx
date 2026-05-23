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
          <Route path="/" element={<SectionPage sectionId="home" />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="/home" element={<SectionPage sectionId="home" />} />
          <Route path="/about" element={<SectionPage sectionId="about" />} />
          <Route path="/skills" element={<SectionPage sectionId="skills" />} />
          <Route path="/experience" element={<SectionPage sectionId="experience" />} />
          <Route path="/education" element={<SectionPage sectionId="education" />} />
          <Route path="/projects" element={<SectionPage sectionId="projects" />} />
          <Route path="/certificates" element={<SectionPage sectionId="certificates" />} />
          <Route path="/volunteer" element={<SectionPage sectionId="volunteer" />} />
          <Route path="/teaching" element={<SectionPage sectionId="teaching" />} />
          <Route path="/mentorship" element={<SectionPage sectionId="mentorship" />} />
          <Route path="/workshops" element={<SectionPage sectionId="workshops" />} />
          <Route path="/supervision" element={<SectionPage sectionId="supervision" />} />
          <Route path="/non-academic-program" element={<SectionPage sectionId="non-academic-program" />} />
          <Route path="/contact" element={<SectionPage sectionId="contact" />} />
          <Route path="/vlogs" element={<SectionPage sectionId="vlogs" />} />
          <Route path="/writings" element={<SectionPage sectionId="writings" />} />
          <Route path="/technical-content" element={<SectionPage sectionId="technical-content" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
