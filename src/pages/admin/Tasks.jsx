// src/pages/admin/Tasks.jsx
import React, { useEffect, useState, useMemo } from 'react';
import * as taskService from '../../services/taskService';
import { apiData } from '../../services/api';
import AdminLayout from '../../layouts/AdminLayout';
import PageHeader from '../../components/common/PageHeader';
import TaskStatsCard from '../../components/tasks/TaskStatsCard';
import TaskCard from '../../components/tasks/TaskCard';
import TaskTable from '../../components/tasks/TaskTable';
import TaskFormModal from '../../components/tasks/TaskFormModal';
import TaskChecklist from '../../components/tasks/TaskChecklist';
import TaskDiscussion from '../../components/tasks/TaskDiscussion';
import TaskStatusBadge from '../../components/tasks/TaskStatusBadge';
import TaskPriorityBadge from '../../components/tasks/TaskPriorityBadge';
import TaskProgressBar from '../../components/tasks/TaskProgressBar';
import { FiSearch, FiRotateCcw, FiGrid, FiList, FiColumns, FiX, FiCheck, FiClock, FiUser, FiFolder } from 'react-icons/fi';
import { tasksData, taskStatsData, projectsForTasks, assigneesList, priorities, statuses, deadlineFilters } from '../../data/taskData';
import '../../styles/tasks.css';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [priorityFilter, setPriorityFilter] = useState('All Priority');
  const [projectFilter, setProjectFilter] = useState('All Projects');
  const [assigneeFilter, setAssigneeFilter] = useState('All Assignees');
  const [deadlineFilter, setDeadlineFilter] = useState('All Deadlines');
  const [viewMode, setViewMode] = useState('card');

  const [showFormModal, setShowFormModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [alert, setAlert] = useState(null);

  const toUiTask = (task) => ({
    ...task,
    project: task.project_name || task.project || '',
    assignee: task.assignee_name || task.assignee || '',
    startDate: task.start_date || task.startDate || '',
    estimatedHours: task.estimated_hours ?? task.estimatedHours ?? '',
    deadline: task.deadline ? String(task.deadline).slice(0, 10) : '',
    timeSpent: task.timeSpent || 0,
    checklistCount: task.checklistCount || 0,
    completedChecklist: task.completedChecklist || 0,
    commentsCount: task.commentsCount || 0,
    checklist: task.checklist || [],
    discussions: task.discussions || []
  });

  useEffect(() => {
    taskService.getTasks()
      .then(response => setTasks(apiData(response).map(toUiTask)))
      .catch(error => showAlert(error.response?.data?.message || 'Unable to load tasks.', 'danger'));
  }, []);

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.assignee.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.priority.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All Status' || task.status === statusFilter;
      const matchesPriority = priorityFilter === 'All Priority' || task.priority === priorityFilter;
      const matchesProject = projectFilter === 'All Projects' || task.project === projectFilter;
      const matchesAssignee = assigneeFilter === 'All Assignees' || task.assignee === assigneeFilter;
      return matchesSearch && matchesStatus && matchesPriority && matchesProject && matchesAssignee;
    });
  }, [tasks, searchTerm, statusFilter, priorityFilter, projectFilter, assigneeFilter]);

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('All Status');
    setPriorityFilter('All Priority');
    setProjectFilter('All Projects');
    setAssigneeFilter('All Assignees');
    setDeadlineFilter('All Deadlines');
  };

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleCreateTask = () => { setSelectedTask(null); setShowFormModal(true); };
  const handleEditTask = (task) => { setSelectedTask(task); setShowFormModal(true); };
  const handleViewTask = (task) => { setSelectedTask(task); setShowViewModal(true); };
  const handleDeleteTask = (task) => { setSelectedTask(task); setShowDeleteModal(true); };

  const handleMarkComplete = async (task) => {
    try {
      const response = await taskService.updateTask(task.id, { status: 'Completed', progress: 100 });
      const updated = toUiTask(apiData(response));
      setTasks(current => current.map(t => t.id === task.id ? updated : t));
      showAlert('Task marked as completed!');
    } catch (error) {
      showAlert(error.response?.data?.message || 'Unable to update task.', 'danger');
    }
  };

  const confirmDelete = async () => {
    if (!selectedTask) return;
    try {
      await taskService.deleteTask(selectedTask.id);
      setTasks(current => current.filter(t => t.id !== selectedTask.id));
      setShowDeleteModal(false);
      setSelectedTask(null);
      showAlert('Task deleted successfully!');
    } catch (error) {
      showAlert(error.response?.data?.message || 'Unable to delete task.', 'danger');
    }
  };

  const handleFormSubmit = async (formData) => {
    const payload = {
      title: formData.title,
      description: formData.description,
      project_name: formData.project,
      assignee_name: formData.assignee,
      start_date: formData.startDate,
      deadline: formData.deadline,
      priority: formData.priority,
      status: formData.status,
      progress: Number(formData.progress || 0),
      estimated_hours: formData.estimatedHours || null
    };
    try {
      const response = selectedTask
        ? await taskService.updateTask(selectedTask.id, payload)
        : await taskService.createTask(payload);
      const saved = toUiTask(apiData(response));
      setTasks(current => selectedTask
        ? current.map(t => t.id === selectedTask.id ? saved : t)
        : [saved, ...current]);
      showAlert(selectedTask ? 'Task updated successfully!' : 'Task saved successfully!');
      setShowFormModal(false);
      setSelectedTask(null);
    } catch (error) {
      showAlert(error.response?.data?.message || 'Unable to save task.', 'danger');
    }
  };

  const kanbanColumns = ['Pending', 'In Progress', 'Under Review', 'Completed', 'Reopened'];

  return (
    <AdminLayout>
      <PageHeader title="Task Management" subtitle="Create, assign, monitor, and track all project tasks, priorities, deadlines, and progress." buttonText="Create New Task" onButtonClick={handleCreateTask} showButton={true} />

      {alert && (
        <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
          {alert.message}
          <button type="button" className="btn-close" onClick={() => setAlert(null)}></button>
        </div>
      )}

      <div className="task-stats-grid">
        {taskStatsData.map((stat) => <TaskStatsCard key={stat.id} stat={stat} />)}
      </div>

      <div className="filter-section">
        <div className="filter-row">
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input type="text" className="form-control search-input" placeholder="Search tasks by title, project, assignee, priority..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
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
            <select className="form-select" value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)}>
              <option value="All Projects">All Projects</option>
              {projectsForTasks.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <select className="form-select" value={assigneeFilter} onChange={(e) => setAssigneeFilter(e.target.value)}>
              <option value="All Assignees">All Assignees</option>
              {assigneesList.map(a => <option key={a} value={a}>{a}</option>)}
            </select>
            <select className="form-select" value={deadlineFilter} onChange={(e) => setDeadlineFilter(e.target.value)}>
              {deadlineFilters.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <button className="btn btn-light reset-btn" onClick={resetFilters}><FiRotateCcw className="me-2" /> Reset</button>
          <div className="view-toggle">
            <button className={`toggle-btn ${viewMode === 'card' ? 'active' : ''}`} onClick={() => setViewMode('card')}><FiGrid /></button>
            <button className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`} onClick={() => setViewMode('table')}><FiList /></button>
            <button className={`toggle-btn ${viewMode === 'kanban' ? 'active' : ''}`} onClick={() => setViewMode('kanban')}><FiColumns /></button>
          </div>
        </div>
      </div>

      {viewMode === 'card' && (
        <div className="tasks-grid">
          {filteredTasks.length === 0 ? (
            <div className="no-tasks"><p className="text-muted">No tasks found</p></div>
          ) : (
            filteredTasks.map((task) => (
              <TaskCard key={task.id} task={task} onView={handleViewTask} onEdit={handleEditTask} onDelete={handleDeleteTask} onMarkComplete={handleMarkComplete} />
            ))
          )}
        </div>
      )}

      {viewMode === 'table' && (
        <div className="tasks-table-card">
          <TaskTable tasks={filteredTasks} onView={handleViewTask} onEdit={handleEditTask} onDelete={handleDeleteTask} onMarkComplete={handleMarkComplete} />
        </div>
      )}

      {viewMode === 'kanban' && (
        <div className="kanban-board">
          {kanbanColumns.map(column => (
            <div key={column} className="kanban-column">
              <div className="kanban-column-header">
                <h6>{column}</h6>
                <span className="kanban-count">{filteredTasks.filter(t => t.status === column).length}</span>
              </div>
              <div className="kanban-cards">
                {filteredTasks.filter(t => t.status === column).map(task => (
                  <div key={task.id} className="kanban-card" onClick={() => handleViewTask(task)}>
                    <div className="kanban-card-title">{task.title}</div>
                    <div className="kanban-card-meta">
                      <span><FiFolder /> {task.project}</span>
                      <span><FiUser /> {task.assignee}</span>
                    </div>
                    <div className="kanban-card-footer">
                      <TaskPriorityBadge priority={task.priority} />
                      <span className="kanban-deadline"><FiClock /> {task.deadline}</span>
                    </div>
                    <TaskProgressBar progress={task.progress} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <TaskFormModal show={showFormModal} onClose={() => { setShowFormModal(false); setSelectedTask(null); }} onSubmit={handleFormSubmit} editTask={selectedTask} />

      {showViewModal && selectedTask && (
        <div className="modal-overlay">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedTask.title}</h5>
                <button className="modal-close-btn" onClick={() => { setShowViewModal(false); setSelectedTask(null); }}><FiX /></button>
              </div>
              <div className="modal-body">
                <p className="task-detail-desc">{selectedTask.description}</p>
                <div className="task-detail-meta">
                  <div className="detail-meta-item"><FiFolder /><div><span className="meta-label">Project</span><span className="meta-value">{selectedTask.project}</span></div></div>
                  <div className="detail-meta-item"><FiUser /><div><span className="meta-label">Assignee</span><span className="meta-value">{selectedTask.assignee}</span></div></div>
                  <div className="detail-meta-item"><FiClock /><div><span className="meta-label">Timeline</span><span className="meta-value">{selectedTask.startDate} - {selectedTask.deadline}</span></div></div>
                </div>
                <div className="task-detail-badges">
                  <TaskPriorityBadge priority={selectedTask.priority} />
                  <TaskStatusBadge status={selectedTask.status} />
                </div>
                <div className="task-detail-progress">
                  <TaskProgressBar progress={selectedTask.progress} />
                  <span className="time-spent">Time: {selectedTask.timeSpent}h / {selectedTask.estimatedHours}h</span>
                </div>
                <TaskChecklist items={selectedTask.checklist} editable={true} />
                <TaskDiscussion discussions={selectedTask.discussions} editable={true} />
              </div>
              <div className="modal-footer">
                <button className="btn btn-light" onClick={() => { setShowViewModal(false); setSelectedTask(null); }}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && selectedTask && (
        <div className="modal-overlay">
          <div className="modal-dialog modal-sm">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Task</h5>
                <button className="modal-close-btn" onClick={() => { setShowDeleteModal(false); setSelectedTask(null); }}><FiX /></button>
              </div>
              <div className="modal-body">
                <div className="delete-confirmation">
                  <p>Are you sure you want to delete this task?</p>
                  <div className="delete-info"><strong>{selectedTask.title}</strong><span>{selectedTask.project}</span></div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-light" onClick={() => { setShowDeleteModal(false); setSelectedTask(null); }}>Cancel</button>
                <button className="btn btn-danger" onClick={confirmDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default Tasks;

