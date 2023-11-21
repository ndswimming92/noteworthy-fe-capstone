/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteNote } from '../api/noteData';

function NoteCard({ noteObj, onUpdate }) {
  const deleteANote = () => {
    if (window.confirm(`Do you really want to delete the note: ${noteObj.title}?`)) {
      deleteNote(noteObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '20rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{noteObj.title}</Card.Title>
        <p className="card-text bold">noteObj.category</p>
        <Link href={`/note/${noteObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">View</Button>
        </Link>
        <Link href={`/note/edit/${noteObj.firebaseKey}`} passHref>
          <Button variant="info">Edit</Button>
        </Link>
        <Button variant="danger" onClick={deleteANote} className="m-2">Delete</Button>
      </Card.Body>
    </Card>
  );
}

NoteCard.prototype = {
  memberObj: PropTypes.shape({
    title: PropTypes.string,
    category: PropTypes.string,
    timeSubmitted: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default NoteCard;
