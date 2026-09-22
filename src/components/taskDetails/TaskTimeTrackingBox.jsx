// src/components/taskDetails/TaskTimeTrackingBox.jsx
import React, { useState } from 'react';
import { FiPlay, FiPause, FiSquare } from 'react-icons/fi';
import { timeLogs } from '../../data/taskDetailsData';

const TaskTimeTrackingBox = ({ onAlert }) => {
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerPaused, setTimerPaused] = useState(false);
  const [elapsed, setElapsed] = useState('00:00:00');

  const startTimer = () => { setTimerRunning(true); setTimerPaused(false); onAlert('Timer started (frontend demo).'); };
  const pauseTimer = () => { setTimerPaused(true); onAlert('Timer paused.'); };
  const stopTimer = () => { setTimerRunning(false); setTimerPaused(false); onAlert('Timer stopped.'); };

  const totalBillable = timeLogs.filter(t => t.billable).reduce((s, t) => s + parseInt(t.duration), 0);
  const totalNonBillable = timeLogs.filter(t => !t.billable).reduce((s, t) => s + parseInt(t.duration), 0);

  return (
    <div>
      <div className="td-timer-card">
        <div className="timer-display"><span>{timerRunning ? elapsed : '00:00:00'}</span></div>
        <div className="timer-controls">
          {!timerRunning ? <button className="timer-btn start" onClick={startTimer}><FiPlay /> Start</button> :
            <><button className="timer-btn pause" onClick={pauseTimer}><FiPause /> Pause</button>
            <button className="timer-btn stop" onClick={stopTimer}><FiSquare /> Stop</button></>
          }
        </div>
      </div>
      <div className="td-time-summary mt-3">
        <div className="time-summary-item"><span>Estimated</span><strong>40h</strong></div>
        <div className="time-summary-item"><span>Spent</span><strong>18h</strong></div>
        <div className="time-summary-item"><span>Remaining</span><strong>22h</strong></div>
        <div className="time-summary-item"><span>Billable</span><strong className="text-success">{totalBillable}h</strong></div>
        <div className="time-summary-item"><span>Non-Billable</span><strong className="text-muted">{totalNonBillable}h</strong></div>
      </div>
      <h6 className="mt-4">Time Log</h6>
      <div className="table-responsive">
        <table className="table td-table">
          <thead><tr><th>Date</th><th>User</th><th>Start</th><th>End</th><th>Duration</th><th>Description</th><th>Billable</th></tr></thead>
          <tbody>
            {timeLogs.map(t => (
              <tr key={t.id}><td>{t.date}</td><td>{t.user}</td><td>{t.startTime}</td><td>{t.endTime}</td><td>{t.duration}</td><td>{t.description}</td><td><span className={`td-badge ${t.billable ? 'td-status-completed' : 'td-status-cancelled'}`}>{t.billable ? 'Yes' : 'No'}</span></td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskTimeTrackingBox;