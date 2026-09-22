// src/components/managerMeetings/MeetingParticipantBox.jsx
import React from 'react';
import { participantsList } from '../../data/managerMeetingsData';

const MeetingParticipantBox = ({ participants = [] }) => {
  const details = participants.map(name => participantsList.find(p => p.name === name) || { name, role: 'Unknown', email: '', avatar: name.split(' ').map(n => n[0]).join('') });
  const statuses = ['Invited', 'Accepted', 'Attended', 'Declined', 'Absent'];

  return (
    <div className="mmt-participant-box">
      <h6>Participants ({participants.length})</h6>
      <div className="mmt-part-grid">
        {details.map((p, i) => (
          <div key={i} className="mmt-part-item">
            <div className="mmt-part-avatar">{p.avatar}</div>
            <div className="mmt-part-info">
              <strong>{p.name}</strong><span>{p.role}</span>
              <span className="mmt-part-status">{statuses[i % statuses.length]}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default MeetingParticipantBox;