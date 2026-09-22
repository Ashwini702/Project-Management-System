// src/components/users/UserFormModal.jsx
import React, { useState, useEffect, useRef } from 'react';
import {
  FiBriefcase,
  FiFolder,
  FiLock,
  FiMail,
  FiPhone,
  FiUploadCloud,
  FiUser,
  FiUsers,
  FiX
} from 'react-icons/fi';

const UserFormModal = ({ show, onClose, onSubmit, editUser }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: '',
    department: '',
    assignedProjects: '',
    profileImageName: '',
    status: 'Active'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  // Reset form when modal opens or editUser changes
  useEffect(() => {
    if (show) {
      if (editUser) {
        setFormData({
          name: editUser.name || '',
          email: editUser.email || '',
          phone: editUser.phone || '',
          password: '',
          role: editUser.role || '',
          department: editUser.department || '',
          assignedProjects: editUser.assignedProjects?.join(', ') || '',
          profileImageName: editUser.profileImageName || '',
          status: editUser.status || 'Active'
        });
      } else {
        setFormData({
          name: '',
          email: '',
          phone: '',
          password: '',
          role: '',
          department: '',
          assignedProjects: '',
          profileImageName: '',
          status: 'Active'
        });
      }
      setErrors({});
      // Reset file input when modal opens
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [editUser, show]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!editUser && !formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    if (!formData.role) {
      newErrors.role = 'Role is required';
    }

    if (!formData.department) {
      newErrors.department = 'Department is required';
    }

    if (!formData.status) {
      newErrors.status = 'Status is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear field-specific error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, profileImageName: 'Image must be 2 MB or smaller' }));
      // Reset file input so user can try again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      return;
    }

    setFormData(prev => ({
      ...prev,
      profileImageName: file.name
    }));
    setErrors(prev => ({ ...prev, profileImageName: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const projectsArray = formData.assignedProjects
          .split(',')
          .map(p => p.trim())
          .filter(p => p);

        const userData = {
          ...formData,
          assignedProjects: projectsArray
        };

        // If password is empty when editing, exclude it from the payload
        if (editUser && !userData.password) {
          delete userData.password;
        }

        await onSubmit(userData);

        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          password: '',
          role: '',
          department: '',
          assignedProjects: '',
          profileImageName: '',
          status: 'Active'
        });
        setErrors({});
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        // Optionally close modal after submit (parent might handle it)
        // onClose(); // Uncomment if you want to close automatically
      } catch (error) {
        // Handle error (e.g., show a toast notification)
        console.error('Submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleCancel = () => {
    // Reset form and close
    setErrors({});
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal-overlay user-form-overlay dashboard-form-overlay">
      <div className="modal-dialog user-form-dialog dashboard-form-dialog">
        <div className="modal-content user-form-modal dashboard-form-modal">
          <div className="modal-header user-form-header dashboard-form-header">
            <div>
              <h5 className="modal-title">
                {editUser ? 'Edit User' : 'Add New User'}
              </h5>
              <p className="user-form-subtitle">Create login access and assign role permissions.</p>
            </div>
            <button
              type="button"
              className="modal-close-btn user-form-close"
              onClick={handleCancel}
              aria-label="Close modal"
            >
              <FiX />
            </button>
          </div>

          <form className="user-form dashboard-form" onSubmit={handleSubmit} noValidate>
            <div className="modal-body user-form-body dashboard-form-body">
              <div className="user-form-card">
                <label className="image-upload-section">
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/gif"
                    className="image-upload-input"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                  />
                  <span className="image-upload-area">
                    <span className="upload-preview">
                      <FiUploadCloud className="upload-icon" />
                    </span>
                    <span className="upload-copy">
                      <span className="upload-title">
                        {formData.profileImageName || 'Upload Profile Image'}
                      </span>
                      <span className="upload-hint">JPG, PNG, or GIF (Maximum 2 MB)</span>
                    </span>
                    <span className="upload-action">Browse</span>
                  </span>
                  {errors.profileImageName && (
                    <span className="upload-error">{errors.profileImageName}</span>
                  )}
                </label>

                <div className="user-form-grid">
                  <div className="form-field form-field-half">
                    <label className="form-label" htmlFor="name-input">Full Name *</label>
                    <div className="user-input-wrap">
                      <FiUser className="field-icon" />
                      <input
                        id="name-input"
                        type="text"
                        name="name"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter full name"
                        disabled={isSubmitting}
                      />
                    </div>
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                  </div>

                  <div className="form-field form-field-half">
                    <label className="form-label" htmlFor="email-input">Email *</label>
                    <div className="user-input-wrap">
                      <FiMail className="field-icon" />
                      <input
                        id="email-input"
                        type="email"
                        name="email"
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="user@pms.com"
                        disabled={isSubmitting}
                      />
                    </div>
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>

                  <div className="form-field form-field-third">
                    <label className="form-label" htmlFor="password-input">
                      Password {!editUser && '*'}
                    </label>
                    <div className="user-input-wrap">
                      <FiLock className="field-icon" />
                      <input
                        id="password-input"
                        type="password"
                        name="password"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        value={formData.password}
                        onChange={handleChange}
                        placeholder={editUser ? 'Leave blank to keep current' : 'Create password'}
                        disabled={isSubmitting}
                      />
                    </div>
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                  </div>

                  <div className="form-field form-field-third">
                    <label className="form-label" htmlFor="role-select">Role *</label>
                    <div className="user-input-wrap select-wrap">
                      <FiUsers className="field-icon" />
                      <select
                        id="role-select"
                        name="role"
                        className={`form-select ${errors.role ? 'is-invalid' : ''}`}
                        value={formData.role}
                        onChange={handleChange}
                        disabled={isSubmitting}
                      >
                        <option value="">Select Role</option>
                        <option value="Admin">Admin</option>
                        <option value="Project Manager">Project Manager</option>
                        <option value="Team Member">Team Member</option>
                        <option value="Client">Client</option>
                      </select>
                    </div>
                    {errors.role && <div className="invalid-feedback">{errors.role}</div>}
                  </div>

                  <div className="form-field form-field-third">
                    <label className="form-label" htmlFor="status-select">Status *</label>
                    <div className="user-input-wrap select-wrap">
                      <FiUser className="field-icon" />
                      <select
                        id="status-select"
                        name="status"
                        className={`form-select ${errors.status ? 'is-invalid' : ''}`}
                        value={formData.status}
                        onChange={handleChange}
                        disabled={isSubmitting}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Pending">Pending</option>
                      </select>
                    </div>
                    {errors.status && <div className="invalid-feedback">{errors.status}</div>}
                  </div>

                  <div className="form-field form-field-half">
                    <label className="form-label" htmlFor="phone-input">Phone Number *</label>
                    <div className="user-input-wrap">
                      <FiPhone className="field-icon" />
                      <input
                        id="phone-input"
                        type="tel"
                        name="phone"
                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        disabled={isSubmitting}
                      />
                    </div>
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                  </div>

                  <div className="form-field form-field-half">
                    <label className="form-label" htmlFor="department-select">Department *</label>
                    <div className="user-input-wrap select-wrap">
                      <FiBriefcase className="field-icon" />
                      <select
                        id="department-select"
                        name="department"
                        className={`form-select ${errors.department ? 'is-invalid' : ''}`}
                        value={formData.department}
                        onChange={handleChange}
                        disabled={isSubmitting}
                      >
                        <option value="">Select Department</option>
                        <option value="Development">Development</option>
                        <option value="Design">Design</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Cyber Security">Cyber Security</option>
                        <option value="HR">HR</option>
                        <option value="Accounts">Accounts</option>
                      </select>
                    </div>
                    {errors.department && <div className="invalid-feedback">{errors.department}</div>}
                  </div>

                  <div className="form-field form-field-full">
                    <label className="form-label" htmlFor="projects-input">Assigned Projects</label>
                    <div className="user-input-wrap">
                      <FiFolder className="field-icon" />
                      <input
                        id="projects-input"
                        type="text"
                        name="assignedProjects"
                        className="form-control"
                        value={formData.assignedProjects}
                        onChange={handleChange}
                        placeholder="Enter project names separated by commas"
                        disabled={isSubmitting}
                      />
                    </div>
                    <small className="form-text text-muted">
                      Enter project names separated by commas.
                    </small>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer user-form-footer dashboard-form-footer">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? (editUser ? 'Updating...' : 'Saving...')
                  : (editUser ? 'Update User' : 'Save User')}
              </button>
              <button
                type="button"
                className="btn btn-light"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserFormModal;