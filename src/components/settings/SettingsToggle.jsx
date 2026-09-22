// src/components/settings/SettingsToggle.jsx
import React from 'react';
const SettingsToggle = ({ label, description, checked, onChange }) => (
  <div className="settings-toggle-row">
    <div className="toggle-info">
      <span className="toggle-label">{label}</span>
      {description && <span className="toggle-desc">{description}</span>}
    </div>
    <label className="toggle-switch">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="toggle-slider"></span>
    </label>
  </div>
);
export default SettingsToggle;