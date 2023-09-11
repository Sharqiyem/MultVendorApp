import * as React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
  FlatList,
  ActivityIndicator,
} from "react-native";
import * as Icon from "@expo/vector-icons";

import { Image } from "react-native-expo-image-cache";

import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import Layout from "../constants/Layout";
import { StoreContext } from "../context/cartContext/provider";
import types from "../context/cartContext/types";
import PropTypes from "prop-types";
import { useGetDataByCollection } from "../hooks";
import { FlatGrid } from "react-native-super-grid";
import getStyle from "../constants/styles";

export const RoundedProducsList = ({ data, isLoading, limit }) => {
  if (isLoading)
    return (
      <ActivityIndicator
        style={{
          alignSelf: "center",
          width: Layout.window.width,
        }}
        size={"large"}
        color={Colors.primary}
      />
    );

  return (
    <FlatGrid
      spacing={10}
      // style={{ backgroundColor:'red' }}
      contentContainerStyle={{
        paddingVertical: 10,
      }}
      data={data?.slice(0, limit)}
      renderItem={({ item }) => <RoundedProducsListItem item={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export const RoundedProducsListItem = ({ item }) => {
  const { dispatch, state } = React.useContext(StoreContext);

  const { shadow } = getStyle();
  const addToCart = (productItem) => {
    if (state.selectedStore && state.selectedStore !== item?.storeId) {
      // alert user to change store
      Alert.alert(
        "Change store",
        "This product from different store, do you want to clear cart and start shopping from this store?",
        [
          {
            text: "Yes",
            onPress: () => {
              dispatch({ type: types.CART_CLEAR });
              dispatch({ type: types.CART_ADD, payload: productItem });
            },
          },
          { text: "No", onPress: () => {}, style: "cancel" },
        ]
      );
    } else {
      //not items in cart yet
      dispatch({ type: types.CART_ADD, payload: productItem });
    }
  };

  return (
    <View style={[styles.container, shadow]} key={item.id}>
      <View
        style={{
          position: "absolute",

          width: "100%",
          height: "100%",
          top: 0,
          alignItems: "center",

          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.1,
          shadowRadius: 1,
          elevation: 5,
          zIndex: 1,
        }}
      >
        {item.images?.length > 0 ? (
          <Image
            style={styles.itemTwoImage}
            // resizeMode ="cover"
            // source={{ uri: item.images[0] }}
            {...{ uri: item.images[0] }}
          />
        ) : (
          <View
            style={{
              ...styles.itemTwoImage,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: Colors.primaryLightest,
            }}
          >
            <Icon.Feather
              name="image"
              size={25}
              color={Colors.primaryLight}
              style={{ marginHorizontal: 5 }}
            />
          </View>
        )}
      </View>

      <View
        style={{
          height: 185,
          justifyContent: "flex-end",
          paddingBottom: 15,
          paddingHorizontal: 15,
          flex: 1,
          backgroundColor: "#fff",
          borderRadius: 15,
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            lineHeight: 20,
            textAlign: "center",
            backgroundColor: "#fff",
          }}
        >
          {item.name}
        </Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 12,
            color: "grey",
            backgroundColor: "#fff",
            lineHeight: 17,
          }}
        >
          Yemeni cus
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            // backgroundColor:'yellow',
            marginTop: 10,
          }}
        >
          <Text>$ {item?.price}</Text>

          <Icon.Ionicons
            name="heart-outline"
            size={20}
            color={Colors.primaryLight}
            style={{ marginHorizontal: 5 }}
          />
        </View>
      </View>
      {/* <View style={styles.itemTwoContainer}>
        {item.images?.length > 0 ? (
          <Image
            style={styles.itemTwoImage}
            // source={{ uri: item.images[0] }}
            {...{ uri: item.images[0] }}
          />
        ) : (
          <View
            style={{
              ...styles.itemTwoImage,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: Colors.primaryLightest,
            }}
          >
            <Icon.Feather
              name="image"
              size={25}
              color={Colors.primaryLight}
              style={{ marginHorizontal: 5 }}
            />
          </View>
        )}
      </View>
      <Text style={{}}>{item.name}</Text>
      <Text style={{ lineHeight:20, paddingVertical:10, color: Colors.primary }}>{item.price}</Text>

      <TouchableOpacity
        style={styles.button}
        key={item.id}
        onPress={() => {
          addToCart(item);
        }}
      >
        <Text style={styles.btnText}>+</Text>
      </TouchableOpacity>
   */}
    </View>
  );
};

const itemsPerRow = 2;
const margenHorizontal = 15;
const width =
  Layout.window.width / itemsPerRow - itemsPerRow * margenHorizontal;
const raduisWidth = width / 2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "yellow",
    paddingTop: 40,
    marginTop: 10,
  },
  button: {
    position: "absolute",
    top: 5,
    right: 5,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
  },
  itemTwoContainer: {
    marginBottom: 2,
    width: width,
    borderRadius: raduisWidth,
  },

  itemTwoTitle: {
    color: Colors.primary,
  },
  btnText: {
    color: Colors.white,
    fontSize: 25,
  },
  itemTwoSubTitle: {
    color: Colors.primary,
    fontFamily: Fonts.primaryRegular,
    fontSize: 15,
    marginVertical: 5,
  },
  itemTwoPrice: {
    color: Colors.white,

    fontSize: 20,
  },
  itemTwoImage: {
    width: "70%",
    height: width * 0.7,
    borderRadius: raduisWidth,
  },
  itemTwoOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: Colors.primary,
    opacity: 0.7,
  },
});
