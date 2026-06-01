import React from 'react';

export default function RepoList({ repos }) {
  if (!repos || repos.length === 0) return null;

  const topRepos = repos
    .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
    .slice(0, 6);

  const totalStars = repos.reduce((sum, repo) => sum + (repo.stargazers_count || 0), 0);

  const getLanguageColor = (language) => {
    const colors = {
      'JavaScript': '#f1e05a',
      'TypeScript': '#3178c6',
      'Python': '#3572A5',
      'Java': '#b07219',
      'Go': '#00ADD8',
      'Rust': '#ce422b',
      'C++': '#f34b7d',
      'C#': '#239120',
      'PHP': '#777bb4',
      'Ruby': '#cc342d',
      'HTML': '#e34c26',
      'CSS': '#563d7c',
    };
    return colors[language] || '#8b949e';
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-[#c9d1d9]">Top Repositories</h2>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <span className="text-[#8b949e]">{totalStars.toLocaleString()} total stars</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {topRepos.map((repo) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="card p-4 block hover:shadow-lg hover:shadow-blue-500/20"
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg text-[#0969da] hover:text-[#0860ca] transition break-words">
                  {repo.name}
                </h3>
              </div>
              {repo.stargazers_count > 0 && (
                <div className="flex items-center gap-1 text-yellow-500 flex-shrink-0 bg-[#0d1117] px-2 py-1 rounded">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                  <span className="text-sm">{repo.stargazers_count}</span>
                </div>
              )}
            </div>

            {repo.description && (
              <p className="text-[#8b949e] text-sm mb-3 line-clamp-2">{repo.description}</p>
            )}

            <div className="flex items-center gap-3 text-sm text-[#8b949e]">
              {repo.language && (
                <span className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: getLanguageColor(repo.language) }}
                  ></span>
                  {repo.language}
                </span>
              )}
              {repo.forks_count > 0 && (
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 5c0 1.103-.897 2-2 2s-2-.897-2-2c0-1.103.897-2 2-2s2 .897 2 2zm0 6H4c-1.103 0-2 .897-2 2v7c0 1.103.897 2 2 2h3v1.968h2V22h3v-2h2v-1.968h2v2h2v2h2v-1.968h3c1.103 0 2-.897 2-2v-7c0-1.103-.897-2-2-2h-3V7c0-1.103-.897-2-2-2h-7c-1.103 0-2 .897-2 2v4zm2-9h3c.551 0 1-.449 1-1s-.449-1-1-1H9c-.551 0-1 .449-1 1s.449 1 1 1z" />
                  </svg>
                  {repo.forks_count}
                </span>
              )}
              {repo.watchers_count > 0 && (
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                  </svg>
                  {repo.watchers_count}
                </span>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
