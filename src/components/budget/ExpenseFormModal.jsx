// src/components/budget/ExpenseFormModal.jsx
import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import { projectsForBudget, clientsForBudget, expenseCategories, paymentMethods, paymentStatuses } from '../../data/budgetData';
import FileUploadField from '../common/FileUploadField';

const ExpenseFormModal = ({ show, onClose, onSubmit, editExpense }) => {
  const teamMembersForBudget = ['David Thompson', 'Lisa Martinez', 'Robert Wilson', 'Amanda Taylor', 'Thomas Wright', 'Jennifer Lee'];
  const initial = { title: '', project: '', client: '', teamMember: '', category: '', amount: '', expenseDate: '', paymentMethod: 'Bank Transfer', status: 'Paid', notes: '', receipt: null };
  const [formData, setFormData] = useState(initial);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editExpense) setFormData({ title: editExpense.title || '', project: editExpense.project || '', client: editExpense.client || '', teamMember: editExpense.teamMember || editExpense.team_member_name || '', category: editExpense.category || '', amount: editExpense.amount || '', expenseDate: editExpense.expenseDate || '', paymentMethod: editExpense.paymentMethod || 'Bank Transfer', status: editExpense.status || 'Paid', notes: editExpense.notes || '', receipt: editExpense.receipt || null });
    else setFormData(initial);
    setErrors({});
  }, [editExpense, show]);

  const validate = () => {
    const e = {};
    if (!formData.title.trim()) e.title = 'Title is required';
    if (!formData.project) e.project = 'Project is required';
    if (!formData.client) e.client = 'Client is required';
    if (!formData.teamMember) e.teamMember = 'Team member is required';
    if (!formData.category) e.category = 'Category is required';
    if (!formData.amount || formData.amount <= 0) e.amount = 'Valid amount is required';
    if (!formData.expenseDate) e.expenseDate = 'Date is required';
    if (!formData.paymentMethod) e.paymentMethod = 'Payment method is required';
    if (!formData.status) e.status = 'Status is required';
    setErrors(e); return Object.keys(e).length === 0;
  };

  const handleChange = (e) => { const { name, value } = e.target; setFormData(p => ({ ...p, [name]: value })); if (errors[name]) setErrors(p => ({ ...p, [name]: '' })); };
  const handleSubmit = (e) => { e.preventDefault(); if (validate()) onSubmit({ ...formData, amount: Number(formData.amount) }); };

  if (!show) return null;
  return (
    <div className="modal-overlay"><div className="modal-dialog modal-lg"><div className="modal-content">
      <div className="modal-header"><h5 className="modal-title">{editExpense ? 'Edit Expense' : 'Add Expense'}</h5><button className="modal-close-btn" onClick={onClose}><FiX /></button></div>
      <form onSubmit={handleSubmit}><div className="modal-body"><div className="row">
        <div className="col-md-12 mb-3"><label className="form-label">Expense Title *</label><input type="text" name="title" className={`form-control ${errors.title ? 'is-invalid' : ''}`} value={formData.title} onChange={handleChange} />{errors.title && <div className="invalid-feedback">{errors.title}</div>}</div>
        <div className="col-md-6 mb-3"><label className="form-label">Project *</label><select name="project" className={`form-select ${errors.project ? 'is-invalid' : ''}`} value={formData.project} onChange={handleChange}><option value="">Select Project</option>{projectsForBudget.map(p => <option key={p} value={p}>{p}</option>)}</select>{errors.project && <div className="invalid-feedback">{errors.project}</div>}</div>
        <div className="col-md-6 mb-3"><label className="form-label">Client *</label><select name="client" className={`form-select ${errors.client ? 'is-invalid' : ''}`} value={formData.client} onChange={handleChange}><option value="">Select Client</option>{clientsForBudget.map(c => <option key={c} value={c}>{c}</option>)}</select>{errors.client && <div className="invalid-feedback">{errors.client}</div>}</div>
        <div className="col-md-6 mb-3"><label className="form-label">Team Member *</label><select name="teamMember" className={`form-select ${errors.teamMember ? 'is-invalid' : ''}`} value={formData.teamMember} onChange={handleChange}><option value="">Select Team Member</option>{teamMembersForBudget.map(member => <option key={member} value={member}>{member}</option>)}</select>{errors.teamMember && <div className="invalid-feedback">{errors.teamMember}</div>}</div>
        <div className="col-md-4 mb-3"><label className="form-label">Category *</label><select name="category" className={`form-select ${errors.category ? 'is-invalid' : ''}`} value={formData.category} onChange={handleChange}><option value="">Select Category</option>{expenseCategories.map(c => <option key={c} value={c}>{c}</option>)}</select>{errors.category && <div className="invalid-feedback">{errors.category}</div>}</div>
        <div className="col-md-4 mb-3"><label className="form-label">Amount (₹) *</label><input type="number" name="amount" className={`form-control ${errors.amount ? 'is-invalid' : ''}`} value={formData.amount} onChange={handleChange} min="0" />{errors.amount && <div className="invalid-feedback">{errors.amount}</div>}</div>
        <div className="col-md-4 mb-3"><label className="form-label">Expense Date *</label><input type="date" name="expenseDate" className={`form-control ${errors.expenseDate ? 'is-invalid' : ''}`} value={formData.expenseDate} onChange={handleChange} />{errors.expenseDate && <div className="invalid-feedback">{errors.expenseDate}</div>}</div>
        <div className="col-md-4 mb-3"><label className="form-label">Payment Method *</label><select name="paymentMethod" className={`form-select ${errors.paymentMethod ? 'is-invalid' : ''}`} value={formData.paymentMethod} onChange={handleChange}>{paymentMethods.map(m => <option key={m} value={m}>{m}</option>)}</select>{errors.paymentMethod && <div className="invalid-feedback">{errors.paymentMethod}</div>}</div>
        <div className="col-md-4 mb-3"><label className="form-label">Status *</label><select name="status" className={`form-select ${errors.status ? 'is-invalid' : ''}`} value={formData.status} onChange={handleChange}>{paymentStatuses.map(s => <option key={s} value={s}>{s}</option>)}</select>{errors.status && <div className="invalid-feedback">{errors.status}</div>}</div>
        <div className="col-md-12 mb-3"><label className="form-label">Upload Receipt</label><FileUploadField name="receipt" title="Upload Receipt" hint="PDF, JPG, PNG. Max 5MB" accept=".pdf,image/jpeg,image/png" maxSizeMB={5} onFileSelect={(file) => setFormData(prev => ({ ...prev, receipt: file }))} /></div>
        <div className="col-md-12 mb-3"><label className="form-label">Notes</label><textarea name="notes" className="form-control" rows="2" value={formData.notes} onChange={handleChange}></textarea></div>
      </div></div>
      <div className="modal-footer"><button type="button" className="btn btn-light" onClick={onClose}>Cancel</button><button type="submit" className="btn btn-primary">{editExpense ? 'Update Expense' : 'Save Expense'}</button></div></form>
    </div></div></div>
  );
};

export default ExpenseFormModal;