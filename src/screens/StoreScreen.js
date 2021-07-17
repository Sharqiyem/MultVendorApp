import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as Icon from "@expo/vector-icons";

import {
  ExStoreDetailHeader,
  ExProductCycleList,
  StoreProducts,
} from "../components";
import Colors from "../constants/Colors";
import CartButton from "../components/CartButton";
import { StoreDetailHeader } from "../components/StoreDetailHeader";
import { useGetStoreByStoreId } from "../hooks";
import { LocalizationContext } from "../context/cartContext/provider";
import Loading from "../components/Loading";

export default function StoreScreen({ navigation, route }) {
  const { item } = route.params;
  const { locale } = React.useContext(LocalizationContext);
  const [store, isLoading] = useGetStoreByStoreId(item?.id);

  const [activeTab, setActiveTab] = React.useState("products");

  if (isLoading) return <Loading />;

  const storeDescription = store?.descriptions[locale] || store?.description;

  return (
    <View style={styles.container}>
      <StoreDetailHeader store={store} />

      <View
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,

          padding: 5,
          zIndex: 999,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon.Feather
            name="arrow-left"
            size={26}
            color="#fff"
            style={{ marginHorizontal: 15 }}
          />
        </TouchableOpacity>
        <CartButton />
      </View>

      {/* BUTTONS */}
      <View
        style={{
          marginTop: -12,
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            backgroundColor: Colors.primary,
            height: 50,
            // width: '100%',
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            borderBottomColor: "#fff",
            borderBottomWidth: activeTab === "products" ? 1 : 0,
          }}
          onPress={() => {
            setActiveTab("products");
          }}
        >
          <Text style={styles.btnText}>Products</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            backgroundColor: Colors.primary,
            height: 50,
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            borderBottomColor: "#fff",
            borderBottomWidth: activeTab === "reviews" ? 1 : 0,
          }}
          onPress={() => {
            setActiveTab("reviews");
          }}
        >
          <Text style={styles.btnText}>Reviews</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            backgroundColor: Colors.primary,
            height: 50,
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            borderBottomColor: "#fff",
            borderBottomWidth: activeTab === "about" ? 1 : 0,
          }}
          onPress={() => {
            setActiveTab("about");
          }}
        >
          <Text style={styles.btnText}>About</Text>
        </TouchableOpacity>
      </View>

      {/* TABS */}
      {activeTab === "products" && (
        <View style={{ margin: 5, marginVertical: 15, flex: 1 }}>
          <StoreProducts storeId={item.id} />
        </View>
      )}

      {activeTab === "reviews" && (
        <View style={{ margin: 5, marginVertical: 15 }}>
          <Text>Reviews</Text>
        </View>
      )}

      {activeTab === "about" && (
        <View style={{ margin: 10, marginVertical: 15 }}>
          <Text>{storeDescription}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingTop: 30,
  },

  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },

  tabBarInfoText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    textAlign: "center",
  },
  btnText: {
    fontSize: 17,
    color: "#fff",
    textAlign: "center",
  },
});
