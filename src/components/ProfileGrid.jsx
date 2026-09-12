import { useContext } from "react";
import { GitHubContext } from "../context/GitHubContext";
import ProfileCard from "./ProfileCard";
import Loading from "./Loading";
import ErrorMessage from "./ErrorMessage";

const ProfileGrid = () => {
  const { searchResults, loading, error, hasSearched } = useContext(GitHubContext);

  if (loading) return <Loading />;
  
  if (error) return <ErrorMessage message={error} />;
  
  if (hasSearched && searchResults.length === 0) {
    return <ErrorMessage message="No GitHub users found." type="info" />;
  }
  
  if (!hasSearched) {
    return null;
  }

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-6 text-gh-text border-b border-gh-border pb-2">
        Search Results
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {searchResults.map((user) => (
          <ProfileCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default ProfileGrid;
