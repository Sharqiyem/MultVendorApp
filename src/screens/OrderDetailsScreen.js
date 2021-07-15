import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import Colors from "../constants/Colors";
import {
  RadioButtons,
  ExProductCycleList,
  OrderProductCycleList,
} from "../components/index";
import getStyle from "../constants/styles";
import { Feather } from "@expo/vector-icons";
import Layout from "../constants/Layout";
import moment from "moment";
import {
  StoreContext,
  LocalizationContext,
} from "../context/cartContext/provider";
import { UserContext } from "../context/userContext/provider";

import { useGetOrderById } from "../hooks/useOrders";
import { useGetDataByCollection } from "../hooks";

export default function OrderDetailsScreen({ navigation, route }) {
  const { t, isRTL, locale } = React.useContext(LocalizationContext);
  const { textHeader, row } = getStyle(locale === "ar");

  const orderId = route.params.id;

  const [stores, isLoading] = useGetDataByCollection("stores");

  const [orders, isLoadingOrders] = useGetOrderById(orderId);

  const [currentOrder, setCurrentOrder] = React.useState(null);
  const [selectedStore, setSelectedStore] = React.useState(null);

  React.useEffect(() => {
    if (!isLoadingOrders) {
      const filterdOrders = orders.filter((order) => order.id === orderId);
      if (filterdOrders.length > 0) {
        setCurrentOrder(filterdOrders[0]);
        // console.log('currentOrder', currentOrder);
      }
    }
  }, [isLoadingOrders]);

  React.useEffect(() => {
    if (!isLoading && currentOrder) {
      const storeId = currentOrder.selectedStore;
      const selectedStore = stores.find((item) => item.id === storeId);
      // console.log('selectedStore', selectedStore);
      setSelectedStore(selectedStore);
    }
  }, [isLoading, currentOrder]);

  // console.log('stores', stores);

  if (!currentOrder) return <Text>Loading</Text>;
  return (
    <SafeAreaView style={styles.container}>
      {/* <Text style={[textHeader, { margin: 20 }]}>{t("Order details")}</Text> */}

      <View style={[row, { justifyContent: "space-between", margin: 20 }]}>
        <Text>{t("Order ID")}</Text>
        <Text style={{}}>{currentOrder.id}</Text>
      </View>

      <View style={{ marginHorizontal: 10 }}>
        <OrderProductCycleList data={currentOrder.products} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 20 }}
      >
        <View style={styles.orderDetailContainer}>
          {/* <Text style={textHeader}>Delivery</Text>
          <View style={[row, { justifyContent: "space-between" }]}>
            <Text>Address name:</Text>
            <Text
              style={{
                paddingHorizontal: 10,
                textAlign: "right",
                // backgroundColor: 'red',
              }}
            >
              {currentOrder.selectedDeliveryAddress.label}
            </Text>
          </View> */}
          <View style={[row, { justifyContent: "space-between" }]}>
            <Text>{t("Delivery address")}:</Text>
            <Text
              style={{
                flex: 1,
                paddingHorizontal: 10,
                textAlign: "right",
                // backgroundColor: 'red',
              }}
            >
              {currentOrder.selectedDeliveryAddress.address}
            </Text>
          </View>
        </View>

        <View style={styles.orderDetailContainer}>
          {/* <Text style={textHeader}>Details</Text> */}
          <View style={[row, { justifyContent: "space-between" }]}>
            <Text>{t("Store name")}:</Text>
            {selectedStore && <Text>{selectedStore.name}</Text>}
          </View>
          <View style={[row, { justifyContent: "space-between" }]}>
            <Text>{t("Order date")}</Text>
            {currentOrder ? (
              <Text style={{}}>
                {moment(currentOrder.createdAt).format("YY-MM-DD hh:mm")}
              </Text>
            ) : null}
          </View>
          <View style={[row, { justifyContent: "space-between" }]}>
            <Text>{t("Total amount")}</Text>
            <Text>{currentOrder.totalAmount}$</Text>
          </View>
          <View style={[row, { justifyContent: "space-between" }]}>
            <Text>{t("Order status")}</Text>
            <Text style={{}}>{currentOrder.status}</Text>
          </View>
        </View>

        <View style={styles.orderDetailContainer}>
          <Text style={textHeader}>Customer</Text>
          <View style={[row, { justifyContent: "space-between" }]}>
            <Text>Customer name:</Text>
            <Text>Home</Text>
          </View>
          <View style={[row, { justifyContent: "space-between" }]}>
            <Text>Tel:</Text>

            <Text>{currentOrder.selectedDeliveryAddress.tel}</Text>
          </View>
        </View>

        <View style={styles.orderDetailContainer}>
          <View style={[row, { justifyContent: "space-between" }]}>
            <Text>Payment method:</Text>
            <Text>{currentOrder.selectedPaymentMethod.label}</Text>
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
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: "center",
    backgroundColor: "#fbfbfb",
    paddingVertical: 20,
  },
});
