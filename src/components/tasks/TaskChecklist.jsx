// src/components/tasks/TaskChecklist.jsx
import React, { useState } from 'react';
import { FiPlus, FiTrash2, FiCheck } from 'react-icons/fi';

const TaskChecklist = ({ items, editable = false }) => {
  const [checklist, setChecklist] = useState(items || []);
  const [newItem, setNewItem] = useState('');

  const toggleItem = (id) => {
    setChecklist(checklist.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const addItem = () => {
    if (newItem.trim()) {
      setChecklist([
        ...checklist,
        { id: Date.now(), text: newItem.trim(), completed: false }
      ]);
      setNewItem('');
    }
  };

  const removeItem = (id) => {
    setChecklist(checklist.filter(item => item.id !== id));
  };

  const completedCount = checklist.filter(item => item.completed).length;

  return (
    <div className="task-checklist">
      <div className="checklist-header">
        <h6 className="checklist-title">
          Checklist
          <span className="checklist-count">{completedCount}/{checklist.length}</span>
        </h6>
      </div>
      <div className="checklist-items">
        {checklist.map(item => (
          <div key={item.id} className={`checklist-item ${item.completed ? 'completed' : ''}`}>
            <button 
              className={`checklist-toggle ${item.completed ? 'checked' : ''}`}
              onClick={() => toggleItem(item.id)}
            >
              {item.completed && <FiCheck />}
            </button>
            <span className="checklist-text">{item.text}</span>
            {editable && (
              <button className="checklist-delete" onClick={() => removeItem(item.id)}>
                <FiTrash2 />
              </button>
            )}
          </div>
        ))}
      </div>
      {editable && (
        <div className="checklist-add">
          <input
            type="text"
            className="form-control"
            placeholder="Add checklist item..."
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addItem()}
          />
          <button className="btn btn-sm btn-primary" onClick={addItem}>
            <FiPlus /> Add
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskChecklist;