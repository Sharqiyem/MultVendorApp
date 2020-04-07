import firebase from '../config/firebase';
export const addNewItem = (collName, object) => {
  return firebase.firestore().collection(collName).add(object);
};
