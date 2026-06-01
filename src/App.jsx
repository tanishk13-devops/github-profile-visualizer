import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import ProfileCard from './components/ProfileCard';
import RepoList from './components/RepoList';
import LanguageChart from './components/LanguageChart';
import ContributionGraph from './components/ContributionGraph';
import { getUserStats } from './api/github';
import './index.css';

export default function App() {
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (username) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getUserStats(username);
      setUserData(data.user);
      setRepos(data.repos);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch user data. Please try again.');
      setUserData(null);
      setRepos(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9]">
      {/* Header */}
      <header className="border-b border-[#30363d] sticky top-0 z-50 bg-[#0d1117]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">GH</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Profile Visualizer
            </h1>
          </div>
          <a
            href="https://github.com/tanishk13-devops/github-profile-visualizer"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#8b949e] hover:text-[#c9d1d9] transition"
          >
            ★ Star on GitHub
          </a>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-in">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
            Visualize GitHub Profiles
          </h2>
          <p className="text-[#8b949e] text-lg mb-8 max-w-2xl mx-auto">
            Search any GitHub username and explore their contributions, repositories, languages, and statistics in beautiful interactive charts.
          </p>

          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {/* Error Alert */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8 p-4 bg-[#da3633]/10 border border-[#da3633]/50 text-[#f85149] rounded-lg animate-in">
            <span className="font-semibold">Error:</span> {error}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-16">
            <div className="inline-flex items-center gap-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <p className="text-[#8b949e]">Loading profile...</p>
            </div>
          </div>
        )}

        {/* Results */}
        {userData && (
          <div className="space-y-12 animate-in">
            <ProfileCard user={userData} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <RepoList repos={repos} />
              </div>
              <div>
                <LanguageChart repos={repos} />
              </div>
            </div>

            <ContributionGraph repos={repos} />
          </div>
        )}

        {/* Empty State */}
        {!userData && !isLoading && !error && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">👤</div>
            <p className="text-[#8b949e] text-lg">Search for a GitHub user to get started</p>
            <p className="text-[#8b949e] text-sm mt-2">Enter a username above to visualize their profile</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-[#30363d] mt-20 py-8 text-center text-[#8b949e] text-sm">
        <p>Made with ❤️ by <a href="https://github.com/tanishk13-devops" className="text-blue-400 hover:text-blue-300">Tanishk Jaiswal</a></p>
      </footer>
    </div>
  );
}
