import { useState, useEffect } from 'react';
import firebase from '../config/firebase.config';

const useGetDataByCollection = (collectionName = 'products') => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    //isCancel to prevent "Can't perform a React state update on an unmounted component"
    let isCancelled = false;

    console.log('useGetDataByCollection useEffect');
    const unsubscribe = firebase
      .firestore()
      .collection(collectionName)
      .onSnapshot((snapShot) => {
        console.log('useGetDataByCollection onSnapshot');
        const newData = snapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        if (!isCancelled) {
          setData(newData);
          setIsLoading(false);
        }
      });
    return () => {
      isCancelled = true;
      unsubscribe();
    };
  }, [collectionName]);

  return [data, isLoading];
};

// const useNewMessage = (collName, object) => {
//   return firebase.firestore().collection(collName).add(object);
// };
export default { useGetDataByCollection };
