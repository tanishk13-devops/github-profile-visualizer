import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ContributionGraph({ repos }) {
  if (!repos || repos.length === 0) return null;

  // Calculate activity data - repos created by year
  const activityMap = {};
  repos.forEach((repo) => {
    if (repo.created_at) {
      const year = new Date(repo.created_at).getFullYear();
      activityMap[year] = (activityMap[year] || 0) + 1;
    }
  });

  if (Object.keys(activityMap).length === 0) return null;

  const data = Object.entries(activityMap)
    .map(([year, count]) => ({
      year: parseInt(year),
      repos: count
    }))
    .sort((a, b) => a.year - b.year);

  return (
    <div className="max-w-4xl mx-auto mb-8">
      <h2 className="text-2xl font-bold mb-4">Repositories Over Time</h2>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="repos" fill="#8884d8" name="Repositories Created" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
