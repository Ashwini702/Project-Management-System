// src/pages/manager/ManagerProjects.jsx
import React, { useMemo, useState } from 'react';
import ManagerLayout from '../../layouts/ManagerLayout';
import ManagerProjectCard from '../../components/managerDashboard/ManagerProjectCard';
import ProjectStatusBadge from '../../components/managerDashboard/ProjectStatusBadge';
import {
  FiBarChart2,
  FiDownload,
  FiGrid,
  FiList,
  FiRotateCcw,
  FiSearch,
  FiUsers
} from 'react-icons/fi';
import { assignedProjects } from '../../data/managerDashboardData';

const statusOptions = ['All Status', ...new Set(assignedProjects.map(project => project.status))];
const priorityOptions = ['All Priority', ...new Set(assignedProjects.map(project => project.priority))];

const ManagerProjects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [priorityFilter, setPriorityFilter] = useState('All Priority');
  const [viewMode, setViewMode] = useState('card');
  const [alert, setAlert] = useState(null);

  const filteredProjects = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return assignedProjects.filter(project => {
      const matchesSearch =
        project.projectName.toLowerCase().includes(query) ||
        project.clientName.toLowerCase().includes(query) ||
        project.category.toLowerCase().includes(query);
      const matchesStatus = statusFilter === 'All Status' || project.status === statusFilter;
      const matchesPriority = priorityFilter === 'All Priority' || project.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [priorityFilter, searchTerm, statusFilter]);

  const projectStats = useMemo(() => {
    const totalTasks = assignedProjects.reduce((sum, project) => sum + project.totalTasks, 0);
    const completedTasks = assignedProjects.reduce((sum, project) => sum + project.completedTasks, 0);
    const averageProgress = Math.round(
      assignedProjects.reduce((sum, project) => sum + project.progress, 0) / assignedProjects.length
    );

    return [
      { label: 'Assigned Projects', value: assignedProjects.length, icon: FiGrid },
      { label: 'Team Members', value: assignedProjects.reduce((sum, project) => sum + project.teamCount, 0), icon: FiUsers },
      { label: 'Completed Tasks', value: completedTasks, icon: FiList },
      { label: 'Average Progress', value: `${averageProgress}%`, icon: FiBarChart2 },
      { label: 'Total Tasks', value: totalTasks, icon: FiDownload }
    ];
  }, []);

  const showAlert = (message, type = 'info') => {
    setAlert({ message, type });
  };

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('All Status');
    setPriorityFilter('All Priority');
  };
  const handleExport = () => {
    if (!filteredProjects.length) {
      showAlert('There are no projects matching the current filters.', 'warning');
      return;
    }

    const columns = ['Project', 'Client', 'Category', 'Status', 'Priority', 'Progress (%)', 'Completed Tasks', 'Total Tasks', 'Team Members', 'Deadline'];
    const escapeCsv = value => `"${String(value ?? '').replace(/"/g, '""')}"`;
    const rows = filteredProjects.map(project => [
      project.projectName, project.clientName, project.category, project.status,
      project.priority, project.progress, project.completedTasks, project.totalTasks,
      project.teamCount, project.deadline
    ]);
    const csv = [columns, ...rows].map(row => row.map(escapeCsv).join(',')).join('\r\n');
    const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `manager-projects-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showAlert(`${filteredProjects.length} project(s) exported to CSV.`, 'success');
  };

  return (
    <ManagerLayout>
      <div className="mgr-dashboard manager-projects-page">
        <div className="mgr-dash-header">
          <div>
            <h3>My Projects</h3>
            <p>View and manage projects assigned to your manager account.</p>
          </div>
          <div className="d-flex gap-2">
            <button
              type="button"
              className="btn btn-outline-primary btn-sm"
              onClick={handleExport}
            >
              <FiDownload /> Export
            </button>
          </div>
        </div>

        {alert && (
          <div className={`alert alert-${alert.type} alert-dismissible fade show`}>
            {alert.message}
            <button type="button" className="btn-close" onClick={() => setAlert(null)}></button>
          </div>
        )}

        <div className="mgr-stats-grid">
          {projectStats.map(stat => {
            const Icon = stat.icon;

            return (
              <div className="mgr-stat-card" key={stat.label}>
                <div className="mgr-stat-content">
                  <div className="mgr-stat-icon-wrapper">
                    <Icon className="mgr-stat-icon" />
                  </div>
                  <div>
                    <h4>{stat.value}</h4>
                    <p>{stat.label}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="filter-section">
          <div className="filter-row">
            <div className="search-box">
              <FiSearch className="search-icon" />
              <input
                type="text"
                className="form-control search-input"
                placeholder="Search projects, clients, category..."
                value={searchTerm}
                onChange={event => setSearchTerm(event.target.value)}
              />
            </div>

            <div className="filter-selects">
              <select
                className="form-select"
                value={statusFilter}
                onChange={event => setStatusFilter(event.target.value)}
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>

              <select
                className="form-select"
                value={priorityFilter}
                onChange={event => setPriorityFilter(event.target.value)}
              >
                {priorityOptions.map(priority => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
            </div>

            <button type="button" className="btn btn-light reset-btn" onClick={resetFilters}>
              <FiRotateCcw className="me-2" /> Reset
            </button>

            <div className="view-toggle">
              <button
                type="button"
                className={`toggle-btn ${viewMode === 'card' ? 'active' : ''}`}
                onClick={() => setViewMode('card')}
                aria-label="Card view"
              >
                <FiGrid />
              </button>
              <button
                type="button"
                className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
                onClick={() => setViewMode('table')}
                aria-label="Table view"
              >
                <FiList />
              </button>
            </div>
          </div>
        </div>

        {viewMode === 'card' && (
          <div className="mgr-projects-grid">
            {filteredProjects.length === 0 ? (
              <p className="text-center text-muted py-5">No projects found</p>
            ) : (
              filteredProjects.map(project => (
                <ManagerProjectCard
                  key={project.id}
                  project={project}
                  onView={() => showAlert(`Opening ${project.projectName} details.`, 'info')}
                  onAssignTask={() => showAlert(`Assign task for ${project.projectName}.`, 'success')}
                  onUpdateStatus={() => showAlert(`Status update opened for ${project.projectName}.`, 'info')}
                />
              ))
            )}
          </div>
        )}

        {viewMode === 'table' && (
          <div className="mgr-table-card">
            <div className="table-responsive">
              <table className="table mgr-table">
                <thead>
                  <tr>
                    <th>Project</th>
                    <th>Client</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Progress</th>
                    <th>Tasks</th>
                    <th>Team</th>
                    <th>Deadline</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.map(project => (
                    <tr key={project.id}>
                      <td><span className="mgr-name">{project.projectName}</span></td>
                      <td>{project.clientName}</td>
                      <td>{project.category}</td>
                      <td><ProjectStatusBadge status={project.status} /></td>
                      <td>{project.priority}</td>
                      <td>
                        <span className="mini-progress">
                          <span className="mini-progress-bar" style={{ width: `${project.progress}%` }}></span>
                        </span>
                        <span className="ms-2">{project.progress}%</span>
                      </td>
                      <td>{project.completedTasks}/{project.totalTasks}</td>
                      <td>{project.teamCount}</td>
                      <td>{project.deadline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </ManagerLayout>
  );
};

export default ManagerProjects;
