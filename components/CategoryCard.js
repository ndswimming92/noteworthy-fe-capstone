/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { deleteCategory } from '../api/categoryData';

function CategoryCard({ categoryObj, onUpdate }) {
  const deleteACategory = () => {
    if (window.confirm(`Do you really want to delete the category: ${categoryObj.name}?`)) {
      deleteCategory(categoryObj.firebaseKey).then(() => onUpdate());
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
        <Card.Title>{categoryObj.name}</Card.Title>
        <Link href={`/Category/${categoryObj.firebaseKey}`} passHref>
          <Button variant="outline-warning" className="m-2"><FontAwesomeIcon icon={faEye} /></Button>
        </Link>
        <Link href={`/Category/edit/${categoryObj.firebaseKey}`} passHref>
          <Button variant="outline-info"><FontAwesomeIcon icon={faEdit} /></Button>
        </Link>
        <Button variant="outline-danger" onClick={deleteACategory} className="m-2"><FontAwesomeIcon icon={faTrash} /></Button>
      </Card.Body>
    </Card>
  );
}

CategoryCard.propTypes = {
  categoryObj: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default CategoryCard;
