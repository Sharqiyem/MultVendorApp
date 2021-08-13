import firebase from "../config/firebase.config";
import {
  registerForPushNotificationsAsync,
  updateUserPushNotificationToken,
} from "./pushNotification";

export default class FirebaseAuth {
  static login(email, password) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(async (user) => {
          console.log(user);
          const userDoc = await firebase
            .firestore()
            .collection("users")
            .doc(firebase.auth().currentUser.uid)
            .get();

          // update push notification token
          let token = "";
          try {
            token = await registerForPushNotificationsAsync();
            if (token) await updateUserPushNotificationToken(token);
          } catch (err) {
            alert("Failed to get push token for push notification! ");
            console.log("push notification err", err);
            // reject('Failed to get push token for push notification!');
          }

          if (token === undefined) {
            token = "";
          }

          const userObj = {
            ...userDoc.data(),
            pushNotificationToken: token || "",
          };
          resolve(userObj);
        })
        .catch((err) => {
          // alert('Failed to login');
          reject(err.message);
        });
    });
  }

  static register(email, password, name) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async () => {
          const user = firebase.auth().currentUser;
          console.log("user", user);

          let token = "";

          try {
            token = await registerForPushNotificationsAsync();
          } catch (err) {
            alert("Failed to get push token for push notification!");
          }

          if (token === undefined) {
            token = "";
          }
          const userData = {
            email,
            name,
            role: "user",
            pushNotificationToken: token || "",
          };

          if (user) {
            user
              .updateProfile({
                displayName: name,
              })
              .then(function () {
                console.log("Profile updated successful.");
              })
              .catch(function (error) {
                console.log("Profile updated faild", error);
              });
            firebase
              .firestore()
              .collection("users")
              .doc(user.uid)
              .set({
                ...userData,
                addresses: [],
              });
          }
          resolve(userData);
        })
        .catch((err) => {
          // alert('Failed to login');
          reject(err.message);
        });
    });
  }

  static reauthenticate = (currentPassword) => {
    const user = firebase.auth().currentUser;
    const cred = firebase.auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    return user.reauthenticateWithCredential(cred);
  };

  static changePassword = (currentPassword, newPassword) => {
    return new Promise((resolve, reject) => {
      FirebaseAuth.reauthenticate(currentPassword)
        .then(() => {
          const user = firebase.auth().currentUser;
          user
            .updatePassword(newPassword)
            .then(() => {
              resolve();
            })
            .catch((error) => {
              reject(error.message);
            });
        })
        .catch((error) => {
          reject(error.message);
        });
    });
  };

  static editProfile = (name) => {
    return new Promise((resolve, reject) => {
      const user = firebase.auth().currentUser;
      user
        .updateProfile({
          displayName: name,
        })
        .then(function () {
          console.log("Profile updated successful.");
        })
        .catch(function (error) {
          reject("Profile updated faild", error);
        });

      firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .update({
          name,
        })
        .then(function () {
          console.log("Profile updated successful.");
          resolve();
        })
        .catch(function (error) {
          reject("Profile updated faild", error);
        });
    });
  };
}
