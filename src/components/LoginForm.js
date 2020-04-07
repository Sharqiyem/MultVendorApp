import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Colors from '../constants/Colors';
import getStyle from '../constants/styles';

const LoginForm = () => {
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={getStyle().textInput}
        placeholder="User name"
        placeholderStyle={{ textAlign: 'center' }}
        onChangeText={(text) => setUserName(text)}
        value={userName}
        autoCorrect={false}
        autoCapitalize="none"
      />
      <TextInput
        style={getStyle().textInput}
        placeholder="Password"
        placeholderStyle={{ textAlign: 'center' }}
        onChangeText={(text) => setPassword(text)}
        value={password}
        autoCorrect={false}
        autoCapitalize="none"
        secureTextEntry={true}
      />
      <TextInput
        style={getStyle().textInput}
        placeholder="Password"
        placeholderStyle={{ textAlign: 'center' }}
        onChangeText={(text) => setPassword(text)}
        value={password}
        autoCorrect={false}
        autoCapitalize="none"
        secureTextEntry={true}
      />
      <TextInput
        style={getStyle().textInput}
        placeholder="Password"
        placeholderStyle={{ textAlign: 'center' }}
        onChangeText={(text) => setPassword(text)}
        value={password}
        autoCorrect={false}
        autoCapitalize="none"
        secureTextEntry={true}
      />
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    justifyContent: 'center',
  },
});
