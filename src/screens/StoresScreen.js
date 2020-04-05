import * as React from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';

export default function StoresScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Text style={styles.tabBarInfoText}>Hello</Text>
        <Button
          title="Detils"
          onPress={() => {
            navigation.navigate('Details');
          }}
        />
      </View>
    </SafeAreaView>
  );
}

StoresScreen.navigationOptions = {
  // header: null,
  // headerShown: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#fff',
  },

  welcomeContainer: {
    // flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },

  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
});
