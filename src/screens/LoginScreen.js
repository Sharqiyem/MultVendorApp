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
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import Constants from 'expo-constants';

import Colors from '../constants/Colors';
import { Logo } from '../components';

import getStyle from '../constants/styles';

import Layout from '../constants/Layout';
import { Ionicons, Feather } from '@expo/vector-icons';
import firebase from '../config/firebase.config';
import { AuthContext } from '../context/authContext/provider';
import { t } from 'i18n-js';
import { LocalizationContext } from '../context/cartContext/provider';
import {
  updateUserPushNotificationToken,
  registerForPushNotificationsAsync,
} from '../services/pushNotification';
import FirebaseAuth from '../services/firebaseAuth';

export default function LoginScreen({ navigation }) {
  const { t } = React.useContext(LocalizationContext);
  const {
    textInput,
    row,
    error: errorStyle,
    buttonPrimary,
    statusBar,
    textinputIcon,
    flexDir,
  } = getStyle();

  const { state, signIn } = React.useContext(AuthContext);

  const [email, setEmail] = React.useState('a@a.com');
  const [password, setPassword] = React.useState('123456');
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  console.log('auth STATE', state);

  React.useEffect(() => {});

  const handleLogin = () => {
    setIsLoading(true);
    setError('');
    FirebaseAuth.login(email, password)
      .then((user) => {
        signIn(user);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(JSON.stringify(err));
        setError(err);
      });

    //start
    // firebase
    //   .auth()
    //   .signInWithEmailAndPassword(email, password)
    //   .then(async (user) => {
    //     console.log(user);
    //     const userDoc = await firebase
    //       .firestore()
    //       .collection('users')
    //       .doc(firebase.auth().currentUser.uid)
    //       .get();

    //     let token = '';

    //     try {
    //       token = await registerForPushNotificationsAsync();
    //       if (token) await updateUserPushNotificationToken(token);
    //     } catch (err) {
    //       alert('Failed to get push token for push notification!');
    //     }

    //     console.log('handleLogin', userDoc.data());
    //     const userObj = { ...userDoc.data(), pushNotificationToken: token };

    //     // end

    //     signIn(userObj);
    //     setIsLoading(false);
    //     // navigation.navigate('Home');
    //   })
    //   .catch((err) => {
    //     setIsLoading(false);
    //     console.log(JSON.stringify(err));
    //     setError(err.message);
    //   });
  };

  console.log('Constants.statusBarHeight', Constants.statusBarHeight);
  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' && <StatusBar barStyle='dark-content' />}
      {/* <View style={statusBar} /> */}

      <View style={{ alignItems: 'center' }}>
        <Logo style={{ marginTop: 120, marginBottom: 20 }} />
        <Text style={{ fontSize: 26, color: Colors.primary }}>
          {t('Welcome back')}
        </Text>
        <Text style={{ color: Colors.gray }}>{t('Login to your account')}</Text>
      </View>
      <View style={{ flex: 1, margin: 20 }}>
        <View style={{ justifyContent: 'center' }}>
          <Feather
            name='user'
            size={20}
            style={textinputIcon}
            color={Colors.primaryLight}
          />
          <TextInput
            style={[textInput]}
            placeholder={t('Email')}
            placeholderStyle={{ textAlign: 'center' }}
            onChangeText={(text) => setEmail(text)}
            value={email}
            autoCorrect={false}
            autoCapitalize='none'
          />
        </View>

        <View style={{ justifyContent: 'center' }}>
          <Feather
            name='lock'
            size={20}
            style={textinputIcon}
            color={Colors.primaryLight}
          />
          <TextInput
            style={textInput}
            placeholder={t('Password')}
            placeholderStyle={{ textAlign: 'center' }}
            onChangeText={(text) => setPassword(text)}
            value={password}
            autoCorrect={false}
            autoCapitalize='none'
            secureTextEntry
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ForgotPassword');
          }}
          style={[
            {
              // flex: 1,
              // backgroundColor: 'red',
              // marginHorizontal: 20,
            },
            flexDir,
          ]}
        >
          <Text style={{}}>{t('Forgot password?')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={isLoading}
          onPress={handleLogin}
          style={buttonPrimary}
        >
          <Text style={{ textAlign: 'center', color: Colors.white }}>
            {t('Login')}
          </Text>
        </TouchableOpacity>

        {isLoading ? (
          <ActivityIndicator
            style={{
              alignSelf: 'center',
              width: Layout.window.width,
            }}
            size={'large'}
            color={Colors.primary}
          />
        ) : null}
        {error ? <Text style={error}>{error}</Text> : null}

        {/* Social media login */}
        <View
          style={[
            row,
            {
              justifyContent: 'space-around',
              alignItems: 'center',
              marginVertical: 20,
            },
          ]}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ textAlign: 'center', color: Colors.gray }}>
              {t('Or Connect using')}
            </Text>
          </View>
          <View
            style={[
              row,
              { flex: 1, justifyContent: 'center', alignItems: 'center' },
            ]}
          >
            <Ionicons
              name='logo-facebook'
              size={30}
              style={{ marginHorizontal: 10 }}
              color={Colors.primary}
            />

            <Ionicons
              name='logo-google'
              size={30}
              style={{ marginHorizontal: 10 }}
              color={Colors.secondary}
            />
          </View>
        </View>

        <View
          style={[
            {
              // backgroundColor: 'red',
              marginBottom: 10,
              flex: 1,
              marginHorizontal: 20,
              justifyContent: 'flex-end',
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Register');
            }}
          >
            <Text
              style={[
                {
                  textAlign: 'center',
                  // color: Colors.primary,
                  borderBottomColor: Colors.primary,
                  fontSize: 16,
                },
                // link,
              ]}
            >
              {t("Don't have an account?")}{' '}
              <Text
                style={[
                  {
                    textAlign: 'center',
                    color: Colors.primary,
                    borderBottomColor: Colors.primary,
                    fontSize: 16,
                  },
                  // link,
                ]}
              >
                {t('Sign Up')}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity onPress={() => {}} style={buttonOutline}>
          <Text style={{ textAlign: 'center', color: Colors.primary }}>
            REGISTER
          </Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
}

LoginScreen.navigationOptions = {
  title: '',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  statusBar: {
    backgroundColor: Colors.primary,
    height: Constants.statusBarHeight,
  },
});
