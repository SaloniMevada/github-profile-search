import { Link } from "react-router-dom";
import { Ghost } from "lucide-react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
      <Ghost className="w-24 h-24 text-gh-text-secondary mb-6" />
      <h1 className="text-6xl font-bold text-gh-text mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gh-text mb-2">Page not found</h2>
      <p className="text-gh-text-secondary text-lg mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link 
        to="/" 
        className="px-6 py-3 bg-gh-accent hover:bg-gh-accent-hover text-white rounded-md font-medium transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
