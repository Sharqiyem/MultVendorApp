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
} from 'react-native';
import Colors from '../constants/Colors';
import { Logo } from '../components';

import getStyle from '../constants/styles';

import Layout from '../constants/Layout';
import { Ionicons } from '@expo/vector-icons';
import firebase from '../config/firebase.config';
import { AuthContext } from '../context/authContext/provider';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = React.useState('b@b.com');
  const [password, setPassword] = React.useState('123456');
  const [error, setError] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const { state, signIn } = React.useContext(AuthContext);
  console.log('auth STATE', state);

  React.useEffect(() => {});

  const handleLogin = () => {
    setIsLoading(true);
    console.log('handleLogin');
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user.user.id);
        signIn(user.user.uid);
        setIsLoading(false);
        // navigation.navigate('Home');
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err);
      });
  };

  return (
    <View style={styles.container}>
      <Logo style={{ marginVertical: 100 }} />
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
          placeholder='Password'
          placeholderStyle={{ textAlign: 'center' }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          autoCorrect={false}
          autoCapitalize='none'
          secureTextEntry
        />
        <TouchableOpacity
          onPress={handleLogin}
          style={getStyle().buttonPrimary}
        >
          <Text style={{ textAlign: 'center', color: Colors.white }}>
            LOGIN
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
        {error ? <Text style={getStyle().error}>{error.message}</Text> : null}

        {/* Social media login */}
        <View
          style={[
            getStyle().row,
            {
              justifyContent: 'space-around',
              alignItems: 'center',
              marginVertical: 20,
            },
          ]}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ textAlign: 'center' }}>Or Connect with</Text>
          </View>
          <View
            style={[
              getStyle().row,
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
        {/* <TouchableOpacity onPress={() => {}} style={getStyle().buttonOutline}>
          <Text style={{ textAlign: 'center', color: Colors.primary }}>
            REGISTER
          </Text>
        </TouchableOpacity> */}

        <View style={styles.tabBarInfoContainer}>
          <View
            style={[
              // getStyle().row,
              {
                flexDirection: 'row',
                // width: Layout.window.width,
                justifyContent: 'center',
                // backgroundColor: 'red',
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ForgotPassword');
              }}
              style={[
                {
                  // flex: 1,
                  // backgroundColor: 'red',
                  marginHorizontal: 20,
                },
                getStyle().flexDir,
              ]}
            >
              <Text style={{ textAlign: 'center', color: Colors.primary }}>
                Forgot password?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Register');
              }}
              style={[
                {
                  borderBottomColor: Colors.primary,
                  borderBottomWidth: 1,

                  marginHorizontal: 20,
                },
              ]}
            >
              <Text
                style={[
                  {
                    textAlign: 'center',
                    color: Colors.primary,
                    borderBottomColor: Colors.primary,
                    borderBottomWidth: 1,
                  },
                  // getStyle().link,
                ]}
              >
                New here, Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
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
