import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClientLayout from '../../layouts/ClientLayout';
import PageHeader from '../../components/common/PageHeader';
import * as notificationService from '../../services/notificationService';
import { apiData } from '../../services/api';

const ClientNotifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => { notificationService.getNotifications().then(response => setNotifications(apiData(response))).catch(err => setError(err.response?.data?.message || 'Unable to load notifications.')); }, []);
  return <ClientLayout><PageHeader title="Notifications" subtitle="View messages, feedback responses, project updates, and alerts sent to you." showButton={false} />
    {error && <div className="alert alert-danger">{error}</div>}
    <div className="clp-table-card"><div className="p-3">{notifications.length === 0 ? <p className="text-muted text-center py-4">No notifications yet.</p> : notifications.map(item => <div key={item.id} className="border rounded p-3 mb-3 bg-light"><div className="d-flex justify-content-between gap-3"><strong>{item.title}</strong><small className="text-muted">{String(item.created_at || '').replace('T',' ').slice(0,16)}</small></div><p className="mb-2 mt-2">{item.message}</p><small className="text-muted">From: {item.sender_name || 'System'} ({item.sender_role || 'System'})</small>{item.type === 'Invoice' && <button className="btn btn-outline-primary btn-sm ms-2" onClick={() => navigate('/client/invoices')}>Open Invoice</button>}</div>)}</div></div>
  </ClientLayout>;
};
export default ClientNotifications;