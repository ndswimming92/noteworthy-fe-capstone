/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Snowfall from 'react-snowfall';
import { getAllNotes } from '../api/noteData';
import { useAuth } from '../utils/context/authContext';
import NoteCard from '../components/NoteCard';

function ShowNotes() {
  const [notes, setNotes] = useState([]);
  const [showSnowfall, setShowSnowfall] = useState(false); // State to trigger snowfall

  const { user } = useAuth();

  const getAllTheNotes = () => {
    getAllNotes(user.uid).then((newNotes) => {
      setNotes(newNotes);
      // Delay the snowfall by 3 seconds
      setTimeout(() => {
        setShowSnowfall(true); // Trigger snowfall after a 3-second delay
      }, 2000);
    });
  };

  useEffect(() => {
    getAllTheNotes();
  }, []);

  useEffect(() => {
    // Reset snowfall state after a short delay
    const timeout = setTimeout(() => {
      setShowSnowfall(false);
    }, 11000); // Adjust the delay as needed

    return () => clearTimeout(timeout);
  }, [showSnowfall]);

  return (
    <div className="text-center justify-content-center" style={{ color: 'white', marginTop: '2rem' }}>
      <h1>Notes</h1>
      {showSnowfall && (
        <Snowfall
          flakeCount={1000} // Set a fixed flakeCount
          style={{
            opacity: showSnowfall ? 1 : 0,
            transition: 'opacity 20s ease-out',
          }}
        />
      )}
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
