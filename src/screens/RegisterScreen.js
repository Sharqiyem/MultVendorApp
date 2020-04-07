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

export default function RegisterScreen({ navigation }) {
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  return (
    <View style={styles.container}>
      <Logo style={{ marginVertical: 100 }} />
      <View style={{ flex: 1, margin: 20 }}>
        <TextInput
          style={getStyle().textInput}
          placeholder='User name'
          placeholderStyle={{ textAlign: 'center' }}
          onChangeText={(text) => setUserName(text)}
          value={userName}
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
        <TextInput
          style={getStyle().textInput}
          placeholder='Confirm Password'
          placeholderStyle={{ textAlign: 'center' }}
          onChangeText={(text) => setConfirmPassword(text)}
          value={confirmPassword}
          autoCorrect={false}
          autoCapitalize='none'
          secureTextEntry
        />
        <TouchableOpacity onPress={() => {}} style={getStyle().buttonPrimary}>
          <Text style={{ textAlign: 'center', color: Colors.white }}>
            REGISTER
          </Text>
        </TouchableOpacity>
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
              onPress={() => {}}
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
                I already have an account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

RegisterScreen.navigationOptions = {
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
