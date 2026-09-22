// src/data/clientMessagesData.js
export const messageStatsData = [
  { id: 1, title: 'Total Messages', value: 86, icon: 'FiMail', desc: 'All messages', color: 'primary' },
  { id: 2, title: 'Unread Messages', value: 12, icon: 'FiMessageCircle', desc: 'Awaiting attention', color: 'warning' },
  { id: 3, title: 'Project Messages', value: 34, icon: 'FiFolder', desc: 'Project related', color: 'info' },
  { id: 4, title: 'Support Messages', value: 18, icon: 'FiHelpCircle', desc: 'Support tickets', color: 'danger' },
  { id: 5, title: 'File Discussions', value: 10, icon: 'FiFileText', desc: 'File comments', color: 'success' },
  { id: 6, title: 'Feedback Replies', value: 8, icon: 'FiMessageSquare', desc: 'Feedback responses', color: 'purple' }
];

export const projects = ['Website Redesign', 'Mobile App UI', 'CRM Development', 'ERP System', 'Cyber Security Audit', 'E-commerce Platform', 'Healthcare Portal'];
export const messageTypes = ['Project Update', 'Feedback Reply', 'File Discussion', 'Invoice Message', 'Support Message', 'Approval Request', 'General Message'];
export const senders = ['Project Manager', 'Team Member', 'Admin', 'Support Team'];

export const inboxMessages = [
  { id: 1, senderName: 'Michael Roberts', senderRole: 'Project Manager', senderEmail: 'michael@pms.com', subject: 'Website Redesign - New Design Mockups', message: 'Hi Rahul, we have uploaded the new homepage design mockups for your review. Please check and provide your feedback.', projectName: 'Website Redesign', type: 'Project Update', status: 'Unread', priority: 'High', sentAt: '2026-06-24 14:30', attachmentCount: 3, isRead: false, replies: [] },
  { id: 2, senderName: 'Emily Davidson', senderRole: 'Project Manager', senderEmail: 'emily@pms.com', subject: 'Mobile App - Testing Phase Update', message: 'The mobile app testing phase is scheduled for next week. We need your availability for UAT sessions.', projectName: 'Mobile App UI', type: 'Project Update', status: 'Unread', priority: 'High', sentAt: '2026-06-24 11:00', attachmentCount: 1, isRead: false, replies: [] },
  { id: 3, senderName: 'Lisa Martinez', senderRole: 'Team Member', senderEmail: 'lisa@pms.com', subject: 'UI Design Files Shared', message: 'I have shared the updated UI design files in Figma. Please review the navigation changes.', projectName: 'Website Redesign', type: 'File Discussion', status: 'Read', priority: 'Medium', sentAt: '2026-06-23 16:00', attachmentCount: 5, isRead: true, replies: [{ id: 1, senderName: 'Rahul Sharma', message: 'Thanks Lisa, I will review them by tomorrow.', dateTime: '2026-06-23 17:00' }] },
  { id: 4, senderName: 'Priya Sharma', senderRole: 'Project Manager', senderEmail: 'priya@pms.com', subject: 'Feedback Response - Payment Gateway Bug', message: 'We have investigated the payment gateway issue. Our developer David is working on the fix.', projectName: 'E-commerce Platform', type: 'Feedback Reply', status: 'Read', priority: 'Urgent', sentAt: '2026-06-23 10:00', attachmentCount: 0, isRead: true, replies: [] },
  { id: 5, senderName: 'Support Team', senderRole: 'Support Team', senderEmail: 'support@pms.com', subject: 'Support Ticket #452 - Login Issue', message: 'We have received your support ticket regarding the login issue. Our team is looking into it.', projectName: 'Website Redesign', type: 'Support Message', status: 'Important', priority: 'High', sentAt: '2026-06-22 14:00', attachmentCount: 0, isRead: true, replies: [] },
  { id: 6, senderName: 'Admin User', senderRole: 'Admin', senderEmail: 'admin@pms.com', subject: 'Server Maintenance Notification', message: 'Scheduled server maintenance will take place on June 25 from 2 AM to 4 AM. Systems may be temporarily unavailable.', projectName: 'All Projects', type: 'General Message', status: 'Unread', priority: 'Medium', sentAt: '2026-06-22 09:00', attachmentCount: 0, isRead: false, replies: [] },
  { id: 7, senderName: 'Accountant Smith', senderRole: 'Admin', senderEmail: 'accounts@pms.com', subject: 'Invoice INV-2026-003 Due', message: 'This is a reminder that invoice INV-2026-003 for E-commerce Platform is due on June 15. Please arrange payment.', projectName: 'E-commerce Platform', type: 'Invoice Message', status: 'Important', priority: 'High', sentAt: '2026-06-21 15:00', attachmentCount: 1, isRead: true, replies: [] },
  { id: 8, senderName: 'David Thompson', senderRole: 'Team Member', senderEmail: 'david@pms.com', subject: 'API Integration Progress', message: 'The payment gateway API integration is 40% complete. We are on track for the June 28 deadline.', projectName: 'E-commerce Platform', type: 'Project Update', status: 'Read', priority: 'Medium', sentAt: '2026-06-21 11:00', attachmentCount: 0, isRead: true, replies: [] },
  { id: 9, senderName: 'Patricia Garcia', senderRole: 'Project Manager', senderEmail: 'patricia@pms.com', subject: 'CRM Module Approval Request', message: 'The customer management module is ready for your approval. Please review and approve to proceed.', projectName: 'CRM Development', type: 'Approval Request', status: 'Unread', priority: 'High', sentAt: '2026-06-20 16:00', attachmentCount: 2, isRead: false, replies: [] },
  { id: 10, senderName: 'Support Team', senderRole: 'Support Team', senderEmail: 'support@pms.com', subject: 'Support Ticket #453 - File Upload Error', message: 'We have resolved the file upload error you reported. The issue was related to file size limits.', projectName: 'Healthcare Portal', type: 'Support Message', status: 'Read', priority: 'Medium', sentAt: '2026-06-20 10:00', attachmentCount: 0, isRead: true, replies: [] },
  { id: 11, senderName: 'Michael Roberts', senderRole: 'Project Manager', senderEmail: 'michael@pms.com', subject: 'Project Status Update', message: 'The website redesign project is progressing well. We have completed 68% of the work.', projectName: 'Website Redesign', type: 'Project Update', status: 'Archived', priority: 'Low', sentAt: '2026-06-18 14:00', attachmentCount: 0, isRead: true, replies: [] },
  { id: 12, senderName: 'Emily Davidson', senderRole: 'Project Manager', senderEmail: 'emily@pms.com', subject: 'Meeting Rescheduled', message: 'The design review meeting has been rescheduled to June 26 at 2 PM. Please confirm your availability.', projectName: 'Mobile App UI', type: 'General Message', status: 'Unread', priority: 'Medium', sentAt: '2026-06-24 08:00', attachmentCount: 0, isRead: false, replies: [] },
  { id: 13, senderName: 'Security Expert', senderRole: 'Team Member', senderEmail: 'security@pms.com', subject: 'Security Assessment Report', message: 'The security assessment report is complete. Please review the findings and provide your feedback.', projectName: 'Cyber Security Audit', type: 'File Discussion', status: 'Read', priority: 'High', sentAt: '2026-06-19 15:00', attachmentCount: 4, isRead: true, replies: [] },
  { id: 14, senderName: 'Admin User', senderRole: 'Admin', senderEmail: 'admin@pms.com', subject: 'Account Settings Updated', message: 'Your account settings have been updated as per your request. The changes are reflected in your profile.', projectName: 'General', type: 'General Message', status: 'Read', priority: 'Low', sentAt: '2026-06-17 12:00', attachmentCount: 0, isRead: true, replies: [] },
  { id: 15, senderName: 'Michael Roberts', senderRole: 'Project Manager', senderEmail: 'michael@pms.com', subject: 'New Feature Request', message: 'We have reviewed your feature request for bulk document upload. This feature has been added to the development backlog.', projectName: 'CRM Development', type: 'Feedback Reply', status: 'Read', priority: 'Medium', sentAt: '2026-06-16 10:00', attachmentCount: 0, isRead: true, replies: [] }
];

export const conversations = [
  { id: 1, contactName: 'Michael Roberts', contactRole: 'Project Manager', projectName: 'Website Redesign', lastMessage: 'The new design mockups are ready for your review.', lastMessageTime: '2026-06-24 14:30', unreadCount: 3, isOnline: true },
  { id: 2, contactName: 'Emily Davidson', contactRole: 'Project Manager', projectName: 'Mobile App UI', lastMessage: 'Testing phase starts next week.', lastMessageTime: '2026-06-24 11:00', unreadCount: 1, isOnline: false },
  { id: 3, contactName: 'Lisa Martinez', contactRole: 'UI/UX Designer', projectName: 'Website Redesign', lastMessage: 'I have shared the updated design files.', lastMessageTime: '2026-06-23 16:00', unreadCount: 0, isOnline: true },
  { id: 4, contactName: 'Support Team', contactRole: 'Support', projectName: 'General', lastMessage: 'Ticket #452 has been resolved.', lastMessageTime: '2026-06-22 14:00', unreadCount: 0, isOnline: true },
  { id: 5, contactName: 'David Thompson', contactRole: 'Full Stack Developer', projectName: 'E-commerce Platform', lastMessage: 'API integration is on track.', lastMessageTime: '2026-06-21 11:00', unreadCount: 0, isOnline: false },
  { id: 6, contactName: 'Patricia Garcia', contactRole: 'Project Manager', projectName: 'CRM Development', lastMessage: 'CRM module ready for approval.', lastMessageTime: '2026-06-20 16:00', unreadCount: 1, isOnline: true },
  { id: 7, contactName: 'Admin User', contactRole: 'System Admin', projectName: 'General', lastMessage: 'Server maintenance on June 25.', lastMessageTime: '2026-06-22 09:00', unreadCount: 1, isOnline: false },
  { id: 8, contactName: 'Accountant Smith', contactRole: 'Accounts', projectName: 'E-commerce Platform', lastMessage: 'Invoice INV-2026-003 is due.', lastMessageTime: '2026-06-21 15:00', unreadCount: 0, isOnline: false }
];

export const chatMessages = [
  { id: 1, conversationId: 1, sender: 'Michael Roberts', senderRole: 'Project Manager', message: 'Hi Rahul, the new homepage design mockups are ready for your review.', time: '2026-06-24 14:30', isOwn: false },
  { id: 2, conversationId: 1, sender: 'Rahul Sharma', senderRole: 'Client', message: 'Thanks Michael! I will review them by EOD and share my feedback.', time: '2026-06-24 14:45', isOwn: true },
  { id: 3, conversationId: 1, sender: 'Michael Roberts', senderRole: 'Project Manager', message: 'Great! Let me know if you need any changes.', time: '2026-06-24 14:50', isOwn: false },
  { id: 4, conversationId: 1, sender: 'Rahul Sharma', senderRole: 'Client', message: 'The hero section looks amazing! Minor tweaks needed in the footer.', time: '2026-06-24 15:30', isOwn: true },
  { id: 5, conversationId: 1, sender: 'Michael Roberts', senderRole: 'Project Manager', message: 'Noted. I will ask Lisa to work on the footer changes.', time: '2026-06-24 15:35', isOwn: false }
];

export const supportTickets = [
  { id: 1, ticketId: '#452', subject: 'Login Issue on Website', projectName: 'Website Redesign', category: 'Technical', priority: 'High', status: 'Open', lastUpdate: '2026-06-22 14:00', assignedTo: 'Support Team', message: 'Users unable to login using Google SSO.' },
  { id: 2, ticketId: '#453', subject: 'File Upload Error', projectName: 'Healthcare Portal', category: 'Bug', priority: 'Medium', status: 'Resolved', lastUpdate: '2026-06-20 10:00', assignedTo: 'Support Team', message: 'File upload failing for files larger than 5MB.' },
  { id: 3, ticketId: '#454', subject: 'Invoice Query', projectName: 'ERP System', category: 'Billing', priority: 'High', status: 'Waiting for Client', lastUpdate: '2026-06-19 16:00', assignedTo: 'Accountant Smith', message: 'Clarification needed on invoice line items.' },
  { id: 4, ticketId: '#455', subject: 'Access Request', projectName: 'CRM Development', category: 'Access', priority: 'Medium', status: 'In Progress', lastUpdate: '2026-06-18 11:00', assignedTo: 'Admin User', message: 'Request for additional user access to CRM module.' },
  { id: 5, ticketId: '#456', subject: 'Report Generation Issue', projectName: 'Website Redesign', category: 'Bug', priority: 'Low', status: 'Open', lastUpdate: '2026-06-23 09:00', assignedTo: 'Support Team', message: 'Monthly report generation is not including all data.' },
  { id: 6, ticketId: '#457', subject: 'Password Reset', projectName: 'General', category: 'Account', priority: 'High', status: 'Resolved', lastUpdate: '2026-06-17 14:00', assignedTo: 'Support Team', message: 'Request for password reset.' }
];

export const attachments = [
  { id: 1, fileName: 'Homepage_Mockup_v2.png', fileType: 'PNG', fileSize: '5.2 MB', uploadedBy: 'Michael Roberts', uploadDate: '2026-06-24' },
  { id: 2, fileName: 'Invoice_003.pdf', fileType: 'PDF', fileSize: '890 KB', uploadedBy: 'Accountant Smith', uploadDate: '2026-06-21' },
  { id: 3, fileName: 'Security_Report.pdf', fileType: 'PDF', fileSize: '3.2 MB', uploadedBy: 'Security Expert', uploadDate: '2026-06-19' }
];