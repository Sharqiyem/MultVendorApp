import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import Colors from '../constants/Colors';
import {
  RadioButtons,
  ExProductCycleList,
  OrderProductCycleList,
} from '../components/index';
import getStyle from '../constants/styles';
import { Feather } from '@expo/vector-icons';
import Layout from '../constants/Layout';
import { StoreContext } from '../context/cartContext/provider';
import { UserContext } from '../context/userContext/provider';
import productHooks from '../hooks/useGetDataByCollection';
export default function OrderDetailsScreen({ navigation }) {
  const { state } = React.useContext(StoreContext);
  const { state: userState } = React.useContext(UserContext);
  const { cartItems } = state;

  const [stores, isLoading] = productHooks.useGetDataByCollection('stores');

  const [selectedStore, setSelectedStore] = React.useState(null);

  const total = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.item.price,
    0
  );

  React.useEffect(() => {
    if (!isLoading) {
      const storeId = cartItems[0].item.storeId;
      const selectedStore = stores.find((item) => item.id === storeId);
      setSelectedStore(selectedStore);
    }
  }, [isLoading]);

  console.log('stores', stores);
  const { selectedDeliveryAddress, selectedPaymentMethod } = userState;

  console.log({ selectedDeliveryAddress, selectedPaymentMethod, cartItems });
  return (
    <SafeAreaView style={styles.container}>
      <Text style={[getStyle().textHeader, { margin: 20 }]}>Order details</Text>

      <View style={{}}>
        <OrderProductCycleList data={cartItems} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20 }}
      >
        <View style={[getStyle().row, { justifyContent: 'space-between' }]}>
          <Text>Order ID</Text>
          <Text style={{ backgroundColor: 'red' }}>#65656</Text>
        </View>

        <View style={styles.orderDetailContainer}>
          <Text style={getStyle().textHeader}>Delivery</Text>
          <View style={[getStyle().row, { justifyContent: 'space-between' }]}>
            <Text>Address name:</Text>
            <Text
              style={{
                paddingHorizontal: 10,
                textAlign: 'right',
                // backgroundColor: 'red',
              }}
            >
              {selectedDeliveryAddress.label}
            </Text>
          </View>
          <View style={[getStyle().row, { justifyContent: 'space-between' }]}>
            <Text>Address:</Text>
            <Text
              style={{
                flex: 1,
                paddingHorizontal: 10,
                textAlign: 'right',
                // backgroundColor: 'red',
              }}
            >
              {selectedDeliveryAddress.address}
            </Text>
          </View>
        </View>

        <View style={styles.orderDetailContainer}>
          <Text style={getStyle().textHeader}>Details</Text>
          <View style={[getStyle().row, { justifyContent: 'space-between' }]}>
            <Text>Store name:</Text>
            {selectedStore && <Text>{selectedStore.name}</Text>}
          </View>
          <View style={[getStyle().row, { justifyContent: 'space-between' }]}>
            <Text>Order date</Text>
            <Text style={{ backgroundColor: 'red' }}>20-03-2020 19:00</Text>
          </View>
          <View style={[getStyle().row, { justifyContent: 'space-between' }]}>
            <Text>Total amount</Text>
            <Text>{total}$</Text>
          </View>
          <View style={[getStyle().row, { justifyContent: 'space-between' }]}>
            <Text>Status</Text>
            <Text style={{ backgroundColor: 'red' }}>Completed</Text>
          </View>
        </View>

        <View style={styles.orderDetailContainer}>
          <Text style={getStyle().textHeader}>Customer</Text>
          <View style={[getStyle().row, { justifyContent: 'space-between' }]}>
            <Text>Customer name:</Text>
            <Text>Home</Text>
          </View>
          <View style={[getStyle().row, { justifyContent: 'space-between' }]}>
            <Text>Tel:</Text>
            <Text>{selectedDeliveryAddress.tel}</Text>
          </View>
        </View>

        <View style={styles.orderDetailContainer}>
          <View style={[getStyle().row, { justifyContent: 'space-between' }]}>
            <Text>Payment method:</Text>
            <Text>{selectedPaymentMethod.label}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: Colors.white,
  },
  orderDetailContainer: {
    marginVertical: 10,
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
