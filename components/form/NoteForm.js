import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { createNote, updateNote } from '../../api/noteData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  title: '',
  category: '',
  body: '',
};

const categories = ['Personal', 'Work', 'Money', 'Food', 'Family', 'Transportation'];

function NoteForm({ obj }) {
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

    const currentTime = new Date().toLocaleString();

    if (obj.firebaseKey) {
      updateNote({ ...formInput, timeSubmitted: currentTime }).then(() => router.push('/notes'));
    } else {
      const payload = { ...formInput, uid: user.uid, timeSubmitted: currentTime };
      createNote(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };

        updateNote(patchPayload).then(() => {
          router.push('/notes');
        });
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h1>Add a Note</h1>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Note Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Note Title"
            name="title"
            value={formInput.title}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCategory">
          <Form.Label>Note Category</Form.Label>
          <Form.Select
            placeholder="Select a Category"
            name="category"
            value={formInput.category}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select a category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicBody">
          <Form.Label>Note Body</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Note Body"
            name="body"
            value={formInput.body}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {obj.firebaseKey ? 'Update Note' : 'Add Note'}
        </Button>
      </Form>
    </>
  );
}

NoteForm.propTypes = {
  obj: PropTypes.shape({
    title: PropTypes.string,
    category: PropTypes.string,
    body: PropTypes.string,
    timeSubmitted: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

NoteForm.defaultProps = {
  obj: initialState,
};

export default NoteForm;
