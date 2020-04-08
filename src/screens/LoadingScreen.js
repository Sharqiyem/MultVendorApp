import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import Colors from '../constants/Colors';

const LoadingScreen = () => {
  console.log('Loading screen');
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size='large' color={Colors.primary} />
      <Text>Loading</Text>
    </View>
  );
};

export default LoadingScreen;
