import * as React from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView } from 'react-native';
import Colors from '../constants/Colors';

export default function ProfileScreen({ navigation }) {
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

ProfileScreen.navigationOptions = {
  // header: null,
  // headerShown: false,
  title: 'sda',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: Colors.headerBG,
  },

  welcomeContainer: {
    alignItems: 'center',
  },

  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
});
