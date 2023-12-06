import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleCategory } from '../../../api/categoryData';
import CategoryForm from '../../../components/form/CategoryForm';

export default function EditCategory() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleCategory(firebaseKey).then(setEditItem);
  }, [firebaseKey]);

  return (<CategoryForm obj={editItem} />);
}
