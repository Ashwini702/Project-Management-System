// src/components/managerFeedback/FeedbackResponseModal.jsx
import React, { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';
import FeedbackStatusBadge from './FeedbackStatusBadge';

const FeedbackResponseModal = ({ show, onClose, onSubmit, feedback, feedbackOptions = [] }) => {
  const options = feedbackOptions.length ? feedbackOptions : (feedback ? [feedback] : []);
  const clientOptions = options.filter((item, index, list) => list.findIndex(other => other.clientName === item.clientName) === index);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState(feedback?.id || '');
  const [form, setForm] = useState({ message: '', statusUpdate: feedback?.status || 'In Review', internalNote: '', notifyClient: true });

  const selectedFeedback = options.find(item => String(item.id) === String(selectedFeedbackId));
  const responseTarget = feedback || selectedFeedback;

  useEffect(() => {
    if (show) {
      const nextFeedback = feedback || null;
      setSelectedFeedbackId(nextFeedback?.id || '');
      setForm({ message: '', statusUpdate: nextFeedback?.status || 'In Review', internalNote: '', notifyClient: true });
    }
  }, [feedback, show]);

  const handleClientChange = (e) => {
    const nextId = e.target.value;
    const nextFeedback = options.find(item => String(item.id) === String(nextId));
    setSelectedFeedbackId(nextId);
    setForm(prev => ({ ...prev, statusUpdate: nextFeedback?.status || 'In Review' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!responseTarget || !form.message.trim()) return;
    onSubmit({ ...form, feedbackId: responseTarget.id });
    setForm({ message: '', statusUpdate: responseTarget.status || 'In Review', internalNote: '', notifyClient: true });
  };

  if (!show) return null;
  return (
    <div className="modal-overlay"><div className="modal-dialog"><div className="modal-content">
      <div className="modal-header"><h5 className="modal-title">{responseTarget ? `Respond to: ${responseTarget.title}` : 'Add Response'}</h5><button className="modal-close-btn" onClick={onClose}><FiX /></button></div>
      <form onSubmit={handleSubmit}><div className="modal-body">
        {!feedback && (
          <div className="mb-3"><label className="form-label">Client *</label><select className="form-select" value={selectedFeedbackId} onChange={handleClientChange}><option value="">Select Client</option>{clientOptions.map(item => <option key={item.clientName} value={item.id}>{item.clientName}</option>)}</select></div>
        )}
        {responseTarget && (
          <>
            <div className="mb-2"><strong>Client:</strong> {responseTarget.clientName}</div>
            <div className="mb-2"><strong>Project:</strong> {responseTarget.projectName}</div>
            <div className="mb-2"><strong>Current Status:</strong> <FeedbackStatusBadge status={responseTarget.status} /></div>
          </>
        )}
        <div className="mb-3"><label className="form-label">Response Message *</label><textarea className="form-control" rows="4" value={form.message} onChange={(e) => setForm(p => ({ ...p, message: e.target.value }))}></textarea></div>
        <div className="mb-3"><label className="form-label">Update Status</label><select className="form-select" value={form.statusUpdate} onChange={(e) => setForm(p => ({ ...p, statusUpdate: e.target.value }))}><option>Pending</option><option>In Review</option><option>Approved</option><option>Rejected</option><option>Resolved</option></select></div>
        <div className="mb-3"><label className="form-label">Internal Note (optional)</label><textarea className="form-control" rows="2" value={form.internalNote} onChange={(e) => setForm(p => ({ ...p, internalNote: e.target.value }))}></textarea></div>
        <div className="form-check"><input type="checkbox" className="form-check-input" checked={form.notifyClient} onChange={(e) => setForm(p => ({ ...p, notifyClient: e.target.checked }))} /><label className="form-check-label">Notify client via email</label></div>
      </div>
      <div className="modal-footer"><button type="button" className="btn btn-light" onClick={onClose}>Cancel</button><button type="submit" className="btn btn-primary">Send Response</button></div></form>
    </div></div></div>
  );
};
export default FeedbackResponseModal;