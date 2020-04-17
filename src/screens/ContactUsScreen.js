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
import { LocalizationContext } from '../context/cartContext/provider';
import Textarea from '../components/TextArea';

export default function ContactUsScreen({ navigation }) {
  const { t, isRTL } = React.useContext(LocalizationContext);

  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [title, setTitle] = React.useState('');

  const [error, setError] = React.useState('');

  const handleSend = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate('Profile');
      })
      .catch((err) => setError(err));
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, margin: 20 }}>
        <TextInput
          style={getStyle().textInput}
          placeholder='Email'
          placeholderStyle={{ textAlign: 'center' }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          autoCorrect={false}
          autoCapitalize='none'
        />
        <TextInput
          style={getStyle().textInput}
          placeholder='Title'
          placeholderStyle={{ textAlign: 'center' }}
          onChangeText={(text) => setTitle(text)}
          value={title}
        />

        <Textarea
          style={styles.textarea}
          isRTL={isRTL}
          onChangeText={(text) => setMessage(text)}
          defaultValue={message}
          maxLength={100}
          textStyle={[getStyle().text, { textAlign: 'center' }]}
          placeholder={t('Message content')}
          placeholderTextColor={'#c7c7c7'}
          containerStyle={styles.textareaContainer}
          underlineColorAndroid={'transparent'}
        />

        <TouchableOpacity onPress={handleSend} style={getStyle().buttonPrimary}>
          <Text style={{ textAlign: 'center', color: Colors.white }}>SEND</Text>
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
  textarea: {
    textAlignVertical: 'top', // hack android
    height: 80,
    fontSize: 20,
  },
});
