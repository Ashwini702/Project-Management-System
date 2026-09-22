// src/components/managerTasks/ManagerTaskDiscussion.jsx
import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';

const ManagerTaskDiscussion = ({ onAlert }) => {
  const [comments, setComments] = useState([
    { id: 1, user: 'Priya Sharma', role: 'Project Manager', avatar: 'PS', message: 'Please prioritize the responsive layout for mobile devices.', time: '2026-06-18 10:00' },
    { id: 2, user: 'Saurabh Nalode', role: 'Frontend Developer', avatar: 'SN', message: 'Working on it. Will complete by tomorrow.', time: '2026-06-18 14:00' }
  ]);
  const [newMsg, setNewMsg] = useState('');

  const addComment = () => {
    if (newMsg.trim()) {
      setComments([...comments, { id: Date.now(), user: 'Priya Sharma', role: 'Project Manager', avatar: 'PS', message: newMsg.trim(), time: new Date().toISOString().replace('T', ' ').substring(0, 16) }]);
      setNewMsg('');
      onAlert('Comment added successfully!', 'success');
    }
  };

  return (
    <div className="mt-discussion">
      <h6>Discussion</h6>
      <div className="mt-disc-list">
        {comments.map(c => (
          <div key={c.id} className="mt-disc-item">
            <div className="mt-disc-avatar">{c.avatar}</div>
            <div className="mt-disc-body">
              <div className="mt-disc-header"><strong>{c.user}</strong><span>{c.role}</span><span className="mt-disc-time">{c.time}</span></div>
              <p>{c.message}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-disc-input">
        <textarea className="form-control" rows="2" placeholder="Add a comment..." value={newMsg} onChange={(e) => setNewMsg(e.target.value)}></textarea>
        <button className="btn btn-primary" onClick={addComment}><FiSend /> Post</button>
      </div>
    </div>
  );
};

export default ManagerTaskDiscussion;