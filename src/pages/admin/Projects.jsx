// src/pages/admin/Projects.jsx
import React, { useEffect, useState, useMemo } from 'react';
import * as projectService from '../../services/projectService';
import * as clientService from '../../services/clientService';
import { apiData } from '../../services/api';
import AdminLayout from '../../layouts/AdminLayout';
import PageHeader from '../../components/common/PageHeader';
import ProjectStatsCard from '../../components/projects/ProjectStatsCard';
import ProjectCard from '../../components/projects/ProjectCard';
import ProjectTable from '../../components/projects/ProjectTable';
import ProjectTimeline from '../../components/projects/ProjectTimeline';
import ProjectDocumentBox from '../../components/projects/ProjectDocumentBox';
import ProjectStatusBadge from '../../components/projects/ProjectStatusBadge';
import ProjectPriorityBadge from '../../components/projects/ProjectPriorityBadge';
import { 
  FiSearch, FiRotateCcw, FiGrid, FiList, FiX, FiUsers, 
  FiCalendar, FiDollarSign, FiCheckSquare, FiFileText 
} from 'react-icons/fi';
import { 
  projectsData, projectStatsData, managers, categories, 
  priorities, statuses, projectDocumentsData, teamMembersList
} from '../../data/projectData';
import { clientsData } from '../../data/clientData';
import '../../styles/projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [priorityFilter, setPriorityFilter] = useState('All Priority');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [managerFilter, setManagerFilter] = useState('All Managers');
  const [viewMode, setViewMode] = useState('card'); // card or table
  
  // Modal states
  const [showViewModal, setShowViewModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [alert, setAlert] = useState(null);
  const [createError, setCreateError] = useState('');

  const toUiProject = (project) => {
    let teamMembers = project.team_members || project.teamMembers || [];
    if (typeof teamMembers === 'string') {
      try { teamMembers = JSON.parse(teamMembers); } catch { teamMembers = []; }
    }
    return {
      ...project,
      client: project.client_name || project.client || '',
      manager: project.manager_name || project.manager || '',
      teamMembers,
      startDate: project.start_date || project.startDate || '',
      endDate: project.end_date || project.endDate || '',
      totalTasks: project.total_tasks ?? project.totalTasks ?? 0,
      completedTasks: project.completedTasks || 0,
      documentsCount: project.documentsCount || 0,
      createdDate: project.created_at ? String(project.created_at).slice(0, 10) : '',
      timeline: project.timeline || []
    };
  };

  useEffect(() => {
    projectService.getProjects().then(response => setProjects(apiData(response).map(toUiProject))).catch(error => showAlert(error.response?.data?.message || 'Unable to load projects.', 'danger'));
    clientService.getClients().then(response => setClients(apiData(response))).catch(() => showAlert('Unable to load clients from the database.', 'danger'));
  }, []);
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    client: '',
    category: categories[0],
    manager: managers[0],
    teamMembers: [],
    startDate: '',
    endDate: '',
    priority: 'Medium',
    status: 'Not Started',
    budget: '',
    totalTasks: 0
  });

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = 
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.manager.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'All Status' || project.status === statusFilter;
      const matchesPriority = priorityFilter === 'All Priority' || project.priority === priorityFilter;
      const matchesCategory = categoryFilter === 'All Categories' || project.category === categoryFilter;
      const matchesManager = managerFilter === 'All Managers' || project.manager === managerFilter;
      
      return matchesSearch && matchesStatus && matchesPriority && matchesCategory && matchesManager;
    });
  }, [projects, searchTerm, statusFilter, priorityFilter, categoryFilter, managerFilter]);

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('All Status');
    setPriorityFilter('All Priority');
    setCategoryFilter('All Categories');
    setManagerFilter('All Managers');
  };

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleViewProject = (project) => {
    setSelectedProject(project);
    setShowViewModal(true);
  };

  const handleDeleteProject = (project) => {
    setSelectedProject(project);
    setShowDeleteModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setProjectForm((prev) => ({
      ...prev,
      [name]: name === 'totalTasks' ? Number(value) : value
    }));
  };

  const toggleTeamMember = (member) => {
    setProjectForm((prev) => {
      const alreadySelected = prev.teamMembers.includes(member);

      return {
        ...prev,
        teamMembers: alreadySelected
          ? prev.teamMembers.filter((item) => item !== member)
          : [...prev.teamMembers, member]
      };
    });
  };

  const resetProjectForm = () => {
    setProjectForm({
      title: '',
      description: '',
      client: '',
      category: categories[0],
      manager: managers[0],
      teamMembers: [],
      startDate: '',
      endDate: '',
      priority: 'Medium',
      status: 'Not Started',
      budget: '',
      totalTasks: 0
    });
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    setCreateError('');
    if (!projectForm.title || !projectForm.client || !projectForm.startDate || !projectForm.endDate || projectForm.teamMembers.length === 0) {
      setCreateError('Please add project name, client, dates, and at least one team member.');
      return;
    }
    const selectedClient = clients.find((client) => String(client.id) === String(projectForm.client));
    if (!selectedClient) {
      setCreateError('Please select a valid client from the list.');
      return;
    }
    const clientName = selectedClient.company_name || selectedClient.company || selectedClient.contact_person || '';
    const numericBudget = Number(String(projectForm.budget || 0).replace(/[^0-9.-]/g, '')) || 0;
    const payload = {
      title: projectForm.title,
      description: projectForm.description,
      client_id: Number(projectForm.client),
      client_name: clientName,
      manager_name: projectForm.manager,
      category: projectForm.category,
      priority: projectForm.priority,
      status: projectForm.status,
      start_date: projectForm.startDate,
      end_date: projectForm.endDate,
      budget: numericBudget,
      progress: projectForm.status === 'Completed' ? 100 : 0,
      team_members: JSON.stringify(projectForm.teamMembers),
      total_tasks: Number(projectForm.totalTasks || 0)
    };
    try {
      const response = await projectService.createProject(payload);
      const saved = toUiProject(apiData(response));
      setProjects(current => [saved, ...current]);
      setShowCreateModal(false);
      resetProjectForm();
      showAlert('Project created and saved in database successfully!');
    } catch (error) {
      setCreateError(error.response?.data?.message || 'Unable to save project. Please check that the backend is running.');
    }
  };

  const confirmDelete = async () => {
    if (!selectedProject) return;
    try {
      await projectService.deleteProject(selectedProject.id);
      setProjects(current => current.filter(p => p.id !== selectedProject.id));
      setShowDeleteModal(false);
      setSelectedProject(null);
      showAlert('Project deleted successfully!');
    } catch (error) {
      showAlert(error.response?.data?.message || 'Unable to delete project.', 'danger');
    }
  };

  return (
    <AdminLayout>
      <PageHeader
        title="Project Management"
        subtitle="Manage, assign, and track all projects, deadlines, priorities, and progress."
        showButton={true}
        buttonText="Create Project"
        onButtonClick={() => setShowCreateModal(true)}
      />

      {alert && (
        <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
          {alert.message}
          <button type="button" className="btn-close" onClick={() => setAlert(null)}></button>
        </div>
      )}

      {/* Stats Cards */}
      <div className="project-stats-grid">
        {projectStatsData.map((stat) => (
          <ProjectStatsCard key={stat.id} stat={stat} />
        ))}
      </div>

      {/* Filters and View Toggle */}
      <div className="filter-section">
        <div className="filter-row">
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input
              type="text"
              className="form-control search-input"
              placeholder="Search projects by name, client, category, manager..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-selects">
            <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="All Status">All Status</option>
              {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            <select className="form-select" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
              <option value="All Priority">All Priority</option>
              {priorities.map(p => <option key={p} value={p}>{p}</option>)}
            </select>

            <select className="form-select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="All Categories">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            <select className="form-select" value={managerFilter} onChange={(e) => setManagerFilter(e.target.value)}>
              <option value="All Managers">All Managers</option>
              {managers.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>

          <button className="btn btn-light reset-btn" onClick={resetFilters}>
            <FiRotateCcw className="me-2" /> Reset
          </button>

          <div className="view-toggle">
            <button
              className={`toggle-btn ${viewMode === 'card' ? 'active' : ''}`}
              onClick={() => setViewMode('card')}
            >
              <FiGrid />
            </button>
            <button
              className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
            >
              <FiList />
            </button>
          </div>
        </div>
      </div>

      {/* Projects Display */}
      {viewMode === 'card' ? (
        <div className="projects-grid">
          {filteredProjects.length === 0 ? (
            <div className="no-projects">
              <p className="text-muted">No projects found matching your criteria</p>
            </div>
          ) : (
            filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onView={handleViewProject}
                onDelete={handleDeleteProject}
              />
            ))
          )}
        </div>
      ) : (
        <div className="projects-table-card">
          <ProjectTable
            projects={filteredProjects}
            onView={handleViewProject}
            onDelete={handleDeleteProject}
          />
        </div>
      )}

      {/* Create Project Modal */}
      {showCreateModal && (
        <div className="modal-overlay dashboard-form-overlay">
          <div className="modal-dialog create-project-dialog dashboard-form-dialog">
            <form noValidate className="modal-content project-create-modal dashboard-form-modal dashboard-form" onSubmit={handleCreateProject}>
              <div className="modal-header project-create-header dashboard-form-header">
                <div>
                  <h5 className="modal-title">Create Project</h5>
                  <p className="create-modal-subtitle">Assign the project to a client, manager, and delivery team.</p>
                </div>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => {
                    setShowCreateModal(false);
                    resetProjectForm();
                  }}
                >
                  <FiX />
                </button>
              </div>
              <div className="modal-body dashboard-form-body">
                {createError && <div className="alert alert-danger mb-3" role="alert">{createError}</div>}
                <div className="project-form-section">
                  <div className="project-form-section-title">
                    <span>Project Information</span>
                  </div>
                  <div className="project-form-grid">
                    <div className="form-group full-width">
                      <label className="form-label">Project Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="title"
                        value={projectForm.title}
                        onChange={handleFormChange}
                        placeholder="Enter project name"
                        required
                      />
                    </div>

                    <div className="form-group full-width">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        name="description"
                        rows="3"
                        value={projectForm.description}
                        onChange={handleFormChange}
                        placeholder="Project scope and requirements"
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="project-form-section">
                  <div className="project-form-section-title">
                    <span>Client and Ownership</span>
                  </div>
                  <div className="project-form-grid">
                    <div className="form-group">
                      <label className="form-label">Client</label>
                      <select
                        className="form-select"
                        name="client"
                        value={projectForm.client}
                        onChange={handleFormChange}
                        required
                      >
                        <option value="">Select client</option>
                        {clients.map((client) => {
                          const contact = client.contact_person || client.name || 'Client';
                          const company = client.company_name || contact;
                          return <option key={client.id} value={client.id}>{contact} — {company}</option>;
                        })}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Project Manager</label>
                      <select
                        className="form-select"
                        name="manager"
                        value={projectForm.manager}
                        onChange={handleFormChange}
                      >
                        {managers.map((manager) => (
                          <option key={manager} value={manager}>
                            {manager}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Category</label>
                      <select
                        className="form-select"
                        name="category"
                        value={projectForm.category}
                        onChange={handleFormChange}
                      >
                        {categories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                  </div>
                </div>

                <div className="project-form-section">
                  <div className="project-form-section-title">
                    <span>Schedule and Budget</span>
                  </div>
                  <div className="project-form-grid">
                    <div className="form-group">
                      <label className="form-label">Start Date</label>
                      <input
                        type="date"
                        className="form-control"
                        name="startDate"
                        value={projectForm.startDate}
                        onChange={handleFormChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">End Date</label>
                      <input
                        type="date"
                        className="form-control"
                        name="endDate"
                        value={projectForm.endDate}
                        onChange={handleFormChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Budget</label>
                      <input
                        type="text"
                        className="form-control"
                        name="budget"
                        value={projectForm.budget}
                        onChange={handleFormChange}
                        placeholder="$120,000"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Total Tasks</label>
                      <input
                        type="number"
                        min="0"
                        className="form-control"
                        name="totalTasks"
                        value={projectForm.totalTasks}
                        onChange={handleFormChange}
                      />
                    </div>

                  </div>
                </div>

                <div className="project-form-section">
                  <div className="team-select-header">
                    <div className="project-form-section-title">
                      <span>Assign Team Members</span>
                    </div>
                    <span className="selected-team-count">{projectForm.teamMembers.length} selected</span>
                  </div>
                  <p className="team-select-hint">Select team members now, or assign them later when creating tasks.</p>
                  <div className="form-group full-width">
                    <div className="team-members-select team-members-grid">
                      {teamMembersList.map((member) => (
                        <button
                          key={member}
                          type="button"
                          className={`team-member-chip ${projectForm.teamMembers.includes(member) ? 'selected' : ''}`}
                          onClick={() => toggleTeamMember(member)}
                          aria-pressed={projectForm.teamMembers.includes(member)}
                        >
                          {member}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer project-create-footer dashboard-form-footer">
                {createError && <span className="project-create-error">{createError}</span>}
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={() => {
                    setShowCreateModal(false);
                    resetProjectForm();
                  }}
                >
                  Cancel
                </button>
                <button type="button" className="btn btn-primary" onClick={handleCreateProject}>Create Project</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Project Modal */}
      {showViewModal && selectedProject && (
        <div className="modal-overlay">
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedProject.title}</h5>
                <button className="modal-close-btn" onClick={() => { setShowViewModal(false); setSelectedProject(null); }}>
                  <FiX />
                </button>
              </div>
              <div className="modal-body">
                <div className="project-details-grid">
                  <div className="project-detail-main">
                    <p className="project-detail-desc">{selectedProject.description}</p>
                    
                    <div className="detail-meta-grid">
                      <div className="detail-meta-item">
                        <FiUsers className="meta-icon" />
                        <div>
                          <span className="meta-label">Client</span>
                          <span className="meta-value">{selectedProject.client}</span>
                        </div>
                      </div>
                      <div className="detail-meta-item">
                        <FiUsers className="meta-icon" />
                        <div>
                          <span className="meta-label">Manager</span>
                          <span className="meta-value">{selectedProject.manager}</span>
                        </div>
                      </div>
                      <div className="detail-meta-item">
                        <FiCalendar className="meta-icon" />
                        <div>
                          <span className="meta-label">Timeline</span>
                          <span className="meta-value">{selectedProject.startDate} - {selectedProject.endDate}</span>
                        </div>
                      </div>
                      <div className="detail-meta-item">
                        <FiDollarSign className="meta-icon" />
                        <div>
                          <span className="meta-label">Budget</span>
                          <span className="meta-value">{selectedProject.budget || 'N/A'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="project-badges-row">
                      <ProjectPriorityBadge priority={selectedProject.priority} />
                      <ProjectStatusBadge status={selectedProject.status} />
                      <span className="category-badge-detail">{selectedProject.category}</span>
                    </div>

                    <div className="project-stats-row">
                      <div className="pstat-item">
                        <FiCheckSquare />
                        <span>{selectedProject.completedTasks}/{selectedProject.totalTasks} Tasks</span>
                      </div>
                      <div className="pstat-item">
                        <FiFileText />
                        <span>{selectedProject.documentsCount} Documents</span>
                      </div>
                      <div className="pstat-item">
                        <FiUsers />
                        <span>{selectedProject.teamMembers.length} Members</span>
                      </div>
                    </div>

                    <div className="team-members-section">
                      <h6>Assigned Team Members</h6>
                      <div className="team-chips">
                        {selectedProject.teamMembers.map((member, idx) => (
                          <span key={idx} className="team-chip-detail">{member}</span>
                        ))}
                      </div>
                    </div>

                    <div className="project-timeline-section">
                      <h6>Project Timeline</h6>
                      <ProjectTimeline timeline={selectedProject.timeline} />
                    </div>
                  </div>

                  <div className="project-detail-sidebar">
                    <div className="sidebar-card">
                      <h6>Project Documents</h6>
                      <ProjectDocumentBox documents={projectDocumentsData} />
                    </div>

                    <div className="sidebar-card">
                      <h6>Recent Comments</h6>
                      <div className="comments-list">
                        <div className="comment-item">
                          <div className="comment-avatar">MR</div>
                          <div className="comment-content">
                            <strong>Michael Roberts</strong>
                            <p>Development phase is progressing well. UI components are 80% complete.</p>
                            <span className="comment-time">2 hours ago</span>
                          </div>
                        </div>
                        <div className="comment-item">
                          <div className="comment-avatar">DT</div>
                          <div className="comment-content">
                            <strong>David Thompson</strong>
                            <p>API integration completed. Starting frontend integration tomorrow.</p>
                            <span className="comment-time">5 hours ago</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-light" onClick={() => { setShowViewModal(false); setSelectedProject(null); }}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {showDeleteModal && selectedProject && (
        <div className="modal-overlay">
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Project</h5>
                <button className="modal-close-btn" onClick={() => { setShowDeleteModal(false); setSelectedProject(null); }}>
                  <FiX />
                </button>
              </div>
              <div className="modal-body">
                <div className="delete-confirmation">
                  <p>Are you sure you want to delete this project?</p>
                  <div className="delete-project-info">
                    <strong>{selectedProject.title}</strong>
                    <span>{selectedProject.client}</span>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-light" onClick={() => { setShowDeleteModal(false); setSelectedProject(null); }}>
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

export default Projects;


