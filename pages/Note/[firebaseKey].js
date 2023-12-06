import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getNoteDetails } from '../../api/noteData';
// import { getCategoryDetails } from '../../api/categoryData';

export default function ViewNote() {
  const [noteDetails, setNoteDetails] = useState({});
  // const [categoryCard, setCategoryDetails] = useState({});

  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getNoteDetails(firebaseKey).then(setNoteDetails);
  }, [firebaseKey]);

  // useEffect(() => {
  //   getCategoryDetails(firebaseKey).then(setCategoryDetails);
  // }, [firebaseKey]);

  return (
    <>
      <div className="mt-5 d-flex justify-content-center">
        <div className="d-flex flex-column align-items-center">
          <div className="text-white ms-5 title">
            <h1 className="text-center">Note Title: {noteDetails.title || ''}</h1>
            {/* <h5>Category: {categoryCard?.name || ''}</h5> */}
            <h5>Time Submitted: {noteDetails.timeSubmitted || ''}</h5>
            <h2>Note: {noteDetails.body || ''}</h2>
          </div>
        </div>
      </div>
    </>
  );
}
