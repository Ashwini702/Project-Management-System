// src/data/backupData.js
export const backupStatsData = [
  { id: 1, title: 'Total Backups', value: 36, icon: 'FiDatabase', description: 'All time backups', color: 'primary' },
  { id: 2, title: 'Successful Backups', value: 30, icon: 'FiCheckCircle', description: 'Completed successfully', color: 'success' },
  { id: 3, title: 'Failed Backups', value: 2, icon: 'FiAlertTriangle', description: 'Needs attention', color: 'danger' },
  { id: 4, title: 'Scheduled Backups', value: 4, icon: 'FiClock', description: 'Auto backups', color: 'warning' },
  { id: 5, title: 'Storage Used', value: '68%', icon: 'FiHardDrive', description: '68 GB of 100 GB', color: 'info' },
  { id: 6, title: 'Last Backup', value: 'Today', icon: 'FiRefreshCw', description: 'June 19, 2026', color: 'purple' }
];

export const backupTypes = ['Full Database Backup', 'Project Data Backup', 'User Data Backup', 'Client Data Backup', 'Reports Backup', 'Files Backup'];
export const storageLocations = ['Local Storage', 'Cloud Storage', 'Google Drive', 'AWS S3'];
export const createdByUsers = ['Admin User', 'Project Manager', 'System Auto Backup'];

export const backupRecords = [
  { id: 1, name: 'Daily Full Backup - June 19', type: 'Full Database Backup', size: '2.8 GB', status: 'Completed', createdBy: 'System Auto Backup', createdAt: '2026-06-19 02:00:00', storageLocation: 'Cloud Storage', includedData: 'All databases, files, reports', restoreCount: 0, lastRestored: '-', notes: 'Automated daily backup.' },
  { id: 2, name: 'Project Data Backup - E-commerce', type: 'Project Data Backup', size: '450 MB', status: 'Completed', createdBy: 'Admin User', createdAt: '2026-06-18 18:00:00', storageLocation: 'Local Storage', includedData: 'E-commerce Platform data', restoreCount: 1, lastRestored: '2026-06-18', notes: 'Manual backup before major update.' },
  { id: 3, name: 'User Data Backup - June 18', type: 'User Data Backup', size: '120 MB', status: 'Completed', createdBy: 'System Auto Backup', createdAt: '2026-06-18 02:00:00', storageLocation: 'Cloud Storage', includedData: 'All user profiles, roles, permissions', restoreCount: 0, lastRestored: '-', notes: 'Weekly user data backup.' },
  { id: 4, name: 'Client Data Backup - All', type: 'Client Data Backup', size: '85 MB', status: 'Completed', createdBy: 'Admin User', createdAt: '2026-06-17 16:30:00', storageLocation: 'Google Drive', includedData: 'Client profiles, projects, billing', restoreCount: 0, lastRestored: '-', notes: 'Monthly client data archive.' },
  { id: 5, name: 'Reports Backup - June 17', type: 'Reports Backup', size: '320 MB', status: 'Completed', createdBy: 'System Auto Backup', createdAt: '2026-06-17 02:00:00', storageLocation: 'AWS S3', includedData: 'All generated reports', restoreCount: 0, lastRestored: '-', notes: 'Weekly reports backup.' },
  { id: 6, name: 'Files Backup - Documents', type: 'Files Backup', size: '1.2 GB', status: 'Completed', createdBy: 'Admin User', createdAt: '2026-06-16 14:00:00', storageLocation: 'Cloud Storage', includedData: 'Project documents, receipts, uploads', restoreCount: 2, lastRestored: '2026-06-17', notes: 'Incremental file backup.' },
  { id: 7, name: 'Full Backup - June 16', type: 'Full Database Backup', size: '2.6 GB', status: 'Completed', createdBy: 'System Auto Backup', createdAt: '2026-06-16 02:00:00', storageLocation: 'Cloud Storage', includedData: 'Complete system backup', restoreCount: 0, lastRestored: '-', notes: 'Daily automated backup.' },
  { id: 8, name: 'Project Data - Healthcare Portal', type: 'Project Data Backup', size: '380 MB', status: 'Failed', createdBy: 'Admin User', createdAt: '2026-06-15 20:00:00', storageLocation: 'Local Storage', includedData: 'Healthcare Portal data', restoreCount: 0, lastRestored: '-', notes: 'Failed due to insufficient disk space.' },
  { id: 9, name: 'Scheduled Weekly Backup', type: 'Full Database Backup', size: '-', status: 'Scheduled', createdBy: 'System Auto Backup', createdAt: '2026-06-22 02:00:00', storageLocation: 'Cloud Storage', includedData: 'Full system backup', restoreCount: 0, lastRestored: '-', notes: 'Next scheduled backup.' },
  { id: 10, name: 'User Data Backup - June 14', type: 'User Data Backup', size: '115 MB', status: 'Completed', createdBy: 'System Auto Backup', createdAt: '2026-06-14 02:00:00', storageLocation: 'Google Drive', includedData: 'User accounts and permissions', restoreCount: 0, lastRestored: '-', notes: 'Weekly backup.' },
  { id: 11, name: 'Reports Backup - June 13', type: 'Reports Backup', size: '290 MB', status: 'Restored', createdBy: 'Admin User', createdAt: '2026-06-13 02:00:00', storageLocation: 'AWS S3', includedData: 'Monthly reports', restoreCount: 1, lastRestored: '2026-06-15', notes: 'Restored for audit review.' },
  { id: 12, name: 'In Progress: Full Backup', type: 'Full Database Backup', size: '1.4 GB / 2.8 GB', status: 'In Progress', createdBy: 'Admin User', createdAt: '2026-06-19 15:00:00', storageLocation: 'Cloud Storage', includedData: 'All system data', restoreCount: 0, lastRestored: '-', notes: 'Currently running... 50% complete.' }
];

export const storageUsageData = {
  totalStorage: 100,
  usedStorage: 68,
  availableStorage: 32,
  breakdown: [
    { label: 'Backup Files', value: 36, percentage: 36, color: 'var(--primary-color)' },
    { label: 'Uploaded Documents', value: 18, percentage: 18, color: 'var(--success-color)' },
    { label: 'Reports', value: 8, percentage: 8, color: 'var(--warning-color)' },
    { label: 'Logs', value: 6, percentage: 6, color: 'var(--accent-purple)' }
  ],
  status: 'Healthy'
};

export const autoBackupDefaultSettings = {
  enabled: true,
  frequency: 'Daily',
  time: '02:00',
  type: 'Full Database Backup',
  storageLocation: 'Cloud Storage',
  retentionPeriod: '30 Days',
  notifyAdmin: true
};

export const exportOptions = [
  { id: 1, title: 'Export Project Data', description: 'Download all project records, status, and progress.', formats: ['CSV', 'Excel', 'PDF'] },
  { id: 2, title: 'Export Employee Data', description: 'Download team member profiles, roles, and performance.', formats: ['CSV', 'Excel'] },
  { id: 3, title: 'Export Client Data', description: 'Download client profiles, projects, and billing info.', formats: ['CSV', 'Excel', 'PDF'] },
  { id: 4, title: 'Export Task Data', description: 'Download all task records with status and assignments.', formats: ['CSV', 'Excel'] },
  { id: 5, title: 'Export Reports', description: 'Download generated reports and analytics.', formats: ['PDF', 'Excel'] },
  { id: 6, title: 'Export Activity Logs', description: 'Download system activity logs for audit purposes.', formats: ['CSV', 'PDF'] }
];