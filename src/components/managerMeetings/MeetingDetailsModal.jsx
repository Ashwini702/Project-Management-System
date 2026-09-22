import React from 'react';
import { FiClock, FiLink, FiMapPin, FiX } from 'react-icons/fi';

const MeetingDetailsModal = ({ show, onClose, meeting }) => {
  if (!show || !meeting) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{meeting.title}</h5>
            <button className="modal-close-btn" onClick={onClose}><FiX /></button>
          </div>
          <div className="modal-body">
            {meeting.description && <p>{meeting.description}</p>}
            <div className="meeting-detail-grid mt-3">
              <div><strong>Project:</strong> {meeting.project}</div>
              <div><FiClock /><strong>Date:</strong> {meeting.date}</div>
              <div><FiClock /><strong>Time:</strong> {meeting.startTime} - {meeting.endTime}</div>
              <div><strong>Status:</strong> {meeting.status}</div>
              {meeting.location && <div><FiMapPin /><strong>Location:</strong> {meeting.location}</div>}
              {meeting.meetingLink && (
                <div>
                  <FiLink /><strong>Link:</strong>{' '}
                  <a href={meeting.meetingLink} target="_blank" rel="noreferrer">{meeting.meetingLink}</a>
                </div>
              )}
            </div>
            {meeting.participants?.length > 0 && (
              <div className="mt-4">
                <h6>Participants</h6>
                <div className="d-flex flex-wrap gap-2">
                  {meeting.participants.map((participant) => (
                    <span className="badge bg-light text-dark" key={participant}>{participant}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button className="btn btn-light" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingDetailsModal;
