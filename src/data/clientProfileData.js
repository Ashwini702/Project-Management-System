// src/data/clientProfileData.js
export const clientProfile = {
  id: 1,
  name: 'Rahul Mehta',
  email: 'rahul.mehta@mehtadigital.com',
  phone: '+91 98765 43210',
  alternatePhone: '+91 98765 12345',
  designation: 'Business Owner',
  clientId: 'CL-001',
  accountCreatedDate: '2025-08-15',
  city: 'Mumbai',
  state: 'Maharashtra',
  country: 'India',
  address: '456, Business Park, Bandra West, Mumbai - 400050',
  bio: 'Founder and CEO of Mehta Digital Solutions, specializing in e-commerce, digital transformation, and enterprise software. Working with PMS for over 2 years on multiple successful projects.',
  status: 'Active',
  avatar: 'RM',
  preferredContactMethod: 'Email',
  emergencyContact: '+91 98765 00000'
};

export const companyInfo = {
  companyName: 'Mehta Digital Solutions',
  businessType: 'Private Limited',
  industry: 'Information Technology',
  gstNumber: '27AABCM1234D1Z5',
  companyEmail: 'contact@mehtadigital.com',
  companyPhone: '+91 22 1234 5678',
  website: 'www.mehtadigital.com',
  companyAddress: '456, Business Park, Bandra West, Mumbai - 400050',
  city: 'Mumbai',
  state: 'Maharashtra',
  country: 'India',
  companySize: '50-200 Employees',
  description: 'Mehta Digital Solutions is a leading IT services company providing web development, mobile app development, and enterprise software solutions to clients across India.'
};

export const profileStatsData = [
  { id: 1, title: 'Total Projects', value: 12, icon: 'FiFolder', desc: 'All time projects', color: 'primary' },
  { id: 2, title: 'Active Projects', value: 4, icon: 'FiTrendingUp', desc: 'In progress', color: 'info' },
  { id: 3, title: 'Completed Projects', value: 8, icon: 'FiCheckCircle', desc: 'Delivered', color: 'success' },
  { id: 4, title: 'Shared Files', value: 48, icon: 'FiFileText', desc: 'Documents & designs', color: 'warning' },
  { id: 5, title: 'Pending Invoices', value: 5, icon: 'FiClock', desc: 'Awaiting payment', color: 'danger' },
  { id: 6, title: 'Total Paid', value: '₹6,35,000', icon: 'FiDollarSign', desc: 'Lifetime payments', color: 'purple' }
];

export const clientProjects = [
  { id: 1, projectName: 'Website Redesign', category: 'Web Development', status: 'In Progress', priority: 'High', progress: 68, startDate: '2026-01-15', deadline: '2026-07-30', projectManager: 'Michael Roberts' },
  { id: 2, projectName: 'Mobile App UI', category: 'Mobile App', status: 'In Progress', priority: 'High', progress: 45, startDate: '2026-02-01', deadline: '2026-08-15', projectManager: 'Emily Davidson' },
  { id: 3, projectName: 'CRM Development', category: 'CRM', status: 'Completed', priority: 'Medium', progress: 100, startDate: '2026-01-10', deadline: '2026-05-20', projectManager: 'Patricia Garcia' },
  { id: 4, projectName: 'ERP System', category: 'ERP', status: 'In Progress', priority: 'Medium', progress: 35, startDate: '2026-04-01', deadline: '2026-11-15', projectManager: 'Michael Roberts' },
  { id: 5, projectName: 'Cyber Security Audit', category: 'Cyber Security', status: 'On Hold', priority: 'Urgent', progress: 40, startDate: '2026-02-20', deadline: '2026-04-30', projectManager: 'Emily Davidson' }
];

export const billingInfo = {
  billingName: 'Rahul Mehta',
  billingEmail: 'billing@mehtadigital.com',
  billingPhone: '+91 98765 43210',
  billingAddress: '456, Business Park, Bandra West, Mumbai - 400050',
  gstNumber: '27AABCM1234D1Z5',
  panNumber: 'ABCDE1234F',
  totalInvoiceAmount: 875000,
  totalPaidAmount: 635000,
  totalPendingAmount: 240000,
  overdueAmount: 185000,
  preferredPaymentMethod: 'Bank Transfer'
};

export const recentInvoices = [
  { id: 1, invoiceNumber: 'INV-2026-003', projectName: 'Website Redesign', amount: 150000, paymentStatus: 'Pending', dueDate: '2026-06-15' },
  { id: 2, invoiceNumber: 'INV-2026-006', projectName: 'Mobile App UI', amount: 65000, paymentStatus: 'Overdue', dueDate: '2026-06-01' },
  { id: 3, invoiceNumber: 'INV-2026-009', projectName: 'ERP System', amount: 60000, paymentStatus: 'Partial', dueDate: '2026-06-15' },
  { id: 4, invoiceNumber: 'INV-2026-011', projectName: 'Website Redesign', amount: 100000, paymentStatus: 'Pending', dueDate: '2026-07-15' }
];

export const recentActivities = [
  { id: 1, title: 'Feedback Submitted', description: 'Submitted feedback on homepage design for Website Redesign.', relatedTo: 'Website Redesign', dateTime: '2026-06-24 15:00', type: 'feedback' },
  { id: 2, title: 'File Approved', description: 'Approved UI design mockups shared by Lisa Martinez.', relatedTo: 'Website Redesign', dateTime: '2026-06-23 16:30', type: 'file' },
  { id: 3, title: 'Invoice Viewed', description: 'Viewed invoice INV-2026-003 for Website Redesign.', relatedTo: 'INV-2026-003', dateTime: '2026-06-23 14:00', type: 'invoice' },
  { id: 4, title: 'Payment Submitted', description: 'Payment of ₹80,000 submitted for INV-2026-002.', relatedTo: 'INV-2026-002', dateTime: '2026-06-20 10:00', type: 'payment' },
  { id: 5, title: 'Message Sent', description: 'Sent message to Michael Roberts regarding project timeline.', relatedTo: 'Website Redesign', dateTime: '2026-06-19 11:00', type: 'message' },
  { id: 6, title: 'Project Update Viewed', description: 'Viewed latest project update for Mobile App UI.', relatedTo: 'Mobile App UI', dateTime: '2026-06-18 09:00', type: 'project' },
  { id: 7, title: 'Document Downloaded', description: 'Downloaded security assessment report.', relatedTo: 'Cyber Security Audit', dateTime: '2026-06-16 14:00', type: 'download' },
  { id: 8, title: 'Profile Updated', description: 'Updated company information and contact details.', relatedTo: 'Profile', dateTime: '2026-06-15 12:00', type: 'profile' }
];

export const securitySettingsData = {
  twoFactorEnabled: false,
  loginNotification: true,
  sessionTimeout: '1 Hour'
};

export const loginHistory = [
  { id: 1, dateTime: '2026-06-24 09:00', ipAddress: '192.168.1.200', device: 'MacBook Pro', browser: 'Chrome 124', location: 'Mumbai, India', status: 'Success' },
  { id: 2, dateTime: '2026-06-23 10:00', ipAddress: '192.168.1.200', device: 'MacBook Pro', browser: 'Chrome 124', location: 'Mumbai, India', status: 'Success' },
  { id: 3, dateTime: '2026-06-22 08:30', ipAddress: '192.168.1.201', device: 'iPhone 15', browser: 'Safari Mobile', location: 'Mumbai, India', status: 'Success' }
];

export const activeSessions = [
  { id: 1, device: 'MacBook Pro', browser: 'Chrome 124', location: 'Mumbai, India', lastActive: 'Current Session', current: true },
  { id: 2, device: 'iPhone 15', browser: 'Safari Mobile', location: 'Mumbai, India', lastActive: '2026-06-24 08:00', current: false }
];

export const notificationPreferences = {
  projects: { projectStatus: true, deadlineReminder: true, fileUpload: false, milestoneUpdate: true },
  feedback: { feedbackResponse: true, approvalStatus: true, changeRequest: false },
  invoices: { invoiceGenerated: true, paymentReminder: true, paymentConfirmation: true },
  messages: { newMessage: true, supportReply: true, managerReply: true },
  channels: { system: true, email: true, whatsapp: false }
};