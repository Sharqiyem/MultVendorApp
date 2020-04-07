import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  SafeAreaView,
} from 'react-native';
import Colors from '../constants/Colors';
import { Logo } from '../components';
import LoginForm from '../components/LoginForm';

export default function ProfileScreen({ navigation }) {
  return (
    <>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Colors.primary,
          height: 80,
        }}
      >
        <Text style={{ color: Colors.white, fontSize: 20, marginTop: 30 }}>
          Profile
        </Text>
      </View>
      <View style={styles.container}>
        <View style={{ flex: 1, marginTop: 40 }}>
          <Logo />

          <LoginForm />
        </View>
      </View>
    </>
  );
}

ProfileScreen.navigationOptions = {
  title: '',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: Colors.white,
  },
});
