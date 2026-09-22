// src/pages/team/TeamProfile.jsx
import React, { useEffect, useState } from 'react';
import api, { apiData } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import * as authService from '../../services/authService';
import TeamLayout from '../../layouts/TeamLayout';
import TeamProfileHeader from '../../components/teamProfile/TeamProfileHeader';
import TeamProfileStatsCard from '../../components/teamProfile/TeamProfileStatsCard';
import TeamPersonalInfo from '../../components/teamProfile/TeamPersonalInfo';
import TeamProfessionalInfo from '../../components/teamProfile/TeamProfessionalInfo';
import TeamSkillBox from '../../components/teamProfile/TeamSkillBox';
import TeamPerformanceBox from '../../components/teamProfile/TeamPerformanceBox';
import TeamAssignedProjects from '../../components/teamProfile/TeamAssignedProjects';
import TeamRecentActivity from '../../components/teamProfile/TeamRecentActivity';
import TeamSecuritySettings from '../../components/teamProfile/TeamSecuritySettings';
import TeamNotificationPreferences from '../../components/teamProfile/TeamNotificationPreferences';
import TeamProfileEditModal from '../../components/teamProfile/TeamProfileEditModal';
import TeamPasswordModal from '../../components/teamProfile/TeamPasswordModal';
import { FiEdit2, FiLock } from 'react-icons/fi';
import { teamProfile, profileStatsData, professionalInfo } from '../../data/teamProfileData';
import '../../styles/teamProfile.css';

const TeamProfile = () => {
  const [profile, setProfile] = useState({ ...teamProfile });
  const { user, updateUser } = useAuth();
  useEffect(() => { if (user) setProfile((current) => ({ ...current, name: user.name || current.name, email: user.email || current.email, profile_image_name: user.profile_image_name || current.profile_image_name })); }, [user]);
  const [profInfo, setProfInfo] = useState(professionalInfo);
  const [activeTab, setActiveTab] = useState('personal');
  const [alert, setAlert] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const tabs = [
    { key: 'personal', label: 'Personal Info' },
    { key: 'professional', label: 'Professional Info' },
    { key: 'skills', label: 'Skills' },
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
    try {
      const userId = user?.id || user?.user_id;
      if (!userId) throw new Error('User session not found. Please log in again.');
      const response = await api.put(`/users/${userId}`, { name: form.name, email: form.email, phone: form.phone, city: form.city, state: form.state, country: form.country, address: form.address, designation: form.role, department: form.department, bio: form.bio });
      const saved = apiData(response) || {};
      let photo = {};
      if (form.profilePhoto) { const fd = new FormData(); fd.append('photo', form.profilePhoto); photo = apiData(await authService.uploadProfilePhoto(fd)) || {}; }
      const updated = { ...user, ...saved, ...photo, name: saved.name || form.name, email: saved.email || form.email, phone: saved.phone || form.phone, designation: saved.designation || form.role, department: saved.department || form.department };
      updateUser(updated);
      setProfile({ ...profile, profile_image_name: updated.profile_image_name, name: updated.name, email: updated.email, phone: updated.phone, alternatePhone: form.alternatePhone, city: form.city, state: form.state, country: form.country, address: form.address, role: form.role, department: form.department, bio: form.bio });
      setProfInfo({ ...profInfo, designation: form.role, department: form.department });
      setShowEditModal(false); showAlert('Profile updated and saved.', 'success');
    } catch (error) { showAlert(error.response?.data?.message || error.message || 'Unable to update profile.', 'danger'); }
  };
  const handlePasswordSubmit = () => { setShowPasswordModal(false); showAlert('Password changed!', 'success'); };
  const handleSavePreferences = () => showAlert('Preferences saved!', 'success');

  return (
    <TeamLayout>
      <div className="tprof-dashboard">
        <div className="tprof-dash-header">
          <div><h3>Profile</h3><p>Manage your profile, professional details, skills, task performance, attendance, security, and preferences.</p></div>
          <div className="d-flex gap-2">
            <button className="btn btn-primary btn-sm" onClick={handleEditProfile}><FiEdit2 /> Edit Profile</button>
            <button className="btn btn-outline-primary btn-sm" onClick={handleChangePassword}><FiLock /> Change Password</button>
          </div>
        </div>
        {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`}>{alert.message}<button className="btn-close" onClick={() => setAlert(null)}></button></div>}

        <TeamProfileHeader profile={profile} onEdit={handleEditProfile} />
        <div className="tprof-stats-grid mt-4">{profileStatsData.map(s => <TeamProfileStatsCard key={s.id} stat={s} />)}</div>

        <div className="tprof-tabs mt-4">{tabs.map(t => <button key={t.key} className={`tprof-tab-btn ${activeTab === t.key ? 'active' : ''}`} onClick={() => setActiveTab(t.key)}>{t.label}</button>)}</div>

        <div className="mt-3">
          {activeTab === 'personal' && <TeamPersonalInfo profile={profile} />}
          {activeTab === 'professional' && <TeamProfessionalInfo info={profInfo} />}
          {activeTab === 'skills' && <TeamSkillBox />}
          {activeTab === 'performance' && <TeamPerformanceBox />}
          {activeTab === 'projects' && <TeamAssignedProjects onAlert={showAlert} />}
          {activeTab === 'activity' && <TeamRecentActivity />}
          {activeTab === 'security' && <TeamSecuritySettings onChangePassword={handleChangePassword} onAlert={showAlert} />}
          {activeTab === 'preferences' && <TeamNotificationPreferences onSave={handleSavePreferences} />}
        </div>

        <TeamProfileEditModal show={showEditModal} onClose={() => setShowEditModal(false)} profile={profile} onSubmit={handleProfileSubmit} />
        <TeamPasswordModal show={showPasswordModal} onClose={() => setShowPasswordModal(false)} onSubmit={handlePasswordSubmit} />
      </div>
    </TeamLayout>
  );
};

export default TeamProfile;