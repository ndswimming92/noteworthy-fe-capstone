import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getNoteDetails } from '../../api/noteData';

export default function ViewNote() {
  const [noteDetails, setNoteDetails] = useState({});

  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getNoteDetails(firebaseKey).then(setNoteDetails);
  }, [firebaseKey]);

  return (
    <>
      <div className="mt-5 d-flex justify-content-center">
        <div className="d-flex flex-column align-items-center">
          <div className="text-white ms-5 title">
            <h1 style={{ marginBottom: '5rem' }} className="text-center">Title: {noteDetails.title || ''}</h1>
            <h5 style={{ marginBottom: '5rem' }} className="text-center">Time Submitted: {noteDetails.timeSubmitted || ''}</h5>
            <h2>Note: {noteDetails.body || ''}</h2>
          </div>
        </div>
      </div>
    </>
  );
}
