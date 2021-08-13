import { Platform, Vibration } from "react-native";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import firebase from "../config/firebase.config";
import Constants from "expo-constants";

export const registerForPushNotificationsAsync = async () => {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log("registerForPushNotificationsAsync token", token);
  } else {
    console.log("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
};

export const updateUserPushNotificationToken = async (token) => {
  // Register PushNotifications
  try {
    const user = firebase.auth().currentUser;

    firebase.firestore().collection("users").doc(user.uid).update({
      pushNotificationToken: token,
    });

    console.log("Push token", token);
  } catch (err) {
    console.log("registerForPushNotificationsAsync faild ");
    throw err;
  }
};

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
export const sendPushNotification = async (to, title, body) => {
  try {
    const message = {
      to,
      sound: "default",
      title: title || "Original Title",
      body: body || "And here is the body!",
      data: { data: "goes here" },
      _displayInForeground: true,
    };

    //save notification to FB
    firebase.firestore().collection("notifications").add({
      to,
      title,
      body,
    });

    // push notification
    const response = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    console.log("push response", JSON.stringify(response));
  } catch (e) {
    console.log("sendPushNotification err", err);
  }
};
