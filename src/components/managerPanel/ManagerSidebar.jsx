// src/components/managerPanel/ManagerSidebar.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FiGrid, FiFolder, FiCheckSquare, FiUsers, FiFlag,
  FiVideo, FiMessageSquare, FiBarChart2, FiBell, FiUser, FiLogOut, FiCalendar
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const menuItems = [
  { id: 1, label: 'Dashboard', path: '/manager/dashboard', icon: FiGrid },
  { id: 2, label: 'My Projects', path: '/manager/projects', icon: FiFolder },
  { id: 3, label: 'Tasks', path: '/manager/tasks', icon: FiCheckSquare },
  { id: 4, label: 'Team Workload', path: '/manager/team-workload', icon: FiUsers },
  { id: 5, label: 'Deadlines', path: '/manager/deadlines', icon: FiFlag },
  { id: 6, label: 'Meetings', path: '/manager/meetings', icon: FiVideo },
  { id: 7, label: 'Client Feedback', path: '/manager/client-feedback', icon: FiMessageSquare },
  { id: 8, label: 'Reports', path: '/manager/reports', icon: FiBarChart2 },
  { id: 9, label: 'Notifications', path: '/manager/notifications', icon: FiBell },
  { id: 10, label: 'Attendance', path: '/manager/attendance', icon: FiCalendar },
  { id: 11, label: 'Profile', path: '/manager/profile', icon: FiUser }
];

const ManagerSidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const getInitials = (name) => {
    if (!name) return 'PM';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon manager-logo-icon">PM</div>
            <div className="sidebar-logo-text">
              <h5>PMS Manager</h5>
              <small>Manager Portal</small>
            </div>
          </div>
        </div>

        <div className="sidebar-user">
          <div className="sidebar-user-avatar">
            {user?.avatar || getInitials(user?.name)}
          </div>
          <div className="sidebar-user-info">
            <span className="sidebar-user-name">{user?.name || 'Project Manager'}</span>
            <span className="sidebar-user-role">{user?.role || 'Project Manager'}</span>
          </div>
          <span className="sidebar-user-status" title="Online"></span>
        </div>

        <nav className="sidebar-nav">
          <ul className="sidebar-menu">
            {menuItems.map((item) => (
              <li key={item.id} className="sidebar-menu-item">
                <NavLink
                  to={item.path}
                  end={item.path === '/manager/dashboard'}
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

export default ManagerSidebar;