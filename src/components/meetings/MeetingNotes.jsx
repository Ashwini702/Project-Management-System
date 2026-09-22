// src/components/meetings/MeetingNotes.jsx
import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';

const MeetingNotes = ({ notes = [], editable = false }) => {
  const [notesList, setNotesList] = useState(notes);
  const [newNote, setNewNote] = useState('');
  const addNote = () => { if (newNote.trim()) { setNotesList([...notesList, { id: Date.now(), author: 'Current User', text: newNote.trim(), time: new Date().toISOString().slice(0, 16).replace('T', ' ') }]); setNewNote(''); } };

  return (
    <div className="meeting-notes"><h6>Notes</h6>
      <div className="notes-list">{notesList.length === 0 ? <p className="text-muted text-center py-2">No notes yet</p> : notesList.map(n => <div key={n.id} className="note-item"><strong>{n.author}</strong><p>{n.text}</p><span className="note-time">{n.time}</span></div>)}</div>
      {editable && <div className="notes-input"><textarea className="form-control" rows="2" placeholder="Add a note..." value={newNote} onChange={(e) => setNewNote(e.target.value)}></textarea><button className="btn btn-sm btn-primary" onClick={addNote}><FiSend /> Add</button></div>}
    </div>
  );
};
export default MeetingNotes;