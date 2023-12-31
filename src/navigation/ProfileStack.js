import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

//Custome
import Colors from "../constants/Colors";

import {
  StoreContext,
  LocalizationContext,
} from "../context/cartContext/provider";

//Screens
import ProfileScreen from "../screens/ProfileScreen";
import AddressesScreen from "../screens/AddressesScreen";
import OrderDetailsScreen from "../screens/OrderDetailsScreen";
import ManageAddressScreen from "../screens/ManageAddressScreen";
import OrdersScreen from "../screens/OrdersScreen";
import ContactUsScreen from "../screens/ContactUsScreen";
import AboutUsScreen from "../screens/shared/AboutUsScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
const BottomTab = createMaterialTopTabNavigator();

const Stack = createStackNavigator();

const INITIAL_ROUTE_NAME = "Home";

function ProfileStack({ navigation }) {
  const { t } = React.useContext(LocalizationContext);
  const { state } = React.useContext(StoreContext);
  return (
    <Stack.Navigator
      // initialRouteName='Register'
      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          textAlign: "center",
          alignSelf: "center",
          // flex: 1,
          width: "100%",
          fontSize: 14,
          // fontWeight:"200",
          fontFamily: Fonts.primaryRegular,
        },
        headerStyle: {
          backgroundColor: Colors.headerBG,
          shadowColor: "transparent",
          elevation: 0,
        },

        // Header text color
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="Profile"
        options={{ title: t("Account") }}
        component={ProfileScreen}
      />
      <Stack.Screen
        name="EditProfile"
        options={{ title: t("Edit profile") }}
        component={EditProfileScreen}
      />
      <Stack.Screen
        name="ChangePassword"
        options={{ title: t("Change password") }}
        component={ChangePasswordScreen}
      />

      <Stack.Screen
        name="Orders"
        options={{ title: t("Orders") }}
        component={OrdersScreen}
      />
      <Stack.Screen
        name="OrderDetails"
        options={{ title: t("Order details") }}
        component={OrderDetailsScreen}
      />

      <Stack.Screen
        name="Address"
        options={{
          title: t("Addresses"),
        }}
        component={AddressesScreen}
      />
      <Stack.Screen
        name="ManageAddress"
        options={{ title: t("Manage address") }}
        component={ManageAddressScreen}
      />

      <Stack.Screen
        name="ContactUs"
        options={{ title: t("Contact Us") }}
        component={ContactUsScreen}
      />
      <Stack.Screen
        name="AboutUs"
        options={{ title: t("About Us") }}
        component={AboutUsScreen}
      />
    </Stack.Navigator>
  );
}

export default ProfileStack;
