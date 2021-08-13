import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

//Custome
import Colors from "../constants/Colors";

import { StoreContext } from "../context/cartContext/provider";

//Screens
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
const BottomTab = createMaterialTopTabNavigator();

const Stack = createStackNavigator();

export function AuthStack({ navigation }) {
  const { state } = React.useContext(StoreContext);

  return (
    <Stack.Navigator
      // initialRouteName='Register'

      screenOptions={{
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "200",
          fontFamily: "DroidKufi",
          fontSize: 14,
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
        name="Login"
        options={{ title: "Login", headerShown: false }}
        component={LoginScreen}
      />
      <Stack.Screen
        name="Register"
        options={{ title: "Register", headerShown: false }}
        component={RegisterScreen}
      />
      <Stack.Screen
        name="ForgotPassword"
        options={{ title: "Forgot password" }}
        component={ForgotPasswordScreen}
      />
    </Stack.Navigator>
  );
}

export default AuthStack;
