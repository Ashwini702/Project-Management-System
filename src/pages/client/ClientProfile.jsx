// src/pages/client/ClientProfile.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import ClientLayout from '../../layouts/ClientLayout';
import ClientProfileHeader from '../../components/clientProfile/ClientProfileHeader';
import ClientProfileStatsCard from '../../components/clientProfile/ClientProfileStatsCard';
import ClientPersonalInfo from '../../components/clientProfile/ClientPersonalInfo';
import ClientCompanyInfo from '../../components/clientProfile/ClientCompanyInfo';
import ClientProjectSummary from '../../components/clientProfile/ClientProjectSummary';
import ClientBillingInfo from '../../components/clientProfile/ClientBillingInfo';
import ClientRecentActivity from '../../components/clientProfile/ClientRecentActivity';
import ClientSecuritySettings from '../../components/clientProfile/ClientSecuritySettings';
import ClientNotificationPreferences from '../../components/clientProfile/ClientNotificationPreferences';
import ClientProfileEditModal from '../../components/clientProfile/ClientProfileEditModal';
import ClientPasswordModal from '../../components/clientProfile/ClientPasswordModal';
import { FiEdit2, FiLock } from 'react-icons/fi';
import { clientProfile, companyInfo, profileStatsData, clientProjects, billingInfo, recentInvoices, recentActivities } from '../../data/clientProfileData';
import '../../styles/clientProfile.css';

const getInitials = (name) => {
  if (!name) return 'CL';
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
};

const fileToDataUrl = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
  reader.readAsDataURL(file);
});

const ClientProfile = () => {
  const { user, updateUser } = useAuth();
  const [profile, setProfile] = useState({
    ...clientProfile,
    name: user?.name || clientProfile.name,
    email: user?.email || clientProfile.email,
    avatar: user?.avatar || getInitials(user?.name || clientProfile.name),
    profilePhotoUrl: user?.profilePhotoUrl || clientProfile.profilePhotoUrl,
    status: user?.status || clientProfile.status
  });
  const [company, setCompany] = useState(companyInfo);
  const [activeTab, setActiveTab] = useState('personal');
  const [alert, setAlert] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const tabs = [
    { key: 'personal', label: 'Personal Info' },
    { key: 'company', label: 'Company Info' },
    { key: 'projects', label: 'Project Summary' },
    { key: 'billing', label: 'Billing Info' },
    { key: 'activity', label: 'Recent Activity' },
    { key: 'security', label: 'Security' },
    { key: 'preferences', label: 'Preferences' }
  ];

  const showAlert = (m, t = 'info') => { setAlert({ message: m, type: t }); setTimeout(() => setAlert(null), 2000); };

  const handleEditProfile = () => setShowEditModal(true);
  const handleChangePassword = () => setShowPasswordModal(true);

  const handleProfileSubmit = async (form) => {
    const updatedAvatar = getInitials(form.name);
    const profilePhotoUrl = form.profilePhoto instanceof File
      ? await fileToDataUrl(form.profilePhoto)
      : profile.profilePhotoUrl;
    const updatedProfile = {
      ...profile,
      name: form.name,
      email: form.email,
      phone: form.phone,
      alternatePhone: form.alternatePhone,
      city: form.city,
      state: form.state,
      country: form.country,
      address: form.address,
      bio: form.bio,
      profilePhotoUrl,
      avatar: updatedAvatar
    };

    setProfile(updatedProfile);
    setCompany({ ...company, companyName: form.companyName, companyEmail: form.companyEmail, website: form.website, industry: form.industry });
    updateUser({ name: form.name, email: form.email, avatar: updatedAvatar, profilePhotoUrl });
    setShowEditModal(false);
    showAlert('Profile updated!', 'success');
  };

  const handlePasswordSubmit = () => { setShowPasswordModal(false); showAlert('Password changed!', 'success'); };
  const handleSavePreferences = () => showAlert('Preferences saved!', 'success');

  return (
    <ClientLayout>
      <div className="cprof-dashboard">
        <div className="cprof-dash-header">
          <div><h3>Profile</h3><p>Manage your personal details, company information, project summary, billing details, security, and preferences.</p></div>
          <div className="d-flex gap-2">
            <button className="btn btn-primary btn-sm" onClick={handleEditProfile}><FiEdit2 /> Edit Profile</button>
            <button className="btn btn-outline-primary btn-sm" onClick={handleChangePassword}><FiLock /> Change Password</button>
          </div>
        </div>
        {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`}>{alert.message}<button className="btn-close" onClick={() => setAlert(null)}></button></div>}

        <ClientProfileHeader profile={profile} companyName={company.companyName} onEdit={handleEditProfile} />
        <div className="cprof-stats-grid mt-4">{profileStatsData.map(s => <ClientProfileStatsCard key={s.id} stat={s} />)}</div>

        <div className="cprof-tabs mt-4">
          {tabs.map(t => <button key={t.key} className={`cprof-tab-btn ${activeTab === t.key ? 'active' : ''}`} onClick={() => setActiveTab(t.key)}>{t.label}</button>)}
        </div>

        <div className="mt-3">
          {activeTab === 'personal' && <ClientPersonalInfo profile={profile} />}
          {activeTab === 'company' && <ClientCompanyInfo company={company} />}
          {activeTab === 'projects' && <ClientProjectSummary projects={clientProjects} onAlert={showAlert} />}
          {activeTab === 'billing' && <ClientBillingInfo billing={billingInfo} invoices={recentInvoices} />}
          {activeTab === 'activity' && <ClientRecentActivity activities={recentActivities} />}
          {activeTab === 'security' && <ClientSecuritySettings onChangePassword={handleChangePassword} onAlert={showAlert} />}
          {activeTab === 'preferences' && <ClientNotificationPreferences onSave={handleSavePreferences} />}
        </div>

        <ClientProfileEditModal show={showEditModal} onClose={() => setShowEditModal(false)} profile={profile} company={company} onSubmit={handleProfileSubmit} />
        <ClientPasswordModal show={showPasswordModal} onClose={() => setShowPasswordModal(false)} onSubmit={handlePasswordSubmit} />
      </div>
    </ClientLayout>
  );
};

export default ClientProfile;
