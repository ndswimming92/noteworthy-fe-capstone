/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getAllNotes } from '../api/noteData';
import { useAuth } from '../utils/context/authContext';
import NoteCard from '../components/NoteCard';

function ShowNotes() {
  const [notes, setNotes] = useState([]);

  const { user } = useAuth();

  const getAllTheNotes = () => {
    getAllNotes(user.uid).then(setNotes);
  };

  useEffect(() => {
    getAllTheNotes();
  }, []);

  return (
    <div className="text-center justify-content-center" style={{ color: 'white', marginTop: '2rem' }}>
      <h1>Notes</h1>
      <div className="text-center justify-content-center" style={{ marginTop: '2.5rem' }}>
        <div className="d-flex flex-wrap">
          {notes.map((note) => (
            <NoteCard key={note.firebaseKey} noteObj={note} onUpdate={getAllTheNotes} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShowNotes;
