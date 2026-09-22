// src/components/clientDashboard/ClientFeedbackBox.jsx
import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import ClientStatusBadge from './ClientStatusBadge';
import { feedbackList, clientProjects } from '../../data/clientDashboardData';

const ClientFeedbackBox = ({ onAlert }) => {
  const [feedbacks, setFeedbacks] = useState(feedbackList);
  const [form, setForm] = useState({ project: '', title: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.project || !form.title.trim() || !form.message.trim()) return onAlert('All fields are required.', 'danger');
    setFeedbacks([{ id: Date.now(), title: form.title, message: form.message, project: form.project, date: new Date().toISOString().split('T')[0], status: 'Pending' }, ...feedbacks]);
    setForm({ project: '', title: '', message: '' });
    onAlert('Feedback submitted successfully!', 'success');
  };

  return (
    <div className="cl-feedback-box">
      <h6>Submit Feedback</h6>
      <form onSubmit={handleSubmit} className="cl-feedback-form">
        <select className="form-select mb-2" value={form.project} onChange={(e) => setForm(p => ({ ...p, project: e.target.value }))}><option value="">Select Project</option>{clientProjects.map(p => <option key={p.id} value={p.projectName}>{p.projectName}</option>)}</select>
        <input type="text" className="form-control mb-2" placeholder="Feedback Title" value={form.title} onChange={(e) => setForm(p => ({ ...p, title: e.target.value }))} />
        <textarea className="form-control mb-2" rows="3" placeholder="Your feedback message..." value={form.message} onChange={(e) => setForm(p => ({ ...p, message: e.target.value }))}></textarea>
        <button type="submit" className="btn btn-primary"><FiSend /> Submit Feedback</button>
      </form>
      <h6 className="mt-4">Previous Feedback</h6>
      {feedbacks.map(f => (
        <div key={f.id} className="cl-feedback-item">
          <div className="cl-feedback-header"><strong>{f.title}</strong><ClientStatusBadge status={f.status} type="feedback" /></div>
          <p>{f.message}</p>
          <span>{f.project} • {f.date}</span>
        </div>
      ))}
    </div>
  );
};

export default ClientFeedbackBox;