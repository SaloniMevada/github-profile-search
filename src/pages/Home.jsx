import SearchBar from "../components/SearchBar";
import ProfileGrid from "../components/ProfileGrid";

const Home = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gh-text mb-2 tracking-tight">
          Find GitHub users
        </h1>
        <p className="text-gh-text-secondary text-lg">
          Search developers by username or name
        </p>
      </div>

      <SearchBar />
      <ProfileGrid />
    </div>
  );
};

export default Home;
