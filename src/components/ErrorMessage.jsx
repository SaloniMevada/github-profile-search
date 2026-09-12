import { AlertCircle, Info } from "lucide-react";

const ErrorMessage = ({ message, type = "error" }) => {
  const isError = type === "error";
  
  return (
    <div className={`flex flex-col items-center justify-center py-16 px-4 text-center rounded-lg border ${isError ? 'border-red-900/50 bg-red-900/10' : 'border-gh-border bg-gh-surface'}`}>
      {isError ? (
        <AlertCircle className="w-12 h-12 text-red-400 mb-4" />
      ) : (
        <Info className="w-12 h-12 text-gh-text-secondary mb-4" />
      )}
      <p className={`${isError ? 'text-red-400' : 'text-gh-text-secondary'} text-lg max-w-md`}>
        {message}
      </p>
    </div>
  );
};

export default ErrorMessage;
