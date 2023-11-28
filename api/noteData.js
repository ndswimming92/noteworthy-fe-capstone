import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getAllNotes = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/note.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getSingleNote = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/note/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createNote = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/note.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateNote = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/note/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteNote = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/note/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const getNoteDetails = async (firebaseKey) => {
  const note = await getSingleNote(firebaseKey);

  return { ...note };
};

export {
  getAllNotes,
  getSingleNote,
  createNote,
  updateNote,
  deleteNote,
  getNoteDetails,
};
