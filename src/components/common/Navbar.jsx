// src/components/common/Navbar.jsx
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiMenu, FiSearch, FiBell } from 'react-icons/fi';
import { projectsData } from '../../data/projectData';
import { tasksData } from '../../data/taskData';
import { teamMembersData } from '../../data/teamData';
import { meetingsData } from '../../data/meetingData';
import { clientsData } from '../../data/clientData';
import { usersData } from '../../data/userData';
import { projectBudgets, expenses, clientBillings, invoices } from '../../data/budgetData';

const searchableGroups = [
  {
    type: 'Project',
    path: '/admin/projects',
    items: projectsData,
    title: (item) => item.title,
    subtitle: (item) => `${item.client || 'Client'} • ${item.status || 'Status'}`
  },
  {
    type: 'Task',
    path: '/admin/tasks',
    items: tasksData,
    title: (item) => item.title,
    subtitle: (item) => `${item.project || 'Project'} • ${item.assignee || 'Assignee'}`
  },
  {
    type: 'Team',
    path: '/admin/team',
    items: teamMembersData,
    title: (item) => item.name,
    subtitle: (item) => `${item.role || 'Role'} • ${item.department || 'Department'}`
  },
  {
    type: 'Meeting',
    path: '/admin/meetings',
    items: meetingsData,
    title: (item) => item.title,
    subtitle: (item) => `${item.project || item.type || 'Meeting'} • ${item.status || 'Status'}`
  },
  {
    type: 'Client',
    path: '/admin/clients',
    items: clientsData,
    title: (item) => item.name || item.companyName,
    subtitle: (item) => `${item.company || item.email || 'Client'} • ${item.status || 'Status'}`
  },
  {
    type: 'User',
    path: '/admin/users',
    items: usersData,
    title: (item) => item.name,
    subtitle: (item) => `${item.role || 'Role'} • ${item.email || 'Email'}`
  },
  {
    type: 'Budget',
    path: '/admin/budget',
    items: projectBudgets,
    title: (item) => item.projectName,
    subtitle: (item) => `${item.clientName || 'Client'} • ${item.paymentStatus || 'Status'}`
  },
  {
    type: 'Expense',
    path: '/admin/budget',
    items: expenses,
    title: (item) => item.title,
    subtitle: (item) => `${item.project || 'Project'} • ${item.category || 'Category'}`
  },
  {
    type: 'Billing',
    path: '/admin/budget',
    items: clientBillings,
    title: (item) => item.clientName,
    subtitle: (item) => `${item.project || 'Project'} • ${item.paymentStatus || 'Status'}`
  },
  {
    type: 'Invoice',
    path: '/admin/budget',
    items: invoices,
    title: (item) => item.invoiceNumber,
    subtitle: (item) => `${item.clientName || 'Client'} • ${item.projectName || 'Project'}`
  }
];

const getInitials = (name = '') => {
  const initials = name
    .trim()
    .split(/\\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  return initials || 'AU';
};

const Navbar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const displayName = user?.name || 'Admin User';
  const displayRole = user?.designation || user?.role || 'Administrator';
  const displayAvatar = user?.avatar || getInitials(displayName);
  const profilePhotoUrl = user?.profile_image_name ? `http://${window.location.hostname}:5000/uploads/profiles/${encodeURIComponent(user.profile_image_name)}` : '';

  const searchResults = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return [];

    return searchableGroups
      .flatMap((group) =>
        group.items.map((item) => ({
          id: `${group.type}-${item.id}`,
          type: group.type,
          path: group.path,
          title: group.title(item),
          subtitle: group.subtitle(item),
          searchText: Object.values(item).join(' ').toLowerCase()
        }))
      )
      .filter((item) => item.title && item.searchText.includes(query))
      .slice(0, 8);
  }, [searchTerm]);

  const hasSearchTerm = searchTerm.trim().length > 0;
  const showResults = isSearchOpen && hasSearchTerm;

  const handleResultClick = (path) => {
    navigate(path);
    setSearchTerm('');
    setIsSearchOpen(false);
  };

  return (
    <nav className="dashboard-navbar admin-navbar">
      <div className="navbar-content admin-navbar-content">
        <div className="navbar-left admin-navbar-left">
          <button className="menu-toggle-btn" onClick={onMenuClick}>
            <FiMenu />
          </button>

          <div className="search-wrapper admin-search-wrapper navbar-search-wrapper">
            <FiSearch className="search-icon navbar-search-icon" />
            <input
              type="text"
              className="search-input navbar-search-input"
              placeholder="Search projects, tasks, team..."
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
                setIsSearchOpen(true);
              }}
              onFocus={() => setIsSearchOpen(true)}
              onBlur={() => setTimeout(() => setIsSearchOpen(false), 160)}
            />

            {showResults && (
              <div className="navbar-search-results">
                {searchResults.length > 0 ? (
                  searchResults.map((result) => (
                    <button
                      key={result.id}
                      type="button"
                      className="navbar-search-result"
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => handleResultClick(result.path)}
                    >
                      <span className="navbar-search-result-type">{result.type}</span>
                      <span className="navbar-search-result-copy">
                        <strong>{result.title}</strong>
                        <small>{result.subtitle}</small>
                      </span>
                    </button>
                  ))
                ) : (
                  <div className="navbar-search-empty">No results found</div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="navbar-right admin-navbar-right">
          <button className="action-btn notification-btn">
            <FiBell />
            <span className="notification-badge">5</span>
          </button>

          <div className="user-profile admin-user-profile">
            <div className="admin-avatar">{profilePhotoUrl ? <img src={profilePhotoUrl} alt={displayName} /> : displayAvatar}</div>
            <div className="user-info">
              <h6 className="user-name">{displayName}</h6>
              <span className="user-role">{displayRole}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;




