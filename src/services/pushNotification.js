import { Platform, Vibration } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import firebase from '../config/firebase.config';

export const registerForPushNotificationsAsync = async () => {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
   
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();

  console.log('push notif token', token);

  if (Platform.OS === 'android') {
    Notifications.createChannelAndroidAsync('default', {
      name: 'default',
      sound: true,
      priority: 'max',
      vibrate: [0, 250, 250, 250],
    });
  }

  return token;
};

export const updateUserPushNotificationToken = async (token) => {
  // Register PushNotifications
  try {
    const user = firebase.auth().currentUser;

    firebase.firestore().collection('users').doc(user.uid).update({
      pushNotificationToken: token,
    });

    console.log('Push token', token);
  } catch (err) {
    console.log('registerForPushNotificationsAsync faild ');
    throw err;
  }
};

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
export const sendPushNotification = async (to, title, body) => {
  const message = {
    to,
    sound: 'default',
    title: title || 'Original Title',
    body: body || 'And here is the body!',
    data: { data: 'goes here' },
    _displayInForeground: true,
  };

  //save notification to FB
  firebase.firestore().collection('notifications').add(data);

  // push notification
  const response = await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
};
