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
import { Ionicons, Feather } from '@expo/vector-icons';
import firebase from '../config/firebase.config';
import { AuthContext } from '../context/authContext/provider';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = React.useState('d@d.com');
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
      .then(async (user) => {
        console.log(user);
        const userDoc = await firebase
          .firestore()
          .collection('users')
          .doc(firebase.auth().currentUser.uid)
          .get();

        console.log('handleLogin', userDoc.data());
        signIn(userDoc.data());
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
      <View style={{ alignItems: 'center' }}>
        <Logo style={{ marginTop: 100, marginBottom: 20 }} />
        <Text style={{ fontSize: 24 }}>Welcome back</Text>
        <Text style={{ color: Colors.gray }}>Login to your account</Text>
      </View>
      <View style={{ flex: 1, margin: 20 }}>
        <View style={{ justifyContent: 'center' }}>
          <Feather
            name='user'
            size={20}
            style={getStyle().textinputIcon}
            color={Colors.primaryLight}
          />
          <TextInput
            style={[getStyle().textInput]}
            placeholder='Email'
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
            style={getStyle().textinputIcon}
            color={Colors.primaryLight}
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
            getStyle().flexDir,
          ]}
        >
          <Text style={{}}>Forgot password?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={isLoading}
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
            <Text style={{ textAlign: 'center', color: Colors.gray }}>
              Or Connect using
            </Text>
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

        <View
          style={[
            {
              // backgroundColor: 'red',
              marginBottom: 60,
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
                },
                // getStyle().link,
              ]}
            >
              Don't have an account?{' '}
              <Text
                style={[
                  {
                    textAlign: 'center',
                    color: Colors.primary,
                    borderBottomColor: Colors.primary,
                  },
                  // getStyle().link,
                ]}
              >
                Sign Up
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity onPress={() => {}} style={getStyle().buttonOutline}>
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
    backgroundColor: '#F4F3F3',
  },
});
