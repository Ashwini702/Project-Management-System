// src/pages/manager/ManagerProfile.jsx
import React, { useState } from 'react';
import ManagerLayout from '../../layouts/ManagerLayout';
import ManagerProfileHeader from '../../components/managerProfile/ManagerProfileHeader';
import ManagerProfileStatsCard from '../../components/managerProfile/ManagerProfileStatsCard';
import ManagerPersonalInfo from '../../components/managerProfile/ManagerPersonalInfo';
import ManagerProfessionalInfo from '../../components/managerProfile/ManagerProfessionalInfo';
import ManagerPerformanceBox from '../../components/managerProfile/ManagerPerformanceBox';
import ManagerAssignedProjects from '../../components/managerProfile/ManagerAssignedProjects';
import ManagerRecentActivity from '../../components/managerProfile/ManagerRecentActivity';
import ManagerSecuritySettings from '../../components/managerProfile/ManagerSecuritySettings';
import ManagerNotificationPreferences from '../../components/managerProfile/ManagerNotificationPreferences';
import ManagerProfileEditModal from '../../components/managerProfile/ManagerProfileEditModal';
import ManagerPasswordModal from '../../components/managerProfile/ManagerPasswordModal';
import { FiEdit2, FiLock } from 'react-icons/fi';
import { managerProfile, profileStatsData, performanceData, assignedProjects, recentActivities } from '../../data/managerProfileData';
import '../../styles/managerProfile.css';
import { useAuth } from '../../context/AuthContext';

const getInitials = (name = '') => name.split(' ').filter(Boolean).map(part => part[0]).join('').slice(0, 2).toUpperCase() || 'PM';
const fileToDataUrl = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
  reader.readAsDataURL(file);
});

const ManagerProfile = () => {
  const { user, updateUser } = useAuth();
  const [profile, setProfile] = useState(() => ({
    ...managerProfile,
    name: user?.name || managerProfile.name,
    email: user?.email || managerProfile.email,
    role: user?.role || managerProfile.role,
    avatar: user?.avatar || getInitials(user?.name || managerProfile.name),
    profilePhotoUrl: user?.profilePhotoUrl || managerProfile.profilePhotoUrl
  }));
  const [activeTab, setActiveTab] = useState('personal');
  const [alert, setAlert] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const tabs = [
    { key: 'personal', label: 'Personal Info' },
    { key: 'professional', label: 'Professional Info' },
    { key: 'performance', label: 'Performance' },
    { key: 'projects', label: 'Assigned Projects' },
    { key: 'activity', label: 'Recent Activity' },
    { key: 'security', label: 'Security' },
    { key: 'preferences', label: 'Preferences' }
  ];

  const showAlert = (m, t = 'info') => { setAlert({ message: m, type: t }); setTimeout(() => setAlert(null), 2000); };

  const handleEditProfile = () => setShowEditModal(true);
  const handleChangePassword = () => setShowPasswordModal(true);

  const handleProfileSubmit = async (form) => {
    const profilePhotoUrl = form.profilePhoto instanceof File
      ? await fileToDataUrl(form.profilePhoto)
      : profile.profilePhotoUrl;
    const updatedProfile = {
      ...profile,
      ...form,
      profilePhotoUrl,
      avatar: getInitials(form.name || profile.name)
    };
    setProfile(updatedProfile);
    updateUser({
      name: updatedProfile.name,
      email: updatedProfile.email,
      role: updatedProfile.role,
      avatar: updatedProfile.avatar,
      profilePhotoUrl: updatedProfile.profilePhotoUrl
    });
    setShowEditModal(false);
    showAlert('Profile updated successfully!', 'success');
  };
  const handlePasswordSubmit = () => { setShowPasswordModal(false); showAlert('Password changed successfully!', 'success'); };
  const handleSavePreferences = () => showAlert('Preferences saved successfully!', 'success');

  return (
    <ManagerLayout>
      <div className="mp-dashboard">
        <div className="mp-dash-header">
          <div><h3>Manager Profile</h3><p>View and manage your profile, professional details, assigned projects, performance, security, and preferences.</p></div>
          <div className="d-flex gap-2">
            <button className="btn btn-primary btn-sm" onClick={handleEditProfile}><FiEdit2 /> Edit Profile</button>
            <button className="btn btn-outline-primary btn-sm" onClick={handleChangePassword}><FiLock /> Change Password</button>
          </div>
        </div>
        {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`}>{alert.message}<button className="btn-close" onClick={() => setAlert(null)}></button></div>}

        <ManagerProfileHeader profile={profile} onEdit={handleEditProfile} />
        <div className="mp-stats-grid mt-4">{profileStatsData.map(s => <ManagerProfileStatsCard key={s.id} stat={s} />)}</div>

        <div className="mp-tabs mt-4">
          {tabs.map(t => <button key={t.key} className={`mp-tab-btn ${activeTab === t.key ? 'active' : ''}`} onClick={() => setActiveTab(t.key)}>{t.label}</button>)}
        </div>

        <div className="mt-3">
          {activeTab === 'personal' && <ManagerPersonalInfo profile={profile} />}
          {activeTab === 'professional' && <ManagerProfessionalInfo profile={profile} />}
          {activeTab === 'performance' && <ManagerPerformanceBox performance={performanceData} />}
          {activeTab === 'projects' && <ManagerAssignedProjects projects={assignedProjects} onAlert={showAlert} />}
          {activeTab === 'activity' && <ManagerRecentActivity activities={recentActivities} />}
          {activeTab === 'security' && <ManagerSecuritySettings onChangePassword={handleChangePassword} onAlert={showAlert} />}
          {activeTab === 'preferences' && <ManagerNotificationPreferences onSave={handleSavePreferences} />}
        </div>

        <ManagerProfileEditModal show={showEditModal} onClose={() => setShowEditModal(false)} profile={profile} onSubmit={handleProfileSubmit} />
        <ManagerPasswordModal show={showPasswordModal} onClose={() => setShowPasswordModal(false)} onSubmit={handlePasswordSubmit} />
      </div>
    </ManagerLayout>
  );
};

export default ManagerProfile;