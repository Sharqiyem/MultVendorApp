import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import Colors from '../constants/Colors';
import { Logo } from '../components';
import LoginForm from '../components/LoginForm';
import firebase from '../config/firebase.config';
import { AuthContext } from '../context/authContext/provider';
import { LocalizationContext } from '../context/cartContext/provider';
export default function ProfileScreen({ navigation }) {
  const [email, setEmail] = React.useState('');

  const { state, signOut } = React.useContext(AuthContext);
  const { t, changeLang } = React.useContext(LocalizationContext);

  React.useEffect(() => {
    if (firebase.auth().currentUser) {
      setEmail(firebase.auth().currentUser.email);
    }
  });

  const handleSignOut = async () => {
    firebase.auth().signOut();
    signOut();
  };

  return (
    <View style={styles.container}>
      <Text>Hello {email}</Text>
      <Button title={t('Sign out')} onPress={handleSignOut} />

      <TouchableOpacity
        style={{ height: 30 }}
        onPress={() => {
          changeLang();
        }}
      >
        <Text
          style={{
            // fontFamily: 'space-mono',
            color: 'red',
            fontSize: 20,
            textAlign: 'center',
          }}
        >
          Lang
        </Text>
      </TouchableOpacity>
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
