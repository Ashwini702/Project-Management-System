// src/components/clientProfile/ClientPasswordModal.jsx
import React, { useState } from 'react';
import { FiX, FiEye, FiEyeOff } from 'react-icons/fi';

const ClientPasswordModal = ({ show, onClose, onSubmit }) => {
  const [form, setForm] = useState({ current: '', newPass: '', confirm: '' });
  const [showPass, setShowPass] = useState({ current: false, newPass: false, confirm: false });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.current) e.current = 'Required';
    if (!form.newPass) e.newPass = 'Required';
    else if (form.newPass.length < 6) e.newPass = 'Min 6 characters';
    if (!form.confirm) e.confirm = 'Required';
    else if (form.newPass !== form.confirm) e.confirm = 'Mismatch';
    setErrors(e); return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => { e.preventDefault(); if (validate()) { onSubmit(); setForm({ current: '', newPass: '', confirm: '' }); } };

  if (!show) return null;
  return (
    <div className="modal-overlay"><div className="modal-dialog"><div className="modal-content">
      <div className="modal-header"><h5 className="modal-title">Change Password</h5><button className="modal-close-btn" onClick={onClose}><FiX /></button></div>
      <form onSubmit={handleSubmit}><div className="modal-body">
        {['current', 'newPass', 'confirm'].map(f => (
          <div className="mb-3" key={f}>
            <label className="form-label">{f === 'current' ? 'Current *' : f === 'newPass' ? 'New *' : 'Confirm *'}</label>
            <div className="input-wrapper">
              <input type={showPass[f] ? 'text' : 'password'} className={`form-control ${errors[f] ? 'is-invalid' : ''}`} value={form[f]} onChange={(e) => setForm(p => ({ ...p, [f]: e.target.value }))} />
              <button type="button" className="password-toggle" onClick={() => setShowPass(p => ({ ...p, [f]: !p[f] }))}>{showPass[f] ? <FiEyeOff /> : <FiEye />}</button>
            </div>
            {errors[f] && <div className="invalid-feedback d-block">{errors[f]}</div>}
          </div>
        ))}
      </div>
      <div className="modal-footer"><button type="button" className="btn btn-light" onClick={onClose}>Cancel</button><button type="submit" className="btn btn-primary">Change Password</button></div></form>
    </div></div></div>
  );
};
export default ClientPasswordModal;