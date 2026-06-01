import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function TopContributors({ repos }) {
  const [contributors, setContributors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchContributors = async () => {
      if (!repos || repos.length === 0) return;

      setIsLoading(true);
      try {
        const topRepo = repos[0];
        const response = await axios.get(
          `https://api.github.com/repos/${topRepo.owner.login}/${topRepo.name}/contributors`,
          {
            params: { per_page: 8 },
            headers: { 'Accept': 'application/vnd.github.v3+json' }
          }
        );
        setContributors(response.data || []);
      } catch (error) {
        console.error('Error fetching contributors:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContributors();
  }, [repos]);

  if (!repos || repos.length === 0) return null;

  if (isLoading) {
    return (
      <div className="card p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-[#30363d] rounded w-1/3"></div>
          <div className="flex gap-3 flex-wrap">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-12 h-12 bg-[#30363d] rounded-full"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (contributors.length === 0) return null;

  return (
    <div className="card p-6">
      <h2 className="text-2xl font-bold text-[#c9d1d9] mb-6 flex items-center gap-2">
        <svg className="w-6 h-6 text-[#0969da]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
        Top Contributors
      </h2>

      <div className="space-y-3">
        {contributors.slice(0, 6).map((contributor) => (
          <a
            key={contributor.id}
            href={contributor.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-lg border border-[#30363d] hover:border-[#0969da] hover:bg-[#0d1117] transition"
          >
            <img
              src={contributor.avatar_url}
              alt={contributor.login}
              className="w-10 h-10 rounded-full border border-[#30363d]"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-[#0969da] hover:text-[#0860ca] truncate">
                {contributor.login}
              </h3>
              <p className="text-[#8b949e] text-sm">{contributor.contributions} contributions</p>
            </div>
            <div className="flex-shrink-0 bg-[#21262d] px-3 py-1 rounded-full text-sm text-[#8b949e]">
              #{Object.values(contributors).indexOf(contributor) + 1}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
