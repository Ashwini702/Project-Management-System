import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMenu, FiSearch, FiBell } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const TeamNavbar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const initials = user?.name
    ? user.name.split(' ').filter(Boolean).map(part => part[0]).join('').slice(0, 2).toUpperCase()
    : 'TM';

  return (
    <nav className="team-navbar">
      <div className="team-navbar-content">
        <div className="team-navbar-left">
          <button className="team-menu-toggle" onClick={onMenuClick}><FiMenu /></button>
          <div className="team-search-wrapper">
            <FiSearch className="team-search-icon" />
            <input type="text" className="team-search-input" placeholder="Search tasks, projects..." />
          </div>
        </div>
        <div className="team-navbar-right">
          <button className="team-notif-btn" onClick={() => navigate('/team/notifications')}><FiBell /><span className="team-notif-badge">3</span></button>
          <button type="button" className="team-user-profile" onClick={() => navigate('/team/profile')} aria-label="Open profile">
            <div className="team-avatar">{user?.profile_image_name ? <img src={`${window.location.origin.replace(/:\\d+$/, ':5000')}/uploads/profiles/${encodeURIComponent(user.profile_image_name)}`} alt={user?.name || 'Team Member'} /> : (user?.avatar || initials)}</div>
            <div className="team-user-info">
              <span className="team-user-name">{user?.name || 'Team Member'}</span>
              <span className="team-user-role">{user?.designation || user?.role || 'Team Member'}</span>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default TeamNavbar;
