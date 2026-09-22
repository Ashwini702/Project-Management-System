// src/data/reportData.js
export const reportStatsData = [
  { id: 1, title: 'Total Projects', value: 48, icon: 'FiFolder', description: 'All registered projects', color: 'primary' },
  { id: 2, title: 'Completed Projects', value: 16, icon: 'FiCheckCircle', description: 'Successfully delivered', color: 'success' },
  { id: 3, title: 'Pending Tasks', value: 65, icon: 'FiClock', description: 'Awaiting completion', color: 'warning' },
  { id: 4, title: 'Team Productivity', value: '82%', icon: 'FiTrendingUp', description: 'Average across teams', color: 'info' },
  { id: 5, title: 'Delayed Projects', value: 2, icon: 'FiAlertTriangle', description: 'Behind schedule', color: 'danger' },
  { id: 6, title: 'Client Satisfaction', value: '91%', icon: 'FiSmile', description: 'Based on feedback', color: 'purple' }
];

export const overviewAnalytics = {
  projectProgress: { total: 48, active: 18, completed: 16, delayed: 2, onHold: 4, notStarted: 8 },
  taskStatus: { pending: 65, inProgress: 82, underReview: 31, completed: 55, reopened: 7, cancelled: 0 },
  teamProductivity: { average: 82, topDept: 'Development', topDeptScore: 88, lowWorkload: 8, overloaded: 4 },
  clientOverview: { active: 20, pendingFeedback: 8, completedProjects: 42, pendingPayments: 5, totalRevenue: '₹8,75,000' }
};

export const projectReports = [
  { id: 1, name: 'E-commerce Platform', client: 'FashionHub Inc.', manager: 'Michael Roberts', startDate: '2026-01-15', endDate: '2026-07-30', status: 'In Progress', priority: 'High', progress: 68, budget: '₹1,50,000', tasks: 42, completedTasks: 28 },
  { id: 2, name: 'Mobile Banking App', client: 'FinanceHub', manager: 'Emily Davidson', startDate: '2026-02-01', endDate: '2026-08-15', status: 'In Progress', priority: 'Urgent', progress: 45, budget: '₹2,80,000', tasks: 65, completedTasks: 29 },
  { id: 3, name: 'CRM System', client: 'SalesPro Ltd', manager: 'Patricia Garcia', startDate: '2026-01-10', endDate: '2026-05-20', status: 'Completed', priority: 'Medium', progress: 100, budget: '₹95,000', tasks: 30, completedTasks: 30 },
  { id: 4, name: 'Healthcare Portal', client: 'MediCare Group', manager: 'Michael Roberts', startDate: '2026-03-01', endDate: '2026-09-30', status: 'In Progress', priority: 'High', progress: 35, budget: '₹3,20,000', tasks: 55, completedTasks: 19 },
  { id: 5, name: 'ERP System', client: 'Manufacturing Corp', manager: 'Emily Davidson', startDate: '2026-04-01', endDate: '2026-11-15', status: 'Not Started', priority: 'Medium', progress: 0, budget: '₹2,00,000', tasks: 40, completedTasks: 0 },
  { id: 6, name: 'Cyber Security Audit', client: 'TechCorp Inc.', manager: 'Patricia Garcia', startDate: '2026-02-20', endDate: '2026-04-30', status: 'On Hold', priority: 'Urgent', progress: 40, budget: '₹75,000', tasks: 20, completedTasks: 8 },
  { id: 7, name: 'Digital Marketing Campaign', client: 'EduTech Solutions', manager: 'Michael Roberts', startDate: '2026-05-01', endDate: '2026-08-31', status: 'Not Started', priority: 'Low', progress: 0, budget: '₹50,000', tasks: 25, completedTasks: 0 },
  { id: 8, name: 'UI/UX Redesign', client: 'InsurancePro', manager: 'Emily Davidson', startDate: '2026-03-15', endDate: '2026-06-30', status: 'In Progress', priority: 'High', progress: 75, budget: '₹90,000', tasks: 28, completedTasks: 21 },
  { id: 9, name: 'Learning Management', client: 'EduTech Solutions', manager: 'Patricia Garcia', startDate: '2026-01-20', endDate: '2026-05-15', status: 'Delayed', priority: 'Medium', progress: 55, budget: '₹1,80,000', tasks: 48, completedTasks: 26 },
  { id: 10, name: 'Network Infrastructure', client: 'FinanceHub', manager: 'Emily Davidson', startDate: '2026-04-15', endDate: '2026-07-15', status: 'In Progress', priority: 'Urgent', progress: 30, budget: '₹2,50,000', tasks: 35, completedTasks: 10 }
];

export const taskReports = [
  { id: 1, name: 'Design Homepage Layout', project: 'E-commerce Platform', assignedTo: 'Lisa Martinez', deadline: '2026-06-15', priority: 'High', status: 'In Progress', progress: 70, timeSpent: '28h', completionDate: '-' },
  { id: 2, name: 'API Integration', project: 'E-commerce Platform', assignedTo: 'David Thompson', deadline: '2026-06-20', priority: 'Urgent', status: 'In Progress', progress: 45, timeSpent: '13h', completionDate: '-' },
  { id: 3, name: 'Database Schema', project: 'CRM System', assignedTo: 'Thomas Wright', deadline: '2026-05-30', priority: 'Medium', status: 'Completed', progress: 100, timeSpent: '18h', completionDate: '2026-05-29' },
  { id: 4, name: 'User Authentication', project: 'Mobile Banking App', assignedTo: 'David Thompson', deadline: '2026-06-25', priority: 'High', status: 'In Progress', progress: 60, timeSpent: '21h', completionDate: '-' },
  { id: 5, name: 'Patient Records Module', project: 'Healthcare Portal', assignedTo: 'Mike Developer', deadline: '2026-07-15', priority: 'High', status: 'Pending', progress: 0, timeSpent: '0h', completionDate: '-' },
  { id: 6, name: 'Security Patch', project: 'Cyber Security Audit', assignedTo: 'Security Expert', deadline: '2026-06-15', priority: 'Urgent', status: 'Reopened', progress: 80, timeSpent: '16h', completionDate: '-' },
  { id: 7, name: 'Inventory API', project: 'ERP System', assignedTo: 'Robert Wilson', deadline: '2026-06-30', priority: 'Medium', status: 'In Progress', progress: 35, timeSpent: '17h', completionDate: '-' },
  { id: 8, name: 'Mobile Navigation Design', project: 'Mobile Banking App', assignedTo: 'Sarah Designer', deadline: '2026-06-25', priority: 'Medium', status: 'Under Review', progress: 85, timeSpent: '25h', completionDate: '-' },
  { id: 9, name: 'Email Template', project: 'Digital Marketing', assignedTo: 'Lisa Martinez', deadline: '2026-06-28', priority: 'Low', status: 'Pending', progress: 0, timeSpent: '0h', completionDate: '-' },
  { id: 10, name: 'Performance Optimization', project: 'E-commerce Platform', assignedTo: 'John Developer', deadline: '2026-06-22', priority: 'High', status: 'Under Review', progress: 90, timeSpent: '22h', completionDate: '-' },
  { id: 11, name: 'Report Generation', project: 'CRM System', assignedTo: 'Thomas Wright', deadline: '2026-07-15', priority: 'Medium', status: 'Pending', progress: 0, timeSpent: '0h', completionDate: '-' },
  { id: 12, name: 'Content Calendar', project: 'Digital Marketing', assignedTo: 'Amanda Taylor', deadline: '2026-07-10', priority: 'Low', status: 'Pending', progress: 0, timeSpent: '0h', completionDate: '-' }
];

export const employeeReports = [
  { id: 1, name: 'David Thompson', department: 'Development', role: 'Full Stack Developer', assignedTasks: 12, completedTasks: 8, pendingTasks: 4, productivity: 92, workload: 75, grade: 'Excellent' },
  { id: 2, name: 'Lisa Martinez', department: 'UI/UX Design', role: 'UI/UX Designer', assignedTasks: 8, completedTasks: 6, pendingTasks: 2, productivity: 88, workload: 60, grade: 'Good' },
  { id: 3, name: 'John Developer', department: 'Development', role: 'Full Stack Developer', assignedTasks: 15, completedTasks: 10, pendingTasks: 5, productivity: 94, workload: 95, grade: 'Excellent' },
  { id: 4, name: 'Robert Wilson', department: 'Digital Marketing', role: 'Digital Marketer', assignedTasks: 6, completedTasks: 3, pendingTasks: 3, productivity: 78, workload: 50, grade: 'Average' },
  { id: 5, name: 'Thomas Wright', department: 'Development', role: 'Backend Developer', assignedTasks: 9, completedTasks: 5, pendingTasks: 4, productivity: 90, workload: 65, grade: 'Excellent' },
  { id: 6, name: 'Sarah Designer', department: 'UI/UX Design', role: 'UI/UX Designer', assignedTasks: 7, completedTasks: 5, pendingTasks: 2, productivity: 91, workload: 55, grade: 'Excellent' },
  { id: 7, name: 'Mike Developer', department: 'Development', role: 'Backend Developer', assignedTasks: 11, completedTasks: 6, pendingTasks: 5, productivity: 87, workload: 80, grade: 'Good' },
  { id: 8, name: 'Security Expert', department: 'Cyber Security', role: 'Cyber Security Analyst', assignedTasks: 8, completedTasks: 6, pendingTasks: 2, productivity: 89, workload: 60, grade: 'Good' },
  { id: 9, name: 'Amanda Taylor', department: 'Development', role: 'Frontend Developer', assignedTasks: 10, completedTasks: 7, pendingTasks: 3, productivity: 85, workload: 70, grade: 'Good' },
  { id: 10, name: 'Marketing Pro', department: 'Digital Marketing', role: 'Digital Marketer', assignedTasks: 6, completedTasks: 2, pendingTasks: 4, productivity: 72, workload: 45, grade: 'Average' }
];

export const clientReports = [
  { id: 1, name: 'Rajesh Sharma', company: 'TechCorp India', assignedProjects: 2, completedProjects: 3, pendingFeedback: 1, paymentStatus: 'Paid', totalValue: '₹3,50,000', paidAmount: '₹3,50,000', pendingAmount: '₹0', satisfaction: 95 },
  { id: 2, name: 'Priya Patel', company: 'EduTech Solutions', assignedProjects: 2, completedProjects: 5, pendingFeedback: 2, paymentStatus: 'Partial', totalValue: '₹2,80,000', paidAmount: '₹1,80,000', pendingAmount: '₹1,00,000', satisfaction: 88 },
  { id: 3, name: 'Dr. Ankit Gupta', company: 'MediCare Group', assignedProjects: 1, completedProjects: 2, pendingFeedback: 0, paymentStatus: 'Paid', totalValue: '₹5,20,000', paidAmount: '₹5,20,000', pendingAmount: '₹0', satisfaction: 97 },
  { id: 4, name: 'Vikram Mehta', company: 'RetailMax Stores', assignedProjects: 2, completedProjects: 1, pendingFeedback: 1, paymentStatus: 'Pending', totalValue: '₹4,20,000', paidAmount: '₹0', pendingAmount: '₹4,20,000', satisfaction: 78 },
  { id: 5, name: 'Sneha Reddy', company: 'FinanceHub', assignedProjects: 2, completedProjects: 4, pendingFeedback: 0, paymentStatus: 'Paid', totalValue: '₹6,50,000', paidAmount: '₹6,50,000', pendingAmount: '₹0', satisfaction: 93 },
  { id: 6, name: 'Kavita Joshi', company: 'Manufacturing Corp', assignedProjects: 1, completedProjects: 2, pendingFeedback: 1, paymentStatus: 'Overdue', totalValue: '₹3,80,000', paidAmount: '₹1,50,000', pendingAmount: '₹2,30,000', satisfaction: 72 },
  { id: 7, name: 'Deepak Verma', company: 'IT Solutions Co', assignedProjects: 2, completedProjects: 6, pendingFeedback: 2, paymentStatus: 'Partial', totalValue: '₹4,50,000', paidAmount: '₹3,00,000', pendingAmount: '₹1,50,000', satisfaction: 90 },
  { id: 8, name: 'Arun Shetty', company: 'Coastal Builders', assignedProjects: 2, completedProjects: 3, pendingFeedback: 0, paymentStatus: 'Paid', totalValue: '₹5,50,000', paidAmount: '₹5,50,000', pendingAmount: '₹0', satisfaction: 96 }
];

export const deadlineReports = [
  { id: 1, title: 'E-commerce Final Delivery', type: 'Project Deadline', project: 'E-commerce Platform', assignedTo: 'David Thompson', dueDate: '2026-06-20', daysLeft: 1, priority: 'High', status: 'Upcoming' },
  { id: 2, title: 'API Integration Testing', type: 'Task Deadline', project: 'E-commerce Platform', assignedTo: 'David Thompson', dueDate: '2026-06-15', daysLeft: -4, priority: 'Urgent', status: 'Overdue' },
  { id: 3, title: 'CRM Module Completion', type: 'Milestone', project: 'CRM System', assignedTo: 'Thomas Wright', dueDate: '2026-06-22', daysLeft: 3, priority: 'High', status: 'Upcoming' },
  { id: 4, title: 'Security Patch Deadline', type: 'Task Deadline', project: 'Cyber Security Audit', assignedTo: 'Security Expert', dueDate: '2026-06-15', daysLeft: -4, priority: 'Urgent', status: 'Overdue' },
  { id: 5, title: 'Sprint Demo Meeting', type: 'Meeting', project: 'Mobile Banking App', assignedTo: 'Emily Davidson', dueDate: '2026-06-27', daysLeft: 8, priority: 'Medium', status: 'Upcoming' },
  { id: 6, title: 'UI Design Submission', type: 'Task Deadline', project: 'Healthcare Portal', assignedTo: 'Lisa Martinez', dueDate: '2026-06-21', daysLeft: 2, priority: 'High', status: 'Upcoming' },
  { id: 7, title: 'Marketing Campaign Launch', type: 'Milestone', project: 'Digital Marketing', assignedTo: 'Robert Wilson', dueDate: '2026-06-25', daysLeft: 6, priority: 'Medium', status: 'Upcoming' },
  { id: 8, title: 'UAT Session', type: 'Milestone', project: 'CRM System', assignedTo: 'Patricia Garcia', dueDate: '2026-06-28', daysLeft: 9, priority: 'High', status: 'Upcoming' },
  { id: 9, title: 'Design System Update', type: 'Task Deadline', project: 'UI/UX Redesign', assignedTo: 'Lisa Martinez', dueDate: '2026-06-18', daysLeft: -1, priority: 'Medium', status: 'Completed' },
  { id: 10, title: 'Monthly Report', type: 'Reminder', project: 'ERP System', assignedTo: 'Amanda Taylor', dueDate: '2026-06-30', daysLeft: 11, priority: 'Low', status: 'Upcoming' }
];

export const completedProjectReports = [
  { id: 1, name: 'CRM System', client: 'SalesPro Ltd', manager: 'Patricia Garcia', completionDate: '2026-05-20', duration: '130 days', budget: '₹95,000', finalStatus: 'Completed', clientRating: 4.8, documents: 5 },
  { id: 2, name: 'Website Redesign v1', client: 'Old Client Inc.', manager: 'Michael Roberts', completionDate: '2026-04-15', duration: '90 days', budget: '₹75,000', finalStatus: 'Completed', clientRating: 4.5, documents: 3 },
  { id: 3, name: 'Mobile App MVP', client: 'StartupHub', manager: 'Emily Davidson', completionDate: '2026-03-28', duration: '75 days', budget: '₹1,20,000', finalStatus: 'Completed', clientRating: 4.9, documents: 7 },
  { id: 4, name: 'Data Migration', client: 'Manufacturing Corp', manager: 'Patricia Garcia', completionDate: '2026-02-20', duration: '60 days', budget: '₹80,000', finalStatus: 'Completed', clientRating: 4.3, documents: 4 },
  { id: 5, name: 'Cloud Infrastructure', client: 'TechCorp India', manager: 'Michael Roberts', completionDate: '2026-01-15', duration: '100 days', budget: '₹2,00,000', finalStatus: 'Completed', clientRating: 4.7, documents: 6 },
  { id: 6, name: 'SEO Optimization', client: 'EduTech Solutions', manager: 'Emily Davidson', completionDate: '2025-12-10', duration: '45 days', budget: '₹40,000', finalStatus: 'Completed', clientRating: 4.6, documents: 2 },
  { id: 7, name: 'Inventory System', client: 'RetailMax', manager: 'Patricia Garcia', completionDate: '2025-11-25', duration: '85 days', budget: '₹1,10,000', finalStatus: 'Completed', clientRating: 4.4, documents: 5 },
  { id: 8, name: 'HR Portal', client: 'Internal', manager: 'Michael Roberts', completionDate: '2025-10-30', duration: '70 days', budget: '₹60,000', finalStatus: 'Completed', clientRating: 4.2, documents: 3 }
];

export const departments = ['Development', 'UI/UX Design', 'Digital Marketing', 'Cyber Security', 'HR', 'Accounts'];
export const projects = ['Website Redesign', 'Mobile App UI', 'CRM Development', 'ERP System', 'Cyber Security Audit', 'E-commerce Platform'];
export const statuses = ['Not Started', 'In Progress', 'On Hold', 'Completed', 'Delayed', 'Cancelled'];
export const priorities = ['Low', 'Medium', 'High', 'Urgent'];
export const reportTypes = ['Project Report', 'Task Report', 'Employee Performance Report', 'Client Project Report', 'Deadline Report', 'Completed Project Report'];
export const dateRanges = ['Today', 'This Week', 'This Month', 'Last Month', 'This Year', 'Custom Range'];