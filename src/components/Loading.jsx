const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <div className="w-12 h-12 border-4 border-gh-border border-t-gh-accent rounded-full animate-spin mb-6"></div>
      <p className="text-gh-text-secondary text-lg">Loading...</p>
    </div>
  );
};

export default Loading;
