import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function RecentActivity({ username }) {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      if (!username) return;

      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}/events/public`,
          {
            params: { per_page: 10 },
            headers: { 'Accept': 'application/vnd.github.v3+json' }
          }
        );
        setEvents(response.data || []);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [username]);

  if (isLoading) {
    return (
      <div className="card p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-[#30363d] rounded w-1/3"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-[#30363d] rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (events.length === 0) return null;

  const getEventIcon = (type) => {
    const icons = {
      'PushEvent': '📤',
      'CreateEvent': '✨',
      'PullRequestEvent': '🔀',
      'IssuesEvent': '🐛',
      'WatchEvent': '⭐',
      'ForkEvent': '🍴',
      'DeleteEvent': '🗑️',
      'ReleaseEvent': '🚀',
    };
    return icons[type] || '📝';
  };

  const getEventDescription = (event) => {
    const { type, repo, payload } = event;

    const descriptions = {
      'PushEvent': `Pushed ${payload?.commits?.length || 1} commit(s)`,
      'CreateEvent': `Created ${payload?.ref_type || 'branch'}`,
      'PullRequestEvent': `${payload?.action} pull request`,
      'IssuesEvent': `${payload?.action} issue`,
      'WatchEvent': `Starred repository`,
      'ForkEvent': `Forked repository`,
      'DeleteEvent': `Deleted ${payload?.ref_type || 'branch'}`,
      'ReleaseEvent': `Released ${payload?.release?.tag_name || 'version'}`,
    };

    return descriptions[type] || type?.replace('Event', '');
  };

  return (
    <div className="card p-6">
      <h2 className="text-2xl font-bold text-[#c9d1d9] mb-6 flex items-center gap-2">
        <svg className="w-6 h-6 text-[#0969da]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2V17zm4 0h-2V7h2V17zm4 0h-2v-4h2V17z" />
        </svg>
        Recent Activity
      </h2>

      <div className="space-y-3">
        {events.slice(0, 8).map((event, index) => (
          <div
            key={event.id}
            className="flex items-start gap-4 p-3 rounded-lg border border-[#30363d] hover:border-[#0969da] transition"
          >
            <span className="text-2xl flex-shrink-0">{getEventIcon(event.type)}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <a
                  href={`https://github.com/${event.repo.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#0969da] hover:text-[#0860ca] truncate text-sm"
                >
                  {event.repo.name}
                </a>
                <span className="text-[#8b949e] text-xs flex-shrink-0">#{index + 1}</span>
              </div>
              <p className="text-[#8b949e] text-sm">{getEventDescription(event)}</p>
              <p className="text-[#8b949e] text-xs mt-1">
                {new Date(event.created_at).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
