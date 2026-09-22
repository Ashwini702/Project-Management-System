// src/pages/admin/Backup.jsx
import React, { useEffect, useState, useMemo } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import PageHeader from '../../components/common/PageHeader';
import BackupStatsCard from '../../components/backup/BackupStatsCard';
import BackupCard from '../../components/backup/BackupCard';
import BackupTable from '../../components/backup/BackupTable';
import BackupFormModal from '../../components/backup/BackupFormModal';
import RestoreModal from '../../components/backup/RestoreModal';
import StorageUsageCard from '../../components/backup/StorageUsageCard';
import AutoBackupSettings from '../../components/backup/AutoBackupSettings';
import DataExportBox from '../../components/backup/DataExportBox';
import BackupStatusBadge from '../../components/backup/BackupStatusBadge';
import BackupTypeBadge from '../../components/backup/BackupTypeBadge';
import { FiSearch, FiRotateCcw, FiDatabase, FiHardDrive, FiSettings, FiDownload, FiX, FiPlus, FiRefreshCw } from 'react-icons/fi';
import { backupTypes, storageUsageData, autoBackupDefaultSettings, createdByUsers } from '../../data/backupData';
import { apiData } from '../../services/api';
import * as backupService from '../../services/backupService';
import '../../styles/backup.css';

const Backup = () => {
  const [backups, setBackups] = useState([]);
  const [autoSettings, setAutoSettings] = useState(autoBackupDefaultSettings);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [createdByFilter, setCreatedByFilter] = useState('All Users');
  const [dateFilter, setDateFilter] = useState('All Dates');
  const [viewMode, setViewMode] = useState('list');

  const [showBackupModal, setShowBackupModal] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBackup, setSelectedBackup] = useState(null);
  const [alert, setAlert] = useState(null);

  const toUiBackup = (item) => ({
    ...item,
    createdBy: item.created_by || 'Admin',
    createdAt: item.created_at ? String(item.created_at).replace('T', ' ') : '',
    storageLocation: item.storage_location || '-',
    includedData: item.included_data || '-',
    restoreCount: item.restore_count || 0,
    lastRestored: item.last_restored ? String(item.last_restored).replace('T', ' ') : '-',
  });

  const loadBackups = async () => {
    try {
      const response = await backupService.getBackups();
      setBackups(apiData(response).map(toUiBackup));
    } catch (error) {
      showAlert(error.response?.data?.message || 'Unable to load backups.', 'danger');
    }
  };

  useEffect(() => { loadBackups(); }, []);

  const backupStats = useMemo(() => [
    { id: 1, title: 'Total Backups', value: backups.length, icon: 'FiDatabase', description: 'Database records', color: 'primary' },
    { id: 2, title: 'Successful Backups', value: backups.filter(b => b.status === 'Completed' || b.status === 'Restored').length, icon: 'FiCheckCircle', description: 'Completed successfully', color: 'success' },
    { id: 3, title: 'Failed Backups', value: backups.filter(b => b.status === 'Failed').length, icon: 'FiAlertTriangle', description: 'Needs attention', color: 'danger' },
    { id: 4, title: 'Scheduled Backups', value: backups.filter(b => b.status === 'Scheduled').length, icon: 'FiClock', description: 'Scheduled records', color: 'warning' },
  ], [backups]);
  const filteredBackups = useMemo(() => {
    return backups.filter(b => {
      const matchesSearch = !searchTerm || b.name.toLowerCase().includes(searchTerm.toLowerCase()) || b.type.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = typeFilter === 'All Types' || b.type === typeFilter;
      const matchesStatus = statusFilter === 'All Status' || b.status === statusFilter;
      const matchesUser = createdByFilter === 'All Users' || b.createdBy === createdByFilter;
      return matchesSearch && matchesType && matchesStatus && matchesUser;
    });
  }, [backups, searchTerm, typeFilter, statusFilter, createdByFilter]);

  const resetFilters = () => { setSearchTerm(''); setTypeFilter('All Types'); setStatusFilter('All Status'); setCreatedByFilter('All Users'); setDateFilter('All Dates'); };
  const showAlert = (m, t = 'success') => { setAlert({ message: m, type: t }); setTimeout(() => setAlert(null), 3000); };

  const handleCreateBackup = () => setShowBackupModal(true);
  const handleRestoreData = () => setShowRestoreModal(true);
  const handleView = (b) => { setSelectedBackup(b); setShowViewModal(true); };
  const handleDownload = () => showAlert('Backup download feature is frontend demo only.', 'info');
  const handleRestore = (b) => { setSelectedBackup(b); setShowRestoreModal(true); };
  const handleDelete = (b) => { setSelectedBackup(b); setShowDeleteModal(true); };
  const handleExport = (opt) => showAlert(`${opt.title} export is frontend demo only.`, 'info');

  const confirmDelete = async () => {
    try {
      await backupService.deleteBackup(selectedBackup.id);
      setBackups(backups.filter(b => b.id !== selectedBackup.id));
      setShowDeleteModal(false); setSelectedBackup(null); showAlert('Backup deleted successfully!');
    } catch (error) { showAlert(error.response?.data?.message || 'Unable to delete backup.', 'danger'); }
  };

  const handleBackupSubmit = async (fd) => {
    try {
      const scheduledAt = fd.scheduleBackup && fd.scheduleDate ? `${fd.scheduleDate} ${fd.scheduleTime || '00:00'}:00` : null;
      const response = await backupService.createBackup({
        name: fd.name, type: fd.type, size: '0 MB',
        status: fd.scheduleBackup ? 'Scheduled' : 'Completed',
        storage_location: fd.storageLocation,
        included_data: [fd.includeFiles && 'Files', fd.includeReports && 'Reports', fd.includeLogs && 'Logs'].filter(Boolean).join(', ') || 'Database records',
        notes: fd.description, scheduled_at: scheduledAt,
      });
      setBackups([toUiBackup(apiData(response)), ...backups]);
      showAlert('Backup saved in database successfully!'); setShowBackupModal(false);
    } catch (error) { showAlert(error.response?.data?.message || 'Unable to create backup.', 'danger'); }
  };

  const handleRestoreSubmit = async (fd) => {
    try {
      await backupService.restoreBackup(fd.backupId, { restore_type: fd.restoreType, notes: fd.notes });
      await loadBackups();
      showAlert('Restore history saved in database successfully!', 'warning');
      setShowRestoreModal(false); setSelectedBackup(null);
    } catch (error) { showAlert(error.response?.data?.message || 'Unable to record restore.', 'danger'); }
  };
  const handleSettingsSave = (s) => { setAutoSettings(s); showAlert('Auto backup settings saved successfully!'); };

  return (
    <AdminLayout>
      <PageHeader title="Backup & Restore" subtitle="Manage database backups, restore data, export records, schedule auto backups, and monitor secure storage." showButton={false}>
        <div className="d-flex gap-2">
          <button className="btn btn-primary btn-sm" onClick={handleCreateBackup}><FiPlus /> Create Backup</button>
          <button className="btn btn-warning btn-sm" onClick={handleRestoreData}><FiRefreshCw /> Restore Data</button>
        </div>
      </PageHeader>
      {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`}>{alert.message}<button className="btn-close" onClick={() => setAlert(null)}></button></div>}

      <div className="bkp-stats-grid">{backupStats.map(s => <BackupStatsCard key={s.id} stat={s} />)}</div>

      <div className="filter-section"><div className="filter-row">
        <div className="search-box"><FiSearch className="search-icon" /><input type="text" className="form-control search-input" placeholder="Search backups..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
        <div className="filter-selects">
          <select className="form-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}><option value="All Types">All Types</option>{backupTypes.map(t => <option key={t} value={t}>{t}</option>)}</select>
          <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}><option value="All Status">All Status</option><option>Completed</option><option>Failed</option><option>In Progress</option><option>Scheduled</option><option>Restored</option></select>
          <select className="form-select" value={createdByFilter} onChange={(e) => setCreatedByFilter(e.target.value)}><option value="All Users">All Users</option>{createdByUsers.map(u => <option key={u} value={u}>{u}</option>)}</select>
        </div>
        <button className="btn btn-light reset-btn" onClick={resetFilters}><FiRotateCcw className="me-2" /> Reset</button>
        <div className="view-toggle">
          <button className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}><FiDatabase /></button>
          <button className={`toggle-btn ${viewMode === 'storage' ? 'active' : ''}`} onClick={() => setViewMode('storage')}><FiHardDrive /></button>
          <button className={`toggle-btn ${viewMode === 'settings' ? 'active' : ''}`} onClick={() => setViewMode('settings')}><FiSettings /></button>
          <button className={`toggle-btn ${viewMode === 'export' ? 'active' : ''}`} onClick={() => setViewMode('export')}><FiDownload /></button>
        </div>
      </div></div>

      {viewMode === 'list' && (
        <div>
          <div className="backups-grid">
            {filteredBackups.length === 0 ? <div className="no-data"><p className="text-muted">No backups found</p></div> :
              filteredBackups.map(b => <BackupCard key={b.id} backup={b} onView={handleView} onDownload={handleDownload} onRestore={handleRestore} onDelete={handleDelete} />)
            }
          </div>
          <div className="mt-4"><h6 className="mb-3">All Backup Records</h6><div className="bkp-table-card"><BackupTable backups={filteredBackups} onView={handleView} onDownload={handleDownload} onRestore={handleRestore} onDelete={handleDelete} /></div></div>
        </div>
      )}

      {viewMode === 'storage' && <StorageUsageCard storageData={storageUsageData} />}
      {viewMode === 'settings' && <AutoBackupSettings settings={autoSettings} onSave={handleSettingsSave} />}
      {viewMode === 'export' && <DataExportBox onExport={handleExport} />}

      <BackupFormModal show={showBackupModal} onClose={() => setShowBackupModal(false)} onSubmit={handleBackupSubmit} />
      <RestoreModal show={showRestoreModal} onClose={() => { setShowRestoreModal(false); setSelectedBackup(null); }} onSubmit={handleRestoreSubmit} backups={backups} selectedBackup={selectedBackup} />

      {showViewModal && selectedBackup && (
        <div className="modal-overlay"><div className="modal-dialog"><div className="modal-content">
          <div className="modal-header"><h5 className="modal-title">{selectedBackup.name}</h5><button className="modal-close-btn" onClick={() => { setShowViewModal(false); setSelectedBackup(null); }}><FiX /></button></div>
          <div className="modal-body">
            <div className="bkp-detail-header"><BackupTypeBadge type={selectedBackup.type} /><BackupStatusBadge status={selectedBackup.status} /><span className="bkp-id">ID: {selectedBackup.id}</span></div>
            <div className="bkp-detail-grid mt-3">
              <div><strong>Size:</strong> {selectedBackup.size}</div>
              <div><strong>Created By:</strong> {selectedBackup.createdBy}</div>
              <div><strong>Created At:</strong> {selectedBackup.createdAt}</div>
              <div><strong>Location:</strong> {selectedBackup.storageLocation}</div>
              <div><strong>Included:</strong> {selectedBackup.includedData}</div>
              <div><strong>Restored:</strong> {selectedBackup.restoreCount} time(s)</div>
              <div><strong>Last Restored:</strong> {selectedBackup.lastRestored}</div>
              {selectedBackup.notes && <div><strong>Notes:</strong> {selectedBackup.notes}</div>}
            </div>
          </div>
          <div className="modal-footer"><button className="btn btn-light" onClick={() => { setShowViewModal(false); setSelectedBackup(null); }}>Close</button></div>
        </div></div></div>
      )}

      {showDeleteModal && selectedBackup && (
        <div className="modal-overlay"><div className="modal-dialog modal-sm"><div className="modal-content">
          <div className="modal-header"><h5 className="modal-title">Delete Backup</h5><button className="modal-close-btn" onClick={() => { setShowDeleteModal(false); setSelectedBackup(null); }}><FiX /></button></div>
          <div className="modal-body"><div className="delete-confirmation"><p>Are you sure you want to delete this backup?</p><div className="delete-info"><strong>{selectedBackup.name}</strong></div></div></div>
          <div className="modal-footer"><button className="btn btn-light" onClick={() => { setShowDeleteModal(false); setSelectedBackup(null); }}>Cancel</button><button className="btn btn-danger" onClick={confirmDelete}>Delete</button></div>
        </div></div></div>
      )}
    </AdminLayout>
  );
};

export default Backup;



