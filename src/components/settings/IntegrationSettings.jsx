// src/components/settings/IntegrationSettings.jsx
import React, { useEffect, useState } from 'react';
import { FiMail, FiMessageCircle, FiCalendar, FiCloud, FiCreditCard, FiDatabase, FiDollarSign, FiKey, FiX } from 'react-icons/fi';
import SettingsToggle from './SettingsToggle';
import { integrationsData } from '../../data/settingsData';

const iconMap = { FiMail, FiMessageCircle, FiCalendar, FiCloud, FiCreditCard, FiDatabase, FiDollarSign, FiKey };

const IntegrationSettings = ({ onSave, onConfigure, initialSettings }) => {
  const [integrations, setIntegrations] = useState(initialSettings || integrationsData);
  useEffect(() => { if (initialSettings) setIntegrations(initialSettings); }, [initialSettings]);

  const toggleIntegration = (id) => setIntegrations(prev => prev.map(i => i.id === id ? { ...i, enabled: !i.enabled } : i));

  const getStatusBadge = (status) => {
    const map = { 'Connected': 'badge-success', 'Not Connected': 'badge-danger', 'Pending': 'badge-warning' };
    return <span className={`badge ${map[status]}`}>{status}</span>;
  };

  return (
    <div>
      <div className="integrations-grid">
        {integrations.map(integ => {
          const Icon = iconMap[integ.icon];
          return (
            <div key={integ.id} className="integration-card">
              <div className="int-header">
                <div className="int-icon-wrapper"><Icon className="int-icon" /></div>
                <SettingsToggle checked={integ.enabled} onChange={() => toggleIntegration(integ.id)} />
              </div>
              <h6>{integ.name}</h6>
              <p>{integ.desc}</p>
              <div className="int-footer">
                {getStatusBadge(integ.status)}
                <button className="btn btn-sm btn-outline-primary" onClick={() => onConfigure(integ)}>Configure</button>
              </div>
            </div>
          );
        })}
      </div>
      <button className="btn btn-primary mt-3" onClick={() => onSave('integrations', integrations)}>Save Integrations</button>
    </div>
  );
};
export default IntegrationSettings;
