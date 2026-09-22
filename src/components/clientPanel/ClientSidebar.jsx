import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FiGrid, FiFolder, FiFileText, FiMessageSquare,
  FiMail, FiBell, FiCreditCard, FiCalendar, FiUser, FiLogOut
} from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const menuItems = [
  { id: 1, label: 'Dashboard', path: '/client/dashboard', icon: FiGrid },
  { id: 2, label: 'My Projects', path: '/client/projects', icon: FiFolder },
  { id: 3, label: 'Project Files', path: '/client/files', icon: FiFileText },
  { id: 4, label: 'Feedback', path: '/client/feedback', icon: FiMessageSquare },
  { id: 5, label: 'Messages', path: '/client/messages', icon: FiMail },
  { id: 6, label: 'Notifications', path: '/client/notifications', icon: FiBell },
  { id: 7, label: 'Invoices', path: '/client/invoices', icon: FiCreditCard },
  { id: 8, label: 'Attendance', path: '/client/attendance', icon: FiCalendar },
  { id: 9, label: 'Profile', path: '/client/profile', icon: FiUser }
];

const ClientSidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const getInitials = (name) => {
    if (!name) return 'CL';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <>
      {isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon client-logo-icon">PC</div>
            <div className="sidebar-logo-text">
              <h5>PMS Client</h5>
              <small>Client Portal</small>
            </div>
          </div>
        </div>

        <div className="sidebar-user">
          <div className="sidebar-user-avatar">
            {user?.profilePhotoUrl ? <img src={user.profilePhotoUrl} alt={user?.name || 'Client'} /> : (user?.avatar || getInitials(user?.name))}
          </div>
          <div className="sidebar-user-info">
            <span className="sidebar-user-name">{user?.name || 'Client'}</span>
            <span className="sidebar-user-role">{user?.role || 'Client'}</span>
          </div>
          <span className="sidebar-user-status" title="Online"></span>
        </div>

        <nav className="sidebar-nav">
          <ul className="sidebar-menu">
            {menuItems.map((item) => (
              <li key={item.id} className="sidebar-menu-item">
                <NavLink
                  to={item.path}
                  end={item.path === '/client/dashboard'}
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

export default ClientSidebar;
