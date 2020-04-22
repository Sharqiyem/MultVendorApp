import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Colors from '../constants/Colors';
import { Logo } from '../components';

import getStyle from '../constants/styles';

import Layout from '../constants/Layout';
import { Ionicons } from '@expo/vector-icons';
import firebase from '../config/firebase.config';
import { AuthContext } from '../context/authContext/provider';

export default function EditProfileScreen({ navigation }) {
  const { state } = React.useContext(AuthContext);
  const [email, setEmail] = React.useState(state.userDate.email);
  const [name, setName] = React.useState(state.userDate.name);

  const [error, setError] = React.useState('');

  const handleRegister = () => {
    // firebase
    //   .auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .then(() => {
    //     navigation.navigate('Profile');
    //   })
    //   .catch((err) => setError(err));
  };
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, margin: 20 }}>
        <TextInput
          style={getStyle().textInput}
          placeholder='Name'
          placeholderStyle={{ textAlign: 'center' }}
          onChangeText={(text) => (S = setName(text))}
          value={name}
          autoCorrect={false}
          autoCapitalize='none'
        />
        <TextInput
          style={getStyle().textInput}
          placeholder='Email'
          placeholderStyle={{ textAlign: 'center' }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          autoCorrect={false}
          autoCapitalize='none'
        />

        <TouchableOpacity
          onPress={handleRegister}
          style={getStyle().buttonPrimary}
        >
          <Text style={{ textAlign: 'center', color: Colors.white }}>SAVE</Text>
        </TouchableOpacity>
        {error ? <Text style={getStyle().error}>{error.message}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: Colors.white,
  },

  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    // backgroundColor: '#fbfbfb',
    paddingVertical: 30,
  },
});
