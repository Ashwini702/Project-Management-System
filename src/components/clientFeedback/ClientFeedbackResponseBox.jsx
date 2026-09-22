// src/components/clientFeedback/ClientFeedbackResponseBox.jsx
import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';

const ClientFeedbackResponseBox = ({ responses = [], feedbackId, onAddResponse }) => {
  const [reply, setReply] = useState('');

  const handleSend = () => {
    if (reply.trim()) { onAddResponse(feedbackId, reply); setReply(''); }
  };

  return (
    <div className="clfb-response-box">
      <h6>Responses ({responses.length})</h6>
      {responses.length === 0 ? <p className="text-muted text-center py-2">No responses yet</p> :
        responses.map(r => (
          <div key={r.id} className="clfb-resp-item">
            <div className="clfb-resp-avatar">{r.senderName.split(' ').map(n => n[0]).join('')}</div>
            <div className="clfb-resp-body">
              <div className="clfb-resp-header"><strong>{r.senderName}</strong><span>{r.senderRole}</span><span className="clfb-resp-time">{r.dateTime}</span></div>
              <p>{r.message}</p>
              {r.statusUpdate && <small>Status: {r.statusUpdate}</small>}
            </div>
          </div>
        ))
      }
      <div className="clfb-resp-input">
        <textarea className="form-control" rows="2" placeholder="Write a reply..." value={reply} onChange={(e) => setReply(e.target.value)}></textarea>
        <button className="btn btn-primary btn-sm" onClick={handleSend}><FiSend /> Send</button>
      </div>
    </div>
  );
};
export default ClientFeedbackResponseBox;