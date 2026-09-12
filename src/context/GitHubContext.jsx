import { createContext, useState, useCallback } from "react";
import { searchUsers as searchUsersApi } from "../services/githubApi";

export const GitHubContext = createContext();

export const GitHubProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const searchUsers = useCallback(async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      const results = await searchUsersApi(query);
      setSearchResults(results);
    } catch (err) {
      setError("Something went wrong while fetching GitHub users.");
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setSearchResults([]);
    setHasSearched(false);
    setError(null);
  }, []);

  return (
    <GitHubContext.Provider
      value={{
        searchResults,
        loading,
        error,
        hasSearched,
        searchUsers,
        clearSearch,
      }}
    >
      {children}
    </GitHubContext.Provider>
  );
};
