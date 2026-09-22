// src/components/clientPanel/ClientNavbar.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMenu, FiSearch, FiBell } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const getInitials = (name) => {
  if (!name) return 'CL';
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
};

const ClientNavbar = ({ onMenuClick }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const displayName = user?.name || 'Client';
  const displayRole = user?.role || 'Client';
  const displayAvatar = user?.avatar || getInitials(displayName);
  const profilePhotoUrl = user?.profilePhotoUrl;

  return (
    <nav className="client-navbar">
      <div className="client-navbar-content">
        <div className="client-navbar-left">
          <button className="client-menu-toggle" onClick={onMenuClick}><FiMenu /></button>
          <div className="client-search-wrapper">
            <FiSearch className="client-search-icon" />
            <input type="search" className="client-search-input" placeholder="Search projects, files..." value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && search.trim()) navigate(`/client/projects?search=${encodeURIComponent(search.trim())}`); }} />
          </div>
        </div>
        <div className="client-navbar-right">
          <button type="button" className="client-notif-btn" aria-label="Open notifications" onClick={() => navigate("/client/notifications")}><FiBell /><span className="client-notif-badge">3</span></button>
          <div className="client-user-profile">
            <div className="client-avatar">{profilePhotoUrl ? <img src={profilePhotoUrl} alt={displayName} /> : displayAvatar}</div>
            <div className="client-user-info">
              <span className="client-user-name">{displayName}</span>
              <span className="client-user-role">{displayRole}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ClientNavbar;
