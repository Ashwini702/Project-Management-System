// src/data/budgetData.js
export const budgetStatsData = [
  { id: 1, title: 'Total Budget', value: '₹15,00,000', icon: 'FiDollarSign', description: 'All project budgets', color: 'primary' },
  { id: 2, title: 'Total Expenses', value: '₹6,75,000', icon: 'FiTrendingDown', description: 'All time expenses', color: 'danger' },
  { id: 3, title: 'Paid Amount', value: '₹8,25,000', icon: 'FiCheckCircle', description: 'Received payments', color: 'success' },
  { id: 4, title: 'Pending Amount', value: '₹2,40,000', icon: 'FiClock', description: 'Awaiting payment', color: 'warning' },
  { id: 5, title: 'Profit', value: '₹3,85,000', icon: 'FiTrendingUp', description: 'Net profit', color: 'info' },
  { id: 6, title: 'Overdue Payments', value: '₹95,000', icon: 'FiAlertTriangle', description: 'Past due date', color: 'purple' }
];

export const projectsForBudget = ['Website Redesign', 'Mobile App UI', 'CRM Development', 'ERP System', 'Cyber Security Audit', 'E-commerce Platform', 'Healthcare Portal', 'Digital Marketing'];
export const clientsForBudget = ['Akshit Nagrikar', 'Khushi Begde', 'Nivedita Patil', 'Rahul Sharma', 'Kunal Joshi', 'Sneha Kulkarni'];
export const expenseCategories = ['Development', 'Design', 'Marketing', 'Software Tools', 'Hosting', 'Salary', 'Travel', 'Miscellaneous'];
export const paymentMethods = ['Cash', 'UPI', 'Bank Transfer', 'Card', 'Cheque'];
export const paymentStatuses = ['Paid', 'Pending', 'Partial', 'Overdue'];

export const projectBudgets = [
  { id: 1, projectName: 'E-commerce Platform', clientName: 'TechCorp India', totalBudget: 350000, usedBudget: 238000, remainingBudget: 112000, paymentStatus: 'Partial', profitLoss: 62000, startDate: '2026-01-15', endDate: '2026-07-30', notes: 'On track. Design phase completed under budget.' },
  { id: 2, projectName: 'Mobile Banking App', clientName: 'FinanceHub', totalBudget: 280000, usedBudget: 126000, remainingBudget: 154000, paymentStatus: 'Pending', profitLoss: -15000, startDate: '2026-02-01', endDate: '2026-08-15', notes: 'Development costs higher than estimated.' },
  { id: 3, projectName: 'CRM System', clientName: 'SalesPro Ltd', totalBudget: 95000, usedBudget: 95000, remainingBudget: 0, paymentStatus: 'Paid', profitLoss: 28000, startDate: '2026-01-10', endDate: '2026-05-20', notes: 'Completed. Delivered under budget with good margin.' },
  { id: 4, projectName: 'Healthcare Portal', clientName: 'MediCare Group', totalBudget: 520000, usedBudget: 182000, remainingBudget: 338000, paymentStatus: 'Paid', profitLoss: 88000, startDate: '2026-03-01', endDate: '2026-09-30', notes: 'Large project with good profit margin.' },
  { id: 5, projectName: 'ERP System', clientName: 'Manufacturing Corp', totalBudget: 200000, usedBudget: 40000, remainingBudget: 160000, paymentStatus: 'Overdue', profitLoss: -25000, startDate: '2026-04-01', endDate: '2026-11-15', notes: 'Client payment delayed. Follow up required.' },
  { id: 6, projectName: 'Cyber Security Audit', clientName: 'TechCorp India', totalBudget: 75000, usedBudget: 55000, remainingBudget: 20000, paymentStatus: 'Partial', profitLoss: 12000, startDate: '2026-02-20', endDate: '2026-04-30', notes: 'On hold due to scope changes.' },
  { id: 7, projectName: 'Digital Marketing Campaign', clientName: 'EduTech Solutions', totalBudget: 50000, usedBudget: 5000, remainingBudget: 45000, paymentStatus: 'Pending', profitLoss: 18000, startDate: '2026-05-01', endDate: '2026-08-31', notes: 'Starting next month. High margin expected.' },
  { id: 8, projectName: 'UI/UX Redesign', clientName: 'RetailMax', totalBudget: 90000, usedBudget: 67500, remainingBudget: 22500, paymentStatus: 'Paid', profitLoss: 15000, startDate: '2026-03-15', endDate: '2026-06-30', notes: '75% complete. On budget.' }
];

export const expenses = [
  { id: 1, title: 'Frontend Development Sprint', project: 'E-commerce Platform', client: 'TechCorp India', category: 'Development', amount: 85000, expenseDate: '2026-02-15', paymentMethod: 'Bank Transfer', status: 'Paid', receipt: 'receipt-001.pdf', notes: 'Sprint 1 development costs.' },
  { id: 2, title: 'UI Design Tools Subscription', project: 'Mobile Banking App', client: 'FinanceHub', category: 'Software Tools', amount: 12000, expenseDate: '2026-03-01', paymentMethod: 'Card', status: 'Paid', receipt: '', notes: 'Annual Figma subscription.' },
  { id: 3, title: 'Server Hosting - AWS', project: 'Healthcare Portal', client: 'MediCare Group', category: 'Hosting', amount: 45000, expenseDate: '2026-03-15', paymentMethod: 'Bank Transfer', status: 'Paid', receipt: 'aws-invoice.pdf', notes: 'Quarterly AWS hosting charges.' },
  { id: 4, title: 'Developer Salary - March', project: 'E-commerce Platform', client: 'TechCorp India', category: 'Salary', amount: 95000, expenseDate: '2026-03-31', paymentMethod: 'Bank Transfer', status: 'Paid', receipt: '', notes: 'Team salary for March.' },
  { id: 5, title: 'Marketing Campaign Setup', project: 'Digital Marketing', client: 'EduTech Solutions', category: 'Marketing', amount: 25000, expenseDate: '2026-05-05', paymentMethod: 'UPI', status: 'Pending', receipt: '', notes: 'Initial campaign setup costs.' },
  { id: 6, title: 'Security Testing Tools', project: 'Cyber Security Audit', client: 'TechCorp India', category: 'Software Tools', amount: 18000, expenseDate: '2026-03-10', paymentMethod: 'Card', status: 'Paid', receipt: '', notes: 'Penetration testing tools license.' },
  { id: 7, title: 'Travel - Client Meeting', project: 'CRM System', client: 'SalesPro Ltd', category: 'Travel', amount: 8500, expenseDate: '2026-04-15', paymentMethod: 'Cash', status: 'Paid', receipt: 'travel-bill.pdf', notes: 'Client visit to Bangalore.' },
  { id: 8, title: 'UI Designer Salary', project: 'Mobile Banking App', client: 'FinanceHub', category: 'Salary', amount: 65000, expenseDate: '2026-04-30', paymentMethod: 'Bank Transfer', status: 'Pending', status2: 'Paid', notes: 'April salary.' },
  { id: 9, title: 'Domain & SSL Certificate', project: 'Website Redesign', client: 'RealEstate Pro', category: 'Hosting', amount: 3500, expenseDate: '2026-04-01', paymentMethod: 'Card', status: 'Paid', receipt: '', notes: 'Annual renewal.' },
  { id: 10, title: 'Content Writing Services', project: 'Digital Marketing', client: 'EduTech Solutions', category: 'Marketing', amount: 15000, expenseDate: '2026-05-20', paymentMethod: 'UPI', status: 'Pending', receipt: '', notes: 'Blog posts and social media content.' },
  { id: 11, title: 'Office Supplies', project: 'General', client: 'Internal', category: 'Miscellaneous', amount: 4500, expenseDate: '2026-05-10', paymentMethod: 'Cash', status: 'Paid', receipt: '', notes: 'Stationery and supplies.' },
  { id: 12, title: 'Backend Developer Salary', project: 'ERP System', client: 'Manufacturing Corp', category: 'Salary', amount: 75000, expenseDate: '2026-05-31', paymentMethod: 'Bank Transfer', status: 'Overdue', receipt: '', notes: 'May salary pending.' }
];

export const clientBillings = [
  { id: 1, clientName: 'TechCorp India', company: 'TechCorp India Pvt Ltd', project: 'E-commerce Platform', projectValue: 350000, paidAmount: 200000, pendingAmount: 150000, paymentStatus: 'Partial', invoiceCount: 4, lastPaymentDate: '2026-05-15' },
  { id: 2, clientName: 'FinanceHub', company: 'FinanceHub Ltd', project: 'Mobile Banking App', projectValue: 280000, paidAmount: 0, pendingAmount: 280000, paymentStatus: 'Pending', invoiceCount: 2, lastPaymentDate: '-' },
  { id: 3, clientName: 'SalesPro Ltd', company: 'SalesPro Ltd', project: 'CRM System', projectValue: 95000, paidAmount: 95000, pendingAmount: 0, paymentStatus: 'Paid', invoiceCount: 3, lastPaymentDate: '2026-05-20' },
  { id: 4, clientName: 'MediCare Group', company: 'MediCare Hospitals', project: 'Healthcare Portal', projectValue: 520000, paidAmount: 520000, pendingAmount: 0, paymentStatus: 'Paid', invoiceCount: 5, lastPaymentDate: '2026-06-01' },
  { id: 5, clientName: 'Manufacturing Corp', company: 'Manufacturing Corp India', project: 'ERP System', projectValue: 200000, paidAmount: 40000, pendingAmount: 160000, paymentStatus: 'Overdue', invoiceCount: 2, lastPaymentDate: '2026-04-15' },
  { id: 6, clientName: 'EduTech Solutions', company: 'EduTech Solutions Ltd', project: 'Digital Marketing', projectValue: 50000, paidAmount: 0, pendingAmount: 50000, paymentStatus: 'Pending', invoiceCount: 1, lastPaymentDate: '-' },
  { id: 7, clientName: 'RetailMax', company: 'RetailMax Stores', project: 'UI/UX Redesign', projectValue: 90000, paidAmount: 90000, pendingAmount: 0, paymentStatus: 'Paid', invoiceCount: 2, lastPaymentDate: '2026-05-25' },
  { id: 8, clientName: 'RealEstate Pro', company: 'RealEstate Pro', project: 'Website Redesign', projectValue: 180000, paidAmount: 60000, pendingAmount: 120000, paymentStatus: 'Partial', invoiceCount: 3, lastPaymentDate: '2026-05-10' }
];

export const invoices = [
  { id: 1, invoiceNumber: 'INV-2026-001', clientName: 'TechCorp India', projectName: 'E-commerce Platform', invoiceDate: '2026-02-15', dueDate: '2026-03-15', totalAmount: 120000, paidAmount: 120000, pendingAmount: 0, paymentStatus: 'Paid' },
  { id: 2, invoiceNumber: 'INV-2026-002', clientName: 'TechCorp India', projectName: 'E-commerce Platform', invoiceDate: '2026-04-01', dueDate: '2026-05-01', totalAmount: 80000, paidAmount: 80000, pendingAmount: 0, paymentStatus: 'Paid' },
  { id: 3, invoiceNumber: 'INV-2026-003', clientName: 'TechCorp India', projectName: 'E-commerce Platform', invoiceDate: '2026-05-15', dueDate: '2026-06-15', totalAmount: 150000, paidAmount: 0, pendingAmount: 150000, paymentStatus: 'Pending' },
  { id: 4, invoiceNumber: 'INV-2026-004', clientName: 'MediCare Group', projectName: 'Healthcare Portal', invoiceDate: '2026-03-15', dueDate: '2026-04-15', totalAmount: 200000, paidAmount: 200000, pendingAmount: 0, paymentStatus: 'Paid' },
  { id: 5, invoiceNumber: 'INV-2026-005', clientName: 'MediCare Group', projectName: 'Healthcare Portal', invoiceDate: '2026-05-01', dueDate: '2026-06-01', totalAmount: 320000, paidAmount: 320000, pendingAmount: 0, paymentStatus: 'Paid' },
  { id: 6, invoiceNumber: 'INV-2026-006', clientName: 'SalesPro Ltd', projectName: 'CRM System', invoiceDate: '2026-02-10', dueDate: '2026-03-10', totalAmount: 50000, paidAmount: 50000, pendingAmount: 0, paymentStatus: 'Paid' },
  { id: 7, invoiceNumber: 'INV-2026-007', clientName: 'SalesPro Ltd', projectName: 'CRM System', invoiceDate: '2026-04-01', dueDate: '2026-05-01', totalAmount: 45000, paidAmount: 45000, pendingAmount: 0, paymentStatus: 'Paid' },
  { id: 8, invoiceNumber: 'INV-2026-008', clientName: 'Manufacturing Corp', projectName: 'ERP System', invoiceDate: '2026-04-15', dueDate: '2026-05-15', totalAmount: 40000, paidAmount: 40000, pendingAmount: 0, paymentStatus: 'Paid' },
  { id: 9, invoiceNumber: 'INV-2026-009', clientName: 'Manufacturing Corp', projectName: 'ERP System', invoiceDate: '2026-05-15', dueDate: '2026-06-15', totalAmount: 60000, paidAmount: 0, pendingAmount: 60000, paymentStatus: 'Overdue' },
  { id: 10, invoiceNumber: 'INV-2026-010', clientName: 'RetailMax', projectName: 'UI/UX Redesign', invoiceDate: '2026-04-15', dueDate: '2026-05-15', totalAmount: 90000, paidAmount: 90000, pendingAmount: 0, paymentStatus: 'Paid' }
];

export const profitLossData = [
  { id: 1, project: 'E-commerce Platform', client: 'TechCorp India', budget: 350000, expenses: 238000, revenue: 300000, profitLoss: 62000, margin: 20.7, status: 'Profitable' },
  { id: 2, project: 'Mobile Banking App', client: 'FinanceHub', budget: 280000, expenses: 126000, revenue: 111000, profitLoss: -15000, margin: -13.5, status: 'Loss' },
  { id: 3, project: 'CRM System', client: 'SalesPro Ltd', budget: 95000, expenses: 95000, revenue: 123000, profitLoss: 28000, margin: 22.8, status: 'Profitable' },
  { id: 4, project: 'Healthcare Portal', client: 'MediCare Group', budget: 520000, expenses: 182000, revenue: 270000, profitLoss: 88000, margin: 32.6, status: 'Profitable' },
  { id: 5, project: 'ERP System', client: 'Manufacturing Corp', budget: 200000, expenses: 40000, revenue: 15000, profitLoss: -25000, margin: -166.7, status: 'Loss' },
  { id: 6, project: 'Cyber Security Audit', client: 'TechCorp India', budget: 75000, expenses: 55000, revenue: 67000, profitLoss: 12000, margin: 17.9, status: 'Profitable' },
  { id: 7, project: 'Digital Marketing', client: 'EduTech Solutions', budget: 50000, expenses: 5000, revenue: 23000, profitLoss: 18000, margin: 78.3, status: 'Profitable' },
  { id: 8, project: 'UI/UX Redesign', client: 'RetailMax', budget: 90000, expenses: 67500, revenue: 82500, profitLoss: 15000, margin: 18.2, status: 'Profitable' }
];