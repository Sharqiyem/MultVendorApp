import { useState, useEffect } from "react";
import firebase from "../config/firebase.config";

export default useGetStoreByStoreId = (storeId) => {
  console.log("useGetStoreByStoreId", storeId);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    //isCancel to prevent "Can't perform a React state update on an unmounted component"
    let isCancelled = false;
    let unsubscribe;

    try {
      const doc = firebase.firestore().collection("stores").doc(storeId);
      doc.get().then((res) => {
        if (res.exists) {
          setData({
            id: res.id,
            ...res.data(),
          });
          setIsLoading(false);
        }
      });
    } catch (err) {
      //TODO : try to catch error on use logout
      alert("useGetStoreByStoreId err" + err);
    }
    return () => {
      console.log("unsubscribe useGetStoreByStoreId");
      isCancelled = true;
      if (unsubscribe) {
        unsubscribe();
        console.log("unsubscribe useGetStoreByStoreId");
      }
    };
  }, [storeId]);

  return [data, isLoading];
};
