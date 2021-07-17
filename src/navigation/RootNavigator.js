import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import * as Notifications from "expo-notifications";

//Screens
import { AuthContext } from "../context/authContext/provider";
import LoadingScreen from "../screens/LoadingScreen";
import DeliveryTabs from "./DeliveryNavigator";
import ChatScreen from "../screens/ChatScreen";
import { useNotify } from "../hooks/useNotify";
import VendorTabs from "./VendorTabs";
import UserTabs from "./UserTabs";
import AuthStack from "./AuthStack";
import CartStack from "./CartStack";

const Stack = createStackNavigator();

export default RootNavigator = () => {
  const {
    state: { isLoading, userToken, isDelivery, isVendor, userData },
  } = React.useContext(AuthContext);
  // console.log({ isLoading, userToken, isDelivery });

  const notificationListener = React.useRef();
  const responseListener = React.useRef();

  //Set notifications listners
  React.useEffect(() => {
    if (userData?.pushNotificationToken) {
      // This listener is fired whenever a notification is received while the app is foregrounded
      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          console.log("Notification received", notification);
        });

      // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {
          console.log("Notification clicked", response);
        });

      return () => {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }
  }, [userData?.pushNotificationToken]);

  return (
    <Stack.Navigator
      // ref={navigationRef}
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        headerStyle: {},
        headerTitleStyle: {
          textAlign: "center",
          alignSelf: "center",
          // flex: 1,
          width: "100%",
          fontSize: 14,
          // fontWeight:"200",
          fontFamily: Fonts.primaryRegular,
        },
      }}
    >
      {isLoading ? (
        <Stack.Screen name="Loading" component={LoadingScreen} />
      ) : userToken ? (
        isDelivery ? (
          <Stack.Screen name="Home" component={DeliveryTabs} />
        ) : isVendor ? (
          <Stack.Screen name="Home" component={VendorTabs} />
        ) : (
          <Stack.Screen name="Home" component={UserTabs} />
        )
      ) : (
        <Stack.Screen name="Auth" component={AuthStack} />
      )}
      <Stack.Screen
        name="Cart"
        options={{ headerRight: null }}
        component={CartStack}
      />
      <Stack.Screen
        name="Chat"
        options={{ title: "Chat" }}
        component={ChatScreen}
      />
    </Stack.Navigator>
  );
};
