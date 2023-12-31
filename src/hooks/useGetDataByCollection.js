import { useState, useEffect, useContext } from "react";
import firebase from "../config/firebase.config";
import { ProductsContext } from "../context/productsContext/provider";

export default useGetDataByCollection = (collectionName = "products") => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { refreshProducts } = useContext(ProductsContext);

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
  }, [collectionName, refreshProducts]);

  return [data, isLoading];
};
