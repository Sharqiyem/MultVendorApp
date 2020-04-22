import firebase from '../config/firebase.config';

export class FirebaseAuth {
  static login(email, password) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(async (user) => {
          console.log(user);
          const userDoc = await firebase
            .firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .get();

          // update push notification token
          let token = '';
          try {
            token = await registerForPushNotificationsAsync();
            if (token) await updateUserPushNotificationToken(token);
          } catch (err) {
            alert('Failed to get push token for push notification!');
            // reject('Failed to get push token for push notification!');
          }
          const userObj = { ...userDoc.data(), pushNotificationToken: token };
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
          console.log('user', user);

          let token = '';

          try {
            token = await registerForPushNotificationsAsync();
          } catch (err) {
            alert('Failed to get push token for push notification!');
          }

          const userData = {
            email,
            name,
            role: 'user',
            pushNotificationToken: token,
          };

          if (user) {
            user
              .updateProfile({
                displayName: name,
              })
              .then(function () {
                console.log('Profile updated successful.');
              })
              .catch(function (error) {
                console.log('Profile updated faild', error);
              });
            firebase
              .firestore()
              .collection('users')
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
}
