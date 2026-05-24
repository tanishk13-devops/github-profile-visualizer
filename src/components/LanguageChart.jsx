import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF7C7C'];

export default function LanguageChart({ repos }) {
  if (!repos || repos.length === 0) return null;

  // Calculate language breakdown
  const languageMap = {};
  repos.forEach((repo) => {
    if (repo.language) {
      languageMap[repo.language] = (languageMap[repo.language] || 0) + 1;
    }
  });

  if (Object.keys(languageMap).length === 0) return null;

  const data = Object.entries(languageMap).map(([name, value]) => ({
    name,
    value
  }));

  return (
    <div className="max-w-2xl mx-auto mb-8">
      <h2 className="text-2xl font-bold mb-4">Languages Used</h2>
      <div className="bg-white rounded-lg shadow-lg p-8">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
