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
import StoresScreen from "../screens/StoresScreen";
import StoreScreen from "../screens/StoreScreen";
import Fonts from "../constants/Fonts";
import CartScreen from "../screens/CartScreen";

const Stack = createStackNavigator();

function StoresStack({ navigation }) {
  const { t } = React.useContext(LocalizationContext);
  const { state } = React.useContext(StoreContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: Colors.headerBG,
          shadowColor: "transparent",
          borderBottomWidth: 0,
          elevation: 0,
        },
        headerTitleStyle: {
          fontFamily: Fonts.primaryRegular,
          fontSize: 14,
        },
        //Header text color
        headerTintColor: "#fff",
        headerRight: () => (
          <CartButton
            navigation={navigation}
            // state={state}
            // sourceScreen="CartStores"
          />
        ),
      }}
    >
      <Stack.Screen
        name="Stores"
        options={{ title: t("Stores") }}
        component={StoresScreen}
      />
      {/* <Stack.Screen
        name="Cart"
        options={{ title: t("Stores") }}
        component={CartScreen}
      /> */}
      <Stack.Screen
        name="Store"
        options={({ route }) => ({
          title: route.params.item.name,
          headerShown: false,
          header: null,
        })}
        component={StoreScreen}
      />
      {/* <Stack.Screen
        name='CartStores'
        options={{
          title: 'Your cart',
          headerRight: null,
        }}
        component={CartScreen}
      /> */}
    </Stack.Navigator>
  );
}
export default StoresStack;
