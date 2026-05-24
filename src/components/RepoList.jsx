import React from 'react';

export default function RepoList({ repos }) {
  if (!repos || repos.length === 0) return null;

  // Get top 6 repos by stars
  const topRepos = repos
    .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
    .slice(0, 6);

  const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);

  return (
    <div className="max-w-4xl mx-auto mb-8">
      <h2 className="text-2xl font-bold mb-4">Top Repositories</h2>
      <p className="text-gray-600 mb-4">Total Stars: <span className="font-bold text-yellow-500">{totalStars}</span></p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {topRepos.map((repo) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 border border-gray-200 hover:border-blue-500"
          >
            <h3 className="font-bold text-lg mb-2 text-blue-600">{repo.name}</h3>
            {repo.description && (
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{repo.description}</p>
            )}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              {repo.language && (
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                  {repo.language}
                </span>
              )}
              <span>⭐ {repo.stargazers_count}</span>
              <span>🍴 {repo.forks_count}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
