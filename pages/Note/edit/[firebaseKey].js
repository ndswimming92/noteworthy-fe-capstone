import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleNote } from '../../../api/noteData';
import NoteForm from '../../../components/form/NoteForm';

export default function EditNote() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleNote(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<NoteForm obj={editItem} />);
}
