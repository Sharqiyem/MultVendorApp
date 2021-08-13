import { useState, useEffect, useContext } from "react";
import firebase from "../config/firebase.config";
import { ProductsContext } from "../context/productsContext/provider";

export default useGetProductsByStoreId = (storeId) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { refreshProducts } = useContext(ProductsContext);
  console.log("useGetProductsByStoreId", storeId);
 
  useEffect(() => {
    if (!storeId) return;

    //isCancel to prevent "Can't perform a React state update on an unmounted component"
    console.log("useGetProductsByStoreId useEffect");
    let isCancelled = false;
    let unsubscribe;
    try {
      unsubscribe = firebase
        .firestore()
        .collection("products")
        .where("storeId", "==", storeId)
        .onSnapshot((snapShot) => {
          console.log("snap", snapShot.docs.length);
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
      alert("useGetProductsByStoreId err " + err);
    }
    return () => {
      console.log("unsubscribe 1 useGetProductsByStoreId");
      isCancelled = true;
      if (unsubscribe) {
        unsubscribe();
        console.log("unsubscribe 2 useGetProductsByStoreId");
      }
    };
  }, [storeId, refreshProducts]);

  return [data, isLoading];
};

export const useGetProductsCountByStoreId = async (storeId) => {
  if (storeId) {
    const data = await firebase
      .firestore()
      .collection("products")
      .where("storeId", "==", storeId)
      .get();

    console.log("useGetProductsCountByStoreId " + storeId, data.docs.length);
    return data?.docs?.length;
  }
  return 0;
};
