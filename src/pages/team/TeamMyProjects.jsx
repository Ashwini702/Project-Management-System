// src/pages/team/TeamMyProjects.jsx
import React, { useEffect, useState, useMemo } from 'react';
import TeamLayout from '../../layouts/TeamLayout';
import TeamProjectStatsCard from '../../components/teamProjects/TeamProjectStatsCard';
import TeamProjectCard from '../../components/teamProjects/TeamProjectCard';
import TeamProjectTable from '../../components/teamProjects/TeamProjectTable';
import TeamProjectDetailsModal from '../../components/teamProjects/TeamProjectDetailsModal';
import TeamProjectTimeline from '../../components/teamProjects/TeamProjectTimeline';
import TeamProjectFiles from '../../components/teamProjects/TeamProjectFiles';
import { FiSearch, FiRotateCcw, FiGrid, FiList, FiClock, FiFileText, FiCheckSquare, FiEdit3, FiX } from 'react-icons/fi';
import * as projectService from '../../services/projectService';
import { apiData } from '../../services/api';
import '../../styles/teamProjects.css';

const TeamMyProjects = () => {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [priorityFilter, setPriorityFilter] = useState('All Priority');
  const [managerFilter, setManagerFilter] = useState('All Managers');
  const [deadlineFilter, setDeadlineFilter] = useState('All Deadlines');
  const [viewMode, setViewMode] = useState('card');
  const [alert, setAlert] = useState(null);

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [updateForm, setUpdateForm] = useState({ title: '', message: '', progress: 0, status: 'In Progress' });

  const showAlert = (m, t = 'info') => { setAlert({ message: m, type: t }); setTimeout(() => setAlert(null), 2000); };
  const toTeamProject = (project) => ({
    ...project, projectName: project.title || '', clientName: project.client_name || '', managerName: project.manager_name || 'Project Manager',
    managerEmail: '', startDate: project.start_date || '-', endDate: project.end_date || '-', deadline: project.end_date || '-',
    overallProgress: Number(project.progress || 0), myProgress: Math.round(Number(project.my_progress || 0)),
    currentPhase: project.status === 'Completed' ? 'Completed' : project.status === 'Not Started' ? 'Planning Phase' : 'Development Phase',
    myAssignedTasks: Number(project.my_task_count || 0), completedTasks: Number(project.my_completed_count || 0),
    pendingTasks: Math.max(Number(project.my_task_count || 0) - Number(project.my_completed_count || 0), 0), teamSize: 0,
    recentUpdate: project.description || 'No recent update.', lastUpdated: project.updated_at || project.created_at || '',
  });
  useEffect(() => {
    projectService.getProjects()
      .then(response => setProjects(apiData(response).map(toTeamProject)))
      .catch(error => showAlert(error.response?.data?.message || 'Unable to load your projects.', 'danger'));
  }, []);
  const categories = useMemo(() => [...new Set(projects.map(project => project.category).filter(Boolean))].sort(), [projects]);
  const managers = useMemo(() => [...new Set(projects.map(project => project.managerName).filter(Boolean))].sort(), [projects]);
  const projectStatsData = useMemo(() => [
    { id: 1, title: 'Assigned Projects', value: projects.length, icon: 'FiFolder', desc: 'Projects with your tasks', color: 'primary' },
    { id: 2, title: 'Active Projects', value: projects.filter(p => p.status === 'In Progress').length, icon: 'FiTrendingUp', desc: 'In progress', color: 'info' },
    { id: 3, title: 'Completed Projects', value: projects.filter(p => p.status === 'Completed').length, icon: 'FiCheckCircle', desc: 'Delivered', color: 'success' },
    { id: 4, title: 'Delayed Projects', value: projects.filter(p => p.status === 'Delayed').length, icon: 'FiAlertTriangle', desc: 'Behind schedule', color: 'danger' },
    { id: 5, title: 'My Project Tasks', value: projects.reduce((sum, p) => sum + p.myAssignedTasks, 0), icon: 'FiCheckSquare', desc: 'Assigned tasks', color: 'warning' },
    { id: 6, title: 'Upcoming Deadlines', value: projects.filter(p => p.endDate && new Date(p.endDate) >= new Date()).length, icon: 'FiClock', desc: 'Future deadlines', color: 'purple' },
  ], [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter(p => {
      const matchesSearch = !searchTerm || p.projectName.toLowerCase().includes(searchTerm.toLowerCase()) || p.clientName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === 'All Categories' || p.category === categoryFilter;
      const matchesStatus = statusFilter === 'All Status' || p.status === statusFilter;
      const matchesPriority = priorityFilter === 'All Priority' || p.priority === priorityFilter;
      const matchesManager = managerFilter === 'All Managers' || p.managerName === managerFilter;
      return matchesSearch && matchesCategory && matchesStatus && matchesPriority && matchesManager;
    });
  }, [projects, searchTerm, categoryFilter, statusFilter, priorityFilter, managerFilter]);

  const resetFilters = () => { setSearchTerm(''); setCategoryFilter('All Categories'); setStatusFilter('All Status'); setPriorityFilter('All Priority'); setManagerFilter('All Managers'); setDeadlineFilter('All Deadlines'); };

  const handleView = (p) => { setSelectedProject(p); setShowDetailsModal(true); };
  const handleTasks = () => showAlert('Open My Tasks page to view tasks.');
  const handleFiles = (p) => { setSelectedProject(p); setViewMode('files'); };
  const handleUpdate = (p) => { setSelectedProject(p); setUpdateForm({ title: '', message: '', progress: p.overallProgress, status: p.status }); setShowUpdateModal(true); };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    if (!updateForm.title.trim() || !updateForm.message.trim()) return showAlert('All fields are required.', 'danger');
    setShowUpdateModal(false); showAlert('Project update submitted!', 'success');
  };

  return (
    <TeamLayout>
      <div className="tp-dashboard">
        <div className="tp-dash-header">
          <div><h3>My Projects</h3><p>View assigned projects, track progress, check project tasks, milestones, team members, files, and deadlines.</p></div>
          <div className="d-flex gap-2">
            <button className="btn btn-primary btn-sm" onClick={handleTasks}><FiCheckSquare /> View My Tasks</button>
            <button className="btn btn-outline-primary btn-sm" onClick={() => selectedProject ? handleUpdate(selectedProject) : showAlert('Select a project to update.', 'warning')}><FiEdit3 /> Submit Update</button>
          </div>
        </div>
        {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`}>{alert.message}<button className="btn-close" onClick={() => setAlert(null)}></button></div>}

        <div className="tp-stats-grid">{projectStatsData.map(s => <TeamProjectStatsCard key={s.id} stat={s} />)}</div>

        <div className="filter-section"><div className="filter-row">
          <div className="search-box"><FiSearch className="search-icon" /><input type="text" className="form-control search-input" placeholder="Search projects..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
          <div className="filter-selects">
            <select className="form-select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}><option value="All Categories">All Categories</option>{categories.map(c => <option key={c} value={c}>{c}</option>)}</select>
            <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}><option value="All Status">All Status</option><option>Not Started</option><option>In Progress</option><option>Under Review</option><option>Completed</option><option>Delayed</option><option>On Hold</option></select>
            <select className="form-select" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}><option value="All Priority">All Priority</option><option>Low</option><option>Medium</option><option>High</option><option>Urgent</option></select>
            <select className="form-select" value={managerFilter} onChange={(e) => setManagerFilter(e.target.value)}><option value="All Managers">All Managers</option>{managers.map(m => <option key={m} value={m}>{m}</option>)}</select>
          </div>
          <button className="btn btn-light reset-btn" onClick={resetFilters}><FiRotateCcw className="me-2" /> Reset</button>
          <div className="view-toggle">
            <button className={`toggle-btn ${viewMode === 'card' ? 'active' : ''}`} onClick={() => setViewMode('card')}><FiGrid /></button>
            <button className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`} onClick={() => setViewMode('table')}><FiList /></button>
            <button className={`toggle-btn ${viewMode === 'timeline' ? 'active' : ''}`} onClick={() => setViewMode('timeline')}><FiClock /></button>
            <button className={`toggle-btn ${viewMode === 'files' ? 'active' : ''}`} onClick={() => setViewMode('files')}><FiFileText /></button>
          </div>
        </div></div>

        {viewMode === 'card' && <div className="tp-cards-grid">{filteredProjects.length === 0 ? <p className="text-center text-muted py-5">No projects found</p> : filteredProjects.map(p => <TeamProjectCard key={p.id} project={p} onView={handleView} onTasks={handleTasks} onFiles={handleFiles} onUpdate={handleUpdate} />)}</div>}
        {viewMode === 'table' && <div className="tp-table-card"><TeamProjectTable projects={filteredProjects} onView={handleView} onTasks={handleTasks} onFiles={handleFiles} onUpdate={handleUpdate} /></div>}
        {viewMode === 'timeline' && <div>{filteredProjects.map(p => <TeamProjectTimeline key={p.id} projectId={p.id} />)}</div>}
        {viewMode === 'files' && <div><TeamProjectFiles projectId={selectedProject?.id || 1} onAlert={showAlert} /></div>}

        <TeamProjectDetailsModal show={showDetailsModal} onClose={() => setShowDetailsModal(false)} project={selectedProject} onAlert={showAlert} />

        {showUpdateModal && selectedProject && (
          <div className="modal-overlay"><div className="modal-dialog"><div className="modal-content">
            <div className="modal-header"><h5 className="modal-title">Add Update - {selectedProject.projectName}</h5><button className="modal-close-btn" onClick={() => setShowUpdateModal(false)}><FiX /></button></div>
            <form onSubmit={handleUpdateSubmit}><div className="modal-body">
              <div className="mb-3"><label className="form-label">Title *</label><input type="text" className="form-control" value={updateForm.title} onChange={(e) => setUpdateForm(p => ({ ...p, title: e.target.value }))} /></div>
              <div className="mb-3"><label className="form-label">Message *</label><textarea className="form-control" rows="3" value={updateForm.message} onChange={(e) => setUpdateForm(p => ({ ...p, message: e.target.value }))}></textarea></div>
              <div className="mb-3"><label className="form-label">Progress (%)</label><input type="number" className="form-control" min="0" max="100" value={updateForm.progress} onChange={(e) => setUpdateForm(p => ({ ...p, progress: Number(e.target.value) }))} /></div>
              <div className="mb-3"><label className="form-label">Status</label><select className="form-select" value={updateForm.status} onChange={(e) => setUpdateForm(p => ({ ...p, status: e.target.value }))}><option>In Progress</option><option>Under Review</option><option>Completed</option><option>Delayed</option><option>On Hold</option></select></div>
            </div>
            <div className="modal-footer"><button type="button" className="btn btn-light" onClick={() => setShowUpdateModal(false)}>Cancel</button><button type="submit" className="btn btn-primary">Submit Update</button></div></form>
          </div></div></div>
        )}
      </div>
    </TeamLayout>
  );
};

export default TeamMyProjects;
