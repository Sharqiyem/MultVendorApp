import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
const logo = require('../../assets/images/logo.png');

export const Logo = () => {
  return (
    <View style={{ alignItems: 'center' }}>
      <View
        style={{
          height: 50,
          width: 50,
        }}
      >
        <Image
          style={{
            alignContent: 'center',
            height: '100%',
            width: '100%',
            marginVertical: 10,
          }}
          source={logo}
        />
      </View>
    </View>
  );
};
