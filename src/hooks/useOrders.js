import { useState, useEffect } from "react";
import firebase from "../config/firebase.config";
import Colors from "../constants/Colors";

export const useGetOrders = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    //isCancel to prevent "Can't perform a React state update on an unmounted component"
    let isCancelled = false;

    const unsubscribe = firebase
      .firestore()
      .collection("orders")
      .where("userId", "==", firebase.auth().currentUser?.uid)
      // .doc(firebase.auth().currentUser?.uid)

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

    const unsubscribe = firebase
      .firestore()
      .collection("orders")
      .where("id", "==", orderId)
      // .doc(firebase.auth().currentUser?.uid)

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
      unsubscribe();
    };
  }, []);

  return [data, isLoading];
};

export const useAddOrder = async (order) => {
  try {
    const db = firebase.firestore();
    const userId = firebase.auth().currentUser.uid;
    db.collection("orders").add(order);
    db.collection("chats")
      .doc(order.id)
      .set({ createdAt: new Date(), messages: [] });
  } catch (err) {
    console.log("useAddOrder", err);
  }
};
