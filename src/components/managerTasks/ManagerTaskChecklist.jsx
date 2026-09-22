// src/components/managerTasks/ManagerTaskChecklist.jsx
import React, { useState } from 'react';
import { FiPlus, FiTrash2, FiCheck } from 'react-icons/fi';

const ManagerTaskChecklist = () => {
  const [items, setItems] = useState([
    { id: 1, text: 'Research requirements', completed: true },
    { id: 2, text: 'Create wireframes', completed: true },
    { id: 3, text: 'Design prototype', completed: false },
    { id: 4, text: 'Client review', completed: false }
  ]);
  const [newItem, setNewItem] = useState('');

  const toggleItem = (id) => setItems(items.map(i => i.id === id ? { ...i, completed: !i.completed } : i));
  const addItem = () => { if (newItem.trim()) { setItems([...items, { id: Date.now(), text: newItem.trim(), completed: false }]); setNewItem(''); } };
  const removeItem = (id) => setItems(items.filter(i => i.id !== id));

  return (
    <div className="mt-checklist">
      <h6>Checklist ({items.filter(i => i.completed).length}/{items.length})</h6>
      <div className="mt-check-items">
        {items.map(i => (
          <div key={i.id} className={`mt-check-row ${i.completed ? 'completed' : ''}`}>
            <button className={`mt-check-toggle ${i.completed ? 'checked' : ''}`} onClick={() => toggleItem(i.id)}>{i.completed && <FiCheck />}</button>
            <span>{i.text}</span>
            <button className="mt-check-delete" onClick={() => removeItem(i.id)}><FiTrash2 /></button>
          </div>
        ))}
      </div>
      <div className="mt-check-add">
        <input type="text" className="form-control" placeholder="Add item..." value={newItem} onChange={(e) => setNewItem(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && addItem()} />
        <button className="btn btn-sm btn-primary" onClick={addItem}><FiPlus /> Add</button>
      </div>
    </div>
  );
};

export default ManagerTaskChecklist;