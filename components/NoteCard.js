/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteNote } from '../api/noteData';

function NoteCard({ noteObj, onUpdate }) {
  const timeSubmitted = new Date(noteObj.timeSubmitted).toLocaleString();
  const deleteANote = () => {
    if (window.confirm(`Do you really want to delete the note: ${noteObj.title}?`)) {
      deleteNote(noteObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '25rem', margin: '15px' }}>
      <Card.Body>
        <Card.Title>{noteObj.title}</Card.Title>
        <p className="card-text bold">{noteObj.category}</p>
        <p className="card-text bold">{noteObj.body}</p>
        <p className="card-text bold">{timeSubmitted}</p>
        <Link href={`/Note/${noteObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">View</Button>
        </Link>
        <Link href={`/Note/edit/${noteObj.firebaseKey}`} passHref>
          <Button variant="info">Edit</Button>
        </Link>
        <Button variant="danger" onClick={deleteANote} className="m-2">Delete</Button>
      </Card.Body>
    </Card>
  );
}

NoteCard.propTypes = {
  noteObj: PropTypes.shape({
    title: PropTypes.string,
    category: PropTypes.string,
    body: PropTypes.string,
    timeSubmitted: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default NoteCard;
