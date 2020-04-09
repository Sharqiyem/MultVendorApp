import * as React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform } from 'react-native';
import Colors from '../constants/Colors';
import { RadioButtons } from '../components/index';
import getStyle from '../constants/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import Layout from '../constants/Layout';

export default function AddressesScreen({ navigation }) {
  const _addresses = [
    {
      value: 'Home-address1',
      label: 'Home address',
      selected: true,
      color: Colors.primary,
      address: '213, jalan Tun razak',
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

  const [addresses, setAddresses] = React.useState(_addresses);

  const onRadioButtonPress = (address) => setAddresses(address);

  const textComponent = (data) => {
    return (
      <View style={{ padding: 10 }}>
        <Text style={[getStyle().text, { marginVertical: 2, fontSize: 18 }]}>
          {data.label}
        </Text>
        <Text style={[getStyle().text, { marginTop: 5 }]}>{data.address}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => {}}
        style={[
          getStyle().row,
          getStyle().buttonOutline,
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
          style={[
            getStyle().textHeader,
            { marginHorizontal: 20, marginVertical: 10 },
          ]}
        >
          Select your address
        </Text>

        <RadioButtons
          direction='column'
          data={addresses}
          radioButtons={addresses}
          onPress={onRadioButtonPress}
          textComponent={textComponent}
        />
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
