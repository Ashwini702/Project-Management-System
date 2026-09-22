// src/components/settings/ThemeSettings.jsx
import React, { useEffect, useState } from 'react';
import { themeSettingsData } from '../../data/settingsData';

const ThemeSettings = ({ onSave, initialSettings }) => {
  const [settings, setSettings] = useState(initialSettings || themeSettingsData);
  useEffect(() => { if (initialSettings) setSettings(initialSettings); }, [initialSettings]);
  const accents = ['Primary Blue', 'Secondary Blue', 'Light Blue', 'Purple'];
  const accentColors = ['var(--primary-color)', 'var(--secondary-color)', 'var(--light-blue)', 'var(--accent-purple)'];

  return (
    <div>
      <div className="row">
        <div className="col-md-6 mb-4">
          <h6>Theme Mode</h6>
          <div className="d-flex gap-3">
            {['Light', 'Dark', 'System Default'].map(m => (
              <button key={m} className={`theme-option-btn ${settings.mode === m ? 'active' : ''}`} onClick={() => setSettings(p => ({ ...p, mode: m }))}>{m}</button>
            ))}
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <h6>Accent Color</h6>
          <div className="d-flex gap-3">
            {accents.map((a, i) => (
              <button key={a} className={`theme-color-btn ${settings.accentColor === a ? 'active' : ''}`} style={{ backgroundColor: accentColors[i] }} onClick={() => setSettings(p => ({ ...p, accentColor: a }))} title={a} />
            ))}
          </div>
        </div>
        <div className="col-md-4 mb-3"><label className="form-label">Sidebar Style</label><select className="form-select" value={settings.sidebarStyle} onChange={(e) => setSettings(p => ({ ...p, sidebarStyle: e.target.value }))}><option>Full Sidebar</option><option>Compact Sidebar</option><option>Icon Only</option></select></div>
        <div className="col-md-4 mb-3"><label className="form-label">Card Style</label><select className="form-select" value={settings.cardStyle} onChange={(e) => setSettings(p => ({ ...p, cardStyle: e.target.value }))}><option>Rounded</option><option>Soft Shadow</option><option>Border Style</option></select></div>
        <div className="col-md-4 mb-3"><label className="form-label">Font Size</label><select className="form-select" value={settings.fontSize} onChange={(e) => setSettings(p => ({ ...p, fontSize: e.target.value }))}><option>Small</option><option>Medium</option><option>Large</option></select></div>
      </div>
      <div className="theme-preview-card mt-3">
        <h6>Preview</h6>
        <div className="preview-box">
          <div className="preview-sidebar"></div>
          <div className="preview-main">
            <div className="preview-navbar"></div>
            <div className="preview-cards">
              <div className="preview-card"></div>
              <div className="preview-card"></div>
            </div>
          </div>
        </div>
      </div>
      <button className="btn btn-primary mt-3" onClick={() => onSave('theme', settings)}>Save Theme</button>
    </div>
  );
};
export default ThemeSettings;
