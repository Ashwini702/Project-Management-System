import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FiGrid, FiCheckSquare, FiFolder, FiEdit3, FiClock,
  FiFlag, FiBell, FiUser, FiLogOut
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const menuItems = [
  { id: 1, label: 'Dashboard', path: '/team/dashboard', icon: FiGrid },
  { id: 2, label: 'My Tasks', path: '/team/tasks', icon: FiCheckSquare },
  { id: 3, label: 'My Projects', path: '/team/projects', icon: FiFolder },
  { id: 4, label: 'Daily Work Report', path: '/team/daily-report', icon: FiEdit3 },
  { id: 5, label: 'Attendance', path: '/team/attendance', icon: FiClock },
  { id: 6, label: 'Deadlines', path: '/team/deadlines', icon: FiFlag },
  { id: 7, label: 'Notifications', path: '/team/notifications', icon: FiBell },
  { id: 8, label: 'Profile', path: '/team/profile', icon: FiUser }
];

const TeamSidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const getInitials = (name) => {
    if (!name) return 'TM';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon team-logo-icon">PT</div>
            <div className="sidebar-logo-text">
              <h5>PMS Team</h5>
              <small>Team Portal</small>
            </div>
          </div>
        </div>

        <div className="sidebar-user">
          <div className="sidebar-user-avatar">
            {user?.avatar || getInitials(user?.name)}
          </div>
          <div className="sidebar-user-info">
            <span className="sidebar-user-name">{user?.name || 'Team Member'}</span>
            <span className="sidebar-user-role">{user?.role || 'Team Member'}</span>
          </div>
          <span className="sidebar-user-status" title="Online"></span>
        </div>

        <nav className="sidebar-nav">
          <ul className="sidebar-menu">
            {menuItems.map((item) => (
              <li key={item.id} className="sidebar-menu-item">
                <NavLink
                  to={item.path}
                  end={item.path === '/team/dashboard'}
                  className={({ isActive }) =>
                    `sidebar-link ${isActive ? 'active' : ''}`
                  }
                  onClick={() => onClose && onClose()}
                >
                  <item.icon className="sidebar-link-icon" />
                  <span className="sidebar-link-label">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <button className="sidebar-logout-btn" onClick={handleLogout}>
            <FiLogOut className="sidebar-logout-icon" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default TeamSidebar;
