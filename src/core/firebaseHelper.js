import firebase from '../config/firebase.config';
import { uuidv4, orderUUID } from './stringHelper';

export const manageUserAddresses = async (address, edit = false) => {
  // return firebase.firestore().collection(collName).add(object);
  try {
    const db = firebase.firestore();
    const userId = firebase.auth().currentUser.uid;
    const userDoc = db.collection('users').doc(userId);

    console.log('manageUserAddresses', userDoc);
    // if (userDoc)

    // userDoc.update({
    //   addresses: firebase.firestore.FieldValue.arrayUnion(object),
    // });

    // else
    // await userDoc.set({ addresses: [] }, { merge: true });

    await db.runTransaction((transaction) => {
      return transaction.get(userDoc).then(async (snapshot) => {
        const addressesArray = snapshot.get('addresses');
        console.log('addressesArray', addressesArray);

        // TODO: Fix if addressesArray doesn't exist
        if (addressesArray) {
          if (edit) {
            console.log('edit', edit);
            const objIndex = addressesArray.findIndex(
              (el) => el.id === address.id
            );
            addressesArray[objIndex] = address;
          } else {
            address.id = uuidv4();
            addressesArray.push(address);
          }
          transaction.update(userDoc, 'addresses', addressesArray);
        }
      });
    });
  } catch (err) {
    console.log('manageUserAddresses', err);
  }
};

export const addOrder = async (order) => {
  try {
    const db = firebase.firestore();
    const userId = firebase.auth().currentUser.uid;
    const userDoc = db.collection('users').doc(userId);

    await db.runTransaction((transaction) => {
      return transaction.get(userDoc).then(async (snapshot) => {
        const ordersArray = snapshot.get('orders');
        console.log('orders', ordersArray);

        // TODO: Fix if addressesArray doesn't exist
        if (ordersArray) {
          ordersArray.push(order);

          transaction.update(userDoc, 'orders', ordersArray);
        }
      });
    });
  } catch (err) {
    console.log('manageUserAddresses', err);
  }
};
