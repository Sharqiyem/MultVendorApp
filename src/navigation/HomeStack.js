import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//Custome
import Colors from "../constants/Colors";
import CartButton from "../components/CartButton";

import {
  StoreContext,
  LocalizationContext,
} from "../context/cartContext/provider";

//Screens
import HomeScreen from "../screens/HomeScreen";
import StoreScreen from "../screens/StoreScreen";
import Fonts from "../constants/Fonts";
import OrdersScreen from "../screens/OrdersScreen";
import CategoryScreen from "../screens/CategoryScreen";

const Stack = createStackNavigator();

const HomeStack = ({ navigation }) => {
  const { t, locale } = React.useContext(LocalizationContext);

  const { state } = React.useContext(StoreContext);

  return (
    <Stack.Navigator
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
        //Header text color
        headerTintColor: "#fff",
        // headerLeft: (props) => <View />,

        headerRight: () => (
          <CartButton
            navigation={navigation}
            // state={state}
            // sourceScreen="CartHome"
          />
        ),
      }}
    >
      <Stack.Screen
        options={{
          title: t("Home"),
        }}
        name="Home"
        component={HomeScreen}
      />

      <Stack.Screen
        options={{
          title: t("Home"),
        }}
        name="Orders"
        component={OrdersScreen}
      />

      <Stack.Screen
        name="Store"
        options={({ route }) => ({
          title: route.params.item.name,
          headerShown: false,
          header: null,
        })}
        component={StoreScreen}
      />

      <Stack.Screen
        name="Category"
        options={({ route }) => ({
          title: route.params.item.names[locale] || route.params.item.name,
          // headerShown: false,
          // header: null,
        })}
        component={CategoryScreen}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
