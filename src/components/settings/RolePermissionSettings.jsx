// src/components/settings/RolePermissionSettings.jsx
import React, { useEffect, useState } from 'react';
import { rolePermissionsData } from '../../data/settingsData';

const RolePermissionSettings = ({ onSave, initialSettings }) => {
  const [permissions, setPermissions] = useState(initialSettings || rolePermissionsData);
  useEffect(() => { if (initialSettings) setPermissions(initialSettings); }, [initialSettings]);
  const [activeRole, setActiveRole] = useState(0);

  const togglePerm = (modIdx, perm) => {
    setPermissions(prev => prev.map((r, ri) => ri === activeRole ? { ...r, modules: r.modules.map((m, mi) => mi === modIdx ? { ...m, [perm]: !m[perm] } : m) } : r));
  };

  const permKeys = ['view', 'create', 'edit', 'delete', 'export'];

  return (
    <div>
      <div className="role-tabs mb-3">
        {permissions.map((r, i) => (
          <button key={i} className={`role-tab-btn ${activeRole === i ? 'active' : ''}`} onClick={() => setActiveRole(i)}>{r.role}</button>
        ))}
      </div>
      <div className="table-responsive">
        <table className="table perm-table">
          <thead><tr><th>Module</th>{permKeys.map(k => <th key={k} className="text-capitalize">{k}</th>)}</tr></thead>
          <tbody>
            {permissions[activeRole].modules.map((m, mi) => (
              <tr key={m.name}>
                <td><strong>{m.name}</strong></td>
                {permKeys.map(k => (
                  <td key={k} className="text-center">
                    <label className="toggle-switch small-toggle">
                      <input type="checkbox" checked={m[k]} onChange={() => togglePerm(mi, k)} disabled={activeRole === 0 && k !== 'view' && m.name === 'Activity Logs'} />
                      <span className="toggle-slider"></span>
                    </label>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="btn btn-primary mt-3" onClick={() => onSave('roles', permissions)}>Save Permissions</button>
    </div>
  );
};
export default RolePermissionSettings;
