import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#0969da', '#1f6feb', '#388bfd', '#58a6ff', '#79c0ff', '#a371f7', '#bc8ef7', '#d29922'];

export default function LanguageChart({ repos }) {
  if (!repos || repos.length === 0) return null;

  const languageMap = {};
  repos.forEach((repo) => {
    if (repo.language) {
      languageMap[repo.language] = (languageMap[repo.language] || 0) + 1;
    }
  });

  if (Object.keys(languageMap).length === 0) return null;

  const data = Object.entries(languageMap)
    .map(([name, value]) => ({
      name,
      value,
      percentage: ((value / Object.values(languageMap).reduce((a, b) => a + b)) * 100).toFixed(1)
    }))
    .sort((a, b) => b.value - a.value);

  return (
    <div className="w-full">
      <div className="card p-6">
        <h2 className="text-2xl font-bold text-[#c9d1d9] mb-6 flex items-center gap-2">
          <svg className="w-6 h-6 text-[#0969da]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9.4 16.6L4.8 12l4.6-4.6L6.6 6 0 12l6.6 6 2.8-2.4zm5.2 0l4.6-4.6-4.6-4.6 2.8-2.8L24 12l-6.6 6 2.8 2.4z" />
          </svg>
          Languages
        </h2>
        
        <div className="mb-6">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name} ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#0d1117',
                  border: '1px solid #30363d',
                  borderRadius: '6px',
                  color: '#c9d1d9'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Language List */}
        <div className="space-y-2">
          {data.map((item, index) => (
            <div key={item.name} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></span>
                <span className="text-[#c9d1d9]">{item.name}</span>
              </div>
              <span className="text-[#8b949e]">{item.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
