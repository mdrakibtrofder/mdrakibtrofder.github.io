import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const NotFoundPage = () => (
  <main className="flex min-h-screen items-center justify-center px-4">
    <div className="max-w-md text-center">
      <p className="font-mono text-sm text-muted-foreground">404</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">Page not found</h1>
      <p className="mt-3 text-muted-foreground">The page you are looking for does not exist or has moved.</p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background"
      >
        <ArrowLeft className="h-4 w-4" /> Back to home
      </Link>
    </div>
  </main>
);

export default NotFoundPage;
