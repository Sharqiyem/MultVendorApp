import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Platform,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Colors from '../constants/Colors';
import getStyle from '../constants/styles';
import {
  StoreContext,
  LocalizationContext,
} from '../context/cartContext/provider';
import { UserContext } from '../context/userContext/provider';
import productHooks from '../hooks/useGetDataByCollection';
import { useGetOrders } from '../hooks/useGetUserAddresses';
import moment from 'moment';
import types from '../context/cartContext/types';

export default function OrdersScreen({ navigation }) {
  const { t } = React.useContext(LocalizationContext);
  const { row, shadow } = getStyle();
  const { state, dispatch } = React.useContext(StoreContext);

  const [stores, isLoading] = productHooks.useGetDataByCollection('stores');

  const [orders, isOrdersLoading] = useGetOrders();

  const [isReady, setIsReady] = React.useState(false);
  React.useEffect(() => {
    //TODO
    if (!isLoading && !isOrdersLoading) {
      orders.map((order) => {
        const store = stores.find((store) => store.id === order.selectedStore);
        order.store = store;
      });
      console.log('orders', orders);
      setIsReady(true);
    }
  }, [isLoading, isOrdersLoading]);

  console.log('stores', stores);

  const reOrderPress = (item) => {
    console.log('reOrderPress', item);

    // prepare cart from current order;

    dispatch({
      type: types.REORDER,
      payload: { products: item.products, storeId: item.store.id },
    });

    navigation.navigate('Cart');
  };

  const renderItem = ({ item }) => {
    const orderItemStyle = [
      row,
      { justifyContent: 'space-between', marginVertical: 3 },
    ];
    return (
      <View
        key={item.id}
        style={[
          {
            marginVertical: 10,
            margin: 10,
            backgroundColor: '#F4F3F3',
            borderRadius: 10,
          },
          shadow,
        ]}
      >
        <View style={{ margin: 10 }}>
          <View style={orderItemStyle}>
            <Text>{t('Order ID')}</Text>
            <Text style={{}}>{item.id}</Text>
          </View>

          <View style={orderItemStyle}>
            <Text>Store name</Text>
            {item.store && <Text>{item.store.name}</Text>}
          </View>

          <View style={orderItemStyle}>
            <Text>Date</Text>
            <Text>{moment(item.createdAt).format('YY-MM-DD hh:mm')}</Text>
          </View>

          <View style={orderItemStyle}>
            <Text>Total amount</Text>
            <Text>{item.totalAmount}</Text>
          </View>

          <View style={orderItemStyle}>
            <Text>Payment method</Text>

            <Text>{item.selectedPaymentMethod.label}</Text>
          </View>

          <Text style={{ marginVertical: 3 }}>{item.status}</Text>

          {/* Actions */}
          <View style={orderItemStyle}>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.primary,
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
                navigation.navigate('OrderDetails', { id: item.id });
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  color: Colors.white,
                }}
              >
                {t('Details')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: Colors.primary,
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
                reOrderPress(item);
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  color: Colors.white,
                }}
              >
                Re order
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.primary,
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
                navigation.navigate('Chat', { orderId: item.id });
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  color: Colors.white,
                }}
              >
                Chat
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {!isReady ? (
        <Text>Loading</Text>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={orders}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
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
