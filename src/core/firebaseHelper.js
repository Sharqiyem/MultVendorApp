import firebase from '../config/firebase.config';

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const saveUserToDb = async (address, edit = false) => {
  // return firebase.firestore().collection(collName).add(object);
  try {
    const db = firebase.firestore();
    const userId = firebase.auth().currentUser.uid;
    const userDoc = db.collection('users').doc(userId);

    console.log('saveUserToDb', userDoc);
    // if (userDoc)

    // userDoc.update({
    //   addresses: firebase.firestore.FieldValue.arrayUnion(object),
    // });

    // else
    // await userDoc.set({ addresses: [] }, { merge: true });

    db.runTransaction((transaction) => {
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
    console.log('saveUserToDb', err);
  }
};

export const updateUserToDb = async (object) => {
  // return firebase.firestore().collection(collName).add(object);
  try {
    const db = firebase.firestore();
    const userId = firebase.auth().currentUser.uid;
    const userDoc = db.collection('users').doc(userId);
    console.log(userDoc);
    // if (userDoc)
    userDoc.update({
      addresses: firebase.firestore.FieldValue.arrayUnion(object),
    });
    // else
    // await userDoc.set({ addresses: [] }, { merge: true });

    //   db.runTransaction((transaction) => {
    //     return transaction.get(userDoc).then(async (snapshot) => {
    //       const largerArray = snapshot.get('addresses');
    //       console.log('largerArray', largerArray);
    //       if (largerArray.length === 0)
    //         await userDoc.set({ addresses: [] }, { merge: true });
    //       largerArray.push(object);
    //       transaction.update(userDoc, 'addresses', largerArray);
    //     });
    //   });
  } catch (err) {
    console.log('saveUserToDb', err);
  }
};
