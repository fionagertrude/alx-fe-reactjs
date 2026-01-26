import React from 'react';
import './UserCard.css';

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
    blog
  } = user;

  return (
    <div className="user-card">
      <div className="user-header">
        <img
          src={avatar_url}
          alt={`${login}'s avatar`}
          className="user-avatar"
          loading="lazy"
        />
        <div className="user-info">
          <h3 className="user-name">
            {name || login}
            {name && <span className="user-login">@{login}</span>}
          </h3>
          {bio && <p className="user-bio">{bio}</p>}
        </div>
      </div>
      
      <div className="user-stats">
        <div className="stat">
          <span className="stat-number">{public_repos}</span>
          <span className="stat-label">Repositories</span>
        </div>
        <div className="stat">
          <span className="stat-number">{followers}</span>
          <span className="stat-label">Followers</span>
        </div>
        <div className="stat">
          <span className="stat-number">{following}</span>
          <span className="stat-label">Following</span>
        </div>
      </div>

      {(location || company || blog) && (
        <div className="user-details">
          {company && (
            <div className="detail">
              <span className="detail-icon">🏢</span>
              <span className="detail-text">{company}</span>
            </div>
          )}
          {location && (
            <div className="detail">
              <span className="detail-icon">📍</span>
              <span className="detail-text">{location}</span>
            </div>
          )}
          {blog && (
            <div className="detail">
              <span className="detail-icon">🔗</span>
              <a
                href={blog.startsWith('http') ? blog : `https://${blog}`}
                target="_blank"
                rel="noopener noreferrer"
                className="detail-text link"
              >
                {blog}
              </a>
            </div>
          )}
        </div>
      )}

      <a
        href={html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="view-profile-btn"
      >
        View GitHub Profile →
      </a>
    </div>
  );
}

export default UserCard;