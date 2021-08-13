import { useState, useEffect } from "react";
import firebase from "../config/firebase.config";
import Colors from "../constants/Colors";

export default useGetDeliveryOrders = (storeId) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    //isCancel to prevent "Can't perform a React state update on an unmounted component"
    let isCancelled = false;

    const unsubscribe = firebase
      .firestore()
      .collection("orders")
      .where("selectedStore", "==", storeId)
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
    return () => {
      isCancelled = true;
      if (unsubscribe) {
        unsubscribe();
        console.log("unsubscribe 2 useGetProductsByStoreId");
      }
    };
  }, []);

  return [data, isLoading];
};
