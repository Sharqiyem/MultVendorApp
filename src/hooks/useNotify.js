import { Vibration } from "react-native";
import { useState, useEffect } from "react";
import * as Notifications from "expo-notifications";
import { useNavigation, CommonActions } from "@react-navigation/native";

import * as RootNavigation from "../navigation/NavigationRef";
export const useNotify = () => {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // const handleNotification = (notification) => {
    //   console.log(JSON.stringify('handleNotification', notification));
    //   Vibration.vibrate();
    //   console.log(notification);
    //   setNotification(notification);
    // };
    // const notificationSubscription = Notifications.addListener(
    //   handleNotification
    // );
    // const timer = setTimeout(() => {
    //   setNotification({ notification: '12', title: 'ti2' });
    //   RootNavigation.navigate('Chat');
    //   // navigation.navigate('Chat');
    //   // navigation.dispatch(
    //   //   CommonActions.navigate({
    //   //     name: 'Chat',
    //   //     params: {
    //   //       user: 'jane',
    //   //     },
    //   //   })
    //   // );
    // }, 6000);
    // return () => {
    //   clearTimeout(timer);
    // };
  }, []);

  return notification;
}; //useNotify
