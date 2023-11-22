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
  timeSubmitted: '',
};

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

    if (obj.firebaseKey) {
      updateNote(formInput).then(() => router.push('/notes'));
    } else {
      const payload = { ...formInput, uid: user.uid };
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
        <Form.Group className="mb-3" controlId="formBasicName">
          <h1>Add Note Title</h1>
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
          <h1>Add Note Category</h1>
          <Form.Label>Note Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Note Category"
            name="category"
            value={formInput.category}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicBody">
          <h1>Add Note Title</h1>
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
