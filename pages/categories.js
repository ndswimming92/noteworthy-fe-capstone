/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getAllCategories } from '../api/categoryData';
import { useAuth } from '../utils/context/authContext';
import CategoryCard from '../components/CategoryCard';

function ShowCategories() {
  const [categories, setCategories] = useState([]);

  const { user } = useAuth();

  const getAllTheCategories = () => {
    getAllCategories(user.uid).then(setCategories);
  };

  useEffect(() => {
    getAllTheCategories();
  }, []);

  return (
    <div className="text-center justify-content-center" style={{ color: 'white', marginTop: '2rem' }}>
      <h1>Categories</h1>
      <div className="text-center d-flex justify-content-center" style={{ marginTop: '2.5rem' }}>
        <div className="d-flex flex-wrap">
          {categories.map((category) => (
            <CategoryCard key={category.firebaseKey} categoryObj={category} onUpdate={getAllTheCategories} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShowCategories;
