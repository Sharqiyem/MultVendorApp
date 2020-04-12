import * as React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform } from 'react-native';
import Colors from '../constants/Colors';
import { RadioButtons } from '../components/index';
import getStyle from '../constants/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import Layout from '../constants/Layout';

export default function AddressesScreen({ navigation }) {
  const { row, text, textHeader, buttonOutline } = getStyle();

  const tempAddresses = [
    {
      value: 'Home-address',
      label: 'Home address',
      selected: true,
      color: Colors.primary,
      address: '213, jalan Tun razak ',
    },
    {
      value: 'Home-address3',
      label: 'Office address',
      selected: false,
      color: Colors.primary,
      address: '21, jalan Tun razak',
    },
    {
      value: 'Home-address2',
      label: 'Dad address',
      selected: false,
      color: Colors.primary,
      address: '24, jalan Tun razak',
    },
  ];

  const [addresses, setAddresses] = React.useState([]);

  React.useEffect(() => {
    setAddresses(tempAddresses);
  }, []);
  const onRadioButtonPress = (address) => setAddresses(address);

  const textComponent = (item) => {
    return (
      <View style={{ padding: 10 }}>
        <View
          style={[
            row,
            {
              justifyContent: 'space-between',
              // backgroundColor: 'red',
              // alignItems: 'streach',
              // flex: 1,
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
            style={{ flex: 1 }}
          >
            <Feather
              name='edit'
              size={20}
              style={{ marginHorizontal: 10 }}
              color={Colors.primaryLight}
            />
          </TouchableOpacity>
        </View>

        <Text style={[text, { marginTop: 5 }]}>{item.address}</Text>
      </View>
    );
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
        <Text style={{ textAlign: 'center', color: Colors.primary }}>
          Add new address
        </Text>
        <Feather
          name='plus'
          size={20}
          style={{ marginHorizontal: 10 }}
          color={Colors.primaryLight}
        />
      </TouchableOpacity>
      <View style={{ flex: 1, margin: 20 }}>
        <Text
          style={[textHeader, { marginHorizontal: 20, marginVertical: 10 }]}
        >
          Select your address
        </Text>

        {addresses && addresses.length > 0 && (
          <RadioButtons
            direction='column'
            data={addresses}
            radioButtons={addresses}
            onPress={onRadioButtonPress}
            // Fix in android
            textComponent={textComponent}
          />
        )}
      </View>
      <View style={styles.tabBarInfoContainer}>
        <TouchableOpacity
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
          onPress={() => {
            navigation.navigate('Payment');
          }}
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
