import React from 'react';

function UserCard({ user }) {
  const {
    login,
    avatar_url,
    html_url,
    name,
    bio,
    public_repos,
    followers,
    following,
    location,
    company,
    blog,
    created_at
  } = user;

  // Format join date
  const joinDate = created_at ? new Date(created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  }) : null;

  return (
    <div className="bg-white rounded-xl shadow-github border border-gray-200 overflow-hidden hover:shadow-github-lg transition-shadow duration-300">
      {/* User Header */}
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <img
            src={avatar_url}
            alt={`${login}'s avatar`}
            className="w-20 h-20 rounded-full border-2 border-gray-200"
            loading="lazy"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-gray-900 truncate">
              {name || login}
            </h3>
            {name && (
              <p className="text-gray-600 text-sm truncate">@{login}</p>
            )}
            {joinDate && (
              <p className="text-gray-500 text-xs mt-1">
                Joined {joinDate}
              </p>
            )}
          </div>
        </div>

        {/* Bio */}
        {bio && (
          <p className="mt-4 text-gray-700 line-clamp-2 text-sm">
            {bio}
          </p>
        )}

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 gap-2 py-4 border-t border-b border-gray-100">
          <div className="text-center">
            <div className="text-xl font-bold text-gray-900">{public_repos}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">Repos</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-gray-900">{followers}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-gray-900">{following}</div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">Following</div>
          </div>
        </div>

        {/* Details */}
        <div className="mt-4 space-y-2">
          {company && (
            <div className="flex items-center text-sm text-gray-700">
              <svg className="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
              </svg>
              <span className="truncate">{company}</span>
            </div>
          )}
          
          {location && (
            <div className="flex items-center text-sm text-gray-700">
              <svg className="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="truncate">{location}</span>
            </div>
          )}
          
          {blog && (
            <div className="flex items-center text-sm">
              <svg className="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
              </svg>
              <a
                href={blog.startsWith('http') ? blog : `https://${blog}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 hover:underline truncate"
              >
                {blog.length > 30 ? `${blog.substring(0, 30)}...` : blog}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Profile Link */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <a
          href={html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center bg-white border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition duration-200"
        >
          View GitHub Profile
        </a>
      </div>
    </div>
  );
}

export default UserCard;