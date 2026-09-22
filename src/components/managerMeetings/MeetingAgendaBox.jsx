// src/components/managerMeetings/MeetingAgendaBox.jsx
import React, { useState } from 'react';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

const MeetingAgendaBox = ({ agenda = [], editable = false }) => {
  const [items, setItems] = useState(agenda);
  const [newItem, setNewItem] = useState('');

  const toggleStatus = (id) => setItems(items.map(i => i.id === id ? { ...i, status: i.status === 'Pending' ? 'Discussed' : i.status === 'Discussed' ? 'Skipped' : 'Pending' } : i));
  const addItem = () => { if (newItem.trim()) { setItems([...items, { id: Date.now(), title: newItem.trim(), status: 'Pending', assignedTo: '', notes: '' }]); setNewItem(''); } };
  const removeItem = (id) => setItems(items.filter(i => i.id !== id));

  return (
    <div className="mmt-agenda-box">
      <h6>Agenda ({items.filter(i => i.status === 'Discussed').length}/{items.length})</h6>
      {items.map(i => (
        <div key={i.id} className={`mmt-agenda-item ${i.status.toLowerCase()}`} onClick={() => toggleStatus(i.id)}>
          <span className={`mmt-agenda-dot ${i.status.toLowerCase()}`}></span>
          <span className="mmt-agenda-text">{i.title}</span>
          <span className="mmt-agenda-status">{i.status}</span>
          {editable && <button className="mmt-agenda-del" onClick={(e) => { e.stopPropagation(); removeItem(i.id); }}><FiTrash2 /></button>}
        </div>
      ))}
      {editable && <div className="mmt-agenda-add"><input type="text" className="form-control" placeholder="Add item..." value={newItem} onChange={(e) => setNewItem(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && addItem()} /><button className="btn btn-sm btn-primary" onClick={addItem}><FiPlus /></button></div>}
    </div>
  );
};
export default MeetingAgendaBox;