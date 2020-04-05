import * as React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import types from '../context/types';
import { StoreContext } from '../context/provider';
import { ExListCardItem, ExProductCycleItem } from '../components/index';

export default function HomeScreen({ navigation }) {
  const { dispatch } = React.useContext(StoreContext);

  const addToCart = (item) => {
    dispatch({ type: types.CART_ADD, payload: item });
  };

  return (
    <View style={styles.container}>
      <ExListCardItem />
      {/* <ExListCardItem />
      <ExListCardItem /> */}

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <ExProductCycleItem />
        <ExProductCycleItem />
        <ExProductCycleItem />
      </View>

      <View style={styles.welcomeContainer}>
        <Text style={styles.tabBarInfoText}>Hello</Text>
        <Button
          title="Detils"
          onPress={() => {
            navigation.navigate('Details');
          }}
        />

        <Button
          title="Add"
          onPress={() => {
            addToCart({ id: 1, quantity: 1 });
          }}
        />
      </View>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
  // headerShown: false,
  title: 'sda',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  welcomeContainer: {
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
