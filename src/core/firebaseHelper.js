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
        } else {
          address.id = uuidv4();
          userDoc.set({ addresses: [address] });
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
    db.collection('orders').add(order);
    db.collection('chats')
      .doc(order.id)
      .set({ createdAt: new Date(), messages: [] });
  } catch (err) {
    console.log('manageUserAddresses', err);
  }
};
