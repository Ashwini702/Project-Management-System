// src/components/clients/ClientCommunicationHistory.jsx
import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';

const ClientCommunicationHistory = ({ communications = [] }) => {
  const [comms, setComms] = useState(communications);
  const [newMsg, setNewMsg] = useState('');

  const sendMessage = () => {
    if (newMsg.trim()) {
      setComms([...comms, { id: Date.now(), title: 'Quick Message', type: 'Email', date: new Date().toISOString().split('T')[0], notes: newMsg, teamMember: 'Current User' }]);
      setNewMsg('');
    }
  };

  const typeIcon = { Email: '📧', Call: '📞', Meeting: '🤝', WhatsApp: '💬' };

  return (
    <div className="client-communication">
      <h6>Communication History</h6>
      <div className="comm-list">
        {comms.map(comm => (
          <div key={comm.id} className="comm-item">
            <span className="comm-type">{typeIcon[comm.type] || '📝'} {comm.type}</span>
            <div className="comm-content"><strong>{comm.title}</strong><p>{comm.notes}</p></div>
            <div className="comm-meta"><span>{comm.teamMember}</span><span>{comm.date}</span></div>
          </div>
        ))}
      </div>
      <div className="comm-input-row">
        <textarea className="form-control" rows="2" placeholder="Type a message..." value={newMsg} onChange={(e) => setNewMsg(e.target.value)}></textarea>
        <button className="btn btn-sm btn-primary" onClick={sendMessage}><FiSend /> Send</button>
      </div>
    </div>
  );
};

export default ClientCommunicationHistory;