import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as Icon from '@expo/vector-icons';

export default CartButton = ({ state, navigation }) => {
  console.log('CartButton', { state });
  //   const cartCount = state.cartCount;
  state.cartCount;
  const cartCount = state.cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
      }}
      onPress={() => navigation.navigate('Details', '')}
    >
      <Icon.Feather
        name="shopping-cart"
        size={26}
        color="#fff"
        style={{ marginHorizontal: 15 }}
      />
      <View
        style={{
          backgroundColor: '#ddee33',
          borderColor: '#fff',
          borderWidth: 1,
          width: 25,
          height: 25,
          borderRadius: 25 / 2,
          position: 'absolute',
          right: 0,
          top: -12,
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 12,

            color: 'red',
            alignSelf: 'center',
            textAlign: 'center',
            // padding: 3
          }}
        >
          {cartCount}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
