import React from 'react';

export default function ProfileCard({ user }) {
  if (!user) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto mb-8">
      <img
        src={user.avatar_url}
        alt={user.login}
        className="w-24 h-24 rounded-full mx-auto mb-4"
      />
      <h1 className="text-2xl font-bold text-center mb-2">{user.name || user.login}</h1>
      <p className="text-gray-600 text-center mb-4">@{user.login}</p>
      {user.bio && (
        <p className="text-gray-700 text-center mb-4">{user.bio}</p>
      )}
      <div className="grid grid-cols-3 gap-4 text-center border-t pt-4">
        <div>
          <p className="text-2xl font-bold text-blue-500">{user.public_repos}</p>
          <p className="text-sm text-gray-600">Repos</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-blue-500">{user.followers}</p>
          <p className="text-sm text-gray-600">Followers</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-blue-500">{user.following}</p>
          <p className="text-sm text-gray-600">Following</p>
        </div>
      </div>
    </div>
  );
}
