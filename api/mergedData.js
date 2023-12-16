import { deleteCategory, getCategoryNotes, getSingleCategory } from './categoryData';
import { deleteNote, getSingleNote } from './noteData';

const getNoteDetails = (firebaseKey) => new Promise((resolve, reject) => {
  getSingleNote(firebaseKey).then((noteObj) => {
    getSingleCategory(noteObj.category_id).then((categoryObject) => {
      resolve({ ...noteObj, categoryObject });
    });
  }).catch(reject);
});

const getCategoryDetails = async (firebaseKey) => {
  const category = await getSingleCategory(firebaseKey);
  const notes = await getCategoryNotes(category.firebaseKey);

  return { ...category, notes };
};

const deleteCategoryNotesRelationship = (firebaseKey) => new Promise((resolve, reject) => {
  getCategoryNotes(firebaseKey).then((categoriesNoteArray) => {
    const deleteNotePromises = categoriesNoteArray.map((note) => deleteNote(note.firebaseKey));

    Promise.all(deleteNotePromises).then(() => {
      deleteCategory(firebaseKey).then(resolve);
    });
  }).catch(reject);
});

export { getNoteDetails, getCategoryDetails, deleteCategoryNotesRelationship };
