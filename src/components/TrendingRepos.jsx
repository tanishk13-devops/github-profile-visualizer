import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function TrendingRepos() {
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingRepos = async () => {
      try {
        const response = await axios.get('https://api.github.com/search/repositories', {
          params: {
            q: 'stars:>50000 created:>2024-01-01',
            sort: 'stars',
            order: 'desc',
            per_page: 6
          },
          headers: {
            'Accept': 'application/vnd.github.v3+json'
          }
        });
        setRepos(response.data.items || []);
      } catch (error) {
        console.error('Error fetching trending repos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingRepos();
  }, []);

  if (isLoading) {
    return (
      <div className="card p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-[#30363d] rounded w-1/3"></div>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-20 bg-[#30363d] rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <h2 className="text-2xl font-bold text-[#c9d1d9] mb-6 flex items-center gap-2">
        <svg className="w-6 h-6 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        Trending on GitHub
      </h2>

      <div className="space-y-3">
        {repos.map((repo) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-3 rounded-lg border border-[#30363d] hover:border-[#0969da] hover:bg-[#0d1117] transition"
          >
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-[#0969da] hover:text-[#0860ca] truncate">
                  {repo.owner?.login}/{repo.name}
                </h3>
              </div>
              <span className="flex items-center gap-1 text-yellow-500 flex-shrink-0 bg-[#21262d] px-2 py-1 rounded text-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
                {repo.stargazers_count?.toLocaleString()}
              </span>
            </div>
            {repo.description && (
              <p className="text-[#8b949e] text-sm mb-2 line-clamp-1">{repo.description}</p>
            )}
            <div className="flex items-center gap-3 text-xs text-[#8b949e]">
              {repo.language && (
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  {repo.language}
                </span>
              )}
              <span>📦 {repo.forks_count?.toLocaleString()} forks</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
