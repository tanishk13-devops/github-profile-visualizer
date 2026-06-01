import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function TrendingProfiles() {
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingProfiles = async () => {
      try {
        const response = await axios.get('https://api.github.com/search/users', {
          params: {
            q: 'followers:>5000 created:>2022-01-01',
            sort: 'followers',
            order: 'desc',
            per_page: 6
          },
          headers: {
            'Accept': 'application/vnd.github.v3+json'
          }
        });
        setProfiles(response.data.items || []);
      } catch (error) {
        console.error('Error fetching trending profiles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingProfiles();
  }, []);

  if (isLoading) {
    return (
      <div className="card p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-[#30363d] rounded w-1/3"></div>
          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-[#30363d] rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-6">
      <h2 className="text-2xl font-bold text-[#c9d1d9] mb-6 flex items-center gap-2">
        <svg className="w-6 h-6 text-purple-500" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
        </svg>
        Trending Developers
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {profiles.map((profile) => (
          <a
            key={profile.id}
            href={profile.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="card p-4 hover:shadow-lg hover:shadow-purple-500/20 flex items-start gap-3"
          >
            <img
              src={profile.avatar_url}
              alt={profile.login}
              className="w-12 h-12 rounded-full border border-[#30363d]"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-[#0969da] hover:text-[#0860ca] truncate">
                {profile.login}
              </h3>
              {profile.name && (
                <p className="text-[#8b949e] text-sm truncate">{profile.name}</p>
              )}
              <p className="text-[#8b949e] text-xs mt-1">⭐ {profile.followers} followers</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
