// src/components/managerPanel/ManagerNavbar.jsx
import React from 'react';
import { FiMenu, FiSearch, FiBell } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const getInitials = (name = '') => name.split(' ').filter(Boolean).map(part => part[0]).join('').slice(0, 2).toUpperCase() || 'PM';

const ManagerNavbar = ({ onMenuClick }) => {
  const { user } = useAuth();
  const displayName = user?.name || 'Project Manager';
  const displayRole = user?.role || 'Project Manager';
  const avatar = user?.avatar || getInitials(displayName);
  const profilePhotoUrl = user?.profilePhotoUrl;

  return (
    <nav className="mgr-navbar">
      <div className="mgr-navbar-content">
        <div className="mgr-navbar-left">
          <button className="mgr-menu-toggle" onClick={onMenuClick}><FiMenu /></button>
          <div className="mgr-search-wrapper">
            <FiSearch className="mgr-search-icon" />
            <input type="text" className="mgr-search-input" placeholder="Search projects, tasks, team..." />
          </div>
        </div>
        <div className="mgr-navbar-right">
          <button className="mgr-notif-btn"><FiBell /><span className="mgr-notif-badge">5</span></button>
          <div className="mgr-user-profile">
            <div className="mgr-avatar">{profilePhotoUrl ? <img src={profilePhotoUrl} alt={displayName} /> : avatar}</div>
            <div className="mgr-user-info">
              <span className="mgr-user-name">{displayName}</span>
              <span className="mgr-user-role">{displayRole}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ManagerNavbar;