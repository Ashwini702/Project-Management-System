import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FiGrid, FiUsers, FiFolder, FiCheckSquare, FiUserCheck,
  FiBriefcase, FiCalendar, FiVideo, FiBarChart2, FiDollarSign,
  FiBell, FiActivity, FiDatabase, FiSettings, FiLogOut, FiShield
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const menuItems = [
  { id: 1, label: 'Dashboard', path: '/admin/dashboard', icon: FiGrid },
  { id: 2, label: 'Users & Roles', path: '/admin/users', icon: FiUsers },
  { id: 3, label: 'Projects', path: '/admin/projects', icon: FiFolder },
  { id: 4, label: 'Tasks', path: '/admin/tasks', icon: FiCheckSquare },
  { id: 5, label: 'Team', path: '/admin/team', icon: FiUserCheck },
  { id: 6, label: 'Clients', path: '/admin/clients', icon: FiBriefcase },
  { id: 7, label: 'Calendar', path: '/admin/calendar', icon: FiCalendar },
  { id: 8, label: 'Meetings', path: '/admin/meetings', icon: FiVideo },
  { id: 9, label: 'Reports', path: '/admin/reports', icon: FiBarChart2 },
  { id: 10, label: 'Budget & Expenses', path: '/admin/budget', icon: FiDollarSign },
  { id: 11, label: 'Attendance', path: '/admin/attendance', icon: FiCalendar },
  { id: 11, label: 'Notifications', path: '/admin/notifications', icon: FiBell },
  { id: 12, label: 'Activity Logs', path: '/admin/activity-logs', icon: FiActivity },
  { id: 13, label: 'Backup & Restore', path: '/admin/backup', icon: FiDatabase },
  { id: 14, label: 'Settings', path: '/admin/settings', icon: FiSettings }
];

const AdminSidebar = ({ isOpen, onClose }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };


  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon">
              <FiShield />
            </div>
            <div className="sidebar-logo-text">
              <h5>PMS Admin</h5>
              <small>Management System</small>
            </div>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="sidebar-nav">
          <ul className="sidebar-menu">
            {menuItems.map((item) => (
              <li key={item.id} className="sidebar-menu-item">
                <NavLink
                  to={item.path}
                  end={item.path === '/admin/dashboard'}
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

        {/* Sidebar Footer / Logout */}
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

export default AdminSidebar;
