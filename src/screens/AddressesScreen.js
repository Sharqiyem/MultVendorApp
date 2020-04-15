import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import Colors from '../constants/Colors';
import { RadioButtons } from '../components/index';
import getStyle from '../constants/styles';

import Layout from '../constants/Layout';
import { UserContext } from '../context/userContext/provider';
import types from '../context/userContext/types';

export default function AddressesScreen({ navigation }) {
  const { row, text, textHeader, buttonOutline } = getStyle();

  const { state, dispatch } = React.useContext(UserContext);

  const [addresses, setAddresses] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);

  React.useEffect(() => {
    setAddresses(state.addresses);
    setRefresh(!refresh);
  }, [state]);

  const onRadioButtonPress = (address) => {
    setAddresses(address);
  };

  const TextComponent = ({ item }) => {
    return (
      <View style={{ padding: 10 }}>
        <View
          style={[
            row,
            {
              justifyContent: 'space-between',
              width: Layout.window.width - 100,
            },
          ]}
        >
          <Text style={[text, { marginVertical: 2, fontSize: 18, flex: 1 }]}>
            {item.label}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ManageAddress', { item });
            }}
            style={{}}
          >
            <Feather
              name='edit'
              size={20}
              style={{ marginHorizontal: 10 }}
              color={Colors.primaryLight}
            />
          </TouchableOpacity>
        </View>

        <Text
          style={[text, { marginTop: 5, width: Layout.window.width - 150 }]}
        >
          {item.address}
        </Text>
      </View>
    );
  };

  const continueHandler = () => {
    const selectedAddress = addresses.filter(
      (addressItem) => addressItem.selected === true
    );
    console.log('selectedAddress', selectedAddress);
    dispatch({
      type: types.SET_SELECTED_DELIVERY_ADDRESS,
      payload: selectedAddress[0],
    });

    console.log(state.selectedDeliveryAddress);
    navigation.navigate('Payment');
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ManageAddress');
        }}
        style={[
          row,
          buttonOutline,
          {
            height: 30,
            width: '80%',
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            borderStyle: 'dashed',
            marginVertical: 20,
          },
        ]}
      >
        <Feather
          name='plus'
          size={20}
          style={{ marginHorizontal: 10 }}
          color={Colors.primaryLight}
        />
        <Text style={{ textAlign: 'center', color: Colors.primary }}>
          Add new address
        </Text>
      </TouchableOpacity>
      <View style={{ flex: 1, margin: 20 }}>
        <Text
          style={[textHeader, { marginHorizontal: 20, marginVertical: 10 }]}
        >
          Select your address
        </Text>

        {!addresses && (
          <ActivityIndicator
            style={{
              alignSelf: 'center',
              width: Layout.window.width,
            }}
            size={'large'}
            color={Colors.primary}
          />
        )}
        {addresses && addresses.length > 0 && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ flex: 1, marginBottom: 100 }}
          >
            <RadioButtons
              key={refresh}
              direction='column'
              data={addresses}
              radioButtons={addresses}
              onPress={onRadioButtonPress}
              // Fix in android
              // textComponent={TextComponent}
              TextComponent={({ item }) => <TextComponent item={item} />}
            />
          </ScrollView>
        )}
      </View>
      <View style={styles.tabBarInfoContainer}>
        <TouchableOpacity
          disabled={addresses.length === 0}
          style={{
            backgroundColor: Colors.white,
            // padding: 10,
            margin: 10,
            borderRadius: 100,
            borderWidth: 1,
            borderColor: Colors.primary,
            flex: 1,
            height: 30,
            width: Layout.window.width * 0.8,
            justifyContent: 'center',
          }}
          onPress={continueHandler}
        >
          <Text style={{ textAlign: 'center', color: Colors.primary }}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
});
