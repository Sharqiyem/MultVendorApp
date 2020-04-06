import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Colors from '../constants/Colors';
import { StoreListItem } from '../components/index';
export default function StoresScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          height: 60,
          backgroundColor: Colors.primary,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            width: '90%',
            height: 40,
            borderRadius: 20,
            backgroundColor: Colors.primaryLight,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: Colors.white }}>Search your store</Text>
        </View>
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <StoreListItem navigation={navigation} />
        <StoreListItem navigation={navigation} />

        <StoreListItem navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
}

StoresScreen.navigationOptions = {
  // header: null,
  // headerShown: false,
  title: 'sda',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
