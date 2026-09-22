// src/data/clientInvoicesData.js
export const invoiceStatsData = [
  { id: 1, title: 'Total Invoices', value: 18, icon: 'FiFileText', desc: 'All generated invoices', color: 'primary' },
  { id: 2, title: 'Paid Invoices', value: 10, icon: 'FiCheckCircle', desc: 'Fully settled', color: 'success' },
  { id: 3, title: 'Pending Invoices', value: 5, icon: 'FiClock', desc: 'Awaiting payment', color: 'warning' },
  { id: 4, title: 'Overdue Invoices', value: 2, icon: 'FiAlertTriangle', desc: 'Past due date', color: 'danger' },
  { id: 5, title: 'Total Amount', value: '₹8,75,000', icon: 'FiDollarSign', desc: 'All invoices value', color: 'info' },
  { id: 6, title: 'Pending Amount', value: '₹2,40,000', icon: 'FiTrendingDown', desc: 'Yet to be paid', color: 'purple' }
];

export const projects = ['Website Redesign', 'Mobile App UI', 'CRM Development', 'ERP System', 'Cyber Security Audit', 'E-commerce Platform', 'Healthcare Portal'];

export const invoices = [
  { id: 1, invoiceNumber: 'INV-2026-001', projectName: 'Website Redesign', clientName: 'Rahul Sharma', companyName: 'TechCorp India', invoiceDate: '2026-02-15', dueDate: '2026-03-15', totalAmount: 120000, paidAmount: 120000, pendingAmount: 0, taxAmount: 18000, discountAmount: 2000, finalAmount: 118000, invoiceStatus: 'Sent', paymentStatus: 'Paid', description: 'Website redesign - Phase 1 (Homepage & Layout)', paymentTerms: 'Net 30 Days', notes: 'Payment received via bank transfer on March 12, 2026.' },
  { id: 2, invoiceNumber: 'INV-2026-002', projectName: 'Website Redesign', clientName: 'Rahul Sharma', companyName: 'TechCorp India', invoiceDate: '2026-04-01', dueDate: '2026-05-01', totalAmount: 80000, paidAmount: 80000, pendingAmount: 0, taxAmount: 12000, discountAmount: 0, finalAmount: 80000, invoiceStatus: 'Sent', paymentStatus: 'Paid', description: 'Website redesign - Phase 2 (Product Pages)', paymentTerms: 'Net 30 Days', notes: 'Payment received via UPI on April 28, 2026.' },
  { id: 3, invoiceNumber: 'INV-2026-003', projectName: 'Website Redesign', clientName: 'Rahul Sharma', companyName: 'TechCorp India', invoiceDate: '2026-05-15', dueDate: '2026-06-15', totalAmount: 150000, paidAmount: 0, pendingAmount: 150000, taxAmount: 22500, discountAmount: 3000, finalAmount: 147000, invoiceStatus: 'Viewed', paymentStatus: 'Pending', description: 'Website redesign - Phase 3 (Blog & Contact)', paymentTerms: 'Net 30 Days', notes: 'Payment due by June 15, 2026.' },
  { id: 4, invoiceNumber: 'INV-2026-004', projectName: 'Mobile App UI', clientName: 'Rahul Sharma', companyName: 'TechCorp India', invoiceDate: '2026-03-15', dueDate: '2026-04-15', totalAmount: 95000, paidAmount: 95000, pendingAmount: 0, taxAmount: 14250, discountAmount: 1000, finalAmount: 94000, invoiceStatus: 'Sent', paymentStatus: 'Paid', description: 'Mobile app UI design - Phase 1', paymentTerms: 'Net 30 Days', notes: 'Payment received via card on April 10, 2026.' },
  { id: 5, invoiceNumber: 'INV-2026-005', projectName: 'CRM Development', clientName: 'Rahul Sharma', companyName: 'TechCorp India', invoiceDate: '2026-02-10', dueDate: '2026-03-10', totalAmount: 50000, paidAmount: 50000, pendingAmount: 0, taxAmount: 7500, discountAmount: 0, finalAmount: 50000, invoiceStatus: 'Sent', paymentStatus: 'Paid', description: 'CRM system - Requirements & Design', paymentTerms: 'Net 30 Days', notes: 'Payment received via bank transfer on March 5, 2026.' },
  { id: 6, invoiceNumber: 'INV-2026-006', projectName: 'Mobile App UI', clientName: 'Rahul Sharma', companyName: 'TechCorp India', invoiceDate: '2026-05-01', dueDate: '2026-06-01', totalAmount: 65000, paidAmount: 0, pendingAmount: 65000, taxAmount: 9750, discountAmount: 0, finalAmount: 65000, invoiceStatus: 'Viewed', paymentStatus: 'Overdue', description: 'Mobile app UI design - Phase 2', paymentTerms: 'Net 30 Days', notes: 'Payment overdue. Reminder sent on June 5, 2026.' },
  { id: 7, invoiceNumber: 'INV-2026-007', projectName: 'CRM Development', clientName: 'Rahul Sharma', companyName: 'TechCorp India', invoiceDate: '2026-04-01', dueDate: '2026-05-01', totalAmount: 45000, paidAmount: 45000, pendingAmount: 0, taxAmount: 6750, discountAmount: 500, finalAmount: 44500, invoiceStatus: 'Sent', paymentStatus: 'Paid', description: 'CRM system - Development Phase', paymentTerms: 'Net 30 Days', notes: 'Payment received via UPI on April 25, 2026.' },
  { id: 8, invoiceNumber: 'INV-2026-008', projectName: 'ERP System', clientName: 'Rahul Sharma', companyName: 'TechCorp India', invoiceDate: '2026-04-15', dueDate: '2026-05-15', totalAmount: 40000, paidAmount: 40000, pendingAmount: 0, taxAmount: 6000, discountAmount: 0, finalAmount: 40000, invoiceStatus: 'Sent', paymentStatus: 'Paid', description: 'ERP System - Inventory Module', paymentTerms: 'Net 30 Days', notes: 'Payment received via bank transfer on May 10, 2026.' },
  { id: 9, invoiceNumber: 'INV-2026-009', projectName: 'ERP System', clientName: 'Rahul Sharma', companyName: 'TechCorp India', invoiceDate: '2026-05-15', dueDate: '2026-06-15', totalAmount: 60000, paidAmount: 30000, pendingAmount: 30000, taxAmount: 9000, discountAmount: 0, finalAmount: 60000, invoiceStatus: 'Viewed', paymentStatus: 'Partial', description: 'ERP System - HR Module', paymentTerms: 'Net 30 Days', notes: 'Partial payment received. Balance due.' },
  { id: 10, invoiceNumber: 'INV-2026-010', projectName: 'Cyber Security Audit', clientName: 'Rahul Sharma', companyName: 'TechCorp India', invoiceDate: '2026-03-01', dueDate: '2026-04-01', totalAmount: 75000, paidAmount: 75000, pendingAmount: 0, taxAmount: 11250, discountAmount: 0, finalAmount: 75000, invoiceStatus: 'Sent', paymentStatus: 'Paid', description: 'Security assessment - Full audit', paymentTerms: 'Net 30 Days', notes: 'Payment received via card on March 28, 2026.' },
  { id: 11, invoiceNumber: 'INV-2026-011', projectName: 'Website Redesign', clientName: 'Rahul Sharma', companyName: 'TechCorp India', invoiceDate: '2026-06-15', dueDate: '2026-07-15', totalAmount: 100000, paidAmount: 0, pendingAmount: 100000, taxAmount: 15000, discountAmount: 2000, finalAmount: 98000, invoiceStatus: 'Generated', paymentStatus: 'Pending', description: 'Website redesign - Phase 4 (Final Delivery)', paymentTerms: 'Net 30 Days', notes: 'Final invoice for project completion.' },
  { id: 12, invoiceNumber: 'INV-2026-012', projectName: 'E-commerce Platform', clientName: 'Rahul Sharma', companyName: 'TechCorp India', invoiceDate: '2026-04-01', dueDate: '2026-05-01', totalAmount: 85000, paidAmount: 85000, pendingAmount: 0, taxAmount: 12750, discountAmount: 1000, finalAmount: 84000, invoiceStatus: 'Sent', paymentStatus: 'Paid', description: 'E-commerce - Payment Gateway Integration', paymentTerms: 'Net 30 Days', notes: 'Payment received via bank transfer on April 28, 2026.' },
  { id: 13, invoiceNumber: 'INV-2026-013', projectName: 'Healthcare Portal', clientName: 'Rahul Sharma', companyName: 'TechCorp India', invoiceDate: '2026-05-01', dueDate: '2026-06-01', totalAmount: 120000, paidAmount: 0, pendingAmount: 120000, taxAmount: 18000, discountAmount: 0, finalAmount: 120000, invoiceStatus: 'Viewed', paymentStatus: 'Overdue', description: 'Healthcare Portal - Patient Module', paymentTerms: 'Net 30 Days', notes: 'Payment overdue. Follow-up required.' },
  { id: 14, invoiceNumber: 'INV-2026-014', projectName: 'Mobile App UI', clientName: 'Rahul Sharma', companyName: 'TechCorp India', invoiceDate: '2026-06-01', dueDate: '2026-07-01', totalAmount: 55000, paidAmount: 0, pendingAmount: 55000, taxAmount: 8250, discountAmount: 0, finalAmount: 55000, invoiceStatus: 'Generated', paymentStatus: 'Pending', description: 'Mobile app UI - Final Phase', paymentTerms: 'Net 30 Days', notes: '' },
  { id: 15, invoiceNumber: 'INV-2026-015', projectName: 'ERP System', clientName: 'Rahul Sharma', companyName: 'TechCorp India', invoiceDate: '2026-06-10', dueDate: '2026-07-10', totalAmount: 35000, paidAmount: 0, pendingAmount: 35000, taxAmount: 5250, discountAmount: 500, finalAmount: 34500, invoiceStatus: 'Generated', paymentStatus: 'Pending', description: 'ERP System - Finance Module', paymentTerms: 'Net 30 Days', notes: '' }
];

export const billingSummary = {
  totalProjectValue: 1200000,
  totalInvoiced: 875000,
  totalPaid: 635000,
  totalPending: 240000,
  overdueAmount: 185000,
  nextDuePayment: '2026-07-01',
  completionPercentage: 73,
  pendingInvoiceCount: 5
};

export const projectBillingSummary = [
  { projectName: 'Website Redesign', totalValue: 450000, invoiced: 450000, paid: 200000, pending: 250000, paymentStatus: 'Partial' },
  { projectName: 'Mobile App UI', totalValue: 215000, invoiced: 215000, paid: 95000, pending: 120000, paymentStatus: 'Partial' },
  { projectName: 'CRM Development', totalValue: 95000, invoiced: 95000, paid: 95000, pending: 0, paymentStatus: 'Paid' },
  { projectName: 'ERP System', totalValue: 135000, invoiced: 135000, paid: 70000, pending: 65000, paymentStatus: 'Partial' },
  { projectName: 'Cyber Security Audit', totalValue: 75000, invoiced: 75000, paid: 75000, pending: 0, paymentStatus: 'Paid' },
  { projectName: 'E-commerce Platform', totalValue: 85000, invoiced: 85000, paid: 85000, pending: 0, paymentStatus: 'Paid' },
  { projectName: 'Healthcare Portal', totalValue: 120000, invoiced: 120000, paid: 0, pending: 120000, paymentStatus: 'Overdue' }
];

export const paymentHistory = [
  { id: 1, paymentId: 'PAY-001', invoiceNumber: 'INV-2026-001', projectName: 'Website Redesign', paymentDate: '2026-03-12', paymentMethod: 'Bank Transfer', paidAmount: 120000, transactionId: 'TXN123456', status: 'Completed' },
  { id: 2, paymentId: 'PAY-002', invoiceNumber: 'INV-2026-002', projectName: 'Website Redesign', paymentDate: '2026-04-28', paymentMethod: 'UPI', paidAmount: 80000, transactionId: 'UPI789012', status: 'Completed' },
  { id: 3, paymentId: 'PAY-003', invoiceNumber: 'INV-2026-004', projectName: 'Mobile App UI', paymentDate: '2026-04-10', paymentMethod: 'Card', paidAmount: 95000, transactionId: 'CARD345678', status: 'Completed' },
  { id: 4, paymentId: 'PAY-004', invoiceNumber: 'INV-2026-005', projectName: 'CRM Development', paymentDate: '2026-03-05', paymentMethod: 'Bank Transfer', paidAmount: 50000, transactionId: 'TXN901234', status: 'Completed' },
  { id: 5, paymentId: 'PAY-005', invoiceNumber: 'INV-2026-007', projectName: 'CRM Development', paymentDate: '2026-04-25', paymentMethod: 'UPI', paidAmount: 45000, transactionId: 'UPI567890', status: 'Completed' },
  { id: 6, paymentId: 'PAY-006', invoiceNumber: 'INV-2026-008', projectName: 'ERP System', paymentDate: '2026-05-10', paymentMethod: 'Bank Transfer', paidAmount: 40000, transactionId: 'TXN112233', status: 'Completed' },
  { id: 7, paymentId: 'PAY-007', invoiceNumber: 'INV-2026-009', projectName: 'ERP System', paymentDate: '2026-06-10', paymentMethod: 'UPI', paidAmount: 30000, transactionId: 'UPI445566', status: 'Partial' },
  { id: 8, paymentId: 'PAY-008', invoiceNumber: 'INV-2026-010', projectName: 'Cyber Security Audit', paymentDate: '2026-03-28', paymentMethod: 'Card', paidAmount: 75000, transactionId: 'CARD778899', status: 'Completed' }
];