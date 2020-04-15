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

import Layout from '../constants/Layout';
import { UserContext } from '../context/userContext/provider';
import types from '../context/userContext/types';
import { addOrder } from '../core/firebaseHelper';
import { StoreContext } from '../context/cartContext/provider';
import { orderUUID } from '../core/stringHelper';

export default function PaymentScreen({ navigation }) {
  const { state } = React.useContext(StoreContext);
  const { cartItems, totalAmount } = state;

  const { state: userState, dispatch } = React.useContext(UserContext);
  const { selectedDeliveryAddress } = userState;

  const _paymentMethod = [
    {
      value: 'cashondelivery',
      label: 'Cash on delivery',
      selected: true,
      color: Colors.primary,
    },
    {
      value: 'paypal',
      label: 'Paypal',
      selected: false,
      color: Colors.primary,
    },
  ];
  const [paymentMethod, setPaymentMethod] = React.useState(_paymentMethod);

  const onRadioButtonPress = (address) => setPaymentMethod(address);

  const continueHandler = () => {
    console.log('paymentMethods', paymentMethod);
    const selectedPaymentMethod = paymentMethod.filter(
      (item) => item.selected === true
    );
    console.log('selectedPaymentMethod', selectedPaymentMethod[0]);
    dispatch({
      type: types.SET_SELECTED_PAYMENT_METHOD,
      payload: selectedPaymentMethod[0],
    });

    placeOrder(selectedPaymentMethod[0]);
  };

  const placeOrder = async (selectedPaymentMethod) => {
    const date = Date.now(); //firebase.firestore.FieldValue.serverTimestamp(); //
    console.log('firebase.database.ServerValue.TIMESTAMP', date);
    const id = orderUUID();
    const order = {
      id,
      selectedDeliveryAddress,
      selectedPaymentMethod,
      totalAmount,
      createdAt: date,
      updatedAt: date,
      products: cartItems,
      status: 'In progress',
    };

    await addOrder(order);

    navigation.navigate('OrderDetails', { id });
  };

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
          TextComponent={({ item }) => (
            <View
              style={{
                padding: 15,
                // backgroundColor: 'red',
                flex: 1,
                justifyContent: 'center',
              }}
            >
              <Text style={{}}> {item.label}</Text>
            </View>
          )}
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
