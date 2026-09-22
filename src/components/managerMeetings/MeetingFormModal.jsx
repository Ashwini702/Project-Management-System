// src/components/managerMeetings/MeetingFormModal.jsx
import React, { useState, useEffect } from 'react';
import { FiX, FiPlus, FiTrash2 } from 'react-icons/fi';
import { meetingTypes, meetingStatuses, meetingModes, projectsForMeetings, clientsForMeetings, participantsList } from '../../data/managerMeetingsData';

const MeetingFormModal = ({ show, onClose, onSubmit, editMeeting }) => {
  const initial = { title: '', description: '', type: 'Internal Meeting', project: '', client: '', date: '', startTime: '09:00', endTime: '10:00', mode: 'Online', location: '', meetingLink: '', participants: [], agenda: [], status: 'Scheduled', notes: [] };
  const [formData, setFormData] = useState(initial);
  const [errors, setErrors] = useState({});
  const [agendaInput, setAgendaInput] = useState('');

  useEffect(() => {
    if (editMeeting) setFormData({ title: editMeeting.title || '', description: editMeeting.description || '', type: editMeeting.type || 'Internal Meeting', project: editMeeting.project || '', client: editMeeting.client || '', date: editMeeting.date || '', startTime: editMeeting.startTime || '09:00', endTime: editMeeting.endTime || '10:00', mode: editMeeting.mode || 'Online', location: editMeeting.location || '', meetingLink: editMeeting.meetingLink || '', participants: editMeeting.participants || [], agenda: editMeeting.agenda || [], status: editMeeting.status || 'Scheduled', notes: editMeeting.notes || [] });
    else setFormData(initial);
    setErrors({}); setAgendaInput('');
  }, [editMeeting, show]);

  const validate = () => {
    const e = {};
    if (!formData.title.trim()) e.title = 'Title is required';
    if (!formData.type) e.type = 'Type is required';
    if (!formData.project) e.project = 'Project is required';
    if (!formData.date) e.date = 'Date is required';
    if (!formData.startTime) e.startTime = 'Start time is required';
    if (!formData.endTime) e.endTime = 'End time is required';
    if (!formData.mode) e.mode = 'Mode is required';
    if (formData.participants.length === 0) e.participants = 'At least one participant required';
    if (!formData.status) e.status = 'Status is required';
    setErrors(e); return Object.keys(e).length === 0;
  };

  const handleChange = (e) => { const { name, value } = e.target; setFormData(p => ({ ...p, [name]: value })); if (errors[name]) setErrors(p => ({ ...p, [name]: '' })); };
  const toggleParticipant = (name) => { setFormData(p => ({ ...p, participants: p.participants.includes(name) ? p.participants.filter(n => n !== name) : [...p.participants, name] })); };
  const addAgenda = () => { if (agendaInput.trim()) { setFormData(p => ({ ...p, agenda: [...p.agenda, { id: Date.now(), title: agendaInput.trim(), status: 'Pending', assignedTo: '', notes: '' }] })); setAgendaInput(''); } };
  const removeAgenda = (id) => { setFormData(p => ({ ...p, agenda: p.agenda.filter(a => a.id !== id) })); };
  const handleSubmit = (e) => { e.preventDefault(); if (validate()) onSubmit(formData); };

  if (!show) return null;
  return (
    <div className="modal-overlay"><div className="modal-dialog modal-lg"><div className="modal-content">
      <div className="modal-header"><h5 className="modal-title">{editMeeting ? 'Edit Meeting' : 'Schedule Meeting'}</h5><button className="modal-close-btn" onClick={onClose}><FiX /></button></div>
      <form onSubmit={handleSubmit}><div className="modal-body"><div className="row">
        <div className="col-md-12 mb-3"><label className="form-label">Title *</label><input type="text" name="title" className={`form-control ${errors.title ? 'is-invalid' : ''}`} value={formData.title} onChange={handleChange} />{errors.title && <div className="invalid-feedback">{errors.title}</div>}</div>
        <div className="col-md-12 mb-3"><label className="form-label">Description</label><textarea name="description" className="form-control" rows="2" value={formData.description} onChange={handleChange}></textarea></div>
        <div className="col-md-6 mb-3"><label className="form-label">Type *</label><select name="type" className={`form-select ${errors.type ? 'is-invalid' : ''}`} value={formData.type} onChange={handleChange}>{meetingTypes.map(t => <option key={t} value={t}>{t}</option>)}</select>{errors.type && <div className="invalid-feedback">{errors.type}</div>}</div>
        <div className="col-md-6 mb-3"><label className="form-label">Project *</label><select name="project" className={`form-select ${errors.project ? 'is-invalid' : ''}`} value={formData.project} onChange={handleChange}><option value="">Select</option>{projectsForMeetings.map(p => <option key={p} value={p}>{p}</option>)}</select>{errors.project && <div className="invalid-feedback">{errors.project}</div>}</div>
        <div className="col-md-6 mb-3"><label className="form-label">Client</label><select name="client" className="form-select" value={formData.client} onChange={handleChange}><option value="">None</option>{clientsForMeetings.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
        <div className="col-md-3 mb-3"><label className="form-label">Date *</label><input type="date" name="date" className={`form-control ${errors.date ? 'is-invalid' : ''}`} value={formData.date} onChange={handleChange} />{errors.date && <div className="invalid-feedback">{errors.date}</div>}</div>
        <div className="col-md-3 mb-3"><label className="form-label">Start *</label><input type="time" name="startTime" className={`form-control ${errors.startTime ? 'is-invalid' : ''}`} value={formData.startTime} onChange={handleChange} />{errors.startTime && <div className="invalid-feedback">{errors.startTime}</div>}</div>
        <div className="col-md-3 mb-3"><label className="form-label">End *</label><input type="time" name="endTime" className={`form-control ${errors.endTime ? 'is-invalid' : ''}`} value={formData.endTime} onChange={handleChange} />{errors.endTime && <div className="invalid-feedback">{errors.endTime}</div>}</div>
        <div className="col-md-3 mb-3"><label className="form-label">Mode *</label><select name="mode" className={`form-select ${errors.mode ? 'is-invalid' : ''}`} value={formData.mode} onChange={handleChange}>{meetingModes.map(m => <option key={m} value={m}>{m}</option>)}</select>{errors.mode && <div className="invalid-feedback">{errors.mode}</div>}</div>
        {(formData.mode === 'Online' || formData.mode === 'Hybrid') && <div className="col-md-6 mb-3"><label className="form-label">Meeting Link</label><input type="text" name="meetingLink" className="form-control" value={formData.meetingLink} onChange={handleChange} /></div>}
        {(formData.mode === 'Offline' || formData.mode === 'Hybrid') && <div className="col-md-6 mb-3"><label className="form-label">Location</label><input type="text" name="location" className="form-control" value={formData.location} onChange={handleChange} /></div>}
        <div className="col-md-6 mb-3"><label className="form-label">Status *</label><select name="status" className={`form-select ${errors.status ? 'is-invalid' : ''}`} value={formData.status} onChange={handleChange}>{meetingStatuses.map(s => <option key={s} value={s}>{s}</option>)}</select>{errors.status && <div className="invalid-feedback">{errors.status}</div>}</div>
        <div className="col-md-12 mb-3"><label className="form-label">Participants *</label><div className="mmt-participants-grid">{participantsList.map(p => <div key={p.id} className={`mmt-participant-chip ${formData.participants.includes(p.name) ? 'selected' : ''}`} onClick={() => toggleParticipant(p.name)}>{p.name}</div>)}</div>{errors.participants && <div className="invalid-feedback d-block">{errors.participants}</div>}</div>
        <div className="col-md-12 mb-3"><label className="form-label">Agenda</label><div className="mmt-agenda-input"><input type="text" className="form-control" value={agendaInput} onChange={(e) => setAgendaInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAgenda())} placeholder="Add agenda item" /><button type="button" className="btn btn-sm btn-primary" onClick={addAgenda}><FiPlus /></button></div><div className="mmt-agenda-chips mt-2">{formData.agenda.map(a => <span key={a.id} className="mmt-agenda-chip">{a.title} <button type="button" onClick={() => removeAgenda(a.id)}><FiTrash2 /></button></span>)}</div></div>
      </div></div>
      <div className="modal-footer"><button type="button" className="btn btn-light" onClick={onClose}>Cancel</button><button type="submit" className="btn btn-primary">{editMeeting ? 'Update' : 'Save'}</button></div></form>
    </div></div></div>
  );
};
export default MeetingFormModal;