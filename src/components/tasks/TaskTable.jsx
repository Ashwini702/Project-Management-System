// src/components/tasks/TaskTable.jsx
import React from 'react';
import { FiEye, FiEdit2, FiTrash2, FiCheck } from 'react-icons/fi';
import TaskStatusBadge from './TaskStatusBadge';
import TaskPriorityBadge from './TaskPriorityBadge';
import TaskProgressBar from './TaskProgressBar';

const TaskTable = ({ tasks, onView, onEdit, onDelete, onMarkComplete }) => {
  return (
    <div className="table-responsive">
      <table className="table tasks-table">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Project</th>
            <th>Assignee</th>
            <th>Deadline</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Progress</th>
            <th>Time Spent</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan="9" className="text-center py-5">
                <p className="text-muted mb-0">No tasks found</p>
              </td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr key={task.id}>
                <td>
                  <div className="task-name-cell">
                    <span className="task-name-text">{task.title}</span>
                  </div>
                </td>
                <td>{task.project}</td>
                <td>{task.assignee}</td>
                <td>{task.deadline}</td>
                <td><TaskPriorityBadge priority={task.priority} /></td>
                <td><TaskStatusBadge status={task.status} /></td>
                <td>
                  <div style={{ minWidth: '120px' }}>
                    <TaskProgressBar progress={task.progress} />
                  </div>
                </td>
                <td>{task.timeSpent}h / {task.estimatedHours}h</td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn-icon view-btn" onClick={() => onView(task)} title="View">
                      <FiEye />
                    </button>
                    <button className="action-btn-icon edit-btn" onClick={() => onEdit(task)} title="Edit">
                      <FiEdit2 />
                    </button>
                    {task.status !== 'Completed' && (
                      <button className="action-btn-icon complete-btn" onClick={() => onMarkComplete(task)} title="Mark Complete">
                        <FiCheck />
                      </button>
                    )}
                    <button className="action-btn-icon delete-btn" onClick={() => onDelete(task)} title="Delete">
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

export default TaskTable;