const GITHUB_API_URL = "https://api.github.com";

export const searchUsers = async (query) => {
  if (!query || !query.trim()) return [];

  try {
    const response = await fetch(`${GITHUB_API_URL}/search/users?q=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error("Error searching users:", error);
    throw error;
  }
};


export const getUserProfile = async (username) => {
  if (!username) return null;

  try {
    const response = await fetch(`${GITHUB_API_URL}/users/${encodeURIComponent(username)}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("User not found");
      }
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching profile for ${username}:`, error);
    throw error;
  }
};
