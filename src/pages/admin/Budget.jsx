// src/pages/admin/Budget.jsx
import usePersistentState from '../../hooks/usePersistentState';
import React, { useEffect, useState, useMemo } from 'react';
import * as budgetService from '../../services/budgetService';
import api, { apiData } from '../../services/api';
import AdminLayout from '../../layouts/AdminLayout';
import PageHeader from '../../components/common/PageHeader';
import BudgetStatsCard from '../../components/budget/BudgetStatsCard';
import BudgetOverviewCard from '../../components/budget/BudgetOverviewCard';
import ExpenseTable from '../../components/budget/ExpenseTable';
import ExpenseFormModal from '../../components/budget/ExpenseFormModal';
import PaymentStatusBadge from '../../components/budget/PaymentStatusBadge';
import BudgetProgressBar from '../../components/budget/BudgetProgressBar';
import InvoiceCard from '../../components/budget/InvoiceCard';
import ProfitLossBox from '../../components/budget/ProfitLossBox';
import ClientBillingTable from '../../components/budget/ClientBillingTable';
import { FiSearch, FiRotateCcw, FiDollarSign, FiList, FiFileText, FiPieChart, FiBarChart2, FiX, FiPlus } from 'react-icons/fi';
import { budgetStatsData, projectBudgets, expenses, invoices, projectsForBudget, clientsForBudget, expenseCategories, paymentStatuses } from '../../data/budgetData';
import '../../styles/budget.css';

const Budget = () => {
  const [activeView, setActiveView] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [projectFilter, setProjectFilter] = useState('All Projects');
  const [clientFilter, setClientFilter] = useState('All Clients');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [dateFilter, setDateFilter] = useState('This Month');

  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [alert, setAlert] = useState(null);

  const [expenseData, setExpenseData] = useState([]);
  const [invoiceData, setInvoiceData] = useState([]);
  const [budgetData, setBudgetData] = useState([]);
  const [billingData, setBillingData] = useState([]);

  const showAlert = (m, t = 'success') => { setAlert({ message: m, type: t }); setTimeout(() => setAlert(null), 3000); };
  const toUiExpense = (expense) => ({
    ...expense,
    project: expense.project_name || expense.project || '',
    client: expense.client_name || expense.client || '',
    amount: Number(expense.amount || 0),
    expenseDate: expense.expense_date || expense.expenseDate || '',
    paymentMethod: expense.payment_method || expense.paymentMethod || ''
  });

  const toUiBudget = (budget) => ({
    ...budget,
    projectName: budget.project_name || budget.projectName || '',
    clientName: budget.client_name || budget.clientName || '',
    totalBudget: Number(budget.total_budget || 0),
    usedBudget: Number(budget.used_budget || 0),
    remainingBudget: Number(budget.remaining_budget ?? (Number(budget.total_budget || 0) - Number(budget.used_budget || 0))),
    paymentStatus: budget.payment_status || budget.paymentStatus || 'Pending',
    profitLoss: Number(budget.profit_loss || 0),
    startDate: budget.start_date || budget.startDate || '',
    endDate: budget.end_date || budget.endDate || ''
  });

  useEffect(() => {
    Promise.all([budgetService.getBudgets(), budgetService.getExpenses(), api.get('/invoices')])
      .then(([budgetsResponse, expensesResponse, invoiceRows]) => {
        setBudgetData(apiData(budgetsResponse).map(toUiBudget));
        setExpenseData(apiData(expensesResponse).map(toUiExpense));
        setInvoiceData(apiData(invoiceRows).map(i => ({ ...i, invoiceNumber: i.invoice_number, projectName: i.project_name, clientName: i.client_name, invoiceStatus: i.invoice_status, paymentStatus: i.payment_status, totalAmount: Number(i.total_amount || 0), paidAmount: Number(i.paid_amount || 0), pendingAmount: Number(i.pending_amount || 0), finalAmount: Number(i.final_amount || 0) })));
      })
      .catch(error => showAlert(error.response?.data?.message || 'Unable to load budget and expense data.', 'danger'));
  }, []);

  const resetFilters = () => { setSearchTerm(''); setProjectFilter('All Projects'); setClientFilter('All Clients'); setStatusFilter('All Status'); setCategoryFilter('All Categories'); setDateFilter('This Month'); };

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const matchesSearch = (item) => {
    if (!normalizedSearch) return true;
    return Object.values(item).some(value => String(value ?? '').toLowerCase().includes(normalizedSearch));
  };
  const matchesProject = (item) => projectFilter === 'All Projects' || item.project === projectFilter || item.projectName === projectFilter;
  const matchesClient = (item) => clientFilter === 'All Clients' || item.client === clientFilter || item.clientName === clientFilter;
  const matchesStatus = (item) => statusFilter === 'All Status' || item.status === statusFilter || item.paymentStatus === statusFilter;

  const filteredBudgets = useMemo(() => {
    return budgetData.filter(item => matchesSearch(item) && matchesProject(item) && matchesClient(item) && matchesStatus(item));
  }, [budgetData, normalizedSearch, projectFilter, clientFilter, statusFilter]);

  const filteredExpenses = useMemo(() => {
    return expenseData.filter(item => {
      const categoryMatches = categoryFilter === 'All Categories' || item.category === categoryFilter;
      return matchesSearch(item) && matchesProject(item) && matchesClient(item) && matchesStatus(item) && categoryMatches;
    });
  }, [expenseData, normalizedSearch, projectFilter, clientFilter, statusFilter, categoryFilter]);

  const filteredBillings = useMemo(() => {
    return billingData.filter(item => matchesSearch(item) && matchesProject(item) && matchesClient(item) && matchesStatus(item));
  }, [billingData, normalizedSearch, projectFilter, clientFilter, statusFilter]);

  const filteredInvoices = useMemo(() => {
    return invoiceData.filter(item => matchesSearch(item) && matchesProject(item) && matchesClient(item) && matchesStatus(item));
  }, [invoiceData, normalizedSearch, projectFilter, clientFilter, statusFilter]);

  const filteredProfitLoss = useMemo(() => [], []);

  const handleAddExpense = () => { setSelectedItem(null); setShowExpenseModal(true); };
  const handleEditExpense = (e) => { setSelectedItem(e); setShowExpenseModal(true); };
  const handleViewItem = (item) => { setSelectedItem(item); setShowViewModal(true); };
  const handleDeleteItem = (item) => { setSelectedItem(item); setShowDeleteModal(true); };
  const handleMarkPaid = () => showAlert('Billing payments are not configured yet.', 'info');

  const confirmDelete = async () => {
    try {
      await budgetService.deleteExpense(selectedItem.id);
      setExpenseData(current => current.filter(expense => expense.id !== selectedItem.id));
      setShowDeleteModal(false); setSelectedItem(null); showAlert('Record deleted successfully!');
    } catch (error) { showAlert(error.response?.data?.message || 'Unable to delete expense.', 'danger'); }
  };

  const handleExpenseSubmit = async (fd) => {
    const payload = {
      title: fd.title, project_name: fd.project, client_name: fd.client, team_member_name: fd.teamMember,
      category: fd.category, amount: Number(fd.amount), expense_date: fd.expenseDate,
      payment_method: fd.paymentMethod, status: fd.status, notes: fd.notes,
      receipt: typeof fd.receipt === 'string' ? fd.receipt : fd.receipt?.name || ''
    };
    try {
      const response = selectedItem
        ? await budgetService.updateExpense(selectedItem.id, payload)
        : await budgetService.createExpense(payload);
      const saved = toUiExpense(apiData(response));
      if (selectedItem) setExpenseData(current => current.map(expense => expense.id === selectedItem.id ? saved : expense));
      else {
        const refreshed = await budgetService.getExpenses();
        setExpenseData(apiData(refreshed).map(toUiExpense));
      }
      showAlert(selectedItem ? 'Expense updated!' : 'Expense saved!');
      setActiveView('expenses');
      setShowExpenseModal(false); setSelectedItem(null);
    } catch (error) { showAlert(error.response?.data?.message || 'Unable to save expense.', 'danger'); }
  };

  const handleInvoiceAction = async (invoice, action) => {
    if (action === 'Send') {      try {
        await api.post('/notifications', { title: 'Invoice ' + (invoice.invoiceNumber || ''), message: 'A new invoice for ₹' + Number(invoice.totalAmount || 0).toLocaleString('en-IN') + ' has been generated for project ' + (invoice.projectName || '') + '.', type: 'Invoice', recipient_role: 'Client', recipient_user: invoice.clientName, related_project: invoice.projectName || '', related_task: invoice.invoiceNumber || '', priority: 'Medium', status: 'Sent', channels: JSON.stringify(['System']) });
        showAlert('Invoice sent to ' + invoice.clientName + ' and saved in notifications.', 'success'); window.alert('Invoice sent successfully to ' + invoice.clientName + '. The client can view it in Notifications.'); return;
      } catch (error) { showAlert(error.response?.data?.message || 'Unable to send invoice.', 'danger'); return; }
    }
    if (action !== 'Download') { showAlert('Invoice ' + action + ' is not available yet.', 'info'); return; }
    const rows = [['Invoice Number','Client','Project','Issued Date','Due Date','Total','Paid','Pending','Status'], [invoice.invoiceNumber, invoice.clientName, invoice.projectName, invoice.invoiceDate || '', invoice.dueDate || '', invoice.totalAmount || 0, invoice.paidAmount || 0, invoice.pendingAmount || 0, invoice.paymentStatus || 'Pending']];
    const csv = rows.map((row) => row.map((value) => '"' + String(value ?? '').replace(/"/g, '""') + '"').join(',')).join('\r\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    const link = document.createElement('a'); link.href = url; link.download = (invoice.invoiceNumber || 'invoice') + '.csv'; link.click(); URL.revokeObjectURL(url);
    showAlert('Invoice downloaded.', 'success');
  };
  const handleCreateInvoice = async () => {
    const projectName = window.prompt('Project name:'); if (!projectName) return;
    const clientName = window.prompt('Client name:'); if (!clientName) return;
    const amount = Number(window.prompt('Total amount (₹):', '0')); if (!amount || amount <= 0) return showAlert('Enter a valid amount.', 'danger');
    try { const response = await api.post('/invoices', { invoice_number: `INV-${Date.now()}`, project_name: projectName, client_name: clientName, invoice_date: new Date().toISOString().slice(0,10), total_amount: amount, final_amount: amount, pending_amount: amount, invoice_status: 'Generated', payment_status: 'Pending' }); const i = apiData(response); setInvoiceData(current => [{ ...i, invoiceNumber: i.invoice_number, projectName: i.project_name, clientName: i.client_name, invoiceStatus: i.invoice_status, paymentStatus: i.payment_status, totalAmount: Number(i.total_amount || 0), paidAmount: Number(i.paid_amount || 0), pendingAmount: Number(i.pending_amount || 0), finalAmount: Number(i.final_amount || 0) }, ...current]); setActiveView('invoices'); showAlert('Invoice saved to database.', 'success'); } catch (error) { showAlert(error.response?.data?.message || 'Unable to save invoice.', 'danger'); }
  };

  const views = [
    { key: 'overview', label: 'Budget Overview', icon: FiDollarSign },
    { key: 'expenses', label: 'Expenses', icon: FiList },
    { key: 'billing', label: 'Client Billing', icon: FiFileText },
    { key: 'invoices', label: 'Invoices', icon: FiFileText },
    { key: 'profitloss', label: 'Profit/Loss', icon: FiPieChart }
  ];

  return (
    <AdminLayout>
      <div className="budget-page">
      <PageHeader title="Budget & Expense Management" subtitle="Track project budgets, expenses, invoices, payments, client billing, and profit/loss reports." showButton={false}>
        <div className="d-flex gap-2">
          <button className="btn btn-primary btn-sm" onClick={handleAddExpense}><FiPlus /> Add Expense</button>
          <button className="btn btn-outline-primary btn-sm" onClick={handleCreateInvoice}><FiFileText /> Create Invoice</button>
        </div>
      </PageHeader>
      {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`}>{alert.message}<button className="btn-close" onClick={() => setAlert(null)}></button></div>}

      <div className="bgt-stats-grid">{budgetStatsData.map(s => <BudgetStatsCard key={s.id} stat={s} />)}</div>

      <div className="filter-section"><div className="filter-row">
        <div className="search-box"><FiSearch className="search-icon" /><input type="text" className="form-control search-input" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
        <div className="filter-selects">
          <select className="form-select" value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)}><option value="All Projects">All Projects</option>{projectsForBudget.map(p => <option key={p} value={p}>{p}</option>)}</select>
          <select className="form-select" value={clientFilter} onChange={(e) => setClientFilter(e.target.value)}><option value="All Clients">All Clients</option>{clientsForBudget.map(c => <option key={c} value={c}>{c}</option>)}</select>
          <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}><option value="All Status">All Status</option>{paymentStatuses.map(s => <option key={s} value={s}>{s}</option>)}</select>
          <select className="form-select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}><option value="All Categories">All Categories</option>{expenseCategories.map(c => <option key={c} value={c}>{c}</option>)}</select>
        </div>
        <button className="btn btn-light reset-btn" onClick={resetFilters}><FiRotateCcw className="me-2" /> Reset</button>
      </div></div>

      <div className="view-toggle-buttons mb-4">
        {views.map(v => (
          <button key={v.key} className={`view-btn-budget ${activeView === v.key ? 'active' : ''}`} onClick={() => setActiveView(v.key)}>
            <v.icon className="me-1" /> {v.label}
          </button>
        ))}
      </div>

      {activeView === 'overview' && (
        <div className="budget-overview-grid">
          {filteredBudgets.length === 0 ? <div className="budget-empty-state"><p className="text-muted">No budget records found</p></div> :
            filteredBudgets.map(b => <BudgetOverviewCard key={b.id} budget={b} onView={handleViewItem} onEdit={handleViewItem} onAddExpense={handleAddExpense} />)
          }
        </div>
      )}

      {activeView === 'expenses' && (
        <div className="budget-table-card"><ExpenseTable expenses={filteredExpenses} onView={handleViewItem} onEdit={handleEditExpense} onDelete={handleDeleteItem} /></div>
      )}

      {activeView === 'billing' && (
        <div className="budget-table-card"><ClientBillingTable billings={filteredBillings} onView={handleViewItem} onMarkPaid={handleMarkPaid} /></div>
      )}

      {activeView === 'invoices' && (
        <div className="invoices-grid">
          {filteredInvoices.length === 0 ? <div className="budget-empty-state"><p className="text-muted">No invoices found</p></div> :
            filteredInvoices.map(inv => <InvoiceCard key={inv.id} invoice={inv} onView={handleViewItem} onAction={handleInvoiceAction} />)
          }
        </div>
      )}

      {activeView === 'profitloss' && <ProfitLossBox data={filteredProfitLoss} />}

      <ExpenseFormModal show={showExpenseModal} onClose={() => { setShowExpenseModal(false); setSelectedItem(null); }} onSubmit={handleExpenseSubmit} editExpense={selectedItem} />

      {showViewModal && selectedItem && (
        <div className="modal-overlay budget-invoice-view-overlay"><div className="modal-dialog budget-invoice-view-modal"><div className="modal-content">
          <div className="modal-header"><h5 className="modal-title">{selectedItem.title || selectedItem.projectName || selectedItem.clientName || 'Details'}</h5><button className="modal-close-btn" onClick={() => { setShowViewModal(false); setSelectedItem(null); }}><FiX /></button></div>
          <div className="modal-body">
            {selectedItem.title && <div><p><strong>Title:</strong> {selectedItem.title}</p><p><strong>Project:</strong> {selectedItem.project}</p><p><strong>Client:</strong> {selectedItem.client}</p><p><strong>Amount:</strong> ₹{selectedItem.amount?.toLocaleString?.('en-IN') || selectedItem.amount}</p><p><strong>Date:</strong> {selectedItem.expenseDate}</p><p><strong>Status:</strong> <PaymentStatusBadge status={selectedItem.status} /></p></div>}
            {selectedItem.projectName && !selectedItem.title && <div><p><strong>Project:</strong> {selectedItem.projectName}</p><p><strong>Client:</strong> {selectedItem.clientName}</p><p><strong>Budget:</strong> ₹{selectedItem.totalBudget?.toLocaleString('en-IN')}</p><p><strong>Used:</strong> ₹{selectedItem.usedBudget?.toLocaleString('en-IN')}</p><p><strong>Remaining:</strong> ₹{selectedItem.remainingBudget?.toLocaleString('en-IN')}</p><BudgetProgressBar used={selectedItem.usedBudget} total={selectedItem.totalBudget} /></div>}
            {selectedItem.invoiceNumber && <div><p><strong>Invoice:</strong> {selectedItem.invoiceNumber}</p><p><strong>Client:</strong> {selectedItem.clientName}</p><p><strong>Total:</strong> ₹{selectedItem.totalAmount?.toLocaleString('en-IN')}</p><p><strong>Paid:</strong> ₹{selectedItem.paidAmount?.toLocaleString('en-IN')}</p><p><strong>Status:</strong> <PaymentStatusBadge status={selectedItem.paymentStatus} /></p></div>}
          </div>
          <div className="modal-footer"><button className="btn btn-light" onClick={() => { setShowViewModal(false); setSelectedItem(null); }}>Close</button></div>
        </div></div></div>
      )}

      {showDeleteModal && selectedItem && (
        <div className="modal-overlay"><div className="modal-dialog modal-sm"><div className="modal-content">
          <div className="modal-header"><h5 className="modal-title">Delete Record</h5><button className="modal-close-btn" onClick={() => { setShowDeleteModal(false); setSelectedItem(null); }}><FiX /></button></div>
          <div className="modal-body"><div className="delete-confirmation"><p>Are you sure you want to delete this record?</p><div className="delete-info"><strong>{selectedItem.title || selectedItem.invoiceNumber || 'Record'}</strong></div></div></div>
          <div className="modal-footer"><button className="btn btn-light" onClick={() => { setShowDeleteModal(false); setSelectedItem(null); }}>Cancel</button><button className="btn btn-danger" onClick={confirmDelete}>Delete</button></div>
        </div></div></div>
      )}
      </div>
    </AdminLayout>
  );
};

export default Budget;







