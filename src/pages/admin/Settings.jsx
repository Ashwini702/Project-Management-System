// src/pages/admin/Settings.jsx
import React, { useEffect, useState } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import PageHeader from '../../components/common/PageHeader';
import SettingsSidebar from '../../components/settings/SettingsSidebar';
import ProfileSettings from '../../components/settings/ProfileSettings';
import AccountSecuritySettings from '../../components/settings/AccountSecuritySettings';
import RolePermissionSettings from '../../components/settings/RolePermissionSettings';
import GeneralSettings from '../../components/settings/GeneralSettings';
import NotificationPreferenceSettings from '../../components/settings/NotificationPreferenceSettings';
import ThemeSettings from '../../components/settings/ThemeSettings';
import IntegrationSettings from '../../components/settings/IntegrationSettings';
import SystemPreferenceSettings from '../../components/settings/SystemPreferenceSettings';
import { FiSave, FiRefreshCw, FiX, FiKey, FiGlobe, FiSend, FiShield, FiSettings } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import { settingsCategories, profileSettingsData } from '../../data/settingsData';
import { apiData } from '../../services/api';
import * as stateService from '../../services/stateService';
import * as authService from '../../services/authService';
import '../../styles/settings.css';

const getInitialProfile = (user) => ({
  ...profileSettingsData,
  name: user?.name || profileSettingsData.name,
  email: user?.email || profileSettingsData.email,
  designation: user?.role || profileSettingsData.designation,
  profile_image_name: user?.profile_image_name || '',
});
const getInitials = (name = '') => {
  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  return initials || 'AU';
};

const getStorableProfile = (profile) => {
  const { profilePhoto, ...safeProfile } = profile;
  return {
    ...safeProfile,
    profilePhotoName: profilePhoto?.name || profile.profilePhotoName || ''
  };
};

const Settings = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [alert, setAlert] = useState(null);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showIntegrationModal, setShowIntegrationModal] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState(null);
  const [integrationForm, setIntegrationForm] = useState({ apiKey: '', secretKey: '', endpointUrl: '', sender: '' });
  const [integrationErrors, setIntegrationErrors] = useState({});
  const [profileData, setProfileData] = useState(getInitialProfile(user));
  const [savedSettings, setSavedSettings] = useState({});

  const showAlert = (m, t = 'success') => { setAlert({ message: m, type: t }); setTimeout(() => setAlert(null), 3000); };

  useEffect(() => {
    stateService.getState('settings')
      .then(response => {
        const stored = apiData(response) || {};
        setSavedSettings(stored);
        if (stored.profile) setProfileData({ ...getInitialProfile(user), ...stored.profile });
      })
      .catch(error => showAlert(error.response?.data?.message || 'Unable to load settings.', 'danger'));
  }, [user]);

  const persistSettings = async (nextSettings, message = 'Settings saved successfully!') => {
    try {
      const response = await stateService.saveState('settings', nextSettings);
      const stored = apiData(response) || nextSettings;
      setSavedSettings(stored);
      showAlert(message);
      return stored;
    } catch (error) {
      showAlert(error.response?.data?.message || 'Unable to save settings.', 'danger');
      return null;
    }
  };

  const saveProfile = async (data) => {
    let profileImageName = data.profile_image_name || profileData.profile_image_name || '';
    if (data.profilePhoto) {
      try {
        const photoForm = new FormData();
        photoForm.append('photo', data.profilePhoto);
        const photoResponse = await authService.uploadProfilePhoto(photoForm);
        profileImageName = apiData(photoResponse).profile_image_name;
      } catch (error) {
        showAlert(error.response?.data?.message || 'Unable to upload profile photo.', 'danger');
        return;
      }
    }
    const savedProfile = { ...getStorableProfile(data), profile_image_name: profileImageName };
    const stored = await persistSettings({ ...savedSettings, profile: savedProfile }, 'Profile Settings saved in database!');
    if (!stored) return;
    setProfileData(savedProfile);
    updateUser({
      name: savedProfile.name,
      email: savedProfile.email,
      designation: savedProfile.designation,
      avatar: getInitials(savedProfile.name),
      profile_image_name: profileImageName,
    });
  };
  const handleSave = async (section, data) => {
    if (section === 'profile') return saveProfile(data);
    const safeData = section === 'security' ? data.settings : data;
    await persistSettings({ ...savedSettings, [section]: safeData }, `${settingsCategories.find(c => c.id === section)?.label || section} saved in database!`);
  };

  const handleSaveAll = () => persistSettings({ ...savedSettings, profile: getStorableProfile(profileData) });
  const handleReset = () => setShowResetModal(true);
  const confirmReset = async () => { await persistSettings({}, 'Settings reset successfully!'); setProfileData(getInitialProfile(user)); setShowResetModal(false); };
  const handleDeviceLogout = (id) => showAlert('Device logged out successfully!');
  const handleConfigure = (integ) => {
    setSelectedIntegration(integ);
    setIntegrationForm({ apiKey: '', secretKey: '', endpointUrl: '', sender: '' });
    setIntegrationErrors({});
    setShowIntegrationModal(true);
  };
  const closeIntegrationModal = () => { setShowIntegrationModal(false); setSelectedIntegration(null); setIntegrationErrors({}); };
  const handleIntegrationChange = (event) => {
    const { name, value } = event.target;
    setIntegrationForm(current => ({ ...current, [name]: value }));
    if (integrationErrors[name]) setIntegrationErrors(current => ({ ...current, [name]: '' }));
  };
  const handleIntegrationSave = (event) => {
    event.preventDefault();
    const errors = {};
    if (!integrationForm.apiKey.trim()) errors.apiKey = 'API key is required';
    if (!integrationForm.secretKey.trim()) errors.secretKey = 'Secret key is required';
    if (integrationForm.endpointUrl && !/^https?:\/\//i.test(integrationForm.endpointUrl)) errors.endpointUrl = 'Enter a valid URL beginning with http:// or https://';
    setIntegrationErrors(errors);
    if (Object.keys(errors).length) return;
    closeIntegrationModal();
    showAlert(`${selectedIntegration.name} configuration validated successfully!`);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile': return <ProfileSettings profile={profileData} onSave={handleSave} />;
      case 'security': return <AccountSecuritySettings initialSettings={savedSettings.security} onSave={handleSave} onDeviceLogout={handleDeviceLogout} />;
      case 'roles': return <RolePermissionSettings initialSettings={savedSettings.roles} onSave={handleSave} />;
      case 'general': return <GeneralSettings initialSettings={savedSettings.general} onSave={handleSave} />;
      case 'notifications': return <NotificationPreferenceSettings initialSettings={savedSettings.notifications} onSave={handleSave} />;
      case 'theme': return <ThemeSettings initialSettings={savedSettings.theme} onSave={handleSave} />;
      case 'integrations': return <IntegrationSettings initialSettings={savedSettings.integrations} onSave={handleSave} onConfigure={handleConfigure} />;
      case 'system': return <SystemPreferenceSettings initialSettings={savedSettings.system} onSave={handleSave} />;
      default: return null;
    }
  };

  return (
    <AdminLayout>
      <PageHeader title="System Settings" subtitle="Manage profile, security, roles, permissions, notifications, appearance, integrations, and system preferences." showButton={false}>
        <div className="d-flex gap-2">
          <button className="btn btn-primary btn-sm" onClick={handleSaveAll}><FiSave /> Save Changes</button>
          <button className="btn btn-outline-danger btn-sm" onClick={handleReset}><FiRefreshCw /> Reset Settings</button>
        </div>
      </PageHeader>
      {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`}>{alert.message}<button className="btn-close" onClick={() => setAlert(null)}></button></div>}

      <div className="settings-layout">
        <SettingsSidebar categories={settingsCategories} activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="settings-content">
          <h5 className="settings-content-title">{settingsCategories.find(c => c.id === activeTab)?.label}</h5>
          {renderContent()}
        </div>
      </div>

      {showResetModal && (
        <div className="modal-overlay"><div className="modal-dialog modal-sm"><div className="modal-content">
          <div className="modal-header"><h5 className="modal-title">Reset Settings</h5><button className="modal-close-btn" onClick={() => setShowResetModal(false)}><FiX /></button></div>
          <div className="modal-body"><p>Are you sure you want to reset settings? This will restore default values.</p></div>
          <div className="modal-footer"><button className="btn btn-light" onClick={() => setShowResetModal(false)}>Cancel</button><button className="btn btn-danger" onClick={confirmReset}>Reset</button></div>
        </div></div></div>
      )}

      {showIntegrationModal && selectedIntegration && (
        <div className="modal-overlay integration-config-overlay" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) closeIntegrationModal(); }}>
          <div className="integration-config-dialog" role="dialog" aria-modal="true" aria-labelledby="integration-config-title">
            <form className="integration-config-card" onSubmit={handleIntegrationSave}>
              <div className="integration-config-header">
                <div className="integration-config-heading">
                  <div className="integration-config-icon"><FiSettings /></div>
                  <div><h3 id="integration-config-title">Configure {selectedIntegration.name}</h3><p>Connect and manage this integration securely.</p></div>
                </div>
                <button type="button" className="integration-config-close" onClick={closeIntegrationModal} aria-label="Close"><FiX /></button>
              </div>

              <div className="integration-config-body">
                <section className="integration-form-section">
                  <div className="integration-section-title"><FiShield /><div><h4>Authentication</h4><p>Enter the credentials supplied by your service provider.</p></div></div>
                  <div className="integration-form-grid">
                    <div className="integration-field">
                      <label htmlFor="integration-api-key">API Key <span>*</span></label>
                      <div className="integration-input-wrap"><FiKey /><input id="integration-api-key" type="text" name="apiKey" value={integrationForm.apiKey} onChange={handleIntegrationChange} placeholder="Enter API key" autoComplete="off" /></div>
                      {integrationErrors.apiKey && <small className="integration-field-error">{integrationErrors.apiKey}</small>}
                    </div>
                    <div className="integration-field">
                      <label htmlFor="integration-secret-key">Secret Key <span>*</span></label>
                      <div className="integration-input-wrap"><FiShield /><input id="integration-secret-key" type="password" name="secretKey" value={integrationForm.secretKey} onChange={handleIntegrationChange} placeholder="Enter secret key" autoComplete="new-password" /></div>
                      {integrationErrors.secretKey && <small className="integration-field-error">{integrationErrors.secretKey}</small>}
                    </div>
                  </div>
                </section>

                <section className="integration-form-section">
                  <div className="integration-section-title"><FiGlobe /><div><h4>Connection Details</h4><p>Configure the service endpoint and sender identity.</p></div></div>
                  <div className="integration-form-grid">
                    <div className="integration-field">
                      <label htmlFor="integration-endpoint">Endpoint URL</label>
                      <div className="integration-input-wrap"><FiGlobe /><input id="integration-endpoint" type="url" name="endpointUrl" value={integrationForm.endpointUrl} onChange={handleIntegrationChange} placeholder="https://api.example.com" /></div>
                      {integrationErrors.endpointUrl && <small className="integration-field-error">{integrationErrors.endpointUrl}</small>}
                    </div>
                    <div className="integration-field">
                      <label htmlFor="integration-sender">Sender Email / Phone</label>
                      <div className="integration-input-wrap"><FiSend /><input id="integration-sender" type="text" name="sender" value={integrationForm.sender} onChange={handleIntegrationChange} placeholder="sender@example.com or +91..." /></div>
                    </div>
                  </div>
                </section>

                <div className="integration-security-note"><FiShield /><span>Credentials are validated in this form and are not displayed after closing it.</span></div>
              </div>

              <div className="integration-config-footer">
                <button type="button" className="btn integration-cancel-btn" onClick={closeIntegrationModal}>Cancel</button>
                <button type="submit" className="btn btn-primary integration-save-btn"><FiSave /> Save Integration</button>
              </div>
            </form>
          </div>
        </div>
      )}    </AdminLayout>
  );
};

export default Settings;











