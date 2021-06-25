import { useState, useEffect } from "react";
import firebase from "../config/firebase.config";

export default useGetProductsByStoreId = (storeId) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    //isCancel to prevent "Can't perform a React state update on an unmounted component"
    let isCancelled = false;
    let unsubscribe;
    try {
      unsubscribe = firebase
        .firestore()
        .collection("products")
        .where("storeId", "==", storeId)
        .onSnapshot((snapShot) => {
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
      alert("useGetProductsByStoreId err" + err);
    }
    return () => {
      console.log("unsubscribe useGetProductsByStoreId");
      isCancelled = true;
      if (unsubscribe) {
        unsubscribe();
        console.log("unsubscribe useGetProductsByStoreId");
      }
    };
  }, [storeId]);

  return [data, isLoading];
};
