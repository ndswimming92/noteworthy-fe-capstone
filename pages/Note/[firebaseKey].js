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
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column">
          <div className="text-white ms-5 title">
            <h1>Note Title: {noteDetails.title || ''}</h1>
            <h4>Note Category: {noteDetails.category || ''}</h4>
            <h2>Note: {noteDetails.body || ''}</h2>
            <h5>Time Submitted: {noteDetails.timeSubmitted || ''}</h5>
          </div>
        </div>
      </div>
    </>
  );
}
