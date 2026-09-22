// src/components/settings/SettingsCard.jsx
import React from 'react';
const SettingsCard = ({ title, description, icon: Icon, children }) => (
  <div className="settings-card">
    <div className="settings-card-header">
      {Icon && <Icon className="settings-card-icon" />}
      <div>
        <h6>{title}</h6>
        {description && <p>{description}</p>}
      </div>
    </div>
    <div className="settings-card-body">{children}</div>
  </div>
);
export default SettingsCard;