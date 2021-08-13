import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import moment from "moment";

import Colors from "../../constants/Colors";
import getStyle from "../../constants/styles";
import {
  LocalizationContext,
} from "../../context/cartContext/provider";

import useGetDeliveryOrders from "../../hooks/useGetDeliveryOrders";
import { AuthContext } from "../../context/authContext/provider";
import Layout from "../../constants/Layout";
import useGetDataByCollection from "../../hooks/useGetDataByCollection";

export default function VendorOrdersScreen({ navigation }) {
  const { t, locale } = React.useContext(LocalizationContext);
  const { state: authState } = React.useContext(AuthContext);
  const getStyles = getStyle(locale === "ar");

  const [stores, isLoading] = useGetDataByCollection("stores");
  const [orders, isOrdersLoading] = useGetDeliveryOrders(
    authState.storeId || ""
  );
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    //TODO
    if (!isLoading && !isOrdersLoading) {
      orders.map((order) => {
        const store = stores.find((store) => store.id === order.selectedStore);
        order.store = store;
      });
     
      setIsReady(true);
    }
  }, [isLoading, isOrdersLoading]);
 
  const renderItem = ({ item }) => {
    const orderItemStyle = [
      getStyles.row,
      { justifyContent: "space-between", marginVertical: 3 },
    ];
    return (
      <View
        key={item.id}
        style={[
          {
            marginVertical: 10,
            margin: 10,
            backgroundColor: "#F4F3F3",
            borderRadius: 10,
          },
          getStyles.shadow,
        ]}
      >
        <View style={{ margin: 10 }}>
          <View style={orderItemStyle}>
            <Text>{t("Order ID")}</Text>
            <Text style={{}}>{item.id}</Text>
          </View>

          {/* <View style={orderItemStyle}>
            <Text>{t("Store name")}</Text>
            {item.store && <Text>{item.store.name}</Text>}
          </View> */}

          <View style={orderItemStyle}>
            <Text>{t("Order date")}</Text>
            <Text>{moment(item.createdAt).format("YY-MM-DD hh:mm")}</Text>
          </View>

          <View style={orderItemStyle}>
            <Text>{t("Total amount")}</Text>
            <Text>{item.totalAmount}$</Text>
          </View>

          <View style={orderItemStyle}>
            <Text>{t("Payment method")}</Text>

            <Text>{item.selectedPaymentMethod.label}</Text>
          </View>

          <Text style={{ marginVertical: 3 }}>{item.status}</Text>

          {/* Actions */}
          <View style={orderItemStyle}>
            <TouchableOpacity
              style={[getStyles.buttonPrimary, { width: "45%" }]}
              onPress={() => {
                navigation.navigate("OrderDetails", { id: item.id });
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: Colors.white,
                }}
              >
                {t("Details")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[getStyles.buttonPrimary, { width: "45%" }]}
              onPress={() => {
                navigation.navigate("Chat", { orderId: item.id });
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: Colors.white,
                }}
              >
                {t("Chat")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {!isReady ? (
        <ActivityIndicator
          style={{
            flex: 1,
            alignSelf: "center",
            width: Layout.window.width,
          }}
          size={"large"}
          color={Colors.primary}
        />
      ) : (
        <FlatList
          // style={{ backgroundColor: 'red' }}
          showsVerticalScrollIndicator={false}
          data={orders}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
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
