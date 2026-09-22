// src/data/settingsData.js
export const settingsCategories = [
  { id: 'profile', label: 'Profile Settings', icon: 'FiUser', desc: 'Manage personal info' },
  { id: 'security', label: 'Account Security', icon: 'FiShield', desc: 'Password & 2FA' },
  { id: 'roles', label: 'Roles & Permissions', icon: 'FiLock', desc: 'Access control' },
  { id: 'general', label: 'General Settings', icon: 'FiSettings', desc: 'App configuration' },
  { id: 'notifications', label: 'Notification Preferences', icon: 'FiBell', desc: 'Alert settings' },
  { id: 'theme', label: 'Theme Settings', icon: 'FiMonitor', desc: 'Appearance' },
  { id: 'integrations', label: 'Integrations', icon: 'FiLink', desc: 'Third-party apps' },
  { id: 'system', label: 'System Preferences', icon: 'FiCpu', desc: 'System config' }
];

export const profileSettingsData = {
  name: 'Admin User',
  email: 'admin@pmsystem.com',
  phone: '+91 98765 43210',
  designation: 'System Administrator',
  company: 'TechCorp India Pvt Ltd',
  city: 'Mumbai',
  bio: 'Experienced system administrator managing the Project Management System.'
};

export const securitySettingsData = {
  twoFactorEnabled: false,
  loginNotification: true,
  sessionTimeout: '1 Hour',
  recentDevices: [
    { id: 1, device: 'Windows PC', browser: 'Chrome 124', location: 'Mumbai, India', lastActive: '2026-06-19 14:30', current: true },
    { id: 2, device: 'MacBook Pro', browser: 'Safari 17', location: 'Bangalore, India', lastActive: '2026-06-18 18:00', current: false },
    { id: 3, device: 'iPhone 15', browser: 'Safari Mobile', location: 'Mumbai, India', lastActive: '2026-06-17 09:00', current: false }
  ]
};

export const rolePermissionsData = [
  {
    role: 'Admin',
    modules: [
      { name: 'Dashboard', view: true, create: true, edit: true, delete: true, export: true },
      { name: 'Users', view: true, create: true, edit: true, delete: true, export: true },
      { name: 'Projects', view: true, create: true, edit: true, delete: true, export: true },
      { name: 'Tasks', view: true, create: true, edit: true, delete: true, export: true },
      { name: 'Team', view: true, create: true, edit: true, delete: true, export: true },
      { name: 'Clients', view: true, create: true, edit: true, delete: true, export: true },
      { name: 'Calendar', view: true, create: true, edit: true, delete: true, export: true },
      { name: 'Meetings', view: true, create: true, edit: true, delete: true, export: true },
      { name: 'Reports', view: true, create: true, edit: true, delete: true, export: true },
      { name: 'Budget', view: true, create: true, edit: true, delete: true, export: true },
      { name: 'Notifications', view: true, create: true, edit: true, delete: true, export: false },
      { name: 'Activity Logs', view: true, create: false, edit: false, delete: false, export: true },
      { name: 'Backup', view: true, create: true, edit: false, delete: true, export: true },
      { name: 'Settings', view: true, create: true, edit: true, delete: false, export: false }
    ]
  },
  {
    role: 'Project Manager',
    modules: [
      { name: 'Dashboard', view: true, create: false, edit: false, delete: false, export: true },
      { name: 'Users', view: true, create: false, edit: false, delete: false, export: false },
      { name: 'Projects', view: true, create: true, edit: true, delete: false, export: true },
      { name: 'Tasks', view: true, create: true, edit: true, delete: true, export: true },
      { name: 'Team', view: true, create: false, edit: false, delete: false, export: true },
      { name: 'Clients', view: true, create: true, edit: true, delete: false, export: true },
      { name: 'Calendar', view: true, create: true, edit: true, delete: true, export: false },
      { name: 'Meetings', view: true, create: true, edit: true, delete: true, export: false },
      { name: 'Reports', view: true, create: true, edit: false, delete: false, export: true },
      { name: 'Budget', view: true, create: true, edit: true, delete: false, export: true },
      { name: 'Notifications', view: true, create: true, edit: false, delete: false, export: false },
      { name: 'Activity Logs', view: false, create: false, edit: false, delete: false, export: false },
      { name: 'Backup', view: false, create: false, edit: false, delete: false, export: false },
      { name: 'Settings', view: false, create: false, edit: false, delete: false, export: false }
    ]
  },
  {
    role: 'Team Member',
    modules: [
      { name: 'Dashboard', view: true, create: false, edit: false, delete: false, export: false },
      { name: 'Users', view: false, create: false, edit: false, delete: false, export: false },
      { name: 'Projects', view: true, create: false, edit: false, delete: false, export: false },
      { name: 'Tasks', view: true, create: false, edit: true, delete: false, export: false },
      { name: 'Team', view: true, create: false, edit: false, delete: false, export: false },
      { name: 'Clients', view: false, create: false, edit: false, delete: false, export: false },
      { name: 'Calendar', view: true, create: false, edit: false, delete: false, export: false },
      { name: 'Meetings', view: true, create: false, edit: false, delete: false, export: false },
      { name: 'Reports', view: false, create: false, edit: false, delete: false, export: false },
      { name: 'Budget', view: false, create: false, edit: false, delete: false, export: false },
      { name: 'Notifications', view: true, create: false, edit: false, delete: false, export: false },
      { name: 'Activity Logs', view: false, create: false, edit: false, delete: false, export: false },
      { name: 'Backup', view: false, create: false, edit: false, delete: false, export: false },
      { name: 'Settings', view: false, create: false, edit: false, delete: false, export: false }
    ]
  },
  {
    role: 'Client',
    modules: [
      { name: 'Dashboard', view: true, create: false, edit: false, delete: false, export: false },
      { name: 'Projects', view: true, create: false, edit: false, delete: false, export: false },
      { name: 'Tasks', view: true, create: false, edit: false, delete: false, export: false },
      { name: 'Calendar', view: true, create: false, edit: false, delete: false, export: false },
      { name: 'Meetings', view: true, create: false, edit: false, delete: false, export: false },
      { name: 'Reports', view: true, create: false, edit: false, delete: false, export: false },
      { name: 'Budget', view: true, create: false, edit: false, delete: false, export: false },
      { name: 'Notifications', view: true, create: false, edit: false, delete: false, export: false }
    ]
  }
];

export const generalSettingsData = {
  appName: 'Project Management System',
  companyName: 'TechCorp India Pvt Ltd',
  companyEmail: 'contact@techcorp.in',
  companyPhone: '+91 22 1234 5678',
  companyAddress: '123, Tech Park, Andheri East, Mumbai - 400093',
  currency: 'INR',
  dateFormat: 'DD/MM/YYYY',
  timeFormat: '12 Hour',
  timezone: 'Asia/Kolkata',
  language: 'English'
};

export const notificationPreferencesData = {
  system: { projectAssigned: true, taskAssigned: true, deadlineReminder: true, projectStatusUpdate: false, adminAnnouncement: true },
  email: { enableAlerts: true, dailySummary: false, weeklyReport: true, deadlineReminder: true, clientFeedback: true },
  whatsapp: { enableAlerts: false, taskUpdate: true, paymentReminder: true, meetingReminder: false, projectDeadline: true },
  reminders: { beforeDeadline: '1 Hour', overdueFrequency: 'Daily' }
};

export const themeSettingsData = {
  mode: 'Light',
  accentColor: 'Primary Blue',
  sidebarStyle: 'Full Sidebar',
  cardStyle: 'Rounded',
  fontSize: 'Medium'
};

export const integrationsData = [
  { id: 1, name: 'Email SMTP', icon: 'FiMail', desc: 'SendGrid SMTP for email notifications', status: 'Connected', enabled: true },
  { id: 2, name: 'WhatsApp API', icon: 'FiMessageCircle', desc: 'WhatsApp Business API for alerts', status: 'Not Connected', enabled: false },
  { id: 3, name: 'Google Calendar', icon: 'FiCalendar', desc: 'Sync meetings with Google Calendar', status: 'Connected', enabled: true },
  { id: 4, name: 'Google Drive', icon: 'FiCloud', desc: 'Store backups and documents', status: 'Pending', enabled: true },
  { id: 5, name: 'Razorpay Payment', icon: 'FiCreditCard', desc: 'Payment gateway for invoices', status: 'Connected', enabled: true },
  { id: 6, name: 'CRM Integration', icon: 'FiDatabase', desc: 'Sync with external CRM system', status: 'Not Connected', enabled: false },
  { id: 7, name: 'Payroll Integration', icon: 'FiDollarSign', desc: 'HR payroll system integration', status: 'Not Connected', enabled: false },
  { id: 8, name: 'API Access', icon: 'FiKey', desc: 'REST API for third-party apps', status: 'Connected', enabled: true }
];

export const systemPreferencesData = {
  autoLogout: true,
  autoBackup: true,
  activityLogging: true,
  maintenanceMode: false,
  allowClientLogin: true,
  allowFileUpload: true,
  enableReportExport: true,
  enableInvoiceGen: true,
  enablePaymentReminder: true,
  enableAISuggestions: false,
  defaultProjectStatus: 'Not Started',
  defaultTaskStatus: 'Pending',
  defaultTaskPriority: 'Medium',
  defaultProjectView: 'Card View'
};