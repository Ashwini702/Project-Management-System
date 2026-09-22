// src/pages/admin/Team.jsx
import React, { useEffect, useState, useMemo } from 'react';
import * as teamService from '../../services/teamService';
import { apiData } from '../../services/api';
import AdminLayout from '../../layouts/AdminLayout';
import PageHeader from '../../components/common/PageHeader';
import TeamStatsCard from '../../components/team/TeamStatsCard';
import TeamMemberCard from '../../components/team/TeamMemberCard';
import TeamMemberTable from '../../components/team/TeamMemberTable';
import TeamMemberFormModal from '../../components/team/TeamMemberFormModal';
import WorkloadCard from '../../components/team/WorkloadCard';
import PerformanceCard from '../../components/team/PerformanceCard';
import MemberStatusBadge from '../../components/team/MemberStatusBadge';
import DepartmentBadge from '../../components/team/DepartmentBadge';
import { FiSearch, FiRotateCcw, FiGrid, FiList, FiBarChart2, FiX, FiFolder, FiCheckSquare, FiClock } from 'react-icons/fi';
import { teamMembersData, teamStatsData, departments, roles, statusesList, workloadLevels, topPerformers, availableMembers, projectsList } from '../../data/teamData';
import '../../styles/team.css';

const Team = () => {
  const [members, setMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('All Departments');
  const [roleFilter, setRoleFilter] = useState('All Roles');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [workloadFilter, setWorkloadFilter] = useState('All Workload');
  const [viewMode, setViewMode] = useState('card');

  const [showFormModal, setShowFormModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [assignForm, setAssignForm] = useState({ project: '', role: '', startDate: '', notes: '' });
  const [alert, setAlert] = useState(null);

  const parseJsonList = (value) => {
    if (Array.isArray(value)) return value;
    try { return value ? JSON.parse(value) : []; } catch { return []; }
  };
  const toUiMember = (member) => ({
    ...member,
    role: member.designation || 'Team Member',
    skills: parseJsonList(member.skills),
    assignedProjects: parseJsonList(member.assigned_projects),
    assignedTasks: member.assigned_tasks ?? 0,
    completedTasks: member.completed_tasks ?? 0,
    pendingTasks: member.pending_tasks ?? 0,
    joiningDate: member.joining_date || '',
    profileImage: null,
    lastActivity: member.lastActivity || 'Never'
  });

  useEffect(() => {
    teamService.getTeam()
      .then(response => setMembers(apiData(response).map(toUiMember)))
      .catch(error => showAlert(error.response?.data?.message || 'Unable to load team members.', 'danger'));
  }, []);

  const filteredMembers = useMemo(() => {
    return members.filter(member => {
      const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesDept = deptFilter === 'All Departments' || member.department === deptFilter;
      const matchesRole = roleFilter === 'All Roles' || member.role === roleFilter;
      const matchesStatus = statusFilter === 'All Status' || member.status === statusFilter;
      let matchesWorkload = true;
      if (workloadFilter === 'Low') matchesWorkload = member.workload < 40;
      else if (workloadFilter === 'Medium') matchesWorkload = member.workload >= 40 && member.workload < 70;
      else if (workloadFilter === 'High') matchesWorkload = member.workload >= 70 && member.workload < 90;
      else if (workloadFilter === 'Overloaded') matchesWorkload = member.workload >= 90;
      return matchesSearch && matchesDept && matchesRole && matchesStatus && matchesWorkload;
    });
  }, [members, searchTerm, deptFilter, roleFilter, statusFilter, workloadFilter]);

  const resetFilters = () => { setSearchTerm(''); setDeptFilter('All Departments'); setRoleFilter('All Roles'); setStatusFilter('All Status'); setWorkloadFilter('All Workload'); };
  const showAlert = (message, type = 'success') => { setAlert({ message, type }); setTimeout(() => setAlert(null), 3000); };

  const handleAddMember = () => { setSelectedMember(null); setShowFormModal(true); };
  const handleEditMember = (member) => { setSelectedMember(member); setShowFormModal(true); };
  const handleViewMember = (member) => { setSelectedMember(member); setShowViewModal(true); };
  const handleDeleteMember = (member) => { setSelectedMember(member); setShowDeleteModal(true); };
  const handleAssignProject = (member) => { setSelectedMember(member); setAssignForm({ project: '', role: '', startDate: '', notes: '' }); setShowAssignModal(true); };

  const confirmDelete = async () => {
    if (!selectedMember) return;
    try {
      await teamService.deleteTeamMember(selectedMember.id);
      setMembers(current => current.filter(m => m.id !== selectedMember.id));
      setShowDeleteModal(false); setSelectedMember(null);
      showAlert('Team member deleted successfully!');
    } catch (error) {
      showAlert(error.response?.data?.message || 'Unable to delete team member.', 'danger');
    }
  };

  const handleFormSubmit = async (formData) => {
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: 'Team Member',
      designation: formData.role,
      department: formData.department,
      status: formData.status,
      joining_date: formData.joiningDate || null,
      workload: Number(formData.workload || 0),
      performance: Number(formData.performance || 0),
      skills: JSON.stringify(formData.skills || []),
      assigned_projects: JSON.stringify(formData.assignedProjects || []),
      assigned_tasks: Number(formData.assignedTasks || 0),
      completed_tasks: Number(formData.completedTasks || 0),
      pending_tasks: Number(formData.pendingTasks || 0),
      profile_image_name: formData.profileImage?.name || ''
    };
    if (formData.password) payload.password = formData.password;
    try {
      const response = selectedMember
        ? await teamService.updateTeamMember(selectedMember.id, payload)
        : await teamService.createTeamMember(payload);
      const saved = toUiMember(apiData(response));
      setMembers(current => selectedMember
        ? current.map(m => m.id === selectedMember.id ? saved : m)
        : [saved, ...current]);
      showAlert(selectedMember ? 'Team member updated successfully!' : 'Team member saved successfully!');
      setShowFormModal(false); setSelectedMember(null);
    } catch (error) {
      showAlert(error.response?.data?.message || 'Unable to save team member.', 'danger');
    }
  };

  const handleAssignSubmit = async (e) => {
    e.preventDefault();
    if (!assignForm.project || !assignForm.role || !assignForm.startDate) return;
    const assignedProjects = [...(selectedMember.assignedProjects || []), assignForm.project];
    try {
      const response = await teamService.updateTeamMember(selectedMember.id, { assigned_projects: JSON.stringify(assignedProjects) });
      const saved = toUiMember(apiData(response));
      setMembers(current => current.map(m => m.id === selectedMember.id ? saved : m));
      setShowAssignModal(false); setSelectedMember(null);
      showAlert('Project assigned successfully!');
    } catch (error) {
      showAlert(error.response?.data?.message || 'Unable to assign project.', 'danger');
    }
  };

  const deptMembers = departments.map(dept => ({ dept, count: members.filter(m => m.department === dept).length }));

  return (
    <AdminLayout>
      <div className="team-page">
      <PageHeader title="Team Management" subtitle="Manage team members, departments, workloads, assigned projects, tasks, and performance." buttonText="Add Team Member" onButtonClick={handleAddMember} showButton={true} />
      {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">{alert.message}<button type="button" className="btn-close" onClick={() => setAlert(null)}></button></div>}

      <div className="team-stats-grid">
        {teamStatsData.map(stat => <TeamStatsCard key={stat.id} stat={stat} />)}
      </div>

      <div className="filter-section">
        <div className="filter-row">
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input type="text" className="form-control search-input" placeholder="Search by name, email, role, skill..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <div className="filter-selects">
            <select className="form-select" value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)}>
              <option value="All Departments">All Departments</option>
              {departments.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <select className="form-select" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
              <option value="All Roles">All Roles</option>
              {roles.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="All Status">All Status</option>
              {statusesList.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select className="form-select" value={workloadFilter} onChange={(e) => setWorkloadFilter(e.target.value)}>
              <option value="All Workload">All Workload</option>
              {workloadLevels.map(w => <option key={w} value={w}>{w}</option>)}
            </select>
          </div>
          <button className="btn btn-light reset-btn" onClick={resetFilters}><FiRotateCcw className="me-2" /> Reset</button>
          <div className="view-toggle">
            <button className={`toggle-btn ${viewMode === 'card' ? 'active' : ''}`} onClick={() => setViewMode('card')}><FiGrid /></button>
            <button className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`} onClick={() => setViewMode('table')}><FiList /></button>
            <button className={`toggle-btn ${viewMode === 'workload' ? 'active' : ''}`} onClick={() => setViewMode('workload')}><FiBarChart2 /></button>
          </div>
        </div>
      </div>

      {viewMode === 'card' && (
        <div className="team-members-grid">
          {filteredMembers.length === 0 ? <div className="no-members"><p className="text-muted">No team members found</p></div> :
            filteredMembers.map(member => <TeamMemberCard key={member.id} member={member} onView={handleViewMember} onEdit={handleEditMember} onDelete={handleDeleteMember} onAssign={handleAssignProject} />)
          }
        </div>
      )}

      {viewMode === 'table' && (
        <div className="team-table-card">
          <TeamMemberTable members={filteredMembers} onView={handleViewMember} onEdit={handleEditMember} onDelete={handleDeleteMember} onAssign={handleAssignProject} />
        </div>
      )}

      {viewMode === 'workload' && (
        <div className="workload-dashboard">
          <div className="row">
            <div className="col-lg-8">
              <div className="workload-section-card">
                <h5 className="section-title">Team Workload Overview</h5>
                <div className="workload-grid">
                  {filteredMembers.map(member => <WorkloadCard key={member.id} member={member} />)}
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="side-section-card mb-3">
                <h5 className="section-title">Department Distribution</h5>
                {deptMembers.map(dm => (
                  <div key={dm.dept} className="dept-item">
                    <span>{dm.dept}</span>
                    <span className="dept-count">{dm.count}</span>
                  </div>
                ))}
              </div>
              <div className="side-section-card mb-3">
                <h5 className="section-title">Top Performers</h5>
                {topPerformers.map((tp, idx) => <PerformanceCard key={idx} performer={tp} />)}
              </div>
              <div className="side-section-card">
                <h5 className="section-title">Available Members</h5>
                {availableMembers.map((am, idx) => (
                  <div key={idx} className="available-item">
                    <div className="available-avatar">{am.avatar}</div>
                    <div>
                      <strong>{am.name}</strong>
                      <span>{am.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <TeamMemberFormModal show={showFormModal} onClose={() => { setShowFormModal(false); setSelectedMember(null); }} onSubmit={handleFormSubmit} editMember={selectedMember} />

      {showViewModal && selectedMember && (
        <div className="modal-overlay">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header"><h5 className="modal-title">{selectedMember.name}</h5><button className="modal-close-btn" onClick={() => { setShowViewModal(false); setSelectedMember(null); }}><FiX /></button></div>
              <div className="modal-body">
                <div className="view-member-header">
                  <div className="view-avatar-lg">{selectedMember.name.split(' ').map(n => n[0]).join('')}</div>
                  <div>
                    <h4>{selectedMember.name}</h4>
                    <p>{selectedMember.role}</p>
                    <DepartmentBadge department={selectedMember.department} />
                    <MemberStatusBadge status={selectedMember.status} />
                  </div>
                </div>
                <div className="view-details-grid mt-4">
                  <div><strong>Email:</strong> {selectedMember.email}</div>
                  <div><strong>Phone:</strong> {selectedMember.phone}</div>
                  <div><strong>Joining:</strong> {selectedMember.joiningDate}</div>
                  <div><strong>Last Active:</strong> {selectedMember.lastActivity}</div>
                  <div><strong>Workload:</strong> {selectedMember.workload}%</div>
                  <div><strong>Performance:</strong> {selectedMember.performance}%</div>
                </div>
                <div className="mt-3"><strong>Skills:</strong> {selectedMember.skills.map((s, i) => <span key={i} className="skill-tag">{s}</span>)}</div>
                <div className="mt-3"><strong>Assigned Projects:</strong> {selectedMember.assignedProjects.map((p, i) => <span key={i} className="project-tag-view">{p}</span>)}</div>
                <div className="mt-4"><h6>Recent Tasks</h6>
                  {selectedMember.recentTasks.map((t, i) => (
                    <div key={i} className="recent-task-item">
                      <span><FiCheckSquare /></span>
                      <span>{t.title}</span>
                      <span className={`task-status-sm ${t.status === 'Completed' ? 'completed' : t.status === 'In Progress' ? 'in-progress' : 'pending'}`}>{t.status}</span>
                      <span className="task-date-sm">{t.date}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal-footer"><button className="btn btn-light" onClick={() => { setShowViewModal(false); setSelectedMember(null); }}>Close</button></div>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && selectedMember && (
        <div className="modal-overlay">
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <div className="modal-header"><h5 className="modal-title">Delete Member</h5><button className="modal-close-btn" onClick={() => { setShowDeleteModal(false); setSelectedMember(null); }}><FiX /></button></div>
              <div className="modal-body"><div className="delete-confirmation"><p>Are you sure you want to delete this team member?</p><div className="delete-info"><strong>{selectedMember.name}</strong><span>{selectedMember.email}</span></div></div></div>
              <div className="modal-footer"><button className="btn btn-light" onClick={() => { setShowDeleteModal(false); setSelectedMember(null); }}>Cancel</button><button className="btn btn-danger" onClick={confirmDelete}>Delete</button></div>
            </div>
          </div>
        </div>
      )}

      {showAssignModal && selectedMember && (
        <div className="modal-overlay">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header"><h5 className="modal-title">Assign Project to {selectedMember.name}</h5><button className="modal-close-btn" onClick={() => { setShowAssignModal(false); setSelectedMember(null); }}><FiX /></button></div>
              <form onSubmit={handleAssignSubmit}>
                <div className="modal-body">
                  <div className="mb-3"><label className="form-label">Project *</label><select className="form-select" value={assignForm.project} onChange={(e) => setAssignForm({...assignForm, project: e.target.value})}><option value="">Select Project</option>{projectsList.map(p => <option key={p} value={p}>{p}</option>)}</select></div>
                  <div className="mb-3"><label className="form-label">Role in Project *</label><input type="text" className="form-control" value={assignForm.role} onChange={(e) => setAssignForm({...assignForm, role: e.target.value})} placeholder="e.g., Lead Developer" /></div>
                  <div className="mb-3"><label className="form-label">Start Date *</label><input type="date" className="form-control" value={assignForm.startDate} onChange={(e) => setAssignForm({...assignForm, startDate: e.target.value})} /></div>
                  <div className="mb-3"><label className="form-label">Notes</label><textarea className="form-control" rows="2" value={assignForm.notes} onChange={(e) => setAssignForm({...assignForm, notes: e.target.value})} placeholder="Assignment notes..."></textarea></div>
                </div>
                <div className="modal-footer"><button type="button" className="btn btn-light" onClick={() => { setShowAssignModal(false); setSelectedMember(null); }}>Cancel</button><button type="submit" className="btn btn-primary">Assign Project</button></div>
              </form>
            </div>
          </div>
        </div>
      )}
      </div>
    </AdminLayout>
  );
};

export default Team;



