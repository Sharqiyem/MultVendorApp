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

export const ExProductCycleList = ({ limit }) => {
  const [data, isLoading] = useGetDataByCollection("products");

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
    <FlatList
      numColumns={3}
      data={data.slice(0, limit)}
      renderItem={({ item }) => <ProductCycleItem item={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export const ProductCycleItem = ({ item }) => {
  const { dispatch, state } = React.useContext(StoreContext);

  const addToCart = (productItem) => {
    if (state.selectedStore && state.selectedStore !== item.storeId) {
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
    <View style={styles.container} key={item.id}>
      <View style={styles.itemTwoContainer}>
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
              backgroundColor: "#e6ebfd",
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
      <Text style={styles.itemTwoTitle}>{item.name}</Text>
      <Text style={{ color: Colors.gray }}>{item.price}</Text>

      <TouchableOpacity
        style={styles.button}
        key={item.id}
        onPress={() => {
          addToCart(item);
        }}
      >
        <Text style={styles.btnText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

ProductCycleItem.propTypes = {
  item: PropTypes.object,
};

const itemsPerRow = 3;
const margenHorizontal = 5;
const width =
  Layout.window.width / itemsPerRow - itemsPerRow * margenHorizontal;
const raduisWidth = width / 2;
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: margenHorizontal,
    marginVertical: 10,
    // backgroundColor:'green'
  },
  button: {
    position: "absolute",
    top: -5,
    right: 5,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
  },
  itemTwoContainer: {
    // paddingBottom: 10,
    // backgroundColor: 'red',
    marginBottom: 2,
    width: width,
    // height: width,
    borderRadius: raduisWidth,
  },

  itemTwoTitle: {
    color: Colors.primary,

    // fontSize: 15,
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
    width: "100%",
    height: width,
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
