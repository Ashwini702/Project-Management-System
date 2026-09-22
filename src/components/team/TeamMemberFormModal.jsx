// src/components/team/TeamMemberFormModal.jsx
import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { departments, roles, projectsList } from '../../data/teamData';
import FileUploadField from '../common/FileUploadField';

const TeamMemberFormModal = ({ show, onClose, onSubmit, editMember }) => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', role: '', department: '',
    skills: [], assignedProjects: [], assignedTasks: 0, completedTasks: 0,
    pendingTasks: 0, workload: 0, performance: 0, status: 'Active', joiningDate: '', profileImage: null, password: '', confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [skillInput, setSkillInput] = useState('');

  useEffect(() => {
    if (editMember) {
      setFormData({
        name: editMember.name || '', email: editMember.email || '', phone: editMember.phone || '',
        role: editMember.role || '', department: editMember.department || '',
        skills: editMember.skills || [], assignedProjects: editMember.assignedProjects || [],
        assignedTasks: editMember.assignedTasks || 0, completedTasks: editMember.completedTasks || 0,
        pendingTasks: editMember.pendingTasks || 0, workload: editMember.workload || 0,
        performance: editMember.performance || 0, status: editMember.status || 'Active',
        joiningDate: editMember.joiningDate || '', profileImage: editMember.profileImage || null, password: '', confirmPassword: ''
      });
    } else {
      setFormData({ name: '', email: '', phone: '', role: '', department: '', skills: [], assignedProjects: [], assignedTasks: 0, completedTasks: 0, pendingTasks: 0, workload: 0, performance: 0, status: 'Active', joiningDate: '', profileImage: null, password: '', confirmPassword: '' });
    }
    setErrors({});
    setSkillInput('');
  }, [editMember, show]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!editMember && !formData.password) newErrors.password = 'Login password is required';
    else if (formData.password && formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.role) newErrors.role = 'Role is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (formData.workload < 0 || formData.workload > 100) newErrors.workload = 'Must be 0-100';
    if (formData.performance < 0 || formData.performance > 100) newErrors.performance = 'Must be 0-100';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData(prev => ({ ...prev, skills: [...prev.skills, skillInput.trim()] }));
      setSkillInput('');
    }
  };

  const removeSkill = (skill) => {
    setFormData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
  };

  const toggleProject = (project) => {
    setFormData(prev => ({
      ...prev,
      assignedProjects: prev.assignedProjects.includes(project)
        ? prev.assignedProjects.filter(p => p !== project)
        : [...prev.assignedProjects, project]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) onSubmit(formData);
  };

  if (!show) return null;

  return (
    <div className="modal-overlay dashboard-form-overlay">
      <div className="modal-dialog modal-lg dashboard-form-dialog">
        <div className="modal-content dashboard-form-modal">
          <div className="modal-header dashboard-form-header">
            <h5 className="modal-title">{editMember ? 'Edit Team Member' : 'Add Team Member'}</h5>
            <button className="modal-close-btn" onClick={onClose}><FiX /></button>
          </div>
          <form className="dashboard-form" onSubmit={handleSubmit}>
            <div className="modal-body dashboard-form-body">
              <FileUploadField className="image-upload-section mb-3" name="profileImage" title="Upload Profile Image" hint="JPG, PNG or GIF. Max 2MB" accept="image/jpeg,image/png,image/gif" maxSizeMB={2} onFileSelect={(file) => setFormData(prev => ({ ...prev, profileImage: file }))} />
              <div className="row dashboard-form-grid">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Full Name *</label>
                  <input type="text" name="name" className={`form-control ${errors.name ? 'is-invalid' : ''}`} value={formData.name} onChange={handleChange} placeholder="Enter full name" />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Email *</label>
                  <input type="email" name="email" className={`form-control ${errors.email ? 'is-invalid' : ''}`} value={formData.email} onChange={handleChange} placeholder="Enter email" />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Phone *</label>
                  <input type="tel" name="phone" className={`form-control ${errors.phone ? 'is-invalid' : ''}`} value={formData.phone} onChange={handleChange} placeholder="Enter phone" />
                  {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Joining Date</label>
                  <input type="date" name="joiningDate" className="form-control" value={formData.joiningDate} onChange={handleChange} />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Login Password {!editMember && '*'}</label>
                  <input type="password" name="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} value={formData.password} onChange={handleChange} placeholder={editMember ? 'Leave blank to keep current password' : 'Create login password'} autoComplete="new-password" />
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Confirm Password {!editMember && '*'}</label>
                  <input type="password" name="confirmPassword" className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm login password" autoComplete="new-password" />
                  {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                </div>                <div className="col-md-6 mb-3">
                  <label className="form-label">Role *</label>
                  <select name="role" className={`form-select ${errors.role ? 'is-invalid' : ''}`} value={formData.role} onChange={handleChange}>
                    <option value="">Select Role</option>
                    {roles.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                  {errors.role && <div className="invalid-feedback">{errors.role}</div>}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Department *</label>
                  <select name="department" className={`form-select ${errors.department ? 'is-invalid' : ''}`} value={formData.department} onChange={handleChange}>
                    <option value="">Select Department</option>
                    {departments.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                  {errors.department && <div className="invalid-feedback">{errors.department}</div>}
                </div>
                <div className="col-md-3 mb-3">
                  <label className="form-label">Workload %</label>
                  <input type="number" name="workload" className={`form-control ${errors.workload ? 'is-invalid' : ''}`} min="0" max="100" value={formData.workload} onChange={handleChange} />
                  {errors.workload && <div className="invalid-feedback">{errors.workload}</div>}
                </div>
                <div className="col-md-3 mb-3">
                  <label className="form-label">Performance %</label>
                  <input type="number" name="performance" className={`form-control ${errors.performance ? 'is-invalid' : ''}`} min="0" max="100" value={formData.performance} onChange={handleChange} />
                  {errors.performance && <div className="invalid-feedback">{errors.performance}</div>}
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label">Skills</label>
                  <div className="skills-input-row">
                    <input type="text" className="form-control" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())} placeholder="Type skill and press Enter" />
                    <button type="button" className="btn btn-sm btn-primary" onClick={addSkill}>Add</button>
                  </div>
                  <div className="skills-tags mt-2">
                    {formData.skills.map((skill, idx) => (
                      <span key={idx} className="skill-tag-removable">
                        {skill} <button type="button" onClick={() => removeSkill(skill)}>&times;</button>
                      </span>
                    ))}
                  </div>
                </div>
                <div className="col-md-12 mb-3">
                  <label className="form-label">Assigned Projects</label>
                  <div className="projects-select-grid">
                    {projectsList.map(project => (
                      <div key={project} className={`project-chip ${formData.assignedProjects.includes(project) ? 'selected' : ''}`} onClick={() => toggleProject(project)}>
                        {project}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer dashboard-form-footer">
              <button type="button" className="btn btn-light" onClick={onClose}>Cancel</button>
              <button type="submit" className="btn btn-primary">{editMember ? 'Update Member' : 'Save Member'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TeamMemberFormModal;
