// src/data/managerReportsData.js
export const managerReportStatsData = [
  { id: 1, title: 'Assigned Projects', value: 8, icon: 'FiFolder', desc: 'Active management', color: 'primary' },
  { id: 2, title: 'Completed Projects', value: 2, icon: 'FiCheckCircle', desc: 'This quarter', color: 'success' },
  { id: 3, title: 'Active Tasks', value: 46, icon: 'FiCheckSquare', desc: 'In progress', color: 'info' },
  { id: 4, title: 'Team Productivity', value: '84%', icon: 'FiTrendingUp', desc: 'Average score', color: 'warning' },
  { id: 5, title: 'Overdue Deadlines', value: 4, icon: 'FiAlertTriangle', desc: 'Needs attention', color: 'danger' },
  { id: 6, title: 'Client Satisfaction', value: '91%', icon: 'FiSmile', desc: 'Average rating', color: 'purple' }
];

export const overviewAnalytics = {
  projectProgress: { total: 8, active: 5, completed: 2, delayed: 1, avgProgress: 62 },
  taskStatus: { pending: 12, inProgress: 18, underReview: 8, completed: 46, blocked: 3 },
  teamProductivity: { average: 84, topPerformer: 'David Thompson', topScore: 92, overloaded: 3, available: 6 },
  clientFeedback: { total: 64, pending: 14, resolved: 32, avgSatisfaction: 91 }
};

export const projectReports = [
  { id: 1, projectName: 'Website Redesign', clientName: 'TechCorp India', category: 'Web Development', startDate: '2026-01-15', endDate: '2026-07-30', status: 'In Progress', priority: 'High', progress: 68, totalTasks: 42, completedTasks: 28, pendingTasks: 14 },
  { id: 2, projectName: 'Mobile App UI', clientName: 'FinanceHub', category: 'Mobile App', startDate: '2026-02-01', endDate: '2026-08-15', status: 'In Progress', priority: 'High', progress: 45, totalTasks: 65, completedTasks: 29, pendingTasks: 36 },
  { id: 3, projectName: 'CRM Development', clientName: 'SalesPro Ltd', category: 'CRM', startDate: '2026-01-10', endDate: '2026-05-20', status: 'Completed', priority: 'Medium', progress: 100, totalTasks: 30, completedTasks: 30, pendingTasks: 0 },
  { id: 4, projectName: 'ERP System', clientName: 'Manufacturing Corp', category: 'ERP', startDate: '2026-04-01', endDate: '2026-11-15', status: 'Not Started', priority: 'Medium', progress: 0, totalTasks: 40, completedTasks: 0, pendingTasks: 40 },
  { id: 5, projectName: 'Cyber Security Audit', clientName: 'TechCorp India', category: 'Cyber Security', startDate: '2026-02-20', endDate: '2026-04-30', status: 'On Hold', priority: 'Urgent', progress: 40, totalTasks: 20, completedTasks: 8, pendingTasks: 12 },
  { id: 6, projectName: 'E-commerce Platform', clientName: 'RetailMax', category: 'Web Development', startDate: '2026-03-01', endDate: '2026-09-30', status: 'In Progress', priority: 'High', progress: 55, totalTasks: 35, completedTasks: 19, pendingTasks: 16 },
  { id: 7, projectName: 'Healthcare Portal', clientName: 'MediCare Group', category: 'Web Development', startDate: '2026-03-15', endDate: '2026-12-31', status: 'In Progress', priority: 'High', progress: 35, totalTasks: 55, completedTasks: 19, pendingTasks: 36 },
  { id: 8, projectName: 'Digital Marketing Campaign', clientName: 'EduTech Solutions', category: 'Digital Marketing', startDate: '2026-05-01', endDate: '2026-08-31', status: 'Not Started', priority: 'Low', progress: 0, totalTasks: 25, completedTasks: 0, pendingTasks: 25 }
];

export const taskReports = [
  { id: 1, taskName: 'Homepage UI Development', projectName: 'Website Redesign', assignedTo: 'Saurabh Nalode', deadline: '2026-06-25', priority: 'High', status: 'In Progress', progress: 65, estimatedHours: 25, timeSpent: 16, completionRate: 65 },
  { id: 2, taskName: 'API Payment Integration', projectName: 'E-commerce Platform', assignedTo: 'David Thompson', deadline: '2026-06-28', priority: 'Urgent', status: 'In Progress', progress: 40, estimatedHours: 30, timeSpent: 12, completionRate: 40 },
  { id: 3, taskName: 'User Authentication Module', projectName: 'CRM Development', assignedTo: 'Saurabh Nalode', deadline: '2026-06-20', priority: 'High', status: 'Under Review', progress: 90, estimatedHours: 25, timeSpent: 22, completionRate: 90 },
  { id: 4, taskName: 'Database Optimization', projectName: 'Healthcare Portal', assignedTo: 'Thomas Wright', deadline: '2026-06-30', priority: 'Medium', status: 'Blocked', progress: 25, estimatedHours: 20, timeSpent: 5, completionRate: 25 },
  { id: 5, taskName: 'Mobile Navigation Design', projectName: 'Mobile App UI', assignedTo: 'Lisa Martinez', deadline: '2026-06-22', priority: 'Medium', status: 'In Progress', progress: 75, estimatedHours: 20, timeSpent: 15, completionRate: 75 },
  { id: 6, taskName: 'Security Vulnerability Patch', projectName: 'Cyber Security Audit', assignedTo: 'Security Expert', deadline: '2026-06-15', priority: 'Urgent', status: 'Overdue', progress: 80, estimatedHours: 20, timeSpent: 16, completionRate: 80 },
  { id: 7, taskName: 'Cross-Browser Testing', projectName: 'Website Redesign', assignedTo: 'Amanda Taylor', deadline: '2026-06-26', priority: 'High', status: 'Pending', progress: 0, estimatedHours: 15, timeSpent: 0, completionRate: 0 },
  { id: 8, taskName: 'UI Component Library', projectName: 'E-commerce Platform', assignedTo: 'Lisa Martinez', deadline: '2026-06-18', priority: 'High', status: 'Completed', progress: 100, estimatedHours: 30, timeSpent: 28, completionRate: 100 },
  { id: 9, taskName: 'Inventory API', projectName: 'ERP System', assignedTo: 'Mike Developer', deadline: '2026-07-05', priority: 'Medium', status: 'In Progress', progress: 35, estimatedHours: 45, timeSpent: 16, completionRate: 35 },
  { id: 10, taskName: 'SEO Optimization', projectName: 'Website Redesign', assignedTo: 'Robert Wilson', deadline: '2026-07-01', priority: 'Medium', status: 'Pending', progress: 0, estimatedHours: 20, timeSpent: 0, completionRate: 0 },
  { id: 11, taskName: 'Data Migration Script', projectName: 'ERP System', assignedTo: 'Thomas Wright', deadline: '2026-07-02', priority: 'High', status: 'In Progress', progress: 30, estimatedHours: 40, timeSpent: 12, completionRate: 30 },
  { id: 12, taskName: 'Penetration Testing Report', projectName: 'Cyber Security Audit', assignedTo: 'Security Expert', deadline: '2026-06-25', priority: 'Urgent', status: 'Under Review', progress: 85, estimatedHours: 30, timeSpent: 25, completionRate: 85 }
];

export const teamPerformanceReports = [
  { id: 1, memberName: 'Saurabh Nalode', role: 'Frontend Developer', department: 'Development', assignedTasks: 10, completedTasks: 6, pendingTasks: 3, overdueTasks: 1, workload: 80, productivity: 88, performanceGrade: 'Good' },
  { id: 2, memberName: 'David Thompson', role: 'Full Stack Developer', department: 'Development', assignedTasks: 8, completedTasks: 5, pendingTasks: 2, overdueTasks: 0, workload: 45, productivity: 92, performanceGrade: 'Excellent' },
  { id: 3, memberName: 'Lisa Martinez', role: 'UI/UX Designer', department: 'Design', assignedTasks: 8, completedTasks: 6, pendingTasks: 1, overdueTasks: 0, workload: 65, productivity: 90, performanceGrade: 'Excellent' },
  { id: 4, memberName: 'Mike Developer', role: 'Backend Developer', department: 'Development', assignedTasks: 12, completedTasks: 6, pendingTasks: 5, overdueTasks: 2, workload: 95, productivity: 85, performanceGrade: 'Good' },
  { id: 5, memberName: 'Amanda Taylor', role: 'Frontend Developer', department: 'Development', assignedTasks: 6, completedTasks: 4, pendingTasks: 1, overdueTasks: 0, workload: 40, productivity: 78, performanceGrade: 'Average' },
  { id: 6, memberName: 'Security Expert', role: 'Cyber Security Analyst', department: 'Cyber Security', assignedTasks: 8, completedTasks: 6, pendingTasks: 1, overdueTasks: 1, workload: 70, productivity: 89, performanceGrade: 'Good' },
  { id: 7, memberName: 'Thomas Wright', role: 'Backend Developer', department: 'Development', assignedTasks: 11, completedTasks: 5, pendingTasks: 4, overdueTasks: 2, workload: 92, productivity: 82, performanceGrade: 'Average' },
  { id: 8, memberName: 'Robert Wilson', role: 'Digital Marketer', department: 'Marketing', assignedTasks: 5, completedTasks: 3, pendingTasks: 1, overdueTasks: 0, workload: 35, productivity: 72, performanceGrade: 'Average' },
  { id: 9, memberName: 'QA Engineer', role: 'QA Tester', department: 'QA Testing', assignedTasks: 9, completedTasks: 4, pendingTasks: 4, overdueTasks: 1, workload: 75, productivity: 84, performanceGrade: 'Good' },
  { id: 10, memberName: 'DevOps Engineer', role: 'Backend Developer', department: 'Development', assignedTasks: 14, completedTasks: 7, pendingTasks: 5, overdueTasks: 3, workload: 98, productivity: 87, performanceGrade: 'Good' }
];

export const deadlineReports = [
  { id: 1, title: 'E-commerce Final Delivery', type: 'Project Deadline', projectName: 'E-commerce Platform', assignedTo: 'David Thompson', dueDate: '2026-07-30', daysRemaining: 37, priority: 'High', status: 'Upcoming', progress: 68 },
  { id: 2, title: 'API Payment Integration', type: 'Task Deadline', projectName: 'E-commerce Platform', assignedTo: 'David Thompson', dueDate: '2026-06-28', daysRemaining: 5, priority: 'Urgent', status: 'Upcoming', progress: 40 },
  { id: 3, title: 'User Auth Review', type: 'Review', projectName: 'CRM Development', assignedTo: 'Saurabh Nalode', dueDate: '2026-06-20', daysRemaining: -3, priority: 'High', status: 'Overdue', progress: 90 },
  { id: 4, title: 'Security Patch Delivery', type: 'Delivery', projectName: 'Cyber Security Audit', assignedTo: 'Security Expert', dueDate: '2026-06-15', daysRemaining: -8, priority: 'Urgent', status: 'Overdue', progress: 80 },
  { id: 5, title: 'Design Phase Completion', type: 'Milestone', projectName: 'Mobile App UI', assignedTo: 'Lisa Martinez', dueDate: '2026-06-22', daysRemaining: 0, priority: 'Medium', status: 'Upcoming', progress: 85 },
  { id: 6, title: 'Sprint Planning Meeting', type: 'Meeting', projectName: 'Website Redesign', assignedTo: 'Priya Sharma', dueDate: '2026-06-23', daysRemaining: 1, priority: 'Medium', status: 'Upcoming', progress: 0 },
  { id: 7, title: 'UI Component Library', type: 'Milestone', projectName: 'E-commerce Platform', assignedTo: 'Lisa Martinez', dueDate: '2026-06-18', daysRemaining: -5, priority: 'High', status: 'Completed', progress: 100 },
  { id: 8, title: 'Cross-Browser Testing', type: 'Task Deadline', projectName: 'Website Redesign', assignedTo: 'Amanda Taylor', dueDate: '2026-06-26', daysRemaining: 3, priority: 'High', status: 'Upcoming', progress: 15 },
  { id: 9, title: 'Data Migration Completion', type: 'Task Deadline', projectName: 'ERP System', assignedTo: 'Thomas Wright', dueDate: '2026-07-02', daysRemaining: 9, priority: 'Urgent', status: 'Upcoming', progress: 30 },
  { id: 10, title: 'Marketing Campaign Go-Live', type: 'Milestone', projectName: 'Digital Marketing', assignedTo: 'Robert Wilson', dueDate: '2026-06-25', daysRemaining: 2, priority: 'Medium', status: 'Upcoming', progress: 60 }
];

export const clientFeedbackReports = [
  { id: 1, title: 'Footer Design Change', clientName: 'Rajesh Sharma', companyName: 'TechCorp India', projectName: 'Website Redesign', category: 'UI Change', priority: 'High', status: 'Pending', rating: 3, submittedDate: '2026-06-19', resolvedDate: '-' },
  { id: 2, title: 'Payment Gateway Bug', clientName: 'Sneha Reddy', companyName: 'FinanceHub', projectName: 'E-commerce Platform', category: 'Bug Report', priority: 'Urgent', status: 'In Review', rating: 2, submittedDate: '2026-06-18', resolvedDate: '-' },
  { id: 3, title: 'Patient Records Approval', clientName: 'Dr. Ankit Gupta', companyName: 'MediCare Group', projectName: 'Healthcare Portal', category: 'Approval', priority: 'Medium', status: 'Approved', rating: 5, submittedDate: '2026-06-16', resolvedDate: '2026-06-17' },
  { id: 4, title: 'CRM Navigation', clientName: 'Priya Patel', companyName: 'EduTech Solutions', projectName: 'CRM Development', category: 'Feature Request', priority: 'Medium', status: 'Resolved', rating: 4, submittedDate: '2026-06-14', resolvedDate: '2026-06-16' },
  { id: 5, title: 'Invoice Module Rejected', clientName: 'Kavita Joshi', companyName: 'Manufacturing Corp', projectName: 'ERP System', category: 'Approval', priority: 'High', status: 'Rejected', rating: 2, submittedDate: '2026-06-13', resolvedDate: '2026-06-15' },
  { id: 6, title: 'Security Report Approved', clientName: 'Deepak Verma', companyName: 'IT Solutions Co', projectName: 'Cyber Security Audit', category: 'Approval', priority: 'High', status: 'Approved', rating: 5, submittedDate: '2026-06-12', resolvedDate: '2026-06-13' },
  { id: 7, title: 'Mobile App Crash', clientName: 'Sneha Reddy', companyName: 'FinanceHub', projectName: 'Mobile App UI', category: 'Bug Report', priority: 'Urgent', status: 'In Review', rating: 1, submittedDate: '2026-06-19', resolvedDate: '-' },
  { id: 8, title: 'Document Upload Feature', clientName: 'Priya Patel', companyName: 'EduTech Solutions', projectName: 'CRM Development', category: 'Feature Request', priority: 'Medium', status: 'Resolved', rating: 4, submittedDate: '2026-06-10', resolvedDate: '2026-06-14' },
  { id: 9, title: 'Color Scheme Change', clientName: 'Vikram Mehta', companyName: 'RetailMax', projectName: 'Website Redesign', category: 'UI Change', priority: 'Low', status: 'Rejected', rating: 2, submittedDate: '2026-06-08', resolvedDate: '2026-06-09' },
  { id: 10, title: 'General Feedback', clientName: 'Arun Shetty', companyName: 'Coastal Builders', projectName: 'Website Redesign', category: 'General Feedback', priority: 'Low', status: 'Approved', rating: 5, submittedDate: '2026-06-15', resolvedDate: '2026-06-16' }
];

export const projects = ['Website Redesign', 'Mobile App UI', 'CRM Development', 'ERP System', 'Cyber Security Audit', 'E-commerce Platform', 'Healthcare Portal', 'Digital Marketing'];
export const teamMembers = ['Saurabh Nalode', 'David Thompson', 'Lisa Martinez', 'Mike Developer', 'Amanda Taylor', 'Security Expert', 'Thomas Wright', 'Robert Wilson'];
export const statuses = ['Not Started', 'In Progress', 'Under Review', 'Completed', 'Delayed', 'Blocked'];
export const priorities = ['Low', 'Medium', 'High', 'Urgent'];
export const reportTypes = ['Project Report', 'Task Report', 'Team Performance Report', 'Deadline Report', 'Client Feedback Report'];