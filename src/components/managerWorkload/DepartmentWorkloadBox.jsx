// src/components/managerWorkload/DepartmentWorkloadBox.jsx
import React from 'react';
import { FiUsers, FiUserCheck, FiAlertTriangle, FiCheckSquare } from 'react-icons/fi';

const DepartmentWorkloadBox = ({ departments }) => (
  <div className="mwl-dept-grid">
    {departments.map(d => (
      <div key={d.id} className="mwl-dept-card">
        <h6>{d.name}</h6>
        <div className="mwl-dept-stats">
          <div className="mwl-dept-stat"><FiUsers /><span>{d.totalMembers}</span><small>Total</small></div>
          <div className="mwl-dept-stat"><FiUserCheck /><span>{d.availableMembers}</span><small>Available</small></div>
          <div className="mwl-dept-stat"><FiAlertTriangle /><span>{d.overloadedMembers}</span><small>Overloaded</small></div>
          <div className="mwl-dept-stat"><FiCheckSquare /><span>{d.totalTasks}</span><small>Tasks</small></div>
        </div>
        <div className="mwl-dept-tasks">
          <span className="text-success">{d.completedTasks} Done</span>
          <span className="text-warning">{d.pendingTasks} Pending</span>
        </div>
        <div className="mwl-dept-progress">
          <div className="mwl-progress-label"><span>Avg Workload</span><strong>{d.averageWorkload}%</strong></div>
          <div className="progress mwl-progress"><div className="progress-bar" style={{ width: `${d.averageWorkload}%` }}></div></div>
        </div>
        <div className="mwl-dept-perf">
          <span>Avg Performance: <strong>{d.averagePerformance}%</strong></span>
        </div>
      </div>
    ))}
  </div>
);
export default DepartmentWorkloadBox;