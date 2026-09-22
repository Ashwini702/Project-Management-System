// src/components/teamTasks/TeamTaskDiscussion.jsx
import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { discussionItems } from '../../data/teamTasksData';

const TeamTaskDiscussion = ({ taskId, onAlert }) => {
  const [messages, setMessages] = useState(discussionItems.filter(d => d.taskId === taskId));
  const [newMsg, setNewMsg] = useState('');

  const addNote = () => {
    if (newMsg.trim()) {
      setMessages([...messages, { id: Date.now(), taskId, senderName: 'Saurabh Nalode', senderRole: 'Frontend Developer', message: newMsg.trim(), dateTime: new Date().toISOString().replace('T', ' ').substring(0, 16) }]);
      setNewMsg('');
      onAlert('Work note added!', 'success');
    }
  };

  return (
    <div className="tt-discussion">
      <h6>Work Notes & Discussion</h6>
      <div className="tt-disc-list">
        {messages.length === 0 ? <p className="text-muted text-center py-2">No notes yet</p> :
          messages.map(m => (
            <div key={m.id} className="tt-disc-item">
              <div className="tt-disc-avatar">{m.senderName.split(' ').map(n => n[0]).join('')}</div>
              <div className="tt-disc-body">
                <div className="tt-disc-header"><strong>{m.senderName}</strong><span>{m.senderRole}</span><span className="tt-disc-time">{m.dateTime}</span></div>
                <p>{m.message}</p>
              </div>
            </div>
          ))
        }
      </div>
      <div className="tt-disc-input">
        <textarea className="form-control" rows="2" placeholder="Add a work note..." value={newMsg} onChange={(e) => setNewMsg(e.target.value)}></textarea>
        <button className="btn btn-primary btn-sm" onClick={addNote}><FiSend /> Add Note</button>
      </div>
    </div>
  );
};
export default TeamTaskDiscussion;