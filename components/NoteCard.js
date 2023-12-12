/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faEye } from '@fortawesome/free-solid-svg-icons';
import { deleteNote } from '../api/noteData';
import { getSingleCategory } from '../api/categoryData';

function NoteCard({ noteObj, onUpdate }) {
  const [category, setCategory] = useState('');

  useEffect(() => {
    getSingleCategory(noteObj.category_id).then((categoryData) => {
      setCategory(categoryData?.name || '');
    });
  }, [noteObj.category_id]);

  const timeSubmitted = new Date(noteObj.timeSubmitted).toLocaleString();

  const deleteANote = () => {
    if (window.confirm(`Do you really want to delete the note: ${noteObj.title}?`)) {
      deleteNote(noteObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{
      backgroundColor: '#198CB0E5', color: '#00C5F1', width: '25rem', margin: '15px',
    }}
    >
      <Card.Body>
        <Card.Title>{noteObj.title}</Card.Title>
        <p className="card-text bold">{category}</p>
        <p className="card-text bold">{timeSubmitted}</p>
        <Link href={`/Note/${noteObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2"><FontAwesomeIcon icon={faEye} /></Button>
        </Link>
        <Link href={`/Note/edit/${noteObj.firebaseKey}`} passHref>
          <Button variant="info"><FontAwesomeIcon icon={faEdit} /></Button>
        </Link>
        <Button variant="danger" onClick={deleteANote} className="m-2"><FontAwesomeIcon icon={faTrash} /></Button>
      </Card.Body>
    </Card>
  );
}

NoteCard.propTypes = {
  noteObj: PropTypes.shape({
    title: PropTypes.string,
    category_id: PropTypes.string,
    body: PropTypes.string,
    timeSubmitted: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default NoteCard;
