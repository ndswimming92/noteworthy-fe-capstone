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

  const timeSubmitted = new Date(noteObj.timeSubmitted).toLocaleDateString();

  const deleteANote = () => {
    if (window.confirm(`Do you really want to delete the note: ${noteObj.title}?`)) {
      deleteNote(noteObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{
      backgroundColor: '#08224A',
      color: 'white',
      width: '25rem',
      margin: '15px',
      border: '3px solid #00C5F1',
    }}
    >
      <Card.Body>
        <Card.Title className="text-center">{noteObj.title}</Card.Title>
        <p className="card-text bold text-center">{category}</p>
        <p className="card-text bold text-center">{timeSubmitted}</p>
        <div className="d-flex justify-content-center">
          <Link href={`/Note/${noteObj.firebaseKey}`} passHref>
            <Button variant="outline-warning" className="m-2"><FontAwesomeIcon icon={faEye} /></Button>
          </Link>
          <Link href={`/Note/edit/${noteObj.firebaseKey}`} passHref>
            <Button variant="outline-info" className="m-2"><FontAwesomeIcon icon={faEdit} /></Button>
          </Link>
          <Button variant="outline-danger" onClick={deleteANote} className="m-2"><FontAwesomeIcon icon={faTrash} /></Button>
        </div>
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
