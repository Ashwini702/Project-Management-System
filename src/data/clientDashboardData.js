// src/data/clientDashboardData.js
export const clientStatsData = [
  { id: 1, title: 'Active Projects', value: 4, icon: 'FiFolder', desc: 'Currently in progress', color: 'primary' },
  { id: 2, title: 'Completed Projects', value: 8, icon: 'FiCheckCircle', desc: 'Successfully delivered', color: 'success' },
  { id: 3, title: 'Pending Feedback', value: 3, icon: 'FiMessageSquare', desc: 'Awaiting your response', color: 'warning' },
  { id: 4, title: 'Upcoming Deadlines', value: 5, icon: 'FiClock', desc: 'Next 7 days', color: 'danger' },
  { id: 5, title: 'Shared Files', value: 18, icon: 'FiFileText', desc: 'Documents & designs', color: 'info' },
  { id: 6, title: 'Pending Invoices', value: 2, icon: 'FiDollarSign', desc: 'Awaiting payment', color: 'purple' }
];

export const clientProjects = [
  { id: 1, projectName: 'E-commerce Platform', description: 'Complete redesign of the e-commerce platform with modern UI/UX and payment gateway integration.', manager: 'Michael Roberts', category: 'Web Development', startDate: '2026-01-15', endDate: '2026-07-30', status: 'In Progress', priority: 'High', progress: 68, completedTasks: 28, totalTasks: 42, deadline: '2026-07-30', recentUpdate: 'Homepage design completed. Payment gateway in progress.' },
  { id: 2, projectName: 'Mobile App UI Design', description: 'Mobile banking app UI design with gesture controls and smooth transitions.', manager: 'Emily Davidson', category: 'Mobile App', startDate: '2026-02-01', endDate: '2026-08-15', status: 'In Progress', priority: 'High', progress: 45, completedTasks: 29, totalTasks: 65, deadline: '2026-08-15', recentUpdate: 'Navigation design completed. Authentication module in development.' },
  { id: 3, projectName: 'CRM System Development', description: 'Custom CRM system for managing customer relationships and sales pipeline.', manager: 'Patricia Garcia', category: 'CRM', startDate: '2026-01-10', endDate: '2026-05-20', status: 'Completed', priority: 'Medium', progress: 100, completedTasks: 30, totalTasks: 30, deadline: '2026-05-20', recentUpdate: 'Project completed and deployed successfully.' },
  { id: 4, projectName: 'Cybersecurity Assessment', description: 'Comprehensive security assessment with penetration testing and vulnerability scanning.', manager: 'Patricia Garcia', category: 'Cyber Security', startDate: '2026-02-20', endDate: '2026-04-30', status: 'On Hold', priority: 'Urgent', progress: 40, completedTasks: 8, totalTasks: 20, deadline: '2026-04-30', recentUpdate: 'On hold due to scope changes. Resuming next week.' }
];

export const projectProgressData = [
  { projectName: 'E-commerce Platform', overall: 68, design: 100, development: 60, testing: 30, deployment: 0, status: 'In Progress' },
  { projectName: 'Mobile App UI', overall: 45, design: 85, development: 40, testing: 10, deployment: 0, status: 'In Progress' },
  { projectName: 'CRM System', overall: 100, design: 100, development: 100, testing: 100, deployment: 100, status: 'Completed' },
  { projectName: 'Cybersecurity Audit', overall: 40, design: 60, development: 30, testing: 20, deployment: 0, status: 'On Hold' }
];

export const deadlinesData = [
  { id: 1, title: 'E-commerce Final Review', project: 'E-commerce Platform', dueDate: '2026-07-30', daysLeft: 38, priority: 'High', status: 'Upcoming' },
  { id: 2, title: 'Mobile App UI Testing', project: 'Mobile App UI', dueDate: '2026-06-25', daysLeft: 3, priority: 'Urgent', status: 'Upcoming' },
  { id: 3, title: 'Security Report Submission', project: 'Cybersecurity Audit', dueDate: '2026-04-30', daysLeft: -53, priority: 'Urgent', status: 'Overdue' },
  { id: 4, title: 'CRM Training Session', project: 'CRM System', dueDate: '2026-05-25', daysLeft: -28, priority: 'Medium', status: 'Completed' },
  { id: 5, title: 'Payment Gateway Integration', project: 'E-commerce Platform', dueDate: '2026-07-15', daysLeft: 23, priority: 'High', status: 'Upcoming' }
];

export const feedbackList = [
  { id: 1, title: 'Homepage Design Review', message: 'The new homepage design looks great! Minor tweak needed in the footer section.', project: 'E-commerce Platform', date: '2026-06-15', status: 'Approved' },
  { id: 2, title: 'Mobile Navigation Feedback', message: 'Mobile navigation needs to be more intuitive. Please add bottom tabs.', project: 'Mobile App UI', date: '2026-06-12', status: 'Pending' },
  { id: 3, title: 'CRM Dashboard Layout', message: 'CRM dashboard should show sales pipeline prominently on the main screen.', project: 'CRM System', date: '2026-06-10', status: 'Resolved' },
  { id: 4, title: 'Security Report Approval', message: 'The security assessment report is comprehensive. Minor formatting changes needed.', project: 'Cybersecurity Audit', date: '2026-06-08', status: 'Approved' }
];

export const sharedFiles = [
  { id: 1, name: 'Project Proposal.pdf', project: 'E-commerce Platform', type: 'PDF', uploadedBy: 'Michael Roberts', uploadDate: '2026-01-15', size: '2.4 MB' },
  { id: 2, name: 'UI Design Mockups.png', project: 'Mobile App UI', type: 'PNG', uploadedBy: 'Lisa Martinez', uploadDate: '2026-02-20', size: '8.1 MB' },
  { id: 3, name: 'CRM User Manual.docx', project: 'CRM System', type: 'DOCX', uploadedBy: 'Thomas Wright', uploadDate: '2026-05-10', size: '1.8 MB' },
  { id: 4, name: 'Security Report.pdf', project: 'Cybersecurity Audit', type: 'PDF', uploadedBy: 'Security Expert', uploadDate: '2026-04-15', size: '3.2 MB' },
  { id: 5, name: 'Wireframes.fig', project: 'E-commerce Platform', type: 'FIG', uploadedBy: 'Lisa Martinez', uploadDate: '2026-02-10', size: '5.2 MB' },
  { id: 6, name: 'Testing Report.xlsx', project: 'Mobile App UI', type: 'XLSX', uploadedBy: 'Amanda Taylor', uploadDate: '2026-06-01', size: '892 KB' }
];

export const messages = [
  { id: 1, sender: 'Michael Roberts', role: 'Project Manager', avatar: 'MR', message: 'The homepage design is ready for your review. Please check and provide feedback.', time: '2026-06-19 10:00' },
  { id: 2, sender: 'Rahul Sharma', role: 'Client', avatar: 'RS', message: 'Thanks Michael. I\'ll review it by EOD and share my feedback.', time: '2026-06-19 11:30' },
  { id: 3, sender: 'Emily Davidson', role: 'Project Manager', avatar: 'ED', message: 'Mobile app testing phase starts next week. We need your availability for UAT.', time: '2026-06-18 14:00' },
  { id: 4, sender: 'Rahul Sharma', role: 'Client', avatar: 'RS', message: 'Sure, I\'m available on June 25-26. Let\'s schedule the UAT session.', time: '2026-06-18 15:00' },
  { id: 5, sender: 'Lisa Martinez', role: 'UI/UX Designer', avatar: 'LM', message: 'I\'ve uploaded the updated wireframes. Please check the navigation flow.', time: '2026-06-17 09:00' }
];

export const invoices = [
  { id: 1, invoiceNumber: 'INV-2026-001', projectName: 'E-commerce Platform', invoiceDate: '2026-02-15', dueDate: '2026-03-15', totalAmount: 120000, paidAmount: 120000, pendingAmount: 0, paymentStatus: 'Paid' },
  { id: 2, invoiceNumber: 'INV-2026-002', projectName: 'E-commerce Platform', invoiceDate: '2026-04-01', dueDate: '2026-05-01', totalAmount: 80000, paidAmount: 80000, pendingAmount: 0, paymentStatus: 'Paid' },
  { id: 3, invoiceNumber: 'INV-2026-003', projectName: 'E-commerce Platform', invoiceDate: '2026-05-15', dueDate: '2026-06-15', totalAmount: 150000, paidAmount: 0, pendingAmount: 150000, paymentStatus: 'Pending' },
  { id: 4, invoiceNumber: 'INV-2026-004', projectName: 'Mobile App UI', invoiceDate: '2026-03-15', dueDate: '2026-04-15', totalAmount: 95000, paidAmount: 95000, pendingAmount: 0, paymentStatus: 'Paid' },
  { id: 5, invoiceNumber: 'INV-2026-005', projectName: 'CRM System', invoiceDate: '2026-02-10', dueDate: '2026-03-10', totalAmount: 50000, paidAmount: 50000, pendingAmount: 0, paymentStatus: 'Paid' },
  { id: 6, invoiceNumber: 'INV-2026-006', projectName: 'Mobile App UI', invoiceDate: '2026-05-01', dueDate: '2026-06-01', totalAmount: 65000, paidAmount: 0, pendingAmount: 65000, paymentStatus: 'Overdue' }
];