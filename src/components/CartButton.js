import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import * as Icon from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { StoreContext } from "../context/cartContext/provider";

export default CartButton = ({}) => {
  // console.log('CartButton', { state });
  //   const cartCount = state.cartCount;
  const navigation = useNavigation();
  const { state, dispatch } = React.useContext(StoreContext);

  state.cartCount;
  const cartCount = state.cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        marginHorizontal: 10,
      }}
      onPress={() => navigation.navigate("Cart")}
    >
      <Icon.Feather
        name="shopping-cart"
        size={25}
        color="#fff"
        style={{ marginHorizontal: 15 }}
      />
      <View
        style={{
          backgroundColor: Colors.secondary,
          borderColor: Colors.white,
          borderWidth: 1,
          width: 25,
          height: 25,
          borderRadius: 25 / 2,
          position: "absolute",
          right: 0,
          top: -12,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 13,
            color: Colors.black,
            alignSelf: "center",
            // textAlign: 'center',
          }}
        >
          {cartCount}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
