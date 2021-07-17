import { uuidv4 } from "./stringHelper";
import firebase from "../config/firebase.config";

export async function uploadImageAsync(uri, storageImagePath = "products") {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const childId = uuidv4();
    const userId = firebase.auth().currentUser.uid;

    const ref = firebase.storage().ref(`${storageImagePath}/${userId}`).child(childId);
    const snapshot = await ref.put(blob);

    // We're done with the blob, close and release it
    blob.close();

    return await snapshot.ref.getDownloadURL();
  }