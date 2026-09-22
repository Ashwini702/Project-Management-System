// src/components/managerMeetings/MeetingNotesBox.jsx
import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';

const MeetingNotesBox = ({ notes = [], editable = false, onAlert }) => {
  const [notesList, setNotesList] = useState(notes);
  const [newNote, setNewNote] = useState('');

  const addNote = () => {
    if (newNote.trim()) {
      setNotesList([...notesList, { id: Date.now(), author: 'Priya Sharma', role: 'Project Manager', message: newNote.trim(), time: new Date().toISOString().replace('T', ' ').substring(0, 16) }]);
      setNewNote('');
      if (onAlert) onAlert('Meeting note added successfully!', 'success');
    }
  };

  return (
    <div className="mmt-notes-box">
      <h6>Notes</h6>
      {notesList.length === 0 ? <p className="text-muted text-center py-2">No notes yet</p> :
        notesList.map(n => (
          <div key={n.id} className="mmt-note-item">
            <strong>{n.author}</strong><span>{n.role} • {n.time}</span>
            <p>{n.message}</p>
          </div>
        ))
      }
      {editable && <div className="mmt-note-input"><textarea className="form-control" rows="2" placeholder="Add a note..." value={newNote} onChange={(e) => setNewNote(e.target.value)}></textarea><button className="btn btn-primary btn-sm" onClick={addNote}><FiSend /> Add</button></div>}
    </div>
  );
};
export default MeetingNotesBox;