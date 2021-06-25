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

        // const newData = snapShot.data().orders;

        // const ordersArr = [];
        // if (newData)
        //   newData.map((orderItem, ind) => {
        //     ordersArr.push({
        //       id: orderItem.id,
        //       selectedDeliveryAddress: orderItem.selectedDeliveryAddress,
        //       selectedPaymentMethod: orderItem.selectedPaymentMethod,
        //       totalAmount: orderItem.totalAmount,
        //       createdAt: orderItem.createdAt,
        //       updatedAt: orderItem.updatedAt,
        //       products: orderItem.products,
        //       status: orderItem.status,
        //       selectedStore: orderItem.selectedStore,
        //     });
        //   });

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
