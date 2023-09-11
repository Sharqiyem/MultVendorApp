import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import * as Icon from "@expo/vector-icons";

//Custome
import Colors from "../constants/Colors";
import CartButton from "../components/CartButton";

import {
  StoreContext,
  LocalizationContext,
} from "../context/cartContext/provider";

//Screens
import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryScreen from "../screens/CategoryScreen";
import Fonts from "../constants/Fonts";
import ProductTypesScreen from "../screens/ProductTypesScreen";
import ProductsByTypesScreen from "../screens/ProductsByTypesScreen";
const BottomTab = createMaterialTopTabNavigator();

const Stack = createStackNavigator();

const ProductTypesStack = ({ navigation }) => {
  const { t, locale } = React.useContext(LocalizationContext);
  const { state, dispatch } = React.useContext(StoreContext);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.headerBG,
          shadowColor: "transparent",
          elevation: 0,
        },
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: 14,
          fontFamily: Fonts.primaryRegular,
          textAlign: "center",
        },
        //Header text color
        headerTintColor: "#fff",
        headerRight: (props) => <CartButton />,
      }}
    >
      <Stack.Screen
        name="Categories"
        options={{
          title: t("Categories"),
          headerLeft: () => (
            <Icon.Feather
              onPress={() => navigation.navigate("Search")}
              name="search"
              size={25}
              color={Colors.white}
              style={{ marginLeft: 10 }}
            />
          ),
        }}
        component={ProductTypesScreen}
      />
      <Stack.Screen
        name="Category"
        options={({ route }) => ({
          title: route.params.item.names[locale] || route.params.item.name,
        })}
        component={ProductsByTypesScreen}
      />
      {/* <Stack.Screen
        name='CartCat'
        options={{ title: 'Your cart', headerRight: null }}
        component={CartScreen}
      /> */}
    </Stack.Navigator>
  );
};

export default ProductTypesStack;
