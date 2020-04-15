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
import {
  StoreContext,
  LocalizationContext,
} from '../context/cartContext/provider';
import { UserContext } from '../context/userContext/provider';
import productHooks from '../hooks/useGetDataByCollection';
import { useGetOrders } from '../hooks/useGetUserAddresses';
import moment from 'moment';

export default function OrderDetailsScreen({ navigation, route }) {
  const { textHeader, row } = getStyle();
  const { t } = React.useContext(LocalizationContext);

  const orderId = route.params.id;
  const { state } = React.useContext(StoreContext);
  const { state: userState } = React.useContext(UserContext);
  const { cartItems, totalAmount } = state;

  const [stores, isLoading] = productHooks.useGetDataByCollection('stores');

  const [orders, isLoadingOrders] = useGetOrders();

  const [currentOrder, setCurrentOrder] = React.useState(null);
  const [selectedStore, setSelectedStore] = React.useState(null);

  React.useEffect(() => {
    if (!isLoadingOrders) {
      const filterdOrders = orders.filter((order) => order.id === orderId);
      if (filterdOrders.length > 0) {
        setCurrentOrder(filterdOrders[0]);
        console.log('currentOrder', currentOrder);
      }
    }
  }, [isLoadingOrders]);

  React.useEffect(() => {
    if (!isLoading && currentOrder) {
      const storeId = currentOrder.products[0].item.storeId;
      const selectedStore = stores.find((item) => item.id === storeId);
      console.log('selectedStore', selectedStore);
      setSelectedStore(selectedStore);
    }
  }, [isLoading, currentOrder]);

  console.log('stores', stores);
  const { selectedDeliveryAddress, selectedPaymentMethod } = userState;

  console.log({ selectedDeliveryAddress, selectedPaymentMethod, cartItems });
  return (
    <SafeAreaView style={styles.container}>
      <Text style={[textHeader, { margin: 20 }]}>{t('Order details')}</Text>

      <View style={{}}>
        <OrderProductCycleList data={cartItems} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20 }}
      >
        <View style={[row, { justifyContent: 'space-between' }]}>
          <Text>Order ID</Text>
          {currentOrder && <Text style={{}}>{currentOrder.id}</Text>}
        </View>

        {currentOrder && (
          <View style={styles.orderDetailContainer}>
            <Text style={textHeader}>Delivery</Text>
            <View style={[row, { justifyContent: 'space-between' }]}>
              <Text>Address name:</Text>
              <Text
                style={{
                  paddingHorizontal: 10,
                  textAlign: 'right',
                  // backgroundColor: 'red',
                }}
              >
                {currentOrder.selectedDeliveryAddress.label}
              </Text>
            </View>
            <View style={[row, { justifyContent: 'space-between' }]}>
              <Text>Address:</Text>
              <Text
                style={{
                  flex: 1,
                  paddingHorizontal: 10,
                  textAlign: 'right',
                  // backgroundColor: 'red',
                }}
              >
                {currentOrder.selectedDeliveryAddress.address}
              </Text>
            </View>
          </View>
        )}

        <View style={styles.orderDetailContainer}>
          <Text style={textHeader}>Details</Text>
          <View style={[row, { justifyContent: 'space-between' }]}>
            <Text>Store name:</Text>
            {selectedStore && <Text>{selectedStore.name}</Text>}
          </View>
          <View style={[row, { justifyContent: 'space-between' }]}>
            <Text>Order date</Text>
            {currentOrder ? (
              <Text style={{}}>
                {moment(currentOrder.createdAt).format('YY-MM-DD hh:mm')}
              </Text>
            ) : null}
          </View>
          <View style={[row, { justifyContent: 'space-between' }]}>
            <Text>Total amount</Text>
            <Text>{totalAmount}$</Text>
          </View>
          <View style={[row, { justifyContent: 'space-between' }]}>
            <Text>Status</Text>
            {currentOrder && <Text style={{}}>{currentOrder.status}</Text>}
          </View>
        </View>

        <View style={styles.orderDetailContainer}>
          <Text style={textHeader}>Customer</Text>
          <View style={[row, { justifyContent: 'space-between' }]}>
            <Text>Customer name:</Text>
            <Text>Home</Text>
          </View>
          <View style={[row, { justifyContent: 'space-between' }]}>
            <Text>Tel:</Text>
            <Text>{selectedDeliveryAddress.tel}</Text>
          </View>
        </View>

        <View style={styles.orderDetailContainer}>
          <View style={[row, { justifyContent: 'space-between' }]}>
            <Text>Payment method:</Text>
            {currentOrder && (
              <Text>{currentOrder.selectedPaymentMethod.label}</Text>
            )}
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
