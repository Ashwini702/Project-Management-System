import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { FiCalendar, FiCamera, FiCheckCircle, FiClock, FiExternalLink, FiLogIn, FiLogOut, FiMapPin, FiRefreshCw, FiX } from 'react-icons/fi';
import ClientLayout from '../../layouts/ClientLayout';
import * as attendanceService from '../../services/attendanceService';
import { apiData } from '../../services/api';
import '../../styles/clientAttendance.css';

const todayKey = () => new Date().toISOString().slice(0, 10);
const timeNow = () => new Date().toTimeString().slice(0, 8);
const formatTime = value => value ? value.slice(0, 5) : '—';
const photoUrl = filename => filename ? `http://${window.location.hostname}:5000/uploads/attendance/${encodeURIComponent(filename)}` : '';
const mapUrl = (lat, lng) => `https://www.google.com/maps?q=${lat},${lng}`;

const hoursBetween = (start, end) => {
  if (!start || !end) return null;
  const [sh, sm, ss = 0] = start.split(':').map(Number);
  const [eh, em, es = 0] = end.split(':').map(Number);
  return Math.max(0, Number((((eh * 3600 + em * 60 + es) - (sh * 3600 + sm * 60 + ss)) / 3600).toFixed(2)));
};

const ClientAttendance = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState(null);
  const [captureMode, setCaptureMode] = useState(null);
  const [location, setLocation] = useState(null);
  const [photoData, setPhotoData] = useState('');
  const [permissionError, setPermissionError] = useState('');
  const [acquiring, setAcquiring] = useState(false);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
    window.setTimeout(() => setAlert(null), 3000);
  };

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach(track => track.stop());
    streamRef.current = null;
  };

  const closeCapture = () => {
    stopCamera(); setCaptureMode(null); setLocation(null); setPhotoData(''); setPermissionError('');
  };

  useEffect(() => {
    if (!captureMode) return undefined;
    let cancelled = false;
    setAcquiring(true); setPermissionError(''); setLocation(null); setPhotoData('');

    if (!window.isSecureContext) {
      setPermissionError('Camera and live location require HTTPS or localhost. Open the app through localhost/127.0.0.1 or configure HTTPS.');
      setAcquiring(false);
      return undefined;
    }

    navigator.geolocation.getCurrentPosition(
      position => !cancelled && setLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude, accuracy: position.coords.accuracy }),
      error => !cancelled && setPermissionError(`Location permission failed: ${error.message}`),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );

    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false })
      .then(stream => {
        if (cancelled) return stream.getTracks().forEach(track => track.stop());
        streamRef.current = stream;
        if (videoRef.current) { videoRef.current.srcObject = stream; videoRef.current.play().catch(() => {}); }
      })
      .catch(error => !cancelled && setPermissionError(current => `${current ? `${current} ` : ''}Camera permission failed: ${error.message}`))
      .finally(() => !cancelled && setAcquiring(false));

    return () => { cancelled = true; stopCamera(); };
  }, [captureMode]);

  const loadRecords = async () => {
    try { setRecords(apiData(await attendanceService.getAttendance()) || []); }
    catch (error) { showAlert(error.response?.data?.message || 'Unable to load attendance.', 'danger'); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadRecords(); }, []);

  const todayRecord = records.find(record => record.attendance_date === todayKey());
  const presentDays = records.filter(record => record.status === 'Present').length;
  const totalHours = useMemo(() => records.reduce((sum, record) => sum + Number(record.work_hours || 0), 0).toFixed(2), [records]);

  const openCapture = (mode) => {
    if (mode === 'checkin' && todayRecord) {
      showAlert(todayRecord.check_out
        ? 'Today\'s attendance is already completed.'
        : 'You already checked in at ' + formatTime(todayRecord.check_in) + '. Please use Check Out.', 'warning');
      return;
    }
    if (mode === 'checkout' && !todayRecord) {
      showAlert('Please check in before checking out.', 'warning');
      return;
    }
    if (mode === 'checkout' && todayRecord?.check_out) {
      showAlert('You already checked out at ' + formatTime(todayRecord.check_out) + '.', 'warning');
      return;
    }
    setCaptureMode(mode);
  };
  const capturePhoto = () => {
    const video = videoRef.current;
    if (!video?.videoWidth) return setPermissionError('Camera is not ready yet. Please wait a moment.');
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth; canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
    setPhotoData(canvas.toDataURL('image/jpeg', 0.8));
  };

  const retakePhoto = () => setPhotoData('');

  const submitEvidence = async () => {
    if (!location) return setPermissionError('Live location is required. Allow location permission and try again.');
    if (!photoData) return setPermissionError('Camera photo is required. Capture a photo before submitting.');
    setSaving(true);
    const evidence = { latitude: location.latitude, longitude: location.longitude, accuracy: location.accuracy, photo_data: photoData };
    try {
      if (captureMode === 'checkin') {
        await attendanceService.saveAttendance({ attendance_date: todayKey(), check_in: timeNow(), status: 'Present', ...evidence });
        showAlert('Check-in saved with live location and camera photo.');
      } else {
        const checkOut = timeNow();
        await attendanceService.updateAttendance(todayRecord.id, { check_out: checkOut, work_hours: hoursBetween(todayRecord.check_in, checkOut), status: 'Present', ...evidence });
        showAlert('Check-out saved with live location and camera photo.');
      }
      closeCapture(); await loadRecords();
    } catch (error) { setPermissionError(error.response?.data?.message || 'Unable to save attendance evidence.'); }
    finally { setSaving(false); }
  };

  return (
    <ClientLayout>
      <div className="client-attendance-page">
        <header className="client-attendance-header">
          <div><h3>My Attendance</h3><p>Secure check-in and check-out with live location and camera verification.</p></div>
          <div className="client-attendance-actions">
            <button type="button" className="btn btn-primary" onClick={() => openCapture('checkin')} disabled={saving}><FiLogIn /> {todayRecord ? 'Checked In' : 'Check In'}</button>
            <button type="button" className="btn btn-outline-primary" onClick={() => openCapture('checkout')} disabled={saving}><FiLogOut /> {todayRecord?.check_out ? 'Checked Out' : 'Check Out'}</button>
          </div>
        </header>

        {alert && <div className={`alert alert-${alert.type}`}>{alert.message}</div>}

        <section className="client-attendance-stats">
          <article><span className="icon primary"><FiCalendar /></span><div><strong>{records.length}</strong><small>Total Records</small></div></article>
          <article><span className="icon success"><FiCheckCircle /></span><div><strong>{presentDays}</strong><small>Present Days</small></div></article>
          <article><span className="icon warning"><FiClock /></span><div><strong>{totalHours}h</strong><small>Total Hours</small></div></article>
        </section>

        <section className="client-today-attendance">
          <div><small>Today</small><strong>{new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}</strong></div>
          <div><small>Check In</small><strong>{formatTime(todayRecord?.check_in)}</strong></div>
          <div><small>Check Out</small><strong>{formatTime(todayRecord?.check_out)}</strong></div>
          <div><small>Status</small><span className={`status-pill ${todayRecord ? 'present' : 'pending'}`}>{todayRecord?.status || 'Not Checked In'}</span></div>
        </section>

        <section className="client-attendance-table-card">
          <div className="table-card-heading"><h5>Attendance History</h5><span>{records.length} records</span></div>
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead><tr><th>Date</th><th>Check In</th><th>Check Out</th><th>Work Hours</th><th>Evidence</th><th>Status</th></tr></thead>
              <tbody>
                {loading && <tr><td colSpan="6" className="text-center py-5">Loading attendance…</td></tr>}
                {!loading && records.length === 0 && <tr><td colSpan="6" className="text-center py-5 text-muted">No attendance records yet.</td></tr>}
                {!loading && records.map(record => (
                  <tr key={record.id}>
                    <td>{new Date(`${record.attendance_date}T00:00:00`).toLocaleDateString('en-IN')}</td>
                    <td>{formatTime(record.check_in)}</td><td>{formatTime(record.check_out)}</td>
                    <td>{record.work_hours ? `${record.work_hours}h` : '—'}</td>
                    <td><div className="evidence-links">
                      {record.check_in_photo && <a href={photoUrl(record.check_in_photo)} target="_blank" rel="noreferrer"><FiCamera /> In</a>}
                      {record.check_in_latitude && <a href={mapUrl(record.check_in_latitude, record.check_in_longitude)} target="_blank" rel="noreferrer"><FiMapPin /> Map</a>}
                      {record.check_out_photo && <a href={photoUrl(record.check_out_photo)} target="_blank" rel="noreferrer"><FiCamera /> Out</a>}
                    </div></td>
                    <td><span className={`status-pill ${record.status === 'Present' ? 'present' : 'pending'}`}>{record.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {captureMode && createPortal(<div className="attendance-capture-overlay">
        <div className="attendance-capture-modal">
          <header><div><h4>{captureMode === 'checkin' ? 'Secure Check In' : 'Secure Check Out'}</h4><p>Live location and a current camera photo are required.</p></div><button onClick={closeCapture} aria-label="Close"><FiX /></button></header>
          <div className="attendance-capture-body">
            {permissionError && <div className="alert alert-danger">{permissionError}</div>}
            <div className={`location-proof ${location ? 'ready' : ''}`}><FiMapPin /><div><strong>{location ? 'Live location captured' : 'Getting live location…'}</strong><span>{location ? `${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)} (±${Math.round(location.accuracy)}m)` : 'Please allow precise location access.'}</span></div></div>
            <div className="camera-proof">
              {photoData ? <img src={photoData} alt="Attendance camera capture" /> : <video ref={videoRef} autoPlay playsInline muted />}
              {acquiring && <div className="camera-loading">Opening camera…</div>}
            </div>
            <div className="capture-controls">
              {!photoData ? <button className="btn btn-outline-primary" onClick={capturePhoto} disabled={acquiring}><FiCamera /> Capture Photo</button> : <button className="btn btn-outline-secondary" onClick={retakePhoto}><FiRefreshCw /> Retake</button>}
            </div>
          </div>
          <footer><button className="btn btn-light" onClick={closeCapture}>Cancel</button><button className="btn btn-primary" onClick={submitEvidence} disabled={saving || !location || !photoData}>{saving ? 'Saving…' : <><FiCheckCircle /> Confirm {captureMode === 'checkin' ? 'Check In' : 'Check Out'}</>}</button></footer>
        </div>
      </div>, document.body)}
    </ClientLayout>
  );
};

export default ClientAttendance;