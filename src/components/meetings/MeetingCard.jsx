// src/components/meetings/MeetingCard.jsx
import React from 'react';
import { FiClock, FiMapPin, FiLink, FiUsers, FiList, FiEye, FiEdit2, FiTrash2, FiCheck } from 'react-icons/fi';
import MeetingStatusBadge from './MeetingStatusBadge';
import MeetingTypeBadge from './MeetingTypeBadge';

const MeetingCard = ({ meeting, onView, onEdit, onDelete, onMarkComplete }) => (
  <div className="meeting-card">
    <div className="meeting-card-header">
      <MeetingTypeBadge type={meeting.type} />
      <div className="meeting-card-actions">
        <button className="mca-btn" onClick={() => onView(meeting)}><FiEye /></button>
        <button className="mca-btn" onClick={() => onEdit(meeting)}><FiEdit2 /></button>
        {meeting.status !== 'Completed' && <button className="mca-btn complete" onClick={() => onMarkComplete(meeting)}><FiCheck /></button>}
        <button className="mca-btn" onClick={() => onDelete(meeting)}><FiTrash2 /></button>
      </div>
    </div>
    <h5 className="meeting-title">{meeting.title}</h5>
    <p className="meeting-desc">{meeting.description}</p>
    <div className="meeting-meta">
      <span><FiClock /> {meeting.date} | {meeting.startTime} - {meeting.endTime}</span>
      {meeting.mode === 'Online' && <span><FiLink /> Online</span>}
      {meeting.mode === 'Offline' && <span><FiMapPin /> {meeting.location}</span>}
      {meeting.mode === 'Hybrid' && <span><FiLink /> Hybrid</span>}
    </div>
    <div className="meeting-project">{meeting.project}{meeting.client ? ` • ${meeting.client}` : ''}</div>
    <div className="meeting-footer">
      <div className="meeting-footer-stats">
        <span><FiUsers /> {meeting.participants.length}</span>
        <span><FiList /> {meeting.agenda.length} Agenda</span>
      </div>
      <MeetingStatusBadge status={meeting.status} />
    </div>
  </div>
);

export default MeetingCard;