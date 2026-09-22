// src/data/notificationData.js
export const notificationStatsData = [
  { id: 1, title: 'Total Notifications', value: 128, icon: 'FiBell', description: 'All time notifications', color: 'primary' },
  { id: 2, title: 'Unread Notifications', value: 24, icon: 'FiMail', description: 'Awaiting attention', color: 'warning' },
  { id: 3, title: 'Deadline Reminders', value: 18, icon: 'FiClock', description: 'Upcoming deadlines', color: 'danger' },
  { id: 4, title: 'Task Alerts', value: 36, icon: 'FiCheckSquare', description: 'Task assignments', color: 'info' },
  { id: 5, title: 'Project Updates', value: 30, icon: 'FiFolder', description: 'Status changes', color: 'success' },
  { id: 6, title: 'Announcements', value: 12, icon: 'FiVolume2', description: 'Admin broadcasts', color: 'purple' }
];

export const notificationTypes = ['Project Assigned', 'Task Assigned', 'Deadline Reminder', 'Task Completed', 'Project Status Update', 'Client Feedback', 'Payment Reminder', 'Admin Announcement', 'System Alert'];
export const statuses = ['Read', 'Unread', 'Sent', 'Pending', 'Failed'];
export const priorities = ['Low', 'Medium', 'High', 'Urgent'];
export const channels = ['System', 'Email', 'WhatsApp', 'SMS'];
export const recipientRoles = ['All Users', 'Admin', 'Project Manager', 'Team Member', 'Client'];

export const projectsForNotif = ['E-commerce Platform', 'Mobile Banking App', 'CRM System', 'Healthcare Portal', 'ERP System', 'Cyber Security Audit'];
export const tasksForNotif = ['Homepage Design', 'API Integration', 'Database Schema', 'User Authentication', 'Security Audit'];
export const usersForNotif = ['Michael Roberts', 'Emily Davidson', 'David Thompson', 'Lisa Martinez', 'Thomas Wright', 'Rajesh Sharma', 'Priya Patel'];

export const notificationsData = [
  { id: 1, title: 'New Project Assigned', message: 'You have been assigned to the E-commerce Platform redesign project as the lead developer.', type: 'Project Assigned', recipientRole: 'Team Member', recipientUser: 'David Thompson', relatedProject: 'E-commerce Platform', relatedTask: '', channels: ['System', 'Email'], priority: 'High', status: 'Sent', isRead: false, createdAt: '2026-06-19 14:30', sentAt: '2026-06-19 14:30', scheduledAt: '', deliveryNotes: 'Delivered successfully.' },
  { id: 2, title: 'Task Deadline Tomorrow', message: 'The API Integration task for E-commerce Platform is due tomorrow. Please ensure completion.', type: 'Deadline Reminder', recipientRole: 'Team Member', recipientUser: 'David Thompson', relatedProject: 'E-commerce Platform', relatedTask: 'API Integration', channels: ['System', 'WhatsApp'], priority: 'Urgent', status: 'Sent', isRead: false, createdAt: '2026-06-18 09:00', sentAt: '2026-06-18 09:00', scheduledAt: '', deliveryNotes: 'WhatsApp delivery confirmed.' },
  { id: 3, title: 'Task Completed: Homepage Design', message: 'Lisa Martinez has marked the Homepage Design task as completed. Please review.', type: 'Task Completed', recipientRole: 'Project Manager', recipientUser: 'Michael Roberts', relatedProject: 'E-commerce Platform', relatedTask: 'Homepage Design', channels: ['System'], priority: 'Medium', status: 'Sent', isRead: true, createdAt: '2026-06-17 16:00', sentAt: '2026-06-17 16:00', scheduledAt: '', deliveryNotes: '' },
  { id: 4, title: 'Project Status Update: CRM System', message: 'CRM System project has been moved to Completed status. All deliverables accepted.', type: 'Project Status Update', recipientRole: 'All Users', recipientUser: 'All', relatedProject: 'CRM System', relatedTask: '', channels: ['System', 'Email'], priority: 'Medium', status: 'Sent', isRead: true, createdAt: '2026-06-19 10:00', sentAt: '2026-06-19 10:00', scheduledAt: '', deliveryNotes: '' },
  { id: 5, title: 'Client Feedback Received', message: 'Rajesh Sharma from TechCorp India has submitted feedback on the E-commerce Platform.', type: 'Client Feedback', recipientRole: 'Project Manager', recipientUser: 'Michael Roberts', relatedProject: 'E-commerce Platform', relatedTask: '', channels: ['System', 'Email'], priority: 'High', status: 'Sent', isRead: false, createdAt: '2026-06-19 15:00', sentAt: '2026-06-19 15:00', scheduledAt: '', deliveryNotes: '' },
  { id: 6, title: 'Payment Reminder: ERP System', message: 'Payment of ₹1,60,000 is overdue for ERP System project from Manufacturing Corp. Please follow up.', type: 'Payment Reminder', recipientRole: 'Admin', recipientUser: 'Admin', relatedProject: 'ERP System', relatedTask: '', channels: ['System', 'Email', 'WhatsApp'], priority: 'Urgent', status: 'Sent', isRead: false, createdAt: '2026-06-19 08:00', sentAt: '2026-06-19 08:00', scheduledAt: '', deliveryNotes: '' },
  { id: 7, title: 'Security Audit Review Scheduled', message: 'A project review meeting for Cyber Security Audit has been scheduled for June 21, 2026.', type: 'Project Status Update', recipientRole: 'Team Member', recipientUser: 'Security Expert', relatedProject: 'Cyber Security Audit', relatedTask: 'Security Audit', channels: ['System'], priority: 'High', status: 'Pending', isRead: false, createdAt: '2026-06-19 12:00', sentAt: '', scheduledAt: '2026-06-21 10:00', deliveryNotes: 'Scheduled for June 21.' },
  { id: 8, title: 'System Alert: Server Downtime', message: 'Scheduled maintenance on June 22, 2026 from 2 AM to 4 AM. All systems may be unavailable.', type: 'System Alert', recipientRole: 'All Users', recipientUser: 'All', relatedProject: '', relatedTask: '', channels: ['System', 'Email', 'SMS'], priority: 'Urgent', status: 'Sent', isRead: false, createdAt: '2026-06-19 07:00', sentAt: '2026-06-19 07:00', scheduledAt: '', deliveryNotes: '' },
  { id: 9, title: 'New Task Assigned: Database Optimization', message: 'Thomas Wright has been assigned the Database Optimization task for Healthcare Portal.', type: 'Task Assigned', recipientRole: 'Team Member', recipientUser: 'Thomas Wright', relatedProject: 'Healthcare Portal', relatedTask: 'Database Schema', channels: ['System', 'Email'], priority: 'Medium', status: 'Sent', isRead: true, createdAt: '2026-06-18 11:00', sentAt: '2026-06-18 11:00', scheduledAt: '', deliveryNotes: '' },
  { id: 10, title: 'Admin Announcement: Office Holiday', message: 'The office will remain closed on June 26, 2026 for annual maintenance. Plan your tasks accordingly.', type: 'Admin Announcement', recipientRole: 'All Users', recipientUser: 'All', relatedProject: '', relatedTask: '', channels: ['System', 'Email', 'WhatsApp'], priority: 'Low', status: 'Sent', isRead: false, createdAt: '2026-06-19 09:00', sentAt: '2026-06-19 09:00', scheduledAt: '', deliveryNotes: '' },
  { id: 11, title: 'Failed Notification: SMS Gateway', message: 'SMS notification to Robert Wilson failed due to gateway timeout. Please resend.', type: 'System Alert', recipientRole: 'Team Member', recipientUser: 'Robert Wilson', relatedProject: '', relatedTask: '', channels: ['SMS'], priority: 'High', status: 'Failed', isRead: false, createdAt: '2026-06-19 06:00', sentAt: '', scheduledAt: '', deliveryNotes: 'SMS gateway timeout. Retry recommended.' },
  { id: 12, title: 'Mobile App UI Feedback', message: 'Sneha Reddy from FinanceHub provided positive feedback on the mobile app navigation design.', type: 'Client Feedback', recipientRole: 'Project Manager', recipientUser: 'Emily Davidson', relatedProject: 'Mobile Banking App', relatedTask: '', channels: ['System'], priority: 'Medium', status: 'Sent', isRead: true, createdAt: '2026-06-18 14:00', sentAt: '2026-06-18 14:00', scheduledAt: '', deliveryNotes: '' },
  { id: 13, title: 'Weekly Report Reminder', message: 'Please submit your weekly progress report by end of day Friday.', type: 'Deadline Reminder', recipientRole: 'Team Member', recipientUser: 'All Team Members', relatedProject: '', relatedTask: '', channels: ['System', 'Email'], priority: 'Medium', status: 'Pending', isRead: false, createdAt: '2026-06-19 08:00', sentAt: '', scheduledAt: '2026-06-20 09:00', deliveryNotes: 'Scheduled for Friday morning.' },
  { id: 14, title: 'Task Reopened: Security Patch', message: 'Security Expert has reopened the Security Patch task due to newly identified vulnerability.', type: 'Task Completed', recipientRole: 'Project Manager', recipientUser: 'Patricia Garcia', relatedProject: 'Cyber Security Audit', relatedTask: 'Security Audit', channels: ['System'], priority: 'Urgent', status: 'Sent', isRead: false, createdAt: '2026-06-19 11:30', sentAt: '2026-06-19 11:30', scheduledAt: '', deliveryNotes: '' },
  { id: 15, title: 'New Project Kickoff Meeting', message: 'Digital Marketing Campaign kickoff meeting scheduled for June 25. All team members required.', type: 'Admin Announcement', recipientRole: 'Team Member', recipientUser: 'All Team Members', relatedProject: 'Digital Marketing Campaign', relatedTask: '', channels: ['System', 'Email'], priority: 'Medium', status: 'Sent', isRead: true, createdAt: '2026-06-19 13:00', sentAt: '2026-06-19 13:00', scheduledAt: '', deliveryNotes: '' }
];

export const announcementsData = [
  { id: 1, title: 'Office Holiday on June 26', message: 'The office will remain closed for annual maintenance. Plan accordingly.', postedBy: 'Admin User', date: '2026-06-19', priority: 'Low', status: 'Active' },
  { id: 2, title: 'New Project Kickoff', message: 'Digital Marketing Campaign kickoff meeting on June 25. All team members required.', postedBy: 'Admin User', date: '2026-06-19', priority: 'Medium', status: 'Active' },
  { id: 3, title: 'Quarterly Review Meeting', message: 'Quarterly performance review meeting on June 30. Department heads must attend.', postedBy: 'Admin User', date: '2026-06-18', priority: 'High', status: 'Active' }
];

export const remindersData = [
  { id: 1, title: 'API Integration Deadline', project: 'E-commerce Platform', task: 'API Integration', dueDate: '2026-06-20', daysLeft: 1, priority: 'Urgent', status: 'Pending' },
  { id: 2, title: 'Security Patch Overdue', project: 'Cyber Security Audit', task: 'Security Audit', dueDate: '2026-06-15', daysLeft: -4, priority: 'Urgent', status: 'Overdue' },
  { id: 3, title: 'UI Design Submission', project: 'Healthcare Portal', task: 'Homepage Design', dueDate: '2026-06-21', daysLeft: 2, priority: 'High', status: 'Pending' },
  { id: 4, title: 'Weekly Report', project: 'General', task: '', dueDate: '2026-06-20', daysLeft: 1, priority: 'Medium', status: 'Pending' },
  { id: 5, title: 'Sprint Demo', project: 'Mobile Banking App', task: '', dueDate: '2026-06-27', daysLeft: 8, priority: 'Medium', status: 'Upcoming' }
];

export const notificationSettingsData = {
  system: { projectUpdates: true, taskUpdates: true, deadlineReminders: true, announcements: true },
  email: { enableAlerts: true, dailySummary: false, taskAssigned: true, deadlineReminder: true },
  whatsapp: { enableAlerts: false, deadlineReminders: true, projectUpdates: false, paymentReminders: true },
  reminders: { beforeDeadline: '30 Minutes', repeatOverdue: 'Daily' }
};