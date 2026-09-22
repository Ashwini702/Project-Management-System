// src/pages/admin/Users.jsx
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import * as userService from '../../services/userService';
import { apiData } from '../../services/api';
import AdminLayout from '../../layouts/AdminLayout';
import PageHeader from '../../components/common/PageHeader';
import UserStatsCard from '../../components/users/UserStatsCard';
import UserTable from '../../components/users/UserTable';
import UserFormModal from '../../components/users/UserFormModal';
import UserPermissionCard from '../../components/users/UserPermissionCard';
import { FiBriefcase, FiSearch, FiRotateCcw, FiShield, FiUser, FiUserCheck, FiUsers, FiX } from 'react-icons/fi';

import '../../styles/users.css';


const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [departmentFilter, setDepartmentFilter] = useState('All Departments');

  // Modal states
  const [showFormModal, setShowFormModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [alert, setAlert] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toUiUser = (user) => {
    let assignedProjects = user.assigned_projects || user.assignedProjects || [];
    if (typeof assignedProjects === 'string') {
      try { assignedProjects = JSON.parse(assignedProjects); } catch { assignedProjects = []; }
    }
    return {
      ...user,
      assignedProjects,
      profileImageName: user.profile_image_name || user.profileImageName || '',
      avatar: user.avatar || user.name?.split(' ').map(part => part[0]).join('').toUpperCase().slice(0, 2),
      lastLogin: user.lastLogin || 'Never',
      createdDate: user.created_at ? String(user.created_at).slice(0, 10) : ''
    };
  };

  useEffect(() => {
    userService.getUsers()
      .then(response => setUsers(apiData(response).map(toUiUser)))
      .catch(error => showAlert(error.response?.data?.message || 'Unable to load users.', 'danger'));
  }, []);


  const roles = useMemo(() => [...new Set(users.map(user => user.role).filter(Boolean))].sort(), [users]);
  const departments = useMemo(() => [...new Set(users.map(user => user.department).filter(Boolean))].sort(), [users]);
  const statuses = useMemo(() => [...new Set(users.map(user => user.status).filter(Boolean))].sort(), [users]);

  const userStatsData = useMemo(() => [
    { id: 'total', title: 'Total Users', value: users.length, icon: FiUsers, description: 'Live user accounts', color: 'primary' },
    { id: 'active', title: 'Active Users', value: users.filter(user => user.status === 'Active').length, icon: FiUserCheck, description: 'Currently active accounts', color: 'success' },
    { id: 'team', title: 'Team Members', value: users.filter(user => user.role === 'Team Member').length, icon: FiUser, description: 'Live team accounts', color: 'info' },
    { id: 'managers', title: 'Project Managers', value: users.filter(user => user.role === 'Project Manager').length, icon: FiShield, description: 'Live manager accounts', color: 'purple' },
  ], [users]);

  const rolePermissionsData = useMemo(() => {
    const roleStyle = {
      Admin: { icon: FiShield, color: 'purple' },
      'Project Manager': { icon: FiUserCheck, color: 'success' },
      'Team Member': { icon: FiUser, color: 'info' },
      Client: { icon: FiBriefcase, color: 'warning' },
    };
    return roles.map(role => {
      const roleUsers = users.filter(user => user.role === role);
      const activeCount = roleUsers.filter(user => user.status === 'Active').length;
      const style = roleStyle[role] || { icon: FiUsers, color: 'primary' };
      return { role, icon: style.icon, color: style.color, permissions: [`${roleUsers.length} total user${roleUsers.length === 1 ? '' : 's'}`, `${activeCount} active account${activeCount === 1 ? '' : 's'}`] };
    });
  }, [roles, users]);
  // Filter users
  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole = roleFilter === 'All Roles' || user.role === roleFilter;
      const matchesStatus = statusFilter === 'All Status' || user.status === statusFilter;
      const matchesDepartment =
        departmentFilter === 'All Departments' || user.department === departmentFilter;

      return matchesSearch && matchesRole && matchesStatus && matchesDepartment;
    });
  }, [users, searchTerm, roleFilter, statusFilter, departmentFilter]);

  const resetFilters = () => {
    setSearchTerm('');
    setRoleFilter('All Roles');
    setStatusFilter('All Status');
    setDepartmentFilter('All Departments');
  };

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  // CRUD handlers
  const handleAddUser = () => {
    setSelectedUser(null);
    setShowFormModal(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowFormModal(true);
  };

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!selectedUser) return;
    try {
      await userService.deleteUser(selectedUser.id);
      setUsers(current => current.filter(user => user.id !== selectedUser.id));
      setShowDeleteModal(false);
      setSelectedUser(null);
      showAlert('User deleted successfully!', 'success');
    } catch (error) {
      showAlert(error.response?.data?.message || 'Unable to delete user.', 'danger');
    }
  };

  const getNextUserId = () => {
    if (users.length === 0) return 1;
    return Math.max(...users.map(user => user.id)) + 1;
  };

  const handleFormSubmit = useCallback(async (formData) => {
    setIsSubmitting(true);
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      department: formData.department,
      status: formData.status,
      avatar: formData.name.split(' ').map(part => part[0]).join('').toUpperCase().slice(0, 2),
      assigned_projects: JSON.stringify(formData.assignedProjects || []),
      profile_image_name: formData.profileImageName || ''
    };
    if (formData.password) payload.password = formData.password;
    try {
      const response = selectedUser
        ? await userService.updateUser(selectedUser.id, payload)
        : await userService.createUser(payload);
      const saved = toUiUser(apiData(response));
      setUsers(current => selectedUser
        ? current.map(user => user.id === selectedUser.id ? saved : user)
        : [saved, ...current]);
      showAlert(selectedUser ? 'User updated successfully!' : 'User saved successfully!', 'success');
      setShowFormModal(false);
      setSelectedUser(null);
    } catch (error) {
      showAlert(error.response?.data?.message || 'Unable to save user.', 'danger');
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }, [selectedUser]);

  const handleModalClose = () => {
    setShowFormModal(false);
    setSelectedUser(null);
    // Reset any potential errors in the modal via its internal effect
  };

  return (
    <AdminLayout>
      <PageHeader
        title="User Role Management"
        subtitle="Manage admins, project managers, team members, clients, roles, and access permissions."
        buttonText="Add New User"
        onButtonClick={handleAddUser}
        showButton={true}
      />

      {/* Alert Message */}
      {alert && (
        <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
          {alert.message}
          <button
            type="button"
            className="btn-close"
            onClick={() => setAlert(null)}
            aria-label="Close alert"
          />
        </div>
      )}

      {/* User Statistics Cards */}
      <div className="user-stats-grid">
        {userStatsData.map(stat => (
          <UserStatsCard key={stat.id} stat={stat} />
        ))}
      </div>

      {/* Search and Filter Section */}
      <div className="filter-section">
        <div className="filter-row">
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input
              type="text"
              className="form-control search-input"
              placeholder="Search by name, email, or role..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-selects">
            <select
              className="form-select"
              value={roleFilter}
              onChange={e => setRoleFilter(e.target.value)}
            >
              <option value="All Roles">All Roles</option>
              {roles.map(role => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>

            <select
              className="form-select"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
            >
              <option value="All Status">All Status</option>
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            <select
              className="form-select"
              value={departmentFilter}
              onChange={e => setDepartmentFilter(e.target.value)}
            >
              <option value="All Departments">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <button className="btn btn-light reset-btn" onClick={resetFilters}>
            <FiRotateCcw className="me-2" />
            Reset
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="users-table-card">
        <div className="card-header-custom">
          <h5 className="card-title-custom">
            All Users
            <span className="user-count-badge">{filteredUsers.length}</span>
          </h5>
        </div>
        <UserTable
          users={filteredUsers}
          onView={handleViewUser}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
        />
      </div>

      {/* Role Permissions Section */}
      <div className="permissions-section">
        <div className="section-header">
          <h3 className="section-title">Live Role Summary</h3>
          <p className="section-subtitle">
            Roles and account counts from the current user database
          </p>
        </div>
        <div className="permissions-grid">
          {rolePermissionsData.map((permission, index) => (
            <UserPermissionCard key={index} permission={permission} />
          ))}
        </div>
      </div>

      {/* Add/Edit User Modal */}
      <UserFormModal
        show={showFormModal}
        onClose={handleModalClose}
        onSubmit={handleFormSubmit}
        editUser={selectedUser}
      />

      {/* View User Modal */}
      {showViewModal && selectedUser && (
        <div className="modal-overlay">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">User Details</h5>
                <button
                  className="modal-close-btn"
                  onClick={() => {
                    setShowViewModal(false);
                    setSelectedUser(null);
                  }}
                  aria-label="Close details"
                >
                  <FiX />
                </button>
              </div>
              <div className="modal-body">
                <div className="view-user-details">
                  <div className="view-user-avatar">{selectedUser.avatar}</div>
                  <div className="detail-row">
                    <span className="detail-label">Name</span>
                    <span className="detail-value">{selectedUser.name}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Email</span>
                    <span className="detail-value">{selectedUser.email}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Phone</span>
                    <span className="detail-value">{selectedUser.phone}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Role</span>
                    <span className="detail-value">{selectedUser.role}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Department</span>
                    <span className="detail-value">{selectedUser.department}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Assigned Projects</span>
                    <span className="detail-value">
                      {selectedUser.assignedProjects?.join(', ') || 'None'}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Status</span>
                    <span className="detail-value">{selectedUser.status}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Last Login</span>
                    <span className="detail-value">{selectedUser.lastLogin}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Created Date</span>
                    <span className="detail-value">{selectedUser.createdDate}</span>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-light"
                  onClick={() => {
                    setShowViewModal(false);
                    setSelectedUser(null);
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedUser && (
        <div className="modal-overlay">
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete User</h5>
                <button
                  className="modal-close-btn"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedUser(null);
                  }}
                  aria-label="Cancel delete"
                >
                  <FiX />
                </button>
              </div>
              <div className="modal-body">
                <div className="delete-confirmation">
                  <p>Are you sure you want to delete this user?</p>
                  <div className="delete-user-info">
                    <strong>{selectedUser.name}</strong>
                    <span>{selectedUser.email}</span>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-light"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedUser(null);
                  }}
                >
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={confirmDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Users;




