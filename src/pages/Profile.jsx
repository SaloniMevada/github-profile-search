import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Users, UserPlus, Book, Calendar, MapPin, Link as LinkIcon } from "lucide-react";
import { getUserProfile } from "../services/githubApi";
import { GitHubContext } from "../context/GitHubContext";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

const Profile = () => {
  const { username } = useParams();
  const { clearSearch } = useContext(GitHubContext);
  
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getUserProfile(username);
        setProfile(data);
      } catch (err) {
        setError(err.message === "User not found" 
          ? "This GitHub user does not exist." 
          : "Something went wrong while fetching the profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [username]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-4 md:py-8 flex flex-col min-h-[70vh]">
        <Link to="/" onClick={clearSearch} className="inline-flex items-center gap-2 text-gh-text-secondary hover:text-gh-accent mb-4 md:mb-8 transition-colors self-start">
          <ArrowLeft className="w-4 h-4" />
          Back to Search
        </Link>
        <div className="flex-1 flex items-center justify-center">
          <Loading />
        </div>
      </div>
    );
  }
  
  if (error) return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Link to="/" onClick={clearSearch} className="inline-flex items-center gap-2 text-gh-text-secondary hover:text-gh-accent mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Search
      </Link>
      <ErrorMessage message={error} />
    </div>
  );

  if (!profile) return null;

  const joinedDate = new Date(profile.created_at).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-4 md:py-8">
      <Link to="/" className="inline-flex items-center gap-2 text-gh-text-secondary hover:text-gh-accent mb-4 md:mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Search
      </Link>

      <div className="bg-gh-card border border-gh-border rounded-xl overflow-hidden">
      
        <div className="p-6 md:p-8 flex flex-col md:flex-row gap-4 md:gap-8 items-start">
          <img 
            src={profile.avatar_url} 
            alt={`${profile.login}'s avatar`} 
            className="w-24 h-24 md:w-48 md:h-48 rounded-full border-4 border-gh-border bg-gh-surface shrink-0"
          />
          
          <div className="flex-1 w-full">
            <h1 className="text-2xl md:text-3xl font-bold text-gh-text tracking-tight mb-1">
              {profile.name || profile.login}
            </h1>
            <a 
              href={profile.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gh-text-secondary text-lg md:text-xl font-light hover:text-gh-accent transition-colors block mb-4 md:mb-6"
            >
              @{profile.login}
            </a>

            {profile.bio && (
              <p className="text-gh-text text-base md:text-lg mb-4 md:mb-6 leading-relaxed">
                {profile.bio}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-gh-text-secondary mb-2 md:mb-6 text-sm md:text-base">
              {profile.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span>{profile.location}</span>
                </div>
              )}
              {profile.blog && (
                <div className="flex items-center gap-2">
                  <LinkIcon className="w-4 h-4 shrink-0" />
                  <a 
                    href={profile.blog.startsWith('http') ? profile.blog : `https://${profile.blog}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-gh-accent transition-colors truncate max-w-[200px] sm:max-w-xs"
                  >
                    {profile.blog}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

       
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gh-border border-y border-gh-border bg-gh-surface/30">
          <div className="p-4 md:p-6 flex flex-col items-center justify-center gap-1 md:gap-2">
            <div className="flex items-center gap-2 text-gh-text-secondary mb-1">
              <Users className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-sm md:text-base">Followers</span>
            </div>
            <span className="text-xl md:text-2xl font-semibold text-gh-text">{profile.followers}</span>
          </div>
          
          <div className="p-4 md:p-6 flex flex-col items-center justify-center gap-1 md:gap-2">
            <div className="flex items-center gap-2 text-gh-text-secondary mb-1">
              <UserPlus className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-sm md:text-base">Following</span>
            </div>
            <span className="text-xl md:text-2xl font-semibold text-gh-text">{profile.following}</span>
          </div>
          
          <div className="p-4 md:p-6 flex flex-col items-center justify-center gap-1 md:gap-2">
            <div className="flex items-center gap-2 text-gh-text-secondary mb-1">
              <Book className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-sm md:text-base">Public Repos</span>
            </div>
            <span className="text-xl md:text-2xl font-semibold text-gh-text">{profile.public_repos}</span>
          </div>
        </div>

      
        <div className="p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 md:gap-6">
          <div className="flex items-center gap-2 text-gh-text-secondary text-sm md:text-base">
            <Calendar className="w-4 h-4 shrink-0" />
            <span>Joined on {joinedDate}</span>
          </div>
          
          <a 
            href={profile.html_url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-2.5 md:py-3 bg-gh-accent hover:bg-gh-accent-hover text-white rounded-md font-medium text-center transition-colors text-sm md:text-base"
          >
            View GitHub Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default Profile;
