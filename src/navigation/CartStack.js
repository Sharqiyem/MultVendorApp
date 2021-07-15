import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";

//Custome
import Colors from "../constants/Colors";

import {
  StoreContext,
  LocalizationContext,
} from "../context/cartContext/provider";

//Screens
import CartScreen from "../screens/CartScreen";
import AddressesScreen from "../screens/AddressesScreen";
import PaymentScreen from "../screens/PaymentScreen";
import OrderDetailsScreen from "../screens/OrderDetailsScreen";
import ManageAddressScreen from "../screens/ManageAddressScreen";
const BottomTab = createMaterialTopTabNavigator();

const Stack = createStackNavigator();

function CartStack({ navigation }) {
  const { t } = React.useContext(LocalizationContext);
  const { state, dispatch } = React.useContext(StoreContext);

  return (
    <Stack.Navigator
      screenOptions={{
        // headerShown: false,
        gestureEnabled: false,
        headerStyle: {
          backgroundColor: Colors.headerBG,
          shadowColor: "transparent",
          borderBottomWidth: 0,
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
        //Header text color
        headerTintColor: "#fff",
        headerRight: (props) => (
          <Ionicons
            name="md-close"
            size={26}
            color="#fff"
            style={{ marginHorizontal: 15 }}
            onPress={() => {
              navigation.navigate("Home");
            }}
          />
        ),
      }}
    >
      <Stack.Screen
        name="Cart"
        options={{
          title: "Your cart",
          // headerRight: null,
        }}
        component={CartScreen}
      />

      <Stack.Screen
        name="Address"
        options={{
          title: "Select address",
        }}
        component={AddressesScreen}
      />
      <Stack.Screen
        name="ManageAddress"
        options={{ title: "Manage address" }}
        component={ManageAddressScreen}
      />
      <Stack.Screen
        name="Payment"
        options={{ title: "Payment" }}
        component={PaymentScreen}
      />
      <Stack.Screen
        name="OrderDetails"
        options={{ title: "Order details", headerLeft: null }}
        component={OrderDetailsScreen}
      />
    </Stack.Navigator>
  );
}

export default CartStack;
