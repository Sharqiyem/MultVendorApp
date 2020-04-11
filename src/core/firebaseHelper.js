import firebase from '../config/firebase.config';

export const saveUserToDb = async (object) => {
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
