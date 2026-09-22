// src/components/taskDetails/TaskChecklistBox.jsx
import React, { useState } from 'react';
import { FiPlus, FiTrash2, FiCheck } from 'react-icons/fi';
import { checklistItems } from '../../data/taskDetailsData';

const TaskChecklistBox = () => {
  const [items, setItems] = useState(checklistItems);
  const [newItem, setNewItem] = useState('');

  const toggleItem = (id) => setItems(items.map(i => i.id === id ? { ...i, completed: !i.completed } : i));
  const addItem = () => { if (newItem.trim()) { setItems([...items, { id: Date.now(), text: newItem.trim(), completed: false, assignedTo: 'Lisa Martinez', dueDate: '' }]); setNewItem(''); } };
  const removeItem = (id) => setItems(items.filter(i => i.id !== id));

  const completed = items.filter(i => i.completed).length;

  return (
    <div className="td-checklist">
      <div className="checklist-header">
        <h6>Checklist ({completed}/{items.length})</h6>
        <div className="checklist-progress"><div className="progress"><div className="progress-bar" style={{ width: `${items.length > 0 ? (completed / items.length) * 100 : 0}%` }}></div></div></div>
      </div>
      <div className="checklist-items">
        {items.map(item => (
          <div key={item.id} className={`checklist-row ${item.completed ? 'completed' : ''}`}>
            <button className={`checklist-toggle ${item.completed ? 'checked' : ''}`} onClick={() => toggleItem(item.id)}>{item.completed && <FiCheck />}</button>
            <span className="checklist-text">{item.text}</span>
            {item.assignedTo && <span className="checklist-assignee">{item.assignedTo}</span>}
            {item.dueDate && <span className="checklist-date">{item.dueDate}</span>}
            <button className="checklist-delete" onClick={() => removeItem(item.id)}><FiTrash2 /></button>
          </div>
        ))}
      </div>
      <div className="checklist-add">
        <input type="text" className="form-control" placeholder="Add checklist item..." value={newItem} onChange={(e) => setNewItem(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && addItem()} />
        <button className="btn btn-sm btn-primary" onClick={addItem}><FiPlus /> Add</button>
      </div>
    </div>
  );
};

export default TaskChecklistBox;