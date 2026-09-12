import { Link } from "react-router-dom";

const ProfileCard = ({ user }) => {
  return (
    <div className="bg-gh-card border border-gh-border rounded-xl p-4 md:p-6 flex flex-col items-center text-center hover:-translate-y-1 hover:border-gh-text-secondary transition-all duration-200">
      <img
        src={user.avatar_url}
        alt={`${user.login}'s avatar`}
        className="w-16 h-16 md:w-24 md:h-24 rounded-full mb-3 md:mb-4 border-2 border-gh-border"
      />
      <h3 className="text-gh-text font-semibold text-base md:text-lg truncate w-full">
        {user.login}
      </h3>
      <p className="text-gh-text-secondary text-sm mb-4 md:mb-6 truncate w-full">
        User
      </p>
      
      <Link
        to={`/profile/${user.login}`}
        className="mt-auto w-full py-1.5 md:py-2 bg-gh-surface border border-gh-border rounded-md text-gh-text-secondary text-sm md:text-base font-medium hover:text-gh-text hover:border-gh-text-secondary transition-colors"
      >
        View Profile
      </Link>
    </div>
  );
};

export default ProfileCard;
