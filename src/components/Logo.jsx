import React from 'react';
import { View, Image } from 'react-native';

const logo = require('../../assets/images/logo.png');

const Logo = ({ style }) => {
  return (
    <View style={[{ alignItems: 'center' }, style]}>
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

export default Logo;
