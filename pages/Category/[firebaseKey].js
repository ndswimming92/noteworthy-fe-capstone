import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getCategoryDetails } from '../../api/categoryData';

export default function ViewCategory() {
  const [categoryDetails, setCategoryDetails] = useState({});
  const [loading, setLoading] = useState(true); // Added loading state

  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    if (firebaseKey) {
      getCategoryDetails(firebaseKey)
        .then((details) => {
          setCategoryDetails(details);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching category details:', error);
          setLoading(false);
        });
    }
  }, [firebaseKey]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="mt-5 d-flex justify-content-center">
        <div className="d-flex flex-column align-items-center">
          <div className="text-white ms-5 title">
            <h1 className="text-center">Note Category: {categoryDetails.category || ''}</h1>
          </div>
        </div>
      </div>
    </>
  );
}
