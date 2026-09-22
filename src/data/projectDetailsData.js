// src/data/projectDetailsData.js
export const projectData = {
  id: 1,
  name: 'Website Redesign Project',
  client: 'TechCorp India Pvt Ltd',
  category: 'Web Development',
  manager: 'Michael Roberts',
  startDate: '2026-01-15',
  endDate: '2026-07-30',
  priority: 'High',
  status: 'In Progress',
  progress: 68,
  description: 'Complete redesign of the corporate website with modern UI/UX, improved performance, mobile responsiveness, and new CMS integration. The project includes homepage redesign, product pages, blog section, and contact forms.',
  budget: 350000,
  teamCount: 6,
  totalTasks: 36,
  completedTasks: 22,
  pendingTasks: 8,
  inReviewTasks: 4,
  documentsCount: 12,
  createdDate: '2026-01-10',
  lastUpdated: '2026-06-19 14:30'
};

export const projectStatsData = [
  { id: 1, title: 'Total Tasks', value: 36, icon: 'FiCheckSquare', desc: 'All project tasks', color: 'primary' },
  { id: 2, title: 'Completed Tasks', value: 22, icon: 'FiCheckCircle', desc: 'Successfully done', color: 'success' },
  { id: 3, title: 'Pending Tasks', value: 8, icon: 'FiClock', desc: 'Awaiting action', color: 'warning' },
  { id: 4, title: 'In Review', value: 4, icon: 'FiEye', desc: 'Under review', color: 'purple' },
  { id: 5, title: 'Team Members', value: 6, icon: 'FiUsers', desc: 'Assigned team', color: 'info' },
  { id: 6, title: 'Documents', value: 12, icon: 'FiFileText', desc: 'Project files', color: 'danger' }
];

export const projectTasks = [
  { id: 1, name: 'Homepage Wireframe Design', assignedTo: 'Lisa Martinez', deadline: '2026-02-15', priority: 'High', status: 'Completed', progress: 100 },
  { id: 2, name: 'UI Component Library Setup', assignedTo: 'David Thompson', deadline: '2026-03-01', priority: 'High', status: 'Completed', progress: 100 },
  { id: 3, name: 'Responsive Layout Development', assignedTo: 'David Thompson', deadline: '2026-03-20', priority: 'High', status: 'Completed', progress: 100 },
  { id: 4, name: 'CMS Integration', assignedTo: 'Thomas Wright', deadline: '2026-04-15', priority: 'Medium', status: 'Completed', progress: 100 },
  { id: 5, name: 'Product Page Redesign', assignedTo: 'Lisa Martinez', deadline: '2026-05-01', priority: 'Medium', status: 'In Progress', progress: 75 },
  { id: 6, name: 'Blog Section Development', assignedTo: 'David Thompson', deadline: '2026-05-20', priority: 'Medium', status: 'In Progress', progress: 60 },
  { id: 7, name: 'Contact Form with Validation', assignedTo: 'Amanda Taylor', deadline: '2026-06-01', priority: 'Low', status: 'In Progress', progress: 50 },
  { id: 8, name: 'SEO Optimization', assignedTo: 'Robert Wilson', deadline: '2026-06-15', priority: 'Medium', status: 'Under Review', progress: 90 },
  { id: 9, name: 'Performance Testing', assignedTo: 'Thomas Wright', deadline: '2026-06-20', priority: 'High', status: 'Under Review', progress: 85 },
  { id: 10, name: 'Cross-Browser Testing', assignedTo: 'Amanda Taylor', deadline: '2026-06-25', priority: 'High', status: 'Pending', progress: 30 },
  { id: 11, name: 'Client Feedback Integration', assignedTo: 'Lisa Martinez', deadline: '2026-07-01', priority: 'High', status: 'Pending', progress: 20 },
  { id: 12, name: 'Final Deployment', assignedTo: 'David Thompson', deadline: '2026-07-30', priority: 'Urgent', status: 'Pending', progress: 0 }
];

export const projectTeam = [
  { id: 1, name: 'Michael Roberts', role: 'Project Manager', department: 'Management', email: 'michael@example.com', phone: '+91 98765 11111', assignedTasks: 5, completedTasks: 4, workload: 70, status: 'Active', avatar: 'MR' },
  { id: 2, name: 'David Thompson', role: 'Full Stack Developer', department: 'Development', email: 'david@example.com', phone: '+91 98765 22222', assignedTasks: 8, completedTasks: 5, workload: 80, status: 'Active', avatar: 'DT' },
  { id: 3, name: 'Lisa Martinez', role: 'UI/UX Designer', department: 'Design', email: 'lisa@example.com', phone: '+91 98765 33333', assignedTasks: 6, completedTasks: 4, workload: 65, status: 'Active', avatar: 'LM' },
  { id: 4, name: 'Thomas Wright', role: 'Backend Developer', department: 'Development', email: 'thomas@example.com', phone: '+91 98765 44444', assignedTasks: 5, completedTasks: 3, workload: 60, status: 'Active', avatar: 'TW' },
  { id: 5, name: 'Amanda Taylor', role: 'Frontend Developer', department: 'Development', email: 'amanda@example.com', phone: '+91 98765 55555', assignedTasks: 6, completedTasks: 3, workload: 75, status: 'Active', avatar: 'AT' },
  { id: 6, name: 'Robert Wilson', role: 'SEO Specialist', department: 'Marketing', email: 'robert@example.com', phone: '+91 98765 66666', assignedTasks: 3, completedTasks: 2, workload: 45, status: 'Available', avatar: 'RW' }
];

export const projectMilestones = [
  { id: 1, title: 'Requirements Gathering', description: 'Complete requirements gathering and documentation.', dueDate: '2026-01-31', status: 'Completed', progress: 100, assignedTo: 'Michael Roberts' },
  { id: 2, title: 'Design Phase Completion', description: 'Complete all UI/UX designs and wireframes.', dueDate: '2026-03-15', status: 'Completed', progress: 100, assignedTo: 'Lisa Martinez' },
  { id: 3, title: 'Development Phase 1', description: 'Core pages development - Home, About, Contact.', dueDate: '2026-04-30', status: 'Completed', progress: 100, assignedTo: 'David Thompson' },
  { id: 4, title: 'CMS Integration', description: 'Integrate content management system.', dueDate: '2026-05-31', status: 'Completed', progress: 100, assignedTo: 'Thomas Wright' },
  { id: 5, title: 'Testing Phase', description: 'Complete all testing - unit, integration, UAT.', dueDate: '2026-06-30', status: 'Active', progress: 65, assignedTo: 'Amanda Taylor' },
  { id: 6, title: 'Client Review & Feedback', description: 'Present to client and gather feedback.', dueDate: '2026-07-10', status: 'Pending', progress: 20, assignedTo: 'Michael Roberts' },
  { id: 7, title: 'Final Deployment', description: 'Deploy to production server.', dueDate: '2026-07-30', status: 'Pending', progress: 0, assignedTo: 'David Thompson' }
];

export const projectDocuments = [
  { id: 1, name: 'Project Proposal.pdf', type: 'PDF', uploadedBy: 'Michael Roberts', uploadDate: '2026-01-12', size: '2.4 MB' },
  { id: 2, name: 'Requirements Document.docx', type: 'DOCX', uploadedBy: 'Michael Roberts', uploadDate: '2026-01-20', size: '1.8 MB' },
  { id: 3, name: 'Wireframes.fig', type: 'FIG', uploadedBy: 'Lisa Martinez', uploadDate: '2026-02-10', size: '5.2 MB' },
  { id: 4, name: 'UI Design Mockups.png', type: 'PNG', uploadedBy: 'Lisa Martinez', uploadDate: '2026-02-25', size: '8.1 MB' },
  { id: 5, name: 'Architecture Diagram.png', type: 'PNG', uploadedBy: 'David Thompson', uploadDate: '2026-03-05', size: '3.1 MB' },
  { id: 6, name: 'Test Plan.xlsx', type: 'XLSX', uploadedBy: 'Amanda Taylor', uploadDate: '2026-04-15', size: '892 KB' },
  { id: 7, name: 'Client Feedback.pdf', type: 'PDF', uploadedBy: 'Michael Roberts', uploadDate: '2026-05-20', size: '456 KB' },
  { id: 8, name: 'Deployment Checklist.docx', type: 'DOCX', uploadedBy: 'David Thompson', uploadDate: '2026-06-10', size: '345 KB' }
];

export const projectComments = [
  { id: 1, user: 'Michael Roberts', role: 'Project Manager', avatar: 'MR', message: 'Great progress on the design phase! Let\'s keep the momentum.', dateTime: '2026-02-20 14:30' },
  { id: 2, user: 'Lisa Martinez', role: 'UI/UX Designer', avatar: 'LM', message: 'Wireframes are ready for review. Please check and provide feedback.', dateTime: '2026-02-20 15:00' },
  { id: 3, user: 'David Thompson', role: 'Full Stack Developer', avatar: 'DT', message: 'Development phase 1 started. Homepage layout is complete.', dateTime: '2026-03-10 10:00' },
  { id: 4, user: 'Rajesh Sharma', role: 'Client', avatar: 'RS', message: 'The new design looks great! Minor changes needed in the footer section.', dateTime: '2026-03-15 11:30' },
  { id: 5, user: 'Michael Roberts', role: 'Project Manager', avatar: 'MR', message: 'Team, please prioritize the client feedback items this week.', dateTime: '2026-03-15 12:00' },
  { id: 6, user: 'Amanda Taylor', role: 'Frontend Developer', avatar: 'AT', message: 'Cross-browser testing in progress. Found some issues with Safari.', dateTime: '2026-06-18 09:00' }
];

export const projectActivities = [
  { id: 1, title: 'Project Created', description: 'Website Redesign Project was created.', user: 'Admin User', dateTime: '2026-01-10 09:00', type: 'create' },
  { id: 2, title: 'Team Assigned', description: '6 team members were assigned to the project.', user: 'Michael Roberts', dateTime: '2026-01-12 10:00', type: 'team' },
  { id: 3, title: 'Design Phase Started', description: 'UI/UX design work began.', user: 'Lisa Martinez', dateTime: '2026-02-01 09:00', type: 'update' },
  { id: 4, title: 'Wireframes Completed', description: 'All wireframes approved by client.', user: 'Lisa Martinez', dateTime: '2026-02-28 16:00', type: 'complete' },
  { id: 5, title: 'Development Started', description: 'Frontend and backend development commenced.', user: 'David Thompson', dateTime: '2026-03-10 09:00', type: 'update' },
  { id: 6, title: 'Client Feedback Received', description: 'Rajesh Sharma provided feedback on design.', user: 'Rajesh Sharma', dateTime: '2026-03-15 11:30', type: 'feedback' },
  { id: 7, title: 'CMS Integration Complete', description: 'Content management system successfully integrated.', user: 'Thomas Wright', dateTime: '2026-05-31 17:00', type: 'complete' },
  { id: 8, title: 'Testing Phase Started', description: 'QA and testing phase initiated.', user: 'Amanda Taylor', dateTime: '2026-06-01 09:00', type: 'update' },
  { id: 9, title: 'Performance Test Report', description: 'Performance testing completed with positive results.', user: 'Thomas Wright', dateTime: '2026-06-15 14:00', type: 'complete' }
];

export const projectBudgetData = {
  totalBudget: 350000,
  usedBudget: 238000,
  remainingBudget: 112000,
  paidAmount: 200000,
  pendingAmount: 150000,
  profitLoss: 62000,
  expensePercentage: 68,
  paymentStatus: 'Partial'
};

export const projectExpenses = [
  { id: 1, title: 'Frontend Development', category: 'Development', amount: 85000, date: '2026-02-15', status: 'Paid' },
  { id: 2, title: 'UI Design Tools', category: 'Software Tools', amount: 12000, date: '2026-02-01', status: 'Paid' },
  { id: 3, title: 'Server Hosting', category: 'Hosting', amount: 25000, date: '2026-03-01', status: 'Paid' },
  { id: 4, title: 'Developer Salary - Q1', category: 'Salary', amount: 95000, date: '2026-03-31', status: 'Paid' },
  { id: 5, title: 'Testing Tools', category: 'Software Tools', amount: 8000, date: '2026-06-01', status: 'Pending' },
  { id: 6, title: 'Domain & SSL', category: 'Hosting', amount: 3500, date: '2026-06-10', status: 'Pending' }
];