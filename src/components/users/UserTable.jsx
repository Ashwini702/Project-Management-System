// src/components/users/UserTable.jsx
import React from 'react';
import { FiEye, FiEdit2, FiTrash2 } from 'react-icons/fi';
import UserRoleBadge from './UserRoleBadge';

const UserTable = ({ users, onView, onEdit, onDelete }) => {
  const getStatusBadge = (status) => {
    const badgeMap = {
      'Active': 'status-badge-active',
      'Inactive': 'status-badge-inactive',
      'Pending': 'status-badge-pending'
    };
    return badgeMap[status] || 'status-badge-default';
  };

  return (
    <div className="table-responsive">
      <table className="table users-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Department</th>
            <th>Assigned Projects</th>
            <th>Status</th>
            <th>Last Login</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="9" className="text-center py-5">
                <div className="no-data-message">
                  <p className="text-muted mb-0">No users found</p>
                </div>
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="user-cell">
                    <div className="user-avatar-sm">
                      {user.avatar || user.name.charAt(0)}
                    </div>
                    <div className="user-cell-info">
                      <span className="user-cell-name">{user.name}</span>
                      <span className="user-cell-role-text">{user.role}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="user-email">{user.email}</span>
                </td>
                <td>{user.phone}</td>
                <td>
                  <UserRoleBadge role={user.role} />
                </td>
                <td>{user.department}</td>
                <td>
                  <div className="projects-cell">
                    {user.assignedProjects?.length > 0 ? (
                      <>
                        <span className="project-count-badge">
                          {user.assignedProjects.length} Projects
                        </span>
                        <div className="project-tooltip">
                          {user.assignedProjects.map((project, index) => (
                            <span key={index} className="project-tag">{project}</span>
                          ))}
                        </div>
                      </>
                    ) : (
                      <span className="text-muted">No projects</span>
                    )}
                  </div>
                </td>
                <td>
                  <span className={`status-badge ${getStatusBadge(user.status)}`}>
                    {user.status}
                  </span>
                </td>
                <td>
                  <span className="last-login">{user.lastLogin}</span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="action-btn-icon view-btn"
                      onClick={() => onView(user)}
                      title="View Details"
                    >
                      <FiEye />
                    </button>
                    <button
                      className="action-btn-icon edit-btn"
                      onClick={() => onEdit(user)}
                      title="Edit User"
                    >
                      <FiEdit2 />
                    </button>
                    <button
                      className="action-btn-icon delete-btn"
                      onClick={() => onDelete(user)}
                      title="Delete User"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;