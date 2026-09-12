import { useState, useContext } from "react";
import { Search } from "lucide-react";
import { GitHubContext } from "../context/GitHubContext";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const { searchUsers } = useContext(GitHubContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    searchUsers(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mt-8 mb-12 relative">
      <div className="relative flex items-center">
        <div className="absolute left-4 text-gh-text-secondary">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search username..."
          className="w-full bg-gh-card border border-gh-border text-gh-text rounded-lg py-3 pl-12 pr-24 focus:outline-none focus:border-gh-accent focus:ring-1 focus:ring-gh-accent transition-all"
        />
        <button
          type="submit"
          className="absolute right-2 bg-gh-accent hover:bg-gh-accent-hover text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
