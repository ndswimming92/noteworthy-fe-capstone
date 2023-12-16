/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { deleteCategory } from '../api/categoryData';

function CategoryCard({ categoryObj, onUpdate }) {
  const deleteACategory = () => {
    if (window.confirm(`Do you really want to delete the category: ${categoryObj.name}?`)) {
      deleteCategory(categoryObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Link href={`/Category/${categoryObj.firebaseKey}`} passHref>
      <Card
        as="a" // Make Card act as an anchor (link)
        style={{
          backgroundColor: '#08224A',
          color: 'white',
          width: '25rem',
          margin: '15px',
          border: '3px solid #00C5F1',
          cursor: 'pointer', // Show pointer cursor on hover
        }}
      >
        <Card.Body>
          <Card.Title>{categoryObj.name}</Card.Title>
          <div className="d-flex justify-content-center">
            <Link href={`/Category/edit/${categoryObj.firebaseKey}`} passHref>
              <Button variant="outline-info" className="m-2"><FontAwesomeIcon icon={faEdit} /></Button>
            </Link>
            <Button variant="outline-danger" onClick={deleteACategory} className="m-2"><FontAwesomeIcon icon={faTrash} /></Button>
          </div>
        </Card.Body>
      </Card>
    </Link>
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
