import React, { useEffect, useMemo, useState } from 'react';
import { FiX } from 'react-icons/fi';

const ReassignTaskModal = ({ show, onClose, onSubmit, tasks = [], members = [], initialMember }) => {
  const [form, setForm] = useState({ taskId: '', newAssignee: '', reason: '', newDeadline: '' });
  const selectedTask = useMemo(() => tasks.find(task => String(task.id) === String(form.taskId)), [tasks, form.taskId]);

  useEffect(() => {
    if (show) setForm({ taskId: '', newAssignee: initialMember ? String(initialMember.id) : '', reason: '', newDeadline: '' });
  }, [show, initialMember]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.taskId || !form.newAssignee || !form.reason.trim()) return;
    const newAssignee = members.find(member => String(member.id) === String(form.newAssignee));
    onSubmit({ ...form, taskTitle: selectedTask?.title, newAssigneeName: newAssignee?.name || '' });
  };

  if (!show) return null;
  return (
    <div className="modal-overlay"><div className="modal-dialog"><div className="modal-content">
      <div className="modal-header"><h5 className="modal-title">Reassign Task</h5><button type="button" className="modal-close-btn" onClick={onClose}><FiX /></button></div>
      <form onSubmit={handleSubmit}><div className="modal-body">
        <div className="mb-3"><label className="form-label">Select Task</label><select required className="form-select" value={form.taskId} onChange={(event) => setForm(current => ({ ...current, taskId: event.target.value }))}><option value="">Select task</option>{tasks.map(task => <option key={task.id} value={task.id}>{task.title}</option>)}</select></div>
        {selectedTask && <div className="mb-3"><label className="form-label">Current Assignee</label><input type="text" className="form-control" value={selectedTask.assignee_name || 'Unassigned'} readOnly /></div>}
        <div className="mb-3"><label className="form-label">New Assignee</label><select required className="form-select" value={form.newAssignee} onChange={(event) => setForm(current => ({ ...current, newAssignee: event.target.value }))}><option value="">Select team member</option>{members.map(member => <option key={member.id} value={member.id}>{member.name}</option>)}</select></div>
        <div className="mb-3"><label className="form-label">Reason</label><textarea required className="form-control" rows="2" value={form.reason} onChange={(event) => setForm(current => ({ ...current, reason: event.target.value }))} /></div>
        <div className="mb-3"><label className="form-label">New Deadline (Optional)</label><input type="date" className="form-control" value={form.newDeadline} onChange={(event) => setForm(current => ({ ...current, newDeadline: event.target.value }))} /></div>
      </div><div className="modal-footer"><button type="button" className="btn btn-light" onClick={onClose}>Cancel</button><button type="submit" className="btn btn-primary">Reassign Task</button></div></form>
    </div></div></div>
  );
};
export default ReassignTaskModal;