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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">GitHub Profile Visualizer</h1>
          <p className="text-gray-600">Enter a GitHub username to visualize their profile stats</p>
        </div>

        <SearchBar onSearch={handleSearch} isLoading={isLoading} />

        {error && (
          <div className="max-w-md mx-auto mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {isLoading && (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading profile...</p>
          </div>
        )}

        {userData && (
          <>
            <ProfileCard user={userData} />
            <RepoList repos={repos} />
            <LanguageChart repos={repos} />
            <ContributionGraph repos={repos} />
          </>
        )}

        {!userData && !isLoading && !error && (
          <div className="text-center py-12 text-gray-500">
            <p>Search for a GitHub user to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}
