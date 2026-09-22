// src/components/teamTasks/TeamTaskChecklist.jsx
import React, { useState } from 'react';
import { FiCheck } from 'react-icons/fi';
import { checklistItems } from '../../data/teamTasksData';

const TeamTaskChecklist = ({ taskId }) => {
  const [items, setItems] = useState(checklistItems.filter(i => i.taskId === taskId));
  const toggle = (id) => setItems(items.map(i => i.id === id ? { ...i, completed: !i.completed } : i));
  const completed = items.filter(i => i.completed).length;

  return (
    <div className="tt-checklist">
      <h6>Checklist ({completed}/{items.length})</h6>
      <div className="progress tt-progress mb-2"><div className="progress-bar" style={{ width: `${items.length > 0 ? (completed / items.length) * 100 : 0}%`, backgroundColor: 'var(--success-color)' }}></div></div>
      {items.map(i => (
        <div key={i.id} className={`tt-check-row ${i.completed ? 'done' : ''}`}>
          <button className={`tt-check-toggle ${i.completed ? 'checked' : ''}`} onClick={() => toggle(i.id)}>{i.completed && <FiCheck />}</button>
          <span>{i.title}</span>
        </div>
      ))}
    </div>
  );
};
export default TeamTaskChecklist;