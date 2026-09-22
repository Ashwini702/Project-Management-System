// src/data/teamProjectsData.js
export const projectStatsData = [
  { id: 1, title: 'Assigned Projects', value: 7, icon: 'FiFolder', desc: 'All assigned projects', color: 'primary' },
  { id: 2, title: 'Active Projects', value: 4, icon: 'FiTrendingUp', desc: 'In progress', color: 'info' },
  { id: 3, title: 'Completed Projects', value: 2, icon: 'FiCheckCircle', desc: 'Delivered', color: 'success' },
  { id: 4, title: 'Delayed Projects', value: 1, icon: 'FiAlertTriangle', desc: 'Behind schedule', color: 'danger' },
  { id: 5, title: 'My Project Tasks', value: 28, icon: 'FiCheckSquare', desc: 'Assigned tasks', color: 'warning' },
  { id: 6, title: 'Upcoming Deadlines', value: 5, icon: 'FiClock', desc: 'Next 7 days', color: 'purple' }
];

export const categories = ['Web Development', 'Mobile App', 'CRM', 'ERP', 'UI/UX Design', 'Cyber Security', 'Digital Marketing'];
export const managers = ['Michael Roberts', 'Emily Davidson', 'Patricia Garcia', 'Priya Sharma'];

export const teamProjects = [
  { id: 1, projectName: 'Website Redesign', description: 'Complete redesign of corporate website with modern UI/UX and responsive design.', clientName: 'TechCorp India', category: 'Web Development', managerName: 'Priya Sharma', managerEmail: 'priya@pms.com', startDate: '2026-01-15', endDate: '2026-07-30', deadline: '2026-07-30', priority: 'High', status: 'In Progress', overallProgress: 68, myProgress: 65, currentPhase: 'Development Phase', myAssignedTasks: 8, completedTasks: 5, pendingTasks: 3, teamSize: 6, recentUpdate: 'Homepage UI development 65% complete. Cross-browser testing pending.', lastUpdated: '2026-06-24' },
  { id: 2, projectName: 'Mobile App UI', description: 'Mobile banking app UI design with gesture controls and smooth transitions.', clientName: 'FinanceHub', category: 'Mobile App', managerName: 'Emily Davidson', managerEmail: 'emily@pms.com', startDate: '2026-02-01', endDate: '2026-08-15', deadline: '2026-08-15', priority: 'High', status: 'In Progress', overallProgress: 45, myProgress: 75, currentPhase: 'Development Phase', myAssignedTasks: 5, completedTasks: 2, pendingTasks: 3, teamSize: 4, recentUpdate: 'Navigation redesign 75% complete. Testing next week.', lastUpdated: '2026-06-23' },
  { id: 3, projectName: 'CRM Development', description: 'Custom CRM system for managing customer relationships and sales pipeline.', clientName: 'SalesPro Ltd', category: 'CRM', managerName: 'Patricia Garcia', managerEmail: 'patricia@pms.com', startDate: '2026-01-10', endDate: '2026-05-20', deadline: '2026-05-20', priority: 'Medium', status: 'Completed', overallProgress: 100, myProgress: 100, currentPhase: 'Completed', myAssignedTasks: 3, completedTasks: 3, pendingTasks: 0, teamSize: 3, recentUpdate: 'Project completed and deployed successfully.', lastUpdated: '2026-05-20' },
  { id: 4, projectName: 'ERP System', description: 'Upgrade existing ERP system with new inventory, HR, and financial modules.', clientName: 'Manufacturing Corp', category: 'ERP', managerName: 'Priya Sharma', managerEmail: 'priya@pms.com', startDate: '2026-04-01', endDate: '2026-11-15', deadline: '2026-11-15', priority: 'Medium', status: 'In Progress', overallProgress: 35, myProgress: 35, currentPhase: 'Development Phase', myAssignedTasks: 4, completedTasks: 1, pendingTasks: 3, teamSize: 3, recentUpdate: 'Inventory API 35% complete. Data migration script in progress.', lastUpdated: '2026-06-22' },
  { id: 5, projectName: 'Cyber Security Audit', description: 'Comprehensive security assessment with penetration testing and vulnerability scanning.', clientName: 'TechCorp India', category: 'Cyber Security', managerName: 'Emily Davidson', managerEmail: 'emily@pms.com', startDate: '2026-02-20', endDate: '2026-04-30', deadline: '2026-04-30', priority: 'Urgent', status: 'On Hold', overallProgress: 40, myProgress: 80, currentPhase: 'Testing Phase', myAssignedTasks: 2, completedTasks: 1, pendingTasks: 1, teamSize: 2, recentUpdate: 'On hold due to scope changes. Security patch overdue.', lastUpdated: '2026-06-18' },
  { id: 6, projectName: 'E-commerce Platform', description: 'Complete redesign of the e-commerce platform with payment gateway integration.', clientName: 'RetailMax', category: 'Web Development', managerName: 'Michael Roberts', managerEmail: 'michael@pms.com', startDate: '2026-03-01', endDate: '2026-09-30', deadline: '2026-09-30', priority: 'High', status: 'In Progress', overallProgress: 55, myProgress: 40, currentPhase: 'Development Phase', myAssignedTasks: 4, completedTasks: 1, pendingTasks: 3, teamSize: 5, recentUpdate: 'Payment gateway integration in progress. UI components completed.', lastUpdated: '2026-06-21' },
  { id: 7, projectName: 'Healthcare Portal', description: 'Develop comprehensive healthcare portal with patient management and telemedicine.', clientName: 'MediCare Group', category: 'Web Development', managerName: 'Michael Roberts', managerEmail: 'michael@pms.com', startDate: '2026-03-15', endDate: '2026-12-31', deadline: '2026-12-31', priority: 'High', status: 'In Progress', overallProgress: 25, myProgress: 25, currentPhase: 'Development Phase', myAssignedTasks: 2, completedTasks: 0, pendingTasks: 2, teamSize: 4, recentUpdate: 'Database optimization blocked. Waiting for access.', lastUpdated: '2026-06-20' },
  { id: 8, projectName: 'UI/UX Redesign', description: 'Complete UI/UX overhaul of client portal with modern design principles.', clientName: 'InsurancePro', category: 'UI/UX Design', managerName: 'Emily Davidson', managerEmail: 'emily@pms.com', startDate: '2026-03-15', endDate: '2026-06-30', deadline: '2026-06-30', priority: 'High', status: 'Under Review', overallProgress: 90, myProgress: 0, currentPhase: 'Review Phase', myAssignedTasks: 0, completedTasks: 0, pendingTasks: 0, teamSize: 3, recentUpdate: 'Project under review. No tasks assigned to you.', lastUpdated: '2026-06-23' },
  { id: 9, projectName: 'Digital Marketing Campaign', description: 'Create and execute comprehensive digital marketing campaign.', clientName: 'EduTech Solutions', category: 'Digital Marketing', managerName: 'Michael Roberts', managerEmail: 'michael@pms.com', startDate: '2026-05-01', endDate: '2026-08-31', deadline: '2026-08-31', priority: 'Low', status: 'Not Started', overallProgress: 0, myProgress: 0, currentPhase: 'Planning Phase', myAssignedTasks: 1, completedTasks: 0, pendingTasks: 1, teamSize: 3, recentUpdate: 'Content calendar setup assigned. Campaign starts next month.', lastUpdated: '2026-06-20' },
  { id: 10, projectName: 'Learning Management System', description: 'Build custom LMS with course management and certification.', clientName: 'EduTech Solutions', category: 'Web Development', managerName: 'Patricia Garcia', managerEmail: 'patricia@pms.com', startDate: '2026-01-20', endDate: '2026-05-15', deadline: '2026-05-15', priority: 'Medium', status: 'Delayed', overallProgress: 55, myProgress: 0, currentPhase: 'Development Phase', myAssignedTasks: 0, completedTasks: 0, pendingTasks: 0, teamSize: 3, recentUpdate: 'Delayed due to resource constraints.', lastUpdated: '2026-06-15' }
];

export const projectTasks = [
  { id: 1, projectId: 1, taskTitle: 'Homepage UI Development', assignedBy: 'Priya Sharma', status: 'In Progress', priority: 'High', progress: 65, startDate: '2026-06-16', deadline: '2026-06-25', estimatedHours: 25, timeSpent: 16 },
  { id: 2, projectId: 1, taskTitle: 'Cross-Browser Testing', assignedBy: 'Priya Sharma', status: 'Pending', priority: 'High', progress: 0, startDate: '2026-06-19', deadline: '2026-06-26', estimatedHours: 15, timeSpent: 0 },
  { id: 3, projectId: 1, taskTitle: 'Email Template Design', assignedBy: 'Priya Sharma', status: 'In Progress', priority: 'Low', progress: 50, startDate: '2026-06-17', deadline: '2026-06-24', estimatedHours: 12, timeSpent: 6 },
  { id: 4, projectId: 2, taskTitle: 'Mobile Navigation Redesign', assignedBy: 'Emily Davidson', status: 'In Progress', priority: 'Medium', progress: 75, startDate: '2026-06-11', deadline: '2026-06-22', estimatedHours: 20, timeSpent: 15 },
  { id: 5, projectId: 6, taskTitle: 'API Payment Integration', assignedBy: 'Michael Roberts', status: 'In Progress', priority: 'Urgent', progress: 40, startDate: '2026-06-12', deadline: '2026-06-28', estimatedHours: 30, timeSpent: 12 }
];

export const teamMembers = [
  { id: 1, projectId: 1, memberName: 'Saurabh Nalode', role: 'Frontend Developer', department: 'Development', assignedTasks: 8, completedTasks: 5, availabilityStatus: 'Active' },
  { id: 2, projectId: 1, memberName: 'Lisa Martinez', role: 'UI/UX Designer', department: 'Design', assignedTasks: 6, completedTasks: 4, availabilityStatus: 'Busy' },
  { id: 3, projectId: 1, memberName: 'David Thompson', role: 'Full Stack Developer', department: 'Development', assignedTasks: 8, completedTasks: 5, availabilityStatus: 'Available' },
  { id: 4, projectId: 1, memberName: 'Amanda Taylor', role: 'Frontend Developer', department: 'Development', assignedTasks: 6, completedTasks: 3, availabilityStatus: 'Active' },
  { id: 5, projectId: 1, memberName: 'Robert Wilson', role: 'Digital Marketer', department: 'Marketing', assignedTasks: 3, completedTasks: 2, availabilityStatus: 'On Leave' },
  { id: 6, projectId: 1, memberName: 'Thomas Wright', role: 'Backend Developer', department: 'Development', assignedTasks: 5, completedTasks: 3, availabilityStatus: 'Active' }
];

export const projectTimeline = [
  { id: 1, projectId: 1, title: 'Project Started', date: '2026-01-15', status: 'Completed', description: 'Kickoff meeting held.', responsiblePerson: 'Priya Sharma' },
  { id: 2, projectId: 1, title: 'Requirement Analysis', date: '2026-02-01', status: 'Completed', description: 'All requirements documented.', responsiblePerson: 'Priya Sharma' },
  { id: 3, projectId: 1, title: 'Design Phase', date: '2026-02-15', status: 'Completed', description: 'UI/UX designs approved.', responsiblePerson: 'Lisa Martinez' },
  { id: 4, projectId: 1, title: 'Development Phase', date: '2026-03-15', status: 'Active', description: 'Core development in progress.', responsiblePerson: 'Saurabh Nalode' },
  { id: 5, projectId: 1, title: 'Testing Phase', date: '2026-06-15', status: 'Pending', description: 'QA testing scheduled.', responsiblePerson: 'Amanda Taylor' },
  { id: 6, projectId: 1, title: 'Client Review', date: '2026-07-15', status: 'Pending', description: 'Client review and feedback.', responsiblePerson: 'Priya Sharma' },
  { id: 7, projectId: 1, title: 'Final Delivery', date: '2026-07-30', status: 'Pending', description: 'Project completion.', responsiblePerson: 'Priya Sharma' }
];

export const projectFiles = [
  { id: 1, projectId: 1, fileName: 'Project Proposal.pdf', projectName: 'Website Redesign', category: 'Project Document', fileType: 'PDF', fileSize: '2.4 MB', uploadedBy: 'Priya Sharma', uploadDate: '2026-01-15', status: 'Active' },
  { id: 2, projectId: 1, fileName: 'Requirement Document.docx', projectName: 'Website Redesign', category: 'Requirement Document', fileType: 'DOCX', fileSize: '1.8 MB', uploadedBy: 'Priya Sharma', uploadDate: '2026-02-01', status: 'Active' },
  { id: 3, projectId: 1, fileName: 'Wireframes.fig', projectName: 'Website Redesign', category: 'Design File', fileType: 'FIG', fileSize: '5.2 MB', uploadedBy: 'Lisa Martinez', uploadDate: '2026-02-10', status: 'Active' },
  { id: 4, projectId: 1, fileName: 'UI Mockups.png', projectName: 'Website Redesign', category: 'Design File', fileType: 'PNG', fileSize: '8.1 MB', uploadedBy: 'Lisa Martinez', uploadDate: '2026-02-25', status: 'Active' },
  { id: 5, projectId: 1, fileName: 'Test Plan.xlsx', projectName: 'Website Redesign', category: 'Testing Document', fileType: 'XLSX', fileSize: '892 KB', uploadedBy: 'Amanda Taylor', uploadDate: '2026-04-15', status: 'Active' }
];