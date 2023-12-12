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
    <Card style={{
      backgroundColor: '#198CB0E5', color: '#FFFFFF', width: '25rem', margin: '15px',
    }}
    >
      <Card.Body>
        <Card.Title>{categoryObj.name}</Card.Title>
        <Link href={`/Category/edit/${categoryObj.firebaseKey}`} passHref>
          <Button variant="info"><FontAwesomeIcon icon={faEdit} /></Button>
        </Link>
        <Button variant="danger" onClick={deleteACategory} className="m-2"><FontAwesomeIcon icon={faTrash} /></Button>
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
