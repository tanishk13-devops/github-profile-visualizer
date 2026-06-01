import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ContributionGraph({ repos }) {
  if (!repos || repos.length === 0) return null;

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
    <div className="w-full">
      <div className="card p-6">
        <h2 className="text-2xl font-bold text-[#c9d1d9] mb-6 flex items-center gap-2">
          <svg className="w-6 h-6 text-[#0969da]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-3.84-4.74c-.26-.32-.71-.32-.98 0-.25.31-.24.78.02 1.07L7.2 16h9.47c.41 0 .75-.34.75-.75 0-.41-.34-.75-.75-.75H7.2l8.26-9.47c.26-.32.27-.79.02-1.07-.28-.33-.71-.34-.99 0l-8.04 10.56z" />
          </svg>
          Repository Timeline
        </h2>

        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#30363d" />
            <XAxis 
              dataKey="year"
              stroke="#8b949e"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#8b949e"
              style={{ fontSize: '12px' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#0d1117',
                border: '1px solid #30363d',
                borderRadius: '6px',
                color: '#c9d1d9'
              }}
              labelStyle={{ color: '#c9d1d9' }}
              formatter={(value) => [value, 'Repositories']}
            />
            <Bar 
              dataKey="repos" 
              fill="#0969da" 
              name="Repositories Created"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>

        {/* Stats Footer */}
        <div className="mt-6 pt-6 border-t border-[#30363d] grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-[#0969da]">{data.length}</div>
            <p className="text-[#8b949e] text-sm">Years Active</p>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#0969da]">{data.reduce((sum, d) => sum + d.repos, 0)}</div>
            <p className="text-[#8b949e] text-sm">Total Repos</p>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#0969da]">{Math.round(data.reduce((sum, d) => sum + d.repos, 0) / data.length)}</div>
            <p className="text-[#8b949e] text-sm">Per Year Avg</p>
          </div>
        </div>
      </div>
    </div>
  );
}
