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
import DeliveryOrdersScreen from "../screens/vendor/VendorOrdersScreen";
import VendorHomeScreen from "../screens/vendor/VendorHomeScreen";
import ProductsScreen from "../screens/vendor/ProductsScreen";
import NewProductScreen from "../screens/vendor/NewProductScreen";
import Fonts from "../constants/Fonts";
import CategorySelectorScreen from "../screens/vendor/CategorySelectorScreen";
import EditStoreScreen from "../screens/vendor/EditStoreScreen";
import ReviewsScreen from "../screens/vendor/ReviewsScreen";

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
          // flex: 1,
          width: "100%",
          fontSize: 14,
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
        options={{ title: t("Edit Profile") }}
        component={EditProfileScreen}
      />
      <Stack.Screen
        name="ChangePassword"
        options={{ title: t("Change Password") }}
        component={ChangePasswordScreen}
      />

      <Stack.Screen
        name="EditStore"
        options={{ title: t("Edit store") }}
        component={EditStoreScreen}
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
        headerTitleStyle: {
          textAlign: "center",
          alignSelf: "center",
          // flex: 1,
          width: "100%",
          fontSize: 14,
          // fontWeight:"200",
          fontFamily: Fonts.primaryRegular,
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

function HomeStack({ navigation }) {
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
          // flex: 1,
          width: "100%",
          fontSize: 14,
          // fontWeight:"200",
          fontFamily: Fonts.primaryRegular,
        },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="Home"
        options={{ title: t("Home") }}
        component={VendorHomeScreen}
      />
      <Stack.Screen
        name="Reviews"
        options={{ title: t("Reviews") }}
        component={ReviewsScreen}
      />
    </Stack.Navigator>
  );
}

function ProductsStack({ navigation }) {
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
          // flex: 1,
          width: "100%",
          fontSize: 14,
          // fontWeight:"200",
          fontFamily: Fonts.primaryRegular,
        },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="Products"
        options={{ title: t("Products") }}
        component={ProductsScreen}
      />
      <Stack.Screen
        name="NewProduct"
        options={{ title: t("New product") }}
        component={NewProductScreen}
      />
      <Stack.Screen
        name="CategorySelector"
        options={{ title: t("Select category") }}
        component={CategorySelectorScreen}
      />
    </Stack.Navigator>
  );
}

export default function VendorTabs() {
  const { t, isRTL } = React.useContext(LocalizationContext);
  const { state, dispatch } = React.useContext(StoreContext);

  let tabs = [
    {
      name: "Home",
      component: HomeStack,
      title: t("Home"),
      tabBarIconName: "md-home",
    },

    {
      name: "Products",
      component: ProductsStack,
      title: t("Products"),
      tabBarIconName: "md-apps",
    },
    {
      name: "Orders",
      component: OrdersStack,
      title: t("Orders"),
      tabBarIconName: "md-apps",
    },

    {
      name: "Profile",
      component: ProfileStack,
      title: t("Account"),
      tabBarIconName: "md-person",
    },
  ];

  if (!isRTL) {
    tabs = tabs.reverse();
  }

  return (
    <BottomTab.Navigator
      tabBarPosition="bottom"
      initialRouteName={"Home"}
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
        // keyboardHidesTabBar: true,
        keyboardHidesTabBar: false,
      }}
    >
      {tabs.map((tabItem) => {
        return (
          <BottomTab.Screen
            key={`tab-${tabItem.name}`}
            name={tabItem.name}
            component={tabItem.component}
            options={{
              title: tabItem.title,
              tabBarIcon: ({ focused }) => (
                <TabBarIcon focused={focused} name={tabItem.tabBarIconName} />
              ),
            }}
          />
        );
      })}
    </BottomTab.Navigator>
  );
}
