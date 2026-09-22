// src/components/meetings/MeetingAgenda.jsx
import React, { useState } from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

const MeetingAgenda = ({ agenda = [], editable = false }) => {
  const [items, setItems] = useState(agenda);
  const [newItem, setNewItem] = useState('');
  const toggleStatus = (id) => { setItems(items.map(i => i.id === id ? { ...i, status: i.status === 'Pending' ? 'Discussed' : i.status === 'Discussed' ? 'Skipped' : 'Pending' } : i)); };
  const addItem = () => { if (newItem.trim()) { setItems([...items, { id: Date.now(), text: newItem.trim(), status: 'Pending' }]); setNewItem(''); } };
  const removeItem = (id) => { setItems(items.filter(i => i.id !== id)); };

  return (
    <div className="meeting-agenda"><h6>Agenda</h6>
      <div className="agenda-items">{items.map(a => <div key={a.id} className={`agenda-item ${a.status.toLowerCase()}`} onClick={() => toggleStatus(a.id)}><span className={`agenda-dot ${a.status.toLowerCase()}`}></span><span className="agenda-text">{a.text}</span><span className="agenda-status">{a.status}</span>{editable && <button className="agenda-remove" onClick={(e) => { e.stopPropagation(); removeItem(a.id); }}><FiTrash2 /></button>}</div>)}</div>
      {editable && <div className="agenda-add"><input type="text" className="form-control" placeholder="Add agenda item..." value={newItem} onChange={(e) => setNewItem(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && addItem()} /><button className="btn btn-sm btn-primary" onClick={addItem}><FiPlus /></button></div>}
    </div>
  );
};
export default MeetingAgenda;