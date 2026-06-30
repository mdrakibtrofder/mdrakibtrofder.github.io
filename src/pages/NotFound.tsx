import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/50 relative overflow-hidden">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="text-center z-10 px-4 max-w-3xl">
        {/* Big animated 404 number */}
        <div className="relative mb-8">
          <h1 className="text-[12rem] md:text-[20rem] font-black bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 bg-clip-text text-transparent leading-none select-none animate-pulse">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full animate-ping"></div>
          </div>
        </div>

        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
          Oops! Page Not Found
        </h2>
        
        <p className="text-lg md:text-xl text-muted-foreground mb-2">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <p className="text-sm text-muted-foreground/80 mb-10">
          You tried to access: <span className="font-mono bg-muted px-2 py-1 rounded">{location.pathname}</span>
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            onClick={() => navigate("/")}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Home className="mr-2 h-5 w-5" />
            Go Home
          </Button>
          
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate(-1)}
            className="transition-all duration-300 transform hover:scale-105"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back
          </Button>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default NotFound;
