import { useState, useEffect } from "react";
import firebase from "../config/firebase.config";
import Colors from "../constants/Colors";
import { uuidv4 } from "../core/stringHelper";
const useGetUserAddresses = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    //isCancel to prevent "Can't perform a React state update on an unmounted component"
    let isCancelled = false;

    const unsubscribe = firebase
      .firestore()
      .collection("users")
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

const manageUserAddresses = async (address, edit = false) => {
  // return firebase.firestore().collection(collName).add(object);
  try {
    const db = firebase.firestore();
    const userId = firebase.auth().currentUser.uid;
    const userDoc = db.collection("users").doc(userId);

    console.log("manageUserAddresses", userDoc);
    // if (userDoc)

    // userDoc.update({
    //   addresses: firebase.firestore.FieldValue.arrayUnion(object),
    // });

    // else
    // await userDoc.set({ addresses: [] }, { merge: true });

    await db.runTransaction((transaction) => {
      return transaction.get(userDoc).then(async (snapshot) => {
        const addressesArray = snapshot.get("addresses");
        console.log("addressesArray", addressesArray);

        if (addressesArray) {
          if (edit) {
            console.log("edit", edit);
            const objIndex = addressesArray.findIndex(
              (el) => el.id === address.id
            );
            addressesArray[objIndex] = address;
          } else {
            address.id = uuidv4();
            addressesArray.push(address);
          }
          transaction.update(userDoc, "addresses", addressesArray);
        } else {
          address.id = uuidv4();
          userDoc.set({ addresses: [address] });
        }
      });
    });
  } catch (err) {
    console.log("manageUserAddresses", err);
  }
};

export default {
  useGetUserAddresses,
  manageUserAddresses,
};
