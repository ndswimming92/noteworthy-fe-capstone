import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { createCategory, updateCategory } from '../../api/categoryData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  name: '',
};

function CategoryForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (obj.firebaseKey) {
      updateCategory(formInput).then(() => router.push('/categories'));
    } else {
      const payload = { ...formInput };
      createCategory(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };

        updateCategory(patchPayload).then(() => {
          router.push('/categories');
        });
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h1 style={{ textAlign: 'center', color: 'white', marginTop: '2rem' }}>Add Category</h1>
        <Form.Group className="mb-3" controlId="floatingInput2">
          <Form.Label style={{ color: 'white' }}>Note Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Category"
            name="name"
            value={formInput.name}
            onChange={handleChange}
            required
            style={{ textAlign: 'center' }}
          />
        </Form.Group>

        <div className="d-flex justify-content-center">
          <Button variant="primary" type="submit">
            {obj.firebaseKey ? 'Update' : 'Add Category'}
          </Button>
        </div>
      </Form>
    </>
  );
}

CategoryForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

CategoryForm.defaultProps = {
  obj: initialState,
};

export default CategoryForm;
