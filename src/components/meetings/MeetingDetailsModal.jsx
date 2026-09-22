// src/components/meetings/MeetingDetailsModal.jsx
import React from 'react';
import { FiX, FiClock, FiMapPin, FiLink, FiUsers, FiFolder, FiBriefcase } from 'react-icons/fi';
import MeetingStatusBadge from './MeetingStatusBadge';
import MeetingTypeBadge from './MeetingTypeBadge';
import MeetingAgenda from './MeetingAgenda';
import MeetingNotes from './MeetingNotes';
import ParticipantList from './ParticipantList';

const MeetingDetailsModal = ({ show, onClose, meeting }) => {
  if (!show || !meeting) return null;
  return (
    <div className="modal-overlay"><div className="modal-dialog modal-lg"><div className="modal-content">
      <div className="modal-header"><h5 className="modal-title">{meeting.title}</h5><button className="modal-close-btn" onClick={onClose}><FiX /></button></div>
      <div className="modal-body">
        <div className="meeting-detail-header"><MeetingTypeBadge type={meeting.type} /><MeetingStatusBadge status={meeting.status} /></div>
        {meeting.description && <p className="mt-3">{meeting.description}</p>}
        <div className="meeting-detail-grid mt-3">
          <div><FiFolder /><strong>Project:</strong> {meeting.project}</div>
          {meeting.client && <div><FiBriefcase /><strong>Client:</strong> {meeting.client}</div>}
          <div><FiClock /><strong>Date:</strong> {meeting.date}</div>
          <div><FiClock /><strong>Time:</strong> {meeting.startTime} - {meeting.endTime}</div>
          <div><strong>Mode:</strong> {meeting.mode}</div>
          {meeting.meetingLink && <div><FiLink /><strong>Link:</strong> <a href={meeting.meetingLink} target="_blank" rel="noreferrer">{meeting.meetingLink}</a></div>}
          {meeting.location && <div><FiMapPin /><strong>Location:</strong> {meeting.location}</div>}
        </div>
        <div className="meeting-detail-sections mt-4">
          <ParticipantList participants={meeting.participants} />
          <MeetingAgenda agenda={meeting.agenda} editable={true} />
          <MeetingNotes notes={meeting.notes} editable={true} />
        </div>
      </div>
      <div className="modal-footer"><button className="btn btn-light" onClick={onClose}>Close</button></div>
    </div></div></div>
  );
};

export default MeetingDetailsModal;