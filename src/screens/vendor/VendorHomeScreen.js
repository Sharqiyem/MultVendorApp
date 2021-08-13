import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Icon from "@expo/vector-icons";
import getStyle from "../../constants/styles";
import { LocalizationContext } from "../../context/cartContext/provider";
import Colors from "../../constants/Colors";
import { useGetDeliveryOrders, useGetProductsByStoreId } from "../../hooks";
import { AuthContext } from "../../context/authContext/provider";
import { useGetProductsCountByStoreId as getProductsCountByStoreId } from "../../hooks/useGetProductsByStoreId";
import { FlatGrid } from "react-native-super-grid";
import moment from "moment";

const VendorHomeScreen = ({ navigation }) => {
  const { locale, t } = useContext(LocalizationContext);
  const { row, text, boldText, shadow, textHeader } = getStyle(locale === "ar");
  const { state: authState } = React.useContext(AuthContext);

  const [orders, isOrdersLoading] = useGetDeliveryOrders(
    authState.userData?.storeId || ""
  );

  const [storeProductsCount, setStoreProductsCount] = useState(0);
  const [store, isLoadingStore] = useGetStoreByStoreId(
    authState.userData?.storeId
  );

  useEffect(() => {
    const fetch = async () => {
      const storeProductsCount = await getProductsCountByStoreId(
        authState.userData?.storeId
      );
      console.log("storeProductsCount", storeProductsCount);
      setStoreProductsCount(storeProductsCount);
    };
    fetch();
  }, []);

  // stats
  // const [totalSales, setTotalSales] = useState(0);
  // const [totalClients, setTotalClients] = useState(0);

  const totalSales = orders?.reduce((accumulator, currentValue) => {
    return currentValue.totalAmount + accumulator;
  }, 0);

  const totalClients = orders?.reduce((accumulator = [], currentValue) => {
    if (accumulator.includes(currentValue.userid)) {
      return accumulator;
    }
    return [...accumulator, currentValue.userId];
  }, []);

  const renderStoreDetails = () => {
    if (isLoadingStore)
      return (
        <Text style={[textHeader, boldText, { textAlign: "center" }]}> </Text>
      );
    return (
      <View style={{ margin: 15 }}>
        {store?.name ? (
          <Text style={[textHeader, boldText, { textAlign: "center" }]}>
            {t("Store name")}: {store?.name}
          </Text>
        ) : (
          <Text>Config Your Store</Text>
        )}
      </View>
    );
  };

  const StatsItem = ({ title, total, colors, icon }) => {
    return (
      <LinearGradient
        // Button Linear Gradient
        colors={colors}
        style={{
          borderRadius: 20,
          paddingVertical: 15,
          justifyContent: "center",
          alignItems: "center",
          minHeight: 180,
          ...shadow,
        }}
      >
        <Icon.Feather
          name={icon}
          size={26}
          color="#fff"
          style={{ marginVertical: 16 }}
        />
        <Text style={{ ...text, color: Colors.white }}>{title}</Text>
        <Text
          style={{
            // lineHeight: 30,
            // backgroundColor:'red',
            fontSize: 20,
            marginTop: 10,
            color: Colors.white,
          }}
        >
          {total}
        </Text>
      </LinearGradient>
    );
  };

  const renderAllStats = () => {
    const list = [
      <StatsItem
        title={t("Total Orders")}
        total={orders?.length || 0}
        // total={"0"}
        colors={["#f2570f", "#f5793f"]}
        icon="aperture"
      />,
      <StatsItem
        title={t("Total Sales")}
        total={totalSales + " $"}
        // total={"0"}
        colors={["#570ff2", "#793ff5"]}
        icon="dollar-sign"
      />,

      <StatsItem
        title={t("Total Products")}
        total={storeProductsCount || "0"}
        colors={["#c80ff2", "#d33ff5"]}
        icon="codesandbox"
      />,
      <StatsItem
        title={t("Total Customers")}
        total={totalClients?.length || "0"}
        colors={["#0faaf2", "#3fbbf5"]}
        icon="user"
      />,
    ];
    return (
      <FlatGrid
        itemDimension={130}
        data={list}
        // spacing={10}
        renderItem={({ item }) => <View>{item}</View>}
      />
    );

    return (
      <View
        style={{
          ...row,
          flexWrap: "wrap",
          marginHorizontal: 15,
          // backgroundColor: "grey",
        }}
      >
        <StatsItem
          title={t("Total Sales")}
          total={totalSales + " $"}
          // total={" $"}
          colors={["#570ff2", "#793ff5"]}
          icon="dollar-sign"
        />
        <StatsItem
          title={t("Total Orders")}
          total={orders?.length || 0}
          // total={"0"}
          colors={["#f2570f", "#f5793f"]}
          icon="aperture"
        />
        <StatsItem
          title={t("Total Products")}
          total={storeProductsCount || "0"}
          colors={["#c80ff2", "#d33ff5"]}
          icon="codesandbox"
        />
        <StatsItem
          title={t("Total Customers")}
          total={totalClients?.length || "0"}
          colors={["#0faaf2", "#3fbbf5"]}
          icon="user"
        />
      </View>
    );
  };

  const renderSeeAllLink = (onPress) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (onPress) onPress();
        }}
        style={{
          backgroundColor: Colors.primary,
          borderRadius: 15,
          // height: 30,
          padding: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 12,
            paddingHorizontal: 10,
            color: Colors.white,
          }}
        >
          {t("See All")}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderLastOrders = () => {
    return (
      <View style={{}}>
        <View
          style={[
            row,
            {
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: 15,
              // backgroundColor: "grey",
            },
          ]}
        >
          <Text style={[textHeader, boldText]}>{t("Last orders")}</Text>
          {renderSeeAllLink(() => {
            navigation.navigate("Orders");
          })}
        </View>
        {orders?.length === 0 ? (
          <Text style={{ ...text }}>{t("No orders yet")}</Text>
        ) : (
          <FlatGrid
            itemDimension={130}
            data={orders.slice(0, 4)}
            // spacing={10}
            renderItem={({ item }) => (
              <View
                style={[
                  {
                    padding: 10,
                    backgroundColor: "#F4F3F3",
                    borderRadius: 10,
                  },
                  shadow,
                ]}
              >
                <Text style={(text, boldText)}>ID: {item.id}</Text>
                <Text style={{ color: Colors.gray }}>
                  {moment(item.createdAt).format("YY-MM-DD hh:mm")}
                </Text>
                <Text style={{ color: Colors.secondary, paddingVertical: 5 }}>
                  {item.totalAmount}$
                </Text>
              </View>
            )}
          />
        )}
      </View>
    );
  };

  const renderLastreviews = () => {
    return (
      <View style={{}}>
        <View
          style={[
            row,
            {
              justifyContent: "space-between",
              alignItems: "center",
              // backgroundColor:'grey',
              marginHorizontal: 15,
            },
          ]}
        >
          <Text style={[textHeader, boldText]}>{t("Last reviews")}</Text>
          {renderSeeAllLink(() => {
            navigation.navigate("Reviews");
          })}
        </View>

        {orders?.length === 0 ? (
          <Text style={{ ...text }}>{t("No reviews yet")}</Text>
        ) : (
          <FlatGrid
            itemDimension={130}
            data={orders.slice(0, 4)}
            // spacing={10}
            renderItem={({ item }) => (
              <View
                style={[
                  {
                    padding: 10,
                    backgroundColor: "#F4F3F3",
                    borderRadius: 10,
                  },
                  shadow,
                ]}
              >
                <Text style={(text, boldText)}>ID: {item.id}</Text>
                <Text style={{ color: Colors.gray }}>
                  {moment(item.createdAt).format("YY-MM-DD hh:mm")}
                </Text>
                <Text style={{ color: Colors.secondary, paddingVertical: 5 }}>
                  {item.totalAmount}$
                </Text>
              </View>
            )}
          />
        )}
      </View>
    );
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      {renderStoreDetails()}
      {renderAllStats()}
      {renderLastOrders()}
      {renderLastreviews()}
    </ScrollView>
  );
};

export default VendorHomeScreen;

const styles = StyleSheet.create({});
