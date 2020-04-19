import { useState, useEffect } from 'react';
import firebase from '../config/firebase.config';
import Colors from '../constants/Colors';

const useGetUserAddresses = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    //isCancel to prevent "Can't perform a React state update on an unmounted component"
    let isCancelled = false;

    // console.log('useGetDataByCollection useEffect');
    const unsubscribe = firebase
      .firestore()
      .collection('users')
      .doc(firebase.auth().currentUser?.uid)

      .onSnapshot((snapShot) => {
        const newData = snapShot.data()?.addresses;

        const addresssArr = [];
        if (newData)
          newData.map((addressItem, ind) => {
            addresssArr.push({
              id: addressItem.id,
              value: addressItem.id,
              label: addressItem.name,
              selected: false,
              color: Colors.primary,
              address: addressItem.address,
              tel: addressItem.tel,
              location: addressItem.location,
            });
          });

        // console.log('useGetDataByCollection onSnapshot', addresssArr);

        if (!isCancelled) {
          setData(addresssArr);
          setIsLoading(false);
        }
      });
    return () => {
      isCancelled = true;
      unsubscribe();
    };
  }, []);

  return [data, isLoading];
};

export const useGetOrders = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    //isCancel to prevent "Can't perform a React state update on an unmounted component"
    let isCancelled = false;

    // console.log('useGetDataByCollection useEffect');
    const unsubscribe = firebase
      .firestore()
      .collection('orders')
      .where('userId', '==', firebase.auth().currentUser?.uid)
      // .doc(firebase.auth().currentUser?.uid)

      .onSnapshot((snapShot) => {
        const newData = snapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // console.log('useGetDataByCollection onSnapshot', addresssArr);

        if (!isCancelled) {
          setData(newData);
          setIsLoading(false);
        }
      });
    return () => {
      isCancelled = true;
      unsubscribe();
    };
  }, []);

  return [data, isLoading];
};

export const useGetOrderById = (orderId) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    //isCancel to prevent "Can't perform a React state update on an unmounted component"
    let isCancelled = false;

    // console.log('useGetDataByCollection useEffect');
    const unsubscribe = firebase
      .firestore()
      .collection('orders')
      .where('id', '==', orderId)
      // .doc(firebase.auth().currentUser?.uid)

      .onSnapshot((snapShot) => {
        const newData = snapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // console.log('useGetDataByCollection onSnapshot', addresssArr);

        if (!isCancelled) {
          setData(newData);
          setIsLoading(false);
        }
      });
    return () => {
      isCancelled = true;
      unsubscribe();
    };
  }, []);

  return [data, isLoading];
};

export default {
  useGetUserAddresses,
};
