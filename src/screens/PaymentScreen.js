import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Colors from '../constants/Colors';
import { RadioButtons } from '../components/index';
import getStyle from '../constants/styles';

import { Feather } from '@expo/vector-icons';
import Layout from '../constants/Layout';

export default function PaymentScreen({ navigation }) {
  const _paymentMethod = [
    {
      value: 'paypal',
      label: 'Paypal',
      selected: true,
      color: Colors.primary,
    },
    {
      value: 'cashondelivery',
      label: 'Cash on delivery',
      selected: false,
      color: Colors.primary,
    },
  ];
  const [paymentMethod, setPaymentMethod] = React.useState(_paymentMethod);

  const onRadioButtonPress = (address) => setPaymentMethod(address);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, margin: 20 }}>
        <Text
          style={[
            getStyle().textHeader,
            { marginHorizontal: 20, marginVertical: 10 },
          ]}
        >
          Select your payment method
        </Text>

        <RadioButtons
          direction='column'
          data={paymentMethod}
          onPress={onRadioButtonPress}
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
            navigation.navigate('OrderDetails');
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
