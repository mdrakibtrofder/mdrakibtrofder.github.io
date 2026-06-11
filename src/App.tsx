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
        {/* No more path routes needed for hash navigation */}
        <Routes>
          {/* Since we're using hash navigation, all paths will work as long as they're on the same page */}
          {/* Only show 404 for truly invalid paths (though hash navigation will prevent most 404s) */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
