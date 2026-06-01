import React, { useState } from 'react';

export default function SearchBar({ onSearch, isLoading }) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username);
      setUsername('');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex gap-2 bg-[#161b22] border border-[#30363d] rounded-lg p-2 hover:border-[#0969da] transition focus-within:border-[#0969da] focus-within:shadow-lg focus-within:shadow-blue-500/20">
          <svg className="w-5 h-5 text-[#8b949e] ml-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search GitHub username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
            className="flex-1 bg-transparent px-2 py-2 focus:outline-none text-[#c9d1d9] placeholder-[#8b949e] disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-[#0969da] hover:bg-[#0860ca] text-white rounded-md font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v.01M17.658 6.342h.01M20.005 9.005h.01M20.005 14.995h.01M17.658 17.658h.01M12 20v.01M6.342 17.658h.01M3.995 14.995h.01M3.995 9.005h.01M6.342 6.342h.01" />
                </svg>
                Searching...
              </>
            ) : (
              <>
                <span>Search</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
