// src/components/managerMeetings/ManagerMeetingCard.jsx
import React from 'react';
import { FiEye, FiEdit2, FiCheck, FiEdit3, FiTrash2, FiClock, FiUsers, FiMapPin, FiLink, FiList } from 'react-icons/fi';
import MeetingStatusBadge from './MeetingStatusBadge';
import MeetingTypeBadge from './MeetingTypeBadge';

const ManagerMeetingCard = ({ meeting, onView, onEdit, onMarkComplete, onAddNotes, onDelete }) => (
  <div className="mmt-card">
    <div className="mmt-card-header">
      <MeetingTypeBadge type={meeting.type} />
      <MeetingStatusBadge status={meeting.status} />
    </div>
    <h6 className="mmt-card-title">{meeting.title}</h6>
    <p className="mmt-card-desc">{meeting.description}</p>
    <div className="mmt-card-meta">
      <span><FiClock /> {meeting.date} | {meeting.startTime} - {meeting.endTime}</span>
      {meeting.mode === 'Online' && <span><FiLink /> Online</span>}
      {meeting.mode === 'Offline' && <span><FiMapPin /> {meeting.location}</span>}
      {meeting.mode === 'Hybrid' && <span><FiLink /> Hybrid</span>}
    </div>
    <div className="mmt-card-project">{meeting.project}{meeting.client ? ` • ${meeting.client}` : ''}</div>
    <div className="mmt-card-stats">
      <span><FiUsers /> {meeting.participants.length} Participants</span>
      <span><FiList /> {meeting.agenda.length} Agenda</span>
    </div>
    <div className="mmt-card-actions">
      <button className="mmt-btn" onClick={() => onView(meeting)}><FiEye /></button>
      <button className="mmt-btn" onClick={() => onEdit(meeting)}><FiEdit2 /></button>
      {meeting.status !== 'Completed' && <button className="mmt-btn complete" onClick={() => onMarkComplete(meeting)}><FiCheck /></button>}
      <button className="mmt-btn" onClick={() => onAddNotes(meeting)}><FiEdit3 /></button>
      <button className="mmt-btn delete" onClick={() => onDelete(meeting)}><FiTrash2 /></button>
    </div>
  </div>
);
export default ManagerMeetingCard;