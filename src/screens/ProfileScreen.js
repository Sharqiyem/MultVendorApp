import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import Colors from '../constants/Colors';
import { Logo } from '../components';
import LoginForm from '../components/LoginForm';

export default function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Hello</Text>
    </View>
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
