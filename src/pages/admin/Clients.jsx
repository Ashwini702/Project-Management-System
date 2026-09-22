// src/pages/admin/Clients.jsx
import React, { useEffect, useState, useMemo } from 'react';
import * as clientService from '../../services/clientService';
import { apiData } from '../../services/api';
import AdminLayout from '../../layouts/AdminLayout';
import PageHeader from '../../components/common/PageHeader';
import ClientStatsCard from '../../components/clients/ClientStatsCard';
import ClientCard from '../../components/clients/ClientCard';
import ClientTable from '../../components/clients/ClientTable';
import ClientFormModal from '../../components/clients/ClientFormModal';
import ClientStatusBadge from '../../components/clients/ClientStatusBadge';
import ClientProjectList from '../../components/clients/ClientProjectList';
import ClientFeedback from '../../components/clients/ClientFeedback';
import ClientCommunicationHistory from '../../components/clients/ClientCommunicationHistory';
import ClientBillingBox from '../../components/clients/ClientBillingBox';
import { FiSearch, FiRotateCcw, FiGrid, FiList, FiDollarSign, FiX, FiSend } from 'react-icons/fi';
import { clientsData, clientStatsData, industries, projectsForClients, billingSummary } from '../../data/clientData';
import '../../styles/clients.css';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [projectFilter, setProjectFilter] = useState('All Projects');
  const [industryFilter, setIndustryFilter] = useState('All Industries');
  const [paymentFilter, setPaymentFilter] = useState('All Payment Status');
  const [viewMode, setViewMode] = useState('card');

  const [showFormModal, setShowFormModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [messageForm, setMessageForm] = useState({ subject: '', type: 'Email', message: '' });
  const [alert, setAlert] = useState(null);

  const toUiClient = (client) => {
    let assignedProjects = client.assigned_projects || client.assignedProjects || [];
    if (typeof assignedProjects === 'string') {
      try { assignedProjects = JSON.parse(assignedProjects); } catch { assignedProjects = []; }
    }
    const projectValue = Number(client.project_value ?? client.projectValue ?? 0);
    const paidAmount = Number(client.paid_amount ?? client.paidAmount ?? 0);
    return {
      ...client,
      name: client.contact_person || client.name || '',
      company: client.company_name || client.company || '',
      paymentStatus: client.payment_status || client.paymentStatus || 'Pending',
      projectValue,
      paidAmount,
      pendingAmount: projectValue - paidAmount,
      assignedProjects,
      companyLogo: client.company_logo || '',
      completedProjects: client.completedProjects || 0,
      pendingFeedback: client.pendingFeedback || 0,
      lastCommunication: client.lastCommunication || 'Never',
      feedbacks: client.feedbacks || [],
      communications: client.communications || []
    };
  };

  useEffect(() => {
    clientService.getClients()
      .then(response => setClients(apiData(response).map(toUiClient)))
      .catch(error => showAlert(error.response?.data?.message || 'Unable to load clients.', 'danger'));
  }, []);

  const filteredClients = useMemo(() => {
    return clients.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.company.toLowerCase().includes(searchTerm.toLowerCase()) || c.email.toLowerCase().includes(searchTerm.toLowerCase()) || c.phone.includes(searchTerm) || c.assignedProjects.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesStatus = statusFilter === 'All Status' || c.status === statusFilter;
      const matchesProject = projectFilter === 'All Projects' || c.assignedProjects.includes(projectFilter);
      const matchesIndustry = industryFilter === 'All Industries' || c.industry === industryFilter;
      const matchesPayment = paymentFilter === 'All Payment Status' || c.paymentStatus === paymentFilter;
      return matchesSearch && matchesStatus && matchesProject && matchesIndustry && matchesPayment;
    });
  }, [clients, searchTerm, statusFilter, projectFilter, industryFilter, paymentFilter]);

  const resetFilters = () => { setSearchTerm(''); setStatusFilter('All Status'); setProjectFilter('All Projects'); setIndustryFilter('All Industries'); setPaymentFilter('All Payment Status'); };
  const showAlert = (m, t = 'success') => { setAlert({ message: m, type: t }); setTimeout(() => setAlert(null), 3000); };

  const handleAdd = () => { setSelectedClient(null); setShowFormModal(true); };
  const handleEdit = (c) => { setSelectedClient(c); setShowFormModal(true); };
  const handleView = (c) => { setSelectedClient(c); setShowViewModal(true); };
  const handleDelete = (c) => { setSelectedClient(c); setShowDeleteModal(true); };
  const handleMessage = (c) => { setSelectedClient(c); setMessageForm({ subject: '', type: 'Email', message: '' }); setShowMessageModal(true); };

  const confirmDelete = async () => {
    try {
      await clientService.deleteClient(selectedClient.id);
      setClients(clients.filter(c => c.id !== selectedClient.id));
      setShowDeleteModal(false); setSelectedClient(null); showAlert('Client and login account deleted successfully!');
    } catch (error) { showAlert(error.response?.data?.message || 'Unable to delete client.', 'danger'); }
  };

  const handleFormSubmit = async (fd) => {
    const payload = {
      contact_person: fd.name,
      company_name: fd.company,
      email: fd.email,
      phone: fd.phone,
      city: fd.city,
      industry: fd.industry,
      status: fd.status,
      payment_status: fd.paymentStatus,
      project_value: Number(fd.projectValue || 0),
      paid_amount: Number(fd.paidAmount || 0),
      assigned_projects: JSON.stringify(fd.assignedProjects || []),
      notes: fd.notes || '',
      company_logo: fd.companyLogo?.name || '',
      login_email: fd.email,
      ...(fd.password ? { password: fd.password } : {})
    };
    try {
      const response = selectedClient
        ? await clientService.updateClient(selectedClient.id, payload)
        : await clientService.createClient(payload);
      const saved = toUiClient(apiData(response));
      setClients(current => selectedClient
        ? current.map(c => c.id === selectedClient.id ? saved : c)
        : [saved, ...current]);
      showAlert(selectedClient ? 'Client updated successfully!' : 'Client saved successfully!');
      setShowFormModal(false); setSelectedClient(null);
    } catch (error) {
      showAlert(error.response?.data?.message || 'Unable to save client.', 'danger');
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    showAlert('Message sent successfully!');
    setShowMessageModal(false); setSelectedClient(null);
  };

  return (
    <AdminLayout>
      <PageHeader title="Client Management" subtitle="Manage clients, assigned projects, communication, feedback, approvals, files, and billing." buttonText="Add Client" onButtonClick={handleAdd} showButton={true} />
      {alert && <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">{alert.message}<button type="button" className="btn-close" onClick={() => setAlert(null)}></button></div>}

      <div className="client-stats-grid">{clientStatsData.map(s => <ClientStatsCard key={s.id} stat={s} />)}</div>

      <div className="filter-section">
        <div className="filter-row">
          <div className="search-box"><FiSearch className="search-icon" /><input type="text" className="form-control search-input" placeholder="Search by name, company, email, phone, project..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} /></div>
          <div className="filter-selects">
            <select className="form-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}><option value="All Status">All Status</option><option>Active</option><option>Inactive</option><option>Pending</option><option>Completed</option></select>
            <select className="form-select" value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)}><option value="All Projects">All Projects</option>{projectsForClients.map(p => <option key={p} value={p}>{p}</option>)}</select>
            <select className="form-select" value={industryFilter} onChange={(e) => setIndustryFilter(e.target.value)}><option value="All Industries">All Industries</option>{industries.map(i => <option key={i} value={i}>{i}</option>)}</select>
            <select className="form-select" value={paymentFilter} onChange={(e) => setPaymentFilter(e.target.value)}><option value="All Payment Status">All Payment Status</option><option>Paid</option><option>Pending</option><option>Partial</option><option>Overdue</option></select>
          </div>
          <button className="btn btn-light reset-btn" onClick={resetFilters}><FiRotateCcw className="me-2" /> Reset</button>
          <div className="view-toggle">
            <button className={`toggle-btn ${viewMode === 'card' ? 'active' : ''}`} onClick={() => setViewMode('card')}><FiGrid /></button>
            <button className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`} onClick={() => setViewMode('table')}><FiList /></button>
            <button className={`toggle-btn ${viewMode === 'billing' ? 'active' : ''}`} onClick={() => setViewMode('billing')}><FiDollarSign /></button>
          </div>
        </div>
      </div>

      {viewMode === 'card' && (
        <div className="clients-grid">
          {filteredClients.length === 0 ? <div className="no-clients"><p className="text-muted">No clients found</p></div> :
            filteredClients.map(c => <ClientCard key={c.id} client={c} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} onMessage={handleMessage} />)
          }
        </div>
      )}

      {viewMode === 'table' && (
        <div className="clients-table-card"><ClientTable clients={filteredClients} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} onMessage={handleMessage} /></div>
      )}

      {viewMode === 'billing' && (
        <div className="billing-dashboard">
          <div className="billing-summary-grid">
            <div className="billing-summary-card"><h6>Total Revenue</h6><h3>₹{billingSummary.totalRevenue.toLocaleString('en-IN')}</h3></div>
            <div className="billing-summary-card"><h6>Pending Revenue</h6><h3 className="text-warning">₹{billingSummary.pendingRevenue.toLocaleString('en-IN')}</h3></div>
            <div className="billing-summary-card"><h6>Overdue Revenue</h6><h3 className="text-danger">₹{billingSummary.overdueRevenue.toLocaleString('en-IN')}</h3></div>
            <div className="billing-summary-card"><h6>Total Invoices</h6><h3>{billingSummary.totalInvoices}</h3></div>
          </div>
          <div className="billing-clients-grid">
            {filteredClients.map(c => <ClientBillingBox key={c.id} client={c} />)}
          </div>
        </div>
      )}

      <ClientFormModal show={showFormModal} onClose={() => { setShowFormModal(false); setSelectedClient(null); }} onSubmit={handleFormSubmit} editClient={selectedClient} />

      {showViewModal && selectedClient && (
        <div className="modal-overlay"><div className="modal-dialog modal-xl"><div className="modal-content">
          <div className="modal-header"><h5 className="modal-title">{selectedClient.name} - {selectedClient.company}</h5><button className="modal-close-btn" onClick={() => { setShowViewModal(false); setSelectedClient(null); }}><FiX /></button></div>
          <div className="modal-body">
            <div className="client-detail-header">
              <div className="client-detail-avatar">{selectedClient.company.split(' ').map(w => w[0]).join('').substring(0, 2)}</div>
              <div><h4>{selectedClient.name}</h4><p>{selectedClient.company}</p><ClientStatusBadge status={selectedClient.status} /> <ClientStatusBadge status={selectedClient.paymentStatus} type="payment" /> <span className="industry-badge">{selectedClient.industry}</span></div>
            </div>
            <div className="client-detail-grid"><div><strong>Email:</strong> {selectedClient.email}</div><div><strong>Phone:</strong> {selectedClient.phone}</div><div><strong>City:</strong> {selectedClient.city}</div><div><strong>Created:</strong> {selectedClient.createdDate}</div><div><strong>Last Contact:</strong> {selectedClient.lastCommunication}</div></div>
            {selectedClient.notes && <p className="mt-3"><strong>Notes:</strong> {selectedClient.notes}</p>}
            <div className="client-detail-sections mt-4">
              <ClientProjectList assignedProjects={selectedClient.assignedProjects} />
              <ClientBillingBox client={selectedClient} />
            </div>
            <div className="client-detail-sections mt-3">
              <ClientFeedback feedbacks={selectedClient.feedbacks} />
              <ClientCommunicationHistory communications={selectedClient.communications} />
            </div>
          </div>
          <div className="modal-footer"><button className="btn btn-light" onClick={() => { setShowViewModal(false); setSelectedClient(null); }}>Close</button></div>
        </div></div></div>
      )}

      {showDeleteModal && selectedClient && (
        <div className="modal-overlay"><div className="modal-dialog modal-sm client-delete-modal"><div className="modal-content">
          <div className="modal-header"><h5 className="modal-title">Delete Client</h5><button className="modal-close-btn" onClick={() => { setShowDeleteModal(false); setSelectedClient(null); }}><FiX /></button></div>
          <div className="modal-body"><div className="delete-confirmation"><p>Are you sure you want to delete this client?</p><div className="delete-info"><strong>{selectedClient.name}</strong><span>{selectedClient.company}</span></div></div></div>
          <div className="modal-footer"><button className="btn btn-light" onClick={() => { setShowDeleteModal(false); setSelectedClient(null); }}>Cancel</button><button className="btn btn-danger" onClick={confirmDelete}>Delete</button></div>
        </div></div></div>
      )}

      {showMessageModal && selectedClient && (
        <div className="modal-overlay"><div className="modal-dialog"><div className="modal-content">
          <div className="modal-header"><h5 className="modal-title">Send Message to {selectedClient.name}</h5><button className="modal-close-btn" onClick={() => { setShowMessageModal(false); setSelectedClient(null); }}><FiX /></button></div>
          <form onSubmit={handleSendMessage}>
            <div className="modal-body">
              <div className="mb-3"><label className="form-label">Subject</label><input type="text" className="form-control" value={messageForm.subject} onChange={(e) => setMessageForm({...messageForm, subject: e.target.value})} placeholder="Message subject" required /></div>
              <div className="mb-3"><label className="form-label">Type</label><select className="form-select" value={messageForm.type} onChange={(e) => setMessageForm({...messageForm, type: e.target.value})}><option>Email</option><option>WhatsApp</option><option>Call Note</option><option>Meeting Note</option></select></div>
              <div className="mb-3"><label className="form-label">Message</label><textarea className="form-control" rows="4" value={messageForm.message} onChange={(e) => setMessageForm({...messageForm, message: e.target.value})} placeholder="Type your message..." required></textarea></div>
            </div>
            <div className="modal-footer"><button type="button" className="btn btn-light" onClick={() => { setShowMessageModal(false); setSelectedClient(null); }}>Cancel</button><button type="submit" className="btn btn-primary"><FiSend className="me-2" />Send Message</button></div>
          </form>
        </div></div></div>
      )}
    </AdminLayout>
  );
};

export default Clients;


