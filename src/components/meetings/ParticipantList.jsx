// src/components/meetings/ParticipantList.jsx
import React from 'react';
import { participantsList } from '../../data/meetingData';

const ParticipantList = ({ participants = [] }) => {
  const participantDetails = participants.map(name => participantsList.find(p => p.name === name) || { name, role: 'Unknown', email: '', avatar: name.split(' ').map(n => n[0]).join('') });
  const statuses = ['Invited', 'Accepted', 'Declined', 'Attended', 'Absent'];
  const getStatus = (idx) => statuses[Math.min(idx, statuses.length - 1)];

  return (
    <div className="participant-list"><h6>Participants ({participants.length})</h6>
      <div className="participants-grid">
        {participantDetails.map((p, idx) => (
          <div key={idx} className="participant-item">
            <div className="participant-avatar">{p.avatar}</div>
            <div className="participant-info">
              <strong>{p.name}</strong>
              <span>{p.role}</span>
              <span className="participant-status">{getStatus(idx)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ParticipantList;