import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'; // Hook that navigates you to different pages
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { createNote, updateNote } from '../../api/noteData';
import { useAuth } from '../../utils/context/authContext'; // This is our custom hook, destructuring the return from useAuth
import { getAllCategories } from '../../api/categoryData';

// Creating a constant named initialState and assigning it an object with two properties.
const initialState = {
  title: '',
  body: '',
};

function NoteForm({ obj }) { // defines a react function component that takes a prop Obj.
  const [formInput, setFormInput] = useState(initialState); // useState hook to declare a state variable named formInput and the function setFormInput to update the status. setFormInput is a function.
  const [categories, setCategories] = useState([]);
  const router = useRouter(); // hook from Next.js, provides access to the Next.js router, allowing to access info about the current route.
  const { user } = useAuth(); // Hook that gets information about the authenticated user object. Finding the user data in useAuth. Destructuring.

  // this useEffect is fetching categories and setting them in the components state using 'setCategories.'
  useEffect(() => { // useEffect hook is used to perform side effects in a functional component. It takes a function as its first argument and an array of dependencies as its second argument. This funtion will run after the component is mounted and will run again if any of the dependencies change.
    getAllCategories().then(setCategories); // calls getAllCategories function (asynchronis funtion that fetches categories) and once the promise is resolved, updatesthe components state by calling setCategories with the result.
    if (obj.firebaseKey) setFormInput(obj); // checks if the obj has a truthy firebaseKey property. If it does the the 'obj' has data related to a note. Then sets the components form input state with the values from obj.
  }, [obj, user]); // dependency array which means it will re-run whenever obj or user changes. This ensures the effect is triggered when either the note data 'obj' or the data 'user' changes.

  const handleChange = (e) => { // defines an arrow function that takes an event object 'e' as it's parameter. Used as an event handler for form input changes.
    const { name, value } = e.target; // extract the "name" and "value" properties from the "target" property of the event object. "name" here represents the name attribute of the input, and "value" represents the current value of the input.
    setFormInput((prevState) => ({ // uses the setFormInput function, a state updater function from the useState hook to update the formInput state.
      ...prevState, // this is a spread operator which allows you to iterate through an array. Opens the previous state to allow for changes.
      [name]: value, // An object property name where the property name is dynamically determined by the "name" variable. the resulting object is a new state object that includes all properties of the previous state and updates the property with the name specified by "name"  to the new value specified by "value."
    }));
  };

  const handleSubmit = (e) => { // defines an arrow function that takes an event object "e" as its parameter.
    e.preventDefault(); // "preventDefault" is used to prevent the default behavior of the form, which is to reload the page or navigate to a new one.

    const currentTime = new Date().toLocaleString(); // Creates a new date object for the current date and time and formats it as a string using the "toLocalString" method. The result is assigned to the variable "currentTime".

    if (obj.firebaseKey) { // updates a note if obj.firebaseKey is truthy and then navigates to the /notes route after the update is successful.
      updateNote({ ...formInput, timeSubmitted: currentTime }).then(() => router.push('/notes')); // calls the updateNote function with an object as its argument. Then if successful then navigates to /notes route
    } else {
      const payload = { ...formInput, uid: user.uid, timeSubmitted: currentTime }; // creates an object called payload using the spread operator. Copies the properties "uid"  with the value of currentTime.
      createNote(payload).then(({ name }) => { // Calls createNote function with the "payload" as its argument, representing the data for the new note. ".then" method is used to handle the result of the asynchronis operation. Recieves an object adn extract the "name" property from that object.
        const patchPayload = { firebaseKey: name }; // creates a new object named "patchPayload" with a single property "firebaseKey" set to the value of "name"

        updateNote(patchPayload).then(() => { // calls the "updateNote" function with patchPayload as its argument. This function updates a note with the data proc=vided in the "patchPayload". ".then" method used to handle the result of the asynchronis operation initiated by "updateNote"
          router.push('/notes'); // used to navigate to the "/notes" route.
        });
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h1 style={{ textAlign: 'center' }}>Add Note</h1>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Note Title</Form.Label>
          <Form.Control
            type="text" // type of the input field.
            placeholder="Enter Note Title"
            name="title" // sets the name attribute of the input field. Useful when submitting form. The inpute data is sent with the associated name as part of the form data.
            value={formInput.title} // Binds the value of the input field to the "title" property of the formInput state. A controlled component, meaning its value is controlled by the components state. Any changes t othe input will trigger a corresponding change in the "formInput" state.
            onChange={handleChange} // specifies the function to be called when the value of the input changes.Used to update the state in a controlled component.
            required // Makes this field a required field.
            style={{ textAlign: 'center' }}
          />
        </Form.Group>

        <Form.Group label="Category" className="mb-3" controlId="formBasicCategory">
          <Form.Label>Note Category</Form.Label>
          <Form.Select
            placeholder="Select a Category"
            name="category_id"
            value={formInput.category_id}
            onChange={handleChange}
            required
            style={{ textAlign: 'center' }}
          >
            <option value="Category">Select a category</option>
            {categories.map((category) => (
              <option key={category.firebaseKey} value={category.firebaseKey}>
                {category.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicBody">
          <Form.Label>Note Body</Form.Label>
          <Form.Control
            type="textarea"
            as="textarea"
            placeholder="Enter Note Body"
            name="body"
            value={formInput.body}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit"> {/* sets button to primary color, and indicates the button is associated with a form and wil trigger form submission */}
          {obj.firebaseKey ? 'Update' : 'Add Note'} {/* ternary operator and conditional statement */}
        </Button>
      </Form>
    </>
  );
}

NoteForm.propTypes = { // adds a "propTypes" property to the "NoteForm" component. "PropTypes" is an object that defines the expected types for the component's props.
  obj: PropTypes.shape({ // specifies that the "obj" prop should be an object with a specific shape.
    title: PropTypes.string,
    body: PropTypes.string,
    timeSubmitted: PropTypes.string,
    firebaseKey: PropTypes.string,
    category_id: PropTypes.string,
  }),
};

NoteForm.defaultProps = { // adds the "defaultProps" property to the NoteForm component. "defaultProps" is an object that provides default values for the component's props.
  obj: initialState, // specifies that if the "obj" prop is not provided when using the "NoteForm" component, it will default to the value of "initialState".
};

export default NoteForm; // Exports the "NoteForm" component as the default export from the file. Allows other files to import and use the "NoteForm" component using the "import" statement.
