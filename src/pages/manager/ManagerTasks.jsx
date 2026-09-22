// src/pages/manager/ManagerTasks.jsx
import React, { useEffect, useState, useMemo } from 'react';
import ManagerLayout from '../../layouts/ManagerLayout';
import ManagerTaskStatsCard from '../../components/managerTasks/ManagerTaskStatsCard';
import ManagerTaskCard from '../../components/managerTasks/ManagerTaskCard';
import ManagerTaskTable from '../../components/managerTasks/ManagerTaskTable';
import ManagerTaskFormModal from '../../components/managerTasks/ManagerTaskFormModal';
import ManagerTaskDetailsModal from '../../components/managerTasks/ManagerTaskDetailsModal';
import ManagerTaskStatusModal from '../../components/managerTasks/ManagerTaskStatusModal';
import ManagerTaskKanban from '../../components/managerTasks/ManagerTaskKanban';
import { FiSearch, FiRotateCcw, FiGrid, FiList, FiColumns, FiPlus, FiDownload, FiX } from 'react-icons/fi';
import { managerTaskStatsData, projectsForManager, teamMembersForManager } from '../../data/managerTasksData';
import * as taskService from '../../services/taskService';
import * as projectService from '../../services/projectService';
import * as teamService from '../../services/teamService';
import { apiData } from '../../services/api';
import '../../styles/managerTasks.css';

const ManagerTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState(projectsForManager);
  const [teamMembers, setTeamMembers] = useState(teamMembersForManager);
  const [searchTerm, setSearchTerm] = useState('');
  const [projectFilter, setProjectFilter] = useState('All Projects');
  const [assigneeFilter, setAssigneeFilter] = useState('All Assignees');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [priorityFilter, setPriorityFilter] = useState('All Priority');
  const [deadlineFilter, setDeadlineFilter] = useState('All Deadlines');
  const [viewMode, setViewMode] = useState('card');
  const [alert, setAlert] = useState(null);

  const [showFormModal, setShowFormModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const showAlert = (m, t = 'info') => { setAlert({ message: m, type: t }); setTimeout(() => setAlert(null), 2000); };
  const toUiTask = task => ({ ...task, project: task.project_name || '', assignee: task.assignee_name || '', startDate: task.start_date || '', deadline: task.deadline ? String(task.deadline).slice(0, 10) : '', estimatedHours: Number(task.estimated_hours || 0), timeSpent: 0, checklistCount: 0, completedChecklist: 0, commentsCount: 0, documentsCount: 0, assignedBy: 'Project Manager' });
  const loadTasks = async () => {
    try { const response = await taskService.getTasks(); setTasks(apiData(response).map(toUiTask)); }
    catch (error) { showAlert(error.response?.data?.message || 'Unable to load tasks from the database.', 'danger'); }
  };
  useEffect(() => {
    loadTasks();
    projectService.getProjects().then(response => { const names = apiData(response).map(project => project.title).filter(Boolean); if (names.length) setProjects(names); }).catch(() => {});
    teamService.getTeam().then(response => { const names = apiData(response).map(member => member.name).filter(Boolean); if (names.length) setTeamMembers(names); }).catch(() => {});
  }, []);

  const filteredTasks = useMemo(() => {
    return tasks.filter(t => {
      const matchesSearch = !searchTerm || t.title.toLowerCase().includes(searchTerm.toLowerCase()) || t.project.toLowerCase().includes(searchTerm.toLowerCase()) || t.assignee.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesProject = projectFilter === 'All Projects' || t.project === projectFilter;
      const matchesAssignee = assigneeFilter === 'All Assignees' || t.assignee === assigneeFilter;
      const matchesStatus = statusFilter === 'All Status' || t.status === statusFilter;
      const matchesPriority = priorityFilter === 'All Priority' || t.priority === priorityFilter;
      return matchesSearch && matchesProject && matchesAssignee && matchesStatus && matchesPriority;
    });
  }, [tasks, searchTerm, projectFilter, assigneeFilter, statusFilter, priorityFilter]);

  const resetFilters = () => { setSearchTerm(''); setProjectFilter('All Projects'); setAssigneeFilter('All Assignees'); setStatusFilter('All Status'); setPriorityFilter('All Priority'); setDeadlineFilter('All Deadlines'); };
  const handleExport = () => {
    if (!filteredTasks.length) {
      showAlert('There are no tasks matching the current filters.', 'warning');
      return;
    }
    const columns = ['Task', 'Project', 'Assignee', 'Start Date', 'Deadline', 'Priority', 'Status', 'Progress (%)', 'Estimated Hours'];
    const escapeCsv = value => `"${String(value ?? '').replace(/"/g, '""')}"`;
    const rows = filteredTasks.map(task => [task.title, task.project, task.assignee, task.startDate, task.deadline, task.priority, task.status, task.progress, task.estimatedHours]);
    const csv = [columns, ...rows].map(row => row.map(escapeCsv).join(',')).join('\r\n');
    const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `manager-tasks-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    showAlert(`${filteredTasks.length} task(s) exported to CSV.`, 'success');
  };

  const handleCreate = () => { setSelectedTask(null); setShowFormModal(true); };
  const handleEdit = (t) => { setSelectedTask(t); setShowFormModal(true); };
  const handleView = (t) => { setSelectedTask(t); setShowDetailsModal(true); };
  const handleUpdateStatus = (t) => { setSelectedTask(t); setShowStatusModal(true); };
  const taskPayload = fd => ({ title: fd.title, description: fd.description, project_name: fd.project, assignee_name: fd.assignee, start_date: fd.startDate, deadline: fd.deadline, priority: fd.priority, status: fd.status, progress: Number(fd.progress || 0), estimated_hours: Number(fd.estimatedHours || 0) });
  const handleMarkComplete = async task => { try { await taskService.updateTask(task.id, { status: 'Completed', progress: 100 }); await loadTasks(); showAlert('Task marked as completed!', 'success'); } catch (error) { showAlert(error.response?.data?.message || 'Unable to update task.', 'danger'); } };
  const handleDelete = task => { setSelectedTask(task); setShowDeleteModal(true); };
  const confirmDelete = async () => { try { await taskService.deleteTask(selectedTask.id); await loadTasks(); setShowDeleteModal(false); setSelectedTask(null); showAlert('Task deleted successfully!', 'success'); } catch (error) { showAlert(error.response?.data?.message || 'Unable to delete task.', 'danger'); } };
  const handleFormSubmit = async fd => { try { if (selectedTask) await taskService.updateTask(selectedTask.id, taskPayload(fd)); else await taskService.createTask(taskPayload(fd)); await loadTasks(); setShowFormModal(false); setSelectedTask(null); showAlert(selectedTask ? 'Task updated in database!' : 'Task assigned and saved in database!', 'success'); } catch (error) { showAlert(error.response?.data?.message || 'Unable to save task.', 'danger'); } };
  const handleStatusSubmit = async form => { try { await taskService.updateTask(selectedTask.id, { status: form.status, progress: Number(form.progress) }); await loadTasks(); setShowStatusModal(false); showAlert('Task status updated!', 'success'); } catch (error) { showAlert(error.response?.data?.message || 'Unable to update task status.', 'danger'); } };

  return (
    <ManagerLayout>
      <div className="mt-dashboard">
        <div className="mt-dash-header">
          <div><h3>Manager Tasks</h3><p>Create, assign, track, review, and manage all tasks across your assigned projects.</p></div>
          <div className="d-flex gap-2">
            <button className="btn btn-primary btn-sm" onClick={handleCreate}><FiPlus /> Create Task</button>
            <button className="btn btn-outline-primary btn-sm" onClick={handleExport}><FiDownload /> Export</button>
          </div>
        </div>
        {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`}>{alert.message}<button className="btn-close" onClick={() => setAlert(null)}></button></div>}

        <div className="mt-stats-grid">{managerTaskStatsData.map(s => <ManagerTaskStatsCard key={s.id} stat={s} />)}</div>

        <div className="filter-section"><div className="filter-row">
          <div className="search-box"><FiSearch className="search-icon" /><input type="text" className="form-control search-input" placeholder="Search tasks..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
          <div className="filter-selects">
            <select className="form-select" value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)}><option value="All Projects">All Projects</option>{projects.map(p => <option key={p} value={p}>{p}</option>)}</select>
            <select className="form-select" value={assigneeFilter} onChange={(e) => setAssigneeFilter(e.target.value)}><option value="All Assignees">All Assignees</option>{teamMembers.map(m => <option key={m} value={m}>{m}</option>)}</select>
            <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}><option value="All Status">All Status</option><option>Pending</option><option>In Progress</option><option>Under Review</option><option>Completed</option><option>Reopened</option><option>Blocked</option><option>Cancelled</option></select>
            <select className="form-select" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}><option value="All Priority">All Priority</option><option>Low</option><option>Medium</option><option>High</option><option>Urgent</option></select>
          </div>
          <button className="btn btn-light reset-btn" onClick={resetFilters}><FiRotateCcw className="me-2" /> Reset</button>
          <div className="view-toggle">
            <button className={`toggle-btn ${viewMode === 'card' ? 'active' : ''}`} onClick={() => setViewMode('card')}><FiGrid /></button>
            <button className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`} onClick={() => setViewMode('table')}><FiList /></button>
            <button className={`toggle-btn ${viewMode === 'kanban' ? 'active' : ''}`} onClick={() => setViewMode('kanban')}><FiColumns /></button>
          </div>
        </div></div>

        {viewMode === 'card' && <div className="mt-tasks-grid">{filteredTasks.length === 0 ? <p className="text-center text-muted py-5">No tasks found</p> : filteredTasks.map(t => <ManagerTaskCard key={t.id} task={t} onView={handleView} onEdit={handleEdit} onUpdateStatus={handleUpdateStatus} onMarkComplete={handleMarkComplete} onDelete={handleDelete} />)}</div>}
        {viewMode === 'table' && <div className="mt-table-card"><ManagerTaskTable tasks={filteredTasks} onView={handleView} onEdit={handleEdit} onUpdateStatus={handleUpdateStatus} onMarkComplete={handleMarkComplete} onDelete={handleDelete} /></div>}
        {viewMode === 'kanban' && <ManagerTaskKanban tasks={filteredTasks} />}

        <ManagerTaskFormModal show={showFormModal} onClose={() => { setShowFormModal(false); setSelectedTask(null); }} onSubmit={handleFormSubmit} editTask={selectedTask} projects={projects} teamMembers={teamMembers} />
        <ManagerTaskDetailsModal show={showDetailsModal} onClose={() => { setShowDetailsModal(false); setSelectedTask(null); }} task={selectedTask} onAlert={showAlert} />
        <ManagerTaskStatusModal show={showStatusModal} onClose={() => setShowStatusModal(false)} onSubmit={handleStatusSubmit} task={selectedTask} />

        {showDeleteModal && selectedTask && (
          <div className="modal-overlay"><div className="modal-dialog modal-sm"><div className="modal-content">
            <div className="modal-header"><h5 className="modal-title">Delete Task</h5><button className="modal-close-btn" onClick={() => setShowDeleteModal(false)}><FiX /></button></div>
            <div className="modal-body"><p>Are you sure you want to delete this task?</p><div className="delete-info"><strong>{selectedTask.title}</strong></div></div>
            <div className="modal-footer"><button className="btn btn-light" onClick={() => setShowDeleteModal(false)}>Cancel</button><button className="btn btn-danger" onClick={confirmDelete}>Delete</button></div>
          </div></div></div>
        )}
      </div>
    </ManagerLayout>
  );
};

export default ManagerTasks;