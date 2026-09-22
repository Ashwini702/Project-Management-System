// src/pages/client/ClientInvoices.jsx
import React, { useState, useMemo, useEffect } from 'react';
import api, { apiData } from '../../services/api';
import * as notificationService from '../../services/notificationService';
import ClientLayout from '../../layouts/ClientLayout';
import ClientInvoiceStatsCard from '../../components/clientInvoices/ClientInvoiceStatsCard';
import ClientInvoiceCard from '../../components/clientInvoices/ClientInvoiceCard';
import ClientInvoiceTable from '../../components/clientInvoices/ClientInvoiceTable';
import ClientInvoiceDetailsModal from '../../components/clientInvoices/ClientInvoiceDetailsModal';
import ClientPaymentModal from '../../components/clientInvoices/ClientPaymentModal';
import ClientPaymentHistory from '../../components/clientInvoices/ClientPaymentHistory';
import ClientBillingSummaryBox from '../../components/clientInvoices/ClientBillingSummaryBox';
import ClientInvoiceFilter from '../../components/clientInvoices/ClientInvoiceFilter';
import { FiDownload, FiCreditCard, FiGrid, FiList, FiPieChart, FiClock, FiX, FiMail } from 'react-icons/fi';
import '../../styles/clientInvoices.css';

const ClientInvoices = () => {
  const [invoiceList, setInvoiceList] = useState([]);
  useEffect(() => {
    api.get('/invoices').then((response) => setInvoiceList(apiData(response).map((invoice) => ({ ...invoice, invoiceNumber: invoice.invoice_number, projectName: invoice.project_name, clientName: invoice.client_name, invoiceDate: invoice.invoice_date, dueDate: invoice.due_date, totalAmount: Number(invoice.total_amount || 0), paidAmount: Number(invoice.paid_amount || 0), pendingAmount: Number(invoice.pending_amount || 0), finalAmount: Number(invoice.final_amount || 0), invoiceStatus: invoice.invoice_status, paymentStatus: invoice.payment_status })))).catch(() => setInvoiceList([]));
  }, []);
  const [filters, setFilters] = useState({ search: '', project: 'All Projects', invoiceStatus: 'All Invoice Status', paymentStatus: 'All Payment Status' });
  const [viewMode, setViewMode] = useState('card');
  const [alert, setAlert] = useState(null);

  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageForm, setMessageForm] = useState({ recipientRole: 'Project Manager', subject: '', message: '' });

  const showAlert = (m, t = 'info') => { setAlert({ message: m, type: t }); setTimeout(() => setAlert(null), 2000); };

  const invoiceStatsData = useMemo(() => {
    const total = invoiceList.length;
    const paid = invoiceList.filter((invoice) => invoice.paymentStatus === 'Paid').length;
    const pending = invoiceList.filter((invoice) => ['Pending', 'Overdue'].includes(invoice.paymentStatus)).length;
    const totalAmount = invoiceList.reduce((sum, invoice) => sum + Number(invoice.finalAmount ?? invoice.totalAmount ?? 0), 0);
    return [
      { id: 'total', title: 'Total Invoices', value: total, icon: 'FiFileText', desc: 'Saved invoices', color: 'primary' },
      { id: 'paid', title: 'Paid Invoices', value: paid, icon: 'FiCheckCircle', desc: 'Paid invoices', color: 'success' },
      { id: 'pending', title: 'Pending Invoices', value: pending, icon: 'FiClock', desc: 'Awaiting payment', color: 'warning' },
      { id: 'amount', title: 'Total Amount', value: "₹", icon: 'FiDollarSign', desc: 'Saved invoice value', color: 'info' }
    ];
  }, [invoiceList]);

  const filteredInvoices = useMemo(() => {
    return invoiceList.filter(inv => {
      const matchesSearch = !filters.search || inv.invoiceNumber.toLowerCase().includes(filters.search.toLowerCase()) || inv.projectName.toLowerCase().includes(filters.search.toLowerCase());
      const matchesProject = filters.project === 'All Projects' || inv.projectName === filters.project;
      const matchesInvStatus = filters.invoiceStatus === 'All Invoice Status' || inv.invoiceStatus === filters.invoiceStatus;
      const matchesPayStatus = filters.paymentStatus === 'All Payment Status' || inv.paymentStatus === filters.paymentStatus;
      return matchesSearch && matchesProject && matchesInvStatus && matchesPayStatus;
    });
  }, [invoiceList, filters]);

  const resetFilters = () => setFilters({ search: '', project: 'All Projects', invoiceStatus: 'All Invoice Status', paymentStatus: 'All Payment Status' });

  const downloadCsv = (filename, rows) => {
    const escape = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`;
    const csv = rows.map((row) => row.map(escape).join(',')).join('\r\n');
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    const link = document.createElement('a'); link.href = url; link.download = filename; link.click(); URL.revokeObjectURL(url);
  };
  const handleStatementDownload = () => {
    if (!filteredInvoices.length) { showAlert('There are no invoices to include in the statement.', 'warning'); return; }
    const rows = [['Invoice Number', 'Project', 'Invoice Date', 'Due Date', 'Total Amount', 'Paid Amount', 'Pending Amount', 'Invoice Status', 'Payment Status'], ...filteredInvoices.map((invoice) => [invoice.invoiceNumber, invoice.projectName, invoice.invoiceDate, invoice.dueDate, invoice.finalAmount ?? invoice.totalAmount, invoice.paidAmount, invoice.pendingAmount, invoice.invoiceStatus, invoice.paymentStatus])];
    downloadCsv(`invoice-statement-${new Date().toISOString().slice(0, 10)}.csv`, rows);
    showAlert('Invoice statement downloaded.', 'success');
  };
  const handleView = (inv) => { setSelectedInvoice(inv); setShowDetailsModal(true); };
  const handleDownload = (invoice) => {
    if (!invoice) return handleStatementDownload();
    const money = (value) => '₹' + Number(value || 0).toLocaleString('en-IN');
    const receipt = '<!doctype html><html><head><meta charset="utf-8"><title>Invoice Receipt</title><style>body{font-family:Arial;padding:32px;background:#f4f7fb}.receipt{max-width:760px;margin:auto;background:#fff;padding:40px;border:1px solid #d5e2f2;border-radius:12px}h1{color:#168fe5}.row{display:flex;justify-content:space-between;border-bottom:1px solid #e5edf6;padding:12px 0}.label{font-weight:700}.total{font-size:20px;color:#168fe5}</style></head><body><main class="receipt"><h1>Invoice Receipt</h1><p>'+invoice.invoiceNumber+'</p><div class="row"><span class="label">Client</span><span>'+(invoice.clientName||invoice.client_name||'')+'</span></div><div class="row"><span class="label">Project</span><span>'+(invoice.projectName||invoice.project_name||'')+'</span></div><div class="row"><span class="label">Invoice date</span><span>'+(invoice.invoiceDate||invoice.invoice_date||'')+'</span></div><div class="row"><span class="label">Due date</span><span>'+(invoice.dueDate||invoice.due_date||'')+'</span></div><div class="row"><span class="label">Total</span><span>'+money(invoice.finalAmount??invoice.totalAmount)+'</span></div><div class="row"><span class="label">Paid</span><span>'+money(invoice.paidAmount)+'</span></div><div class="row total"><span class="label">Pending</span><span>'+money(invoice.pendingAmount)+'</span></div><p>Status: '+(invoice.paymentStatus||invoice.invoiceStatus||'')+'</p></main></body></html>';
    const receiptWindow = window.open('', '_blank');
    if (!receiptWindow) { showAlert('Please allow pop-ups to print the invoice receipt.', 'warning'); return; }
    receiptWindow.document.open(); receiptWindow.document.write(receipt); receiptWindow.document.close();
    receiptWindow.onload = () => { receiptWindow.focus(); receiptWindow.print(); };
    showAlert('Invoice opened for printing.', 'success');
  };
  const handlePay = (inv) => { setSelectedInvoice(inv); setShowPaymentModal(true); };
  const handleMessage = (invoice) => {
    setSelectedInvoice(invoice);
    setMessageForm({ recipientRole: 'Project Manager', subject: `Invoice ${invoice?.invoiceNumber || ''}`, message: '' });
    setShowMessageModal(true);
  };
  const handleMessageSubmit = async (event) => {
    event.preventDefault();
    if (!messageForm.message.trim()) { showAlert('Please enter a message.', 'warning'); return; }
    try {
      await notificationService.createNotification({
        title: messageForm.subject.trim() || `Invoice ${selectedInvoice?.invoiceNumber || ''}`,
        message: messageForm.message.trim(), type: 'General Message', recipient_role: messageForm.recipientRole,
        recipient_user: 'All', related_project: selectedInvoice?.projectName || '', related_task: selectedInvoice?.invoiceNumber || '',
        priority: 'Medium', status: 'Sent', channels: JSON.stringify(['System'])
      });
      setShowMessageModal(false); showAlert(`Message sent to ${messageForm.recipientRole} and saved in the database.`, 'success');
    } catch (error) { showAlert(error.response?.data?.message || 'Unable to send message.', 'danger'); }
  };

  const handlePaymentSubmit = (invoiceId, amount) => {
    setInvoiceList(invoiceList.map(inv => {
      if (inv.id === invoiceId) {
        const newPaid = inv.paidAmount + amount;
        const newPending = inv.totalAmount - newPaid;
        const newStatus = newPending <= 0 ? 'Paid' : 'Partial';
        return { ...inv, paidAmount: newPaid, pendingAmount: newPending > 0 ? newPending : 0, paymentStatus: newStatus };
      }
      return inv;
    }));
    setShowPaymentModal(false);
    showAlert('Payment submitted! This is frontend demo.', 'success');
  };

  return (
    <ClientLayout>
      <div className="cinv-dashboard">
        <div className="cinv-dash-header">
          <div><h3>Invoices</h3><p>View invoices, payment history, due dates, pending payments, billing summary, and project payment status.</p></div>
          <div className="d-flex gap-2">
            <button className="btn btn-outline-primary btn-sm" onClick={handleStatementDownload}><FiDownload /> Download Statement</button>
            <button className="btn btn-primary btn-sm" onClick={() => { const pending = invoiceList.find(i => i.paymentStatus === 'Pending' || i.paymentStatus === 'Overdue'); if (pending) handlePay(pending); else showAlert('No pending invoices.', 'warning'); }}><FiCreditCard /> Pay Pending</button>
          </div>
        </div>
        {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`}>{alert.message}<button className="btn-close" onClick={() => setAlert(null)}></button></div>}

        <div className="cinv-stats-grid">{invoiceStatsData.map(s => <ClientInvoiceStatsCard key={s.id} stat={s} />)}</div>
        <ClientInvoiceFilter filters={filters} setFilters={setFilters} onReset={resetFilters} />

        <div className="view-toggle mb-3">
          <button className={`toggle-btn ${viewMode === 'card' ? 'active' : ''}`} onClick={() => setViewMode('card')}><FiGrid /></button>
          <button className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`} onClick={() => setViewMode('table')}><FiList /></button>
          <button className={`toggle-btn ${viewMode === 'billing' ? 'active' : ''}`} onClick={() => setViewMode('billing')}><FiPieChart /></button>
          <button className={`toggle-btn ${viewMode === 'history' ? 'active' : ''}`} onClick={() => setViewMode('history')}><FiClock /></button>
        </div>

        {viewMode === 'card' && <div className="cinv-cards-grid">{filteredInvoices.length === 0 ? <p className="text-center text-muted py-5">No invoices found</p> : filteredInvoices.map(inv => <ClientInvoiceCard key={inv.id} invoice={inv} onView={handleView} onDownload={handleDownload} onPay={handlePay} onMessage={handleMessage} />)}</div>}
        {viewMode === 'table' && <div className="cinv-table-card"><ClientInvoiceTable invoices={filteredInvoices} onView={handleView} onDownload={handleDownload} onPay={handlePay} onMessage={handleMessage} /></div>}
        {viewMode === 'billing' && <ClientBillingSummaryBox invoices={invoiceList} />}
        {viewMode === 'history' && <ClientPaymentHistory onAlert={showAlert} />}

        <ClientInvoiceDetailsModal show={showDetailsModal} onClose={() => setShowDetailsModal(false)} invoice={selectedInvoice} onDownload={handleDownload} onPay={handlePay} onMessage={handleMessage} />
        <ClientPaymentModal show={showPaymentModal} onClose={() => setShowPaymentModal(false)} invoice={selectedInvoice} onSubmit={handlePaymentSubmit} />
        {showMessageModal && <div className="cinv-modal-overlay"><div className="modal-dialog cinv-message-dialog"><div className="modal-content cinv-details-modal"><div className="modal-header"><h5 className="modal-title">Send Invoice Message</h5><button type="button" className="modal-close-btn" onClick={() => setShowMessageModal(false)}><FiX /></button></div><form onSubmit={handleMessageSubmit}><div className="modal-body"><div className="mb-3"><label className="form-label">Invoice</label><input className="form-control" value={selectedInvoice?.invoiceNumber || ''} readOnly /></div><div className="mb-3"><label className="form-label">Send To</label><select className="form-select" value={messageForm.recipientRole} onChange={(event) => setMessageForm((current) => ({ ...current, recipientRole: event.target.value }))}><option value="Project Manager">Project Manager</option><option value="Admin">Admin</option></select></div><div className="mb-3"><label className="form-label">Subject</label><input className="form-control" value={messageForm.subject} onChange={(event) => setMessageForm((current) => ({ ...current, subject: event.target.value }))} /></div><div><label className="form-label">Message *</label><textarea className="form-control" rows="4" placeholder="Write your invoice-related message..." value={messageForm.message} onChange={(event) => setMessageForm((current) => ({ ...current, message: event.target.value }))} /></div></div><div className="modal-footer"><button type="button" className="btn btn-light" onClick={() => setShowMessageModal(false)}>Cancel</button><button type="submit" className="btn btn-primary"><FiMail /> Send Message</button></div></form></div></div></div>}
      </div>
    </ClientLayout>
  );
};

export default ClientInvoices;
