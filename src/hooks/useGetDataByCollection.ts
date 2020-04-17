import { useState, useEffect } from 'react';
import firebase from '../config/firebase.config';

const useGetDataByCollection = (collectionName = 'products') => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    //isCancel to prevent "Can't perform a React state update on an unmounted component"
    let isCancelled = false;

    let unsubscribe;
    try {
      // console.log('useGetDataByCollection useEffect');
      unsubscribe = firebase
        .firestore()
        .collection(collectionName)
        .onSnapshot((snapShot) => {
          // console.log('useGetDataByCollection onSnapshot');
          const newData = snapShot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          if (!isCancelled) {
            setData(newData);
            setIsLoading(false);
          }
        });
    } catch (err) {
      //TODO : try to catch error on use logout
      alert(`useGetDataByCollection ${collectionName} err` + err);
    }
    return () => {
      console.log(`unsubscribe useGetDataByCollection ${collectionName}`);
      isCancelled = true;
      if (unsubscribe) {
        unsubscribe();
        console.log(`unsubscribe useGetDataByCollection ${collectionName}`);
      }
    };
  }, [collectionName]);

  return [data, isLoading];
};

const useGetProductsByCatId = (catId) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    //isCancel to prevent "Can't perform a React state update on an unmounted component"
    let isCancelled = false;
    let unsubscribe;

    try {
      // console.log('useGetDataByCollection useEffect');
      unsubscribe = firebase
        .firestore()
        .collection('products')
        .where('catId', '==', catId)
        .onSnapshot((snapShot) => {
          // console.log('useGetDataByCollection onSnapshot');
          const newData = snapShot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          if (!isCancelled) {
            setData(newData);
            setIsLoading(false);
          }
        });
    } catch (err) {
      //TODO : try to catch error on use logout
      alert('useGetProductsByCatId err' + err);
    }
    return () => {
      console.log('unsubscribe useGetProductsByCatId');
      isCancelled = true;
      if (unsubscribe) {
        unsubscribe();
        console.log('unsubscribe useGetProductsByCatId');
      }
    };
  }, [catId]);

  return [data, isLoading];
};

const useGetProductsByStoreId = (storeId) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    //isCancel to prevent "Can't perform a React state update on an unmounted component"
    let isCancelled = false;
    let unsubscribe;
    try {
      // console.log('useGetDataByCollection useEffect');
      unsubscribe = firebase
        .firestore()
        .collection('products')
        .where('storeId', '==', storeId)
        .onSnapshot((snapShot) => {
          // console.log('useGetDataByCollection onSnapshot');
          const newData = snapShot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          if (!isCancelled) {
            setData(newData);
            setIsLoading(false);
          }
        });
    } catch (err) {
      //TODO : try to catch error on use logout
      alert('useGetProductsByStoreId err' + err);
    }
    return () => {
      console.log('unsubscribe useGetProductsByStoreId');
      isCancelled = true;
      if (unsubscribe) {
        unsubscribe();
        console.log('unsubscribe useGetProductsByStoreId');
      }
    };
  }, [storeId]);

  return [data, isLoading];
};

// const useNewMessage = (collName, object) => {
//   return firebase.firestore().collection(collName).add(object);
// };
export default {
  useGetDataByCollection,
  useGetProductsByCatId,
  useGetProductsByStoreId,
};
