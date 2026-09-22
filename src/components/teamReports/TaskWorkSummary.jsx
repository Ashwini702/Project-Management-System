import React from 'react';

const TaskWorkSummary = ({ report }) => {
  if (!report) return null;

  const tasks = report.tasks || report.completedTasks || [];

  return (
    <div className="tdr-task-summary">
      <h6>Task Work Summary</h6>
      {tasks.length === 0 ? (
        <p className="text-muted mb-0">No task details added for this report.</p>
      ) : (
        <ul className="tdr-task-list">
          {tasks.map((task, index) => (
            <li key={`${task.title || task}-${index}`}>
              {typeof task === 'string' ? task : task.title || task.taskTitle}
            </li>
          ))}
        </ul>
      )}
      {report.blockers && (
        <div className="mt-3">
          <strong>Blockers:</strong>
          <p className="mb-0">{report.blockers}</p>
        </div>
      )}
    </div>
  );
};

export default TaskWorkSummary;
