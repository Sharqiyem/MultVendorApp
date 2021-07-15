import * as React from "react";
import { Platform } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

//Custome
import TabBarIcon from "../components/TabBarIcon";
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
import ContactUsScreen from "../screens/ContactUsScreen";
import AboutUsScreen from "../screens/shared/AboutUsScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import ChangePasswordScreen from "../screens/ChangePasswordScreen";
import DeliveryOrdersScreen from "../screens/delivery/DeliveryOrdersScreen";

const BottomTab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function ProfileStack({ navigation }) {
  const { t } = React.useContext(LocalizationContext);
  const { state } = React.useContext(StoreContext);
  return (
    <Stack.Navigator
      // initialRouteName='Register'
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.headerBG,
          shadowColor: "transparent",
          elevation: 0,
        },
        headerTitleStyle: {
          textAlign: "center",
          alignSelf: "center",
          flex: 1,
          width: "100%",
          fontSize: 14,
          // fontWeight:"200",
          fontFamily: Fonts.primaryRegular,
        },
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
        options={{ title: "Edit Profile" }}
        component={EditProfileScreen}
      />
      <Stack.Screen
        name="ChangePassword"
        options={{ title: "Change Password" }}
        component={ChangePasswordScreen}
      />

      <Stack.Screen
        name="Address"
        options={{
          title: "Addresses",
        }}
        component={AddressesScreen}
      />
      <Stack.Screen
        name="ManageAddress"
        options={{ title: "Manage address" }}
        component={ManageAddressScreen}
      />

      <Stack.Screen
        name="ContactUs"
        options={{ title: t("Contact Us") }}
        component={ContactUsScreen}
      />
      <Stack.Screen
        name="AboutUs"
        options={{ title: "About Us" }}
        component={AboutUsScreen}
      />
    </Stack.Navigator>
  );
}

function OrdersStack({ navigation }) {
  const { t } = React.useContext(LocalizationContext);
  const { state } = React.useContext(StoreContext);
  return (
    <Stack.Navigator
      // initialRouteName='Register'
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.headerBG,
          shadowColor: "transparent",
          elevation: 0,
        },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="Orders"
        options={{ title: t("Orders") }}
        component={DeliveryOrdersScreen}
      />
      <Stack.Screen
        name="OrderDetails"
        options={{ title: t("Order details") }}
        component={OrderDetailsScreen}
      />
    </Stack.Navigator>
  );
}

export default function DeliveryTabs() {
  const { t } = React.useContext(LocalizationContext);
  const { state, dispatch } = React.useContext(StoreContext);

  return (
    <BottomTab.Navigator
      tabBarPosition="bottom"
      //   initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={{
        safeAreaInset: { bottom: "always" },
        indicatorStyle: {
          display: "none",
          color: "#fff",
          borderColor: "transparent",
          borderBottomWidth: 0,
        },
        labelStyle: { fontSize: 11, fontFamily: Fonts.primaryRegular },
        style: {
          backgroundColor: Colors.tabBarBG,
          paddingBottom: Platform.OS === "ios" ? 20 : 0,
          // paddingBottom: 20,
        },
        activeTintColor: Colors.tabIconSelected,
        inactiveTintColor: Colors.primaryLight,
        showIcon: true,
        keyboardHidesTabBar: true,
      }}
    >
      {/* <BottomTab.Screen
        name='Orders'
        component={DeliveryOrdersScreen}
        options={{
          title: t('Orders'),

          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='md-home' />
          ),
        }}
      /> */}

      <BottomTab.Screen
        name="Orders"
        component={OrdersStack}
        options={{
          title: t("Orders"),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-apps" />
          ),
        }}
      />

      <BottomTab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          title: t("Account"),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="md-person" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
