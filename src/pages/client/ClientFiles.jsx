import React, { useEffect, useMemo, useState } from 'react';
import ClientLayout from '../../layouts/ClientLayout';
import PageHeader from '../../components/common/PageHeader';
import FileUploadField from '../../components/common/FileUploadField';
import { FiCheckCircle, FiDownload, FiFileText, FiSearch, FiSend, FiX } from 'react-icons/fi';
import * as projectService from '../../services/projectService';
import * as documentService from '../../services/documentService';
import { apiData } from '../../services/api';
import '../../styles/clientFiles.css';

const emptySendForm = { project: '', recipientRole: 'Admin', title: '', note: '', file: null };
const fileSize = (value) => value ? `${Math.max(1, Math.round(Number(value) / 1024))} KB` : '—';

const ClientFiles = () => {
  const [fileList, setFileList] = useState([]);
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSendModal, setShowSendModal] = useState(false);
  const [sendForm, setSendForm] = useState(emptySendForm);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [downloadId, setDownloadId] = useState(null);

  const loadFiles = async () => {
    setLoading(true);
    try {
      const [projectsResponse, documentsResponse] = await Promise.all([projectService.getProjects(), documentService.getDocuments()]);
      const projectRows = apiData(projectsResponse);
      const names = new Map(projectRows.map((project) => [Number(project.id), project.title]));
      setProjects(projectRows);
      setFileList(apiData(documentsResponse).map((file) => ({
        id: file.id, name: file.file_name, projectId: Number(file.project_id),
        project: names.get(Number(file.project_id)) || 'Project', type: file.file_type || 'Document',
        size: fileSize(file.file_size), date: String(file.created_at || '').slice(0, 10)
      })));
    } catch (error) { setErrorMessage(error.response?.data?.message || 'Unable to load project files.'); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadFiles(); }, []);

  const filteredFiles = useMemo(() => fileList.filter((file) => `${file.name} ${file.project} ${file.type}`.toLowerCase().includes(searchTerm.toLowerCase())), [fileList, searchTerm]);
  const openSendModal = () => { setSendForm(emptySendForm); setErrors({}); setShowSendModal(true); };
  const closeSendModal = () => { setShowSendModal(false); setErrors({}); };
  const handleFormChange = (event) => { const { name, value } = event.target; setSendForm((current) => ({ ...current, [name]: value })); setErrors((current) => ({ ...current, [name]: '' })); };

  const handleSendFile = async (event) => {
    event.preventDefault();
    const nextErrors = {};
    if (!sendForm.project) nextErrors.project = 'Please select a project.';
    if (!sendForm.file) nextErrors.file = 'Please select a file.';
    if (Object.keys(nextErrors).length) { setErrors(nextErrors); return; }
    try {
      const formData = new FormData();
      formData.append('project_id', sendForm.project);
      formData.append('recipient_role', sendForm.recipientRole);
      formData.append('file', sendForm.file);
      const response = await documentService.uploadDocument(formData);
      const saved = apiData(response);
      const project = projects.find((item) => Number(item.id) === Number(saved.project_id));
      setFileList((current) => [{ id: saved.id, name: saved.file_name, projectId: Number(saved.project_id), project: project?.title || saved.project_name, type: sendForm.file.type || 'Document', size: fileSize(sendForm.file.size), date: new Date().toISOString().slice(0, 10) }, ...current]);
      setShowSendModal(false); setSendForm(emptySendForm);
      setSuccessMessage('File saved in database and sent to Admin successfully.');
    } catch (error) { setErrorMessage(error.response?.data?.message || 'Unable to upload file.'); }
  };

  const handleDownload = async (file) => {
    setDownloadId(file.id);
    try {
      const response = await documentService.getDocumentFile(file.id, true);
      const url = URL.createObjectURL(response.data);
      const link = document.createElement('a'); link.href = url; link.download = file.name;
      document.body.appendChild(link); link.click(); link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 60000);
    } catch (error) { setErrorMessage(error.response?.data?.message || 'Unable to download this file.'); }
    finally { setDownloadId(null); }
  };

  return <ClientLayout>
    <PageHeader title="Project Files" subtitle="Access shared project documents, reports, designs, and delivery files." showButton buttonText="Send File to Admin" onButtonClick={openSendModal} />
    {errorMessage && <div className="alert alert-danger cf-alert">{errorMessage}<button type="button" className="cf-alert-close" onClick={() => setErrorMessage('')}><FiX /></button></div>}
    {successMessage && <div className="alert alert-success cf-alert"><FiCheckCircle /><span>{successMessage}</span><button type="button" className="cf-alert-close" onClick={() => setSuccessMessage('')}><FiX /></button></div>}
    <div className="filter-section"><div className="search-box"><FiSearch className="search-icon" /><input className="form-control search-input" placeholder="Search files..." value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} /></div></div>
    <div className="clp-table-card mt-3"><div className="table-responsive"><table className="table cf-files-table"><thead><tr><th>File</th><th>Project</th><th>Type</th><th>Size</th><th>Date</th><th>Action</th></tr></thead><tbody>
      {loading ? <tr><td colSpan="6" className="text-center py-4 text-muted">Loading files…</td></tr> : filteredFiles.length === 0 ? <tr><td colSpan="6" className="text-center py-4 text-muted">No project files found.</td></tr> : filteredFiles.map((file) => <tr key={file.id}><td><div className="cf-file-name"><span className="cf-file-icon"><FiFileText /></span><span>{file.name}</span></div></td><td>{file.project}</td><td>{file.type}</td><td>{file.size}</td><td>{file.date}</td><td><button type="button" className="btn btn-sm btn-outline-primary cf-download-btn" disabled={downloadId === file.id} onClick={() => handleDownload(file)}><FiDownload className="me-1" /> Download</button></td></tr>)}
    </tbody></table></div></div>
    {showSendModal && <div className="modal-overlay cf-modal-overlay"><div className="modal-dialog modal-lg cf-upload-dialog"><div className="modal-content cf-upload-modal"><div className="modal-header"><div><h2>Send Project File</h2><p>Upload a file for one of your projects and choose who should receive it.</p></div><button type="button" className="modal-close" onClick={closeSendModal}><FiX /></button></div><form onSubmit={handleSendFile}><div className="modal-body"><div className="cf-form-grid"><div className="form-group"><label>Project *</label><select name="project" className={`form-control ${errors.project ? 'is-invalid' : ''}`} value={sendForm.project} onChange={handleFormChange}><option value="">Select Project</option>{projects.map((project) => <option key={project.id} value={project.id}>{project.title}</option>)}</select>{errors.project && <div className="invalid-feedback d-block">{errors.project}</div>}</div><div className="form-group"><label>Send To</label><select name="recipientRole" className="form-control" value={sendForm.recipientRole} onChange={handleFormChange}><option value="Admin">Admin</option><option value="Project Manager">Project Manager</option></select></div></div><div className="form-group mt-3"><label>File *</label><FileUploadField title="Upload Project File" hint="Max 10MB" accept=".pdf,.doc,.docx,.xls,.xlsx,.zip,.jpg,.jpeg,.png,.fig" maxSizeMB={10} name="projectFile" className="cf-upload-field" onFileSelect={(file) => { setSendForm((current) => ({ ...current, file })); setErrors((current) => ({ ...current, file: '' })); }} />{errors.file && <div className="invalid-feedback d-block">{errors.file}</div>}</div></div><div className="modal-footer"><button type="button" className="btn btn-outline-secondary" onClick={closeSendModal}>Cancel</button><button type="submit" className="btn btn-primary"><FiSend className="me-2" /> Send File</button></div></form></div></div></div>}
  </ClientLayout>;
};
export default ClientFiles;