import React from 'react';

export default function ProfileCard({ user }) {
  if (!user) return null;

  const joinedDate = new Date(user.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-lg overflow-hidden hover:border-[#0969da] transition-all">
      {/* Header Background */}
      <div className="h-32 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-[#30363d]"></div>

      <div className="px-8 pb-8">
        {/* Avatar */}
        <div className="flex items-end gap-6 -mt-16 mb-6">
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-32 h-32 rounded-full border-4 border-[#161b22] shadow-lg"
          />
          <div className="flex-1 pb-2">
            <h1 className="text-4xl font-bold text-[#c9d1d9] mb-1">{user.name || user.login}</h1>
            <p className="text-lg text-[#8b949e]">@{user.login}</p>
          </div>
        </div>

        {/* Bio */}
        {user.bio && (
          <p className="text-[#c9d1d9] mb-6 text-base leading-relaxed max-w-2xl">{user.bio}</p>
        )}

        {/* Meta Info */}
        <div className="flex flex-wrap gap-4 mb-8 text-sm text-[#8b949e]">
          {user.location && (
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              </svg>
              {user.location}
            </div>
          )}
          {user.blog && (
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
              </svg>
              <a href={user.blog} target="_blank" rel="noopener noreferrer" className="text-[#0969da] hover:underline">
                {user.blog}
              </a>
            </div>
          )}
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            </svg>
            Joined {joinedDate}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-[#0d1117] border border-[#30363d] rounded-lg p-4 text-center hover:border-[#0969da] transition">
            <div className="stat-number">{user.public_repos}</div>
            <p className="text-[#8b949e] text-sm mt-2">Repositories</p>
          </div>
          <div className="bg-[#0d1117] border border-[#30363d] rounded-lg p-4 text-center hover:border-[#0969da] transition">
            <div className="stat-number">{user.followers}</div>
            <p className="text-[#8b949e] text-sm mt-2">Followers</p>
          </div>
          <div className="bg-[#0d1117] border border-[#30363d] rounded-lg p-4 text-center hover:border-[#0969da] transition">
            <div className="stat-number">{user.following}</div>
            <p className="text-[#8b949e] text-sm mt-2">Following</p>
          </div>
          <div className="bg-[#0d1117] border border-[#30363d] rounded-lg p-4 text-center hover:border-[#0969da] transition">
            <div className="stat-number">{user.public_gists}</div>
            <p className="text-[#8b949e] text-sm mt-2">Gists</p>
          </div>
        </div>
      </div>
    </div>
  );
}
