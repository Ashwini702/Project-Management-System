// src/components/teamDeadlines/OverdueDeadlineBox.jsx
import React from 'react';
import { overdueDeadlines } from '../../data/teamDeadlinesData';
import { FiEye, FiEdit2, FiClock, FiCheck } from 'react-icons/fi';

const OverdueDeadlineBox = ({ onView, onAddNote, onRequestExtension, onMarkComplete }) => (
  <div className="td-overdue-box">
    <h6 className="text-danger">Overdue Deadlines</h6>
    {overdueDeadlines.map(d => (
      <div key={d.id} className="td-overdue-item">
        <div className="td-overdue-info">
          <strong>{d.title}</strong>
          <span>{d.project} • Due: {d.dueDate} ({d.daysOverdue}d overdue)</span>
          {d.note && <small className="text-muted">{d.note}</small>}
        </div>
        <div className="td-overdue-progress">
          <div className="mini-progress"><div className="mini-progress-bar" style={{ width: `${d.progress}%` }}></div></div>
          <small>{d.progress}%</small>
        </div>
        <div className="td-overdue-actions">
          <button className="td-btn-sm" onClick={() => onView(d)}><FiEye /></button>
          <button className="td-btn-sm" onClick={() => onAddNote(d)}><FiEdit2 /></button>
          <button className="td-btn-sm" onClick={() => onRequestExtension(d)}><FiClock /> Extend</button>
          <button className="td-btn-sm complete" onClick={() => onMarkComplete(d)}><FiCheck /></button>
        </div>
      </div>
    ))}
  </div>
);
export default OverdueDeadlineBox;