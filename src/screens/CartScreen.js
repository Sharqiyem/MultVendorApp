import React, { useContext } from "react";
import {
  View,
  Text,
  // Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
} from "react-native";
import { FlatGrid } from "react-native-super-grid";
import { Image } from "react-native-expo-image-cache";

import * as Icon from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

import { StoreContext } from "../context/cartContext/provider";
import types from "../context/cartContext/types";
import Colors from "../constants/Colors";
import getStyle from "../constants/styles";

const preview = {
  uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
};

const CartScreen = ({ navigation }) => {
  const { text } = getStyle();
  const { state, dispatch } = useContext(StoreContext);
  const data = state.cartItems;
  const total = state.totalAmount;

  // console.log('cartItems', data);

  const removeItem = (item) => {
    dispatch({ type: types.CART_REMOVE_ITEM, payload: item });
  };

  const incItem = (item) => {
    dispatch({ type: types.CART_ADD, payload: item });
  };

  const decItem = (item) => {
    dispatch({ type: types.CART_REMOVE, payload: item });
  };

  const RenderItem = ({ name, price, images, quantity, item }) => {
    const uri = images[0];
    return (
      <View style={[styles.itemContainer, getStyle().shadow]}>
        {/* <StatusBar backgroundColor='red' barStyle='dark-content' /> */}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignSelf: "flex-start",
            margin: 5,
          }}
        >
          <Text style={{ fontSize: 16 }} numberOfLines={2}>
            {name}
          </Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
            }}
          >
            {images && images[0] ? (
              <Image
                style={{ width: 70, height: 70, margin: 5 }}
                // isBackground
                // source={{ uri }}
                {...{ uri }}
              />
            ) : (
              // <Image
              //   style={{ width: 70, height: 70, margin: 5 }}
              //   resizeMode='stretch'
              //   source={{ uri: images[0] }}
              // />
              // <Image
              //   style={{ width: 70, height: 70, margin: 5 }}
              //   resizeMode='stretch'
              //   source={{ uri: images[0] }}
              // />
              <Image
                style={{ width: 70, height: 70, margin: 5 }}
                source={{
                  uri: "https://facebook.github.io/react-native/img/tiny_logo.png",
                }}
              />
            )}
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <View
                style={{
                  marginVertical: 5,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text numberOfLines={1}>Price</Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: "flex-end",
                    marginHorizontal: 5,
                  }}
                >
                  <Text numberOfLines={1}>{price} $</Text>
                </View>
              </View>

              <View
                style={{
                  marginVertical: 5,
                  flexDirection: "row",
                  alignItems: "space-between",
                  // backgroundColor: 'red',
                }}
              >
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    // alignItems: 'center',
                    alignSelf: "center",
                  }}
                >
                  <Text numberOfLines={2}>Quantity</Text>
                </View>
                <View
                  style={{
                    // flex: 1,
                    flexDirection: "row",
                    alignItems: "flex-end",
                  }}
                >
                  <TouchableOpacity
                    // style={{ backgroundColor: '#fff' }}
                    onPress={() => {
                      decItem(item.item);
                    }}
                  >
                    <Icon.Feather
                      name="minus-square"
                      size={26}
                      color={Colors.primary}
                      style={{ marginHorizontal: 5 }}
                    />
                  </TouchableOpacity>
                  <Text style={{ marginHorizontal: 3, alignSelf: "center" }}>
                    {quantity}
                  </Text>
                  <TouchableOpacity
                    // style={{ backgroundColor: '#fff' }}
                    onPress={() => {
                      incItem(item.item);
                    }}
                  >
                    <Icon.Feather
                      name="plus-square"
                      size={26}
                      color={Colors.primary}
                      style={{ marginHorizontal: 5 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={{ alignSelf: "flex-end" }}
          onPress={() => {
            removeItem(item.item);
          }}
        >
          <Icon.MaterialIcons
            name="delete"
            size={26}
            color={Colors.secondary}
            style={{ marginHorizontal: 5 }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <View style={{ flex: 1, paddingTop: 10, backgroundColor: Colors.white }}>
        <FlatGrid
          style={{ marginBottom: 135 }}
          itemDimension={200}
          items={data}
          renderItem={({ item }) => {
            // console.log('Cart ', item);
            const {
              item: { name, price, images },
            } = item;

            return (
              <RenderItem
                name={name}
                price={price}
                images={images}
                quantity={item.quantity}
                item={item}
              />
            );
          }}
        />
      </View>
      {/* </ScrollView> */}
      <View style={styles.tabBarInfoContainer}>
        <Text
          style={{
            margin: 10,
            textAlign: "left",
            marginHorizontal: 20,
            fontSize: 18,
          }}
        >
          Total Amount:{"   "}
          <Text style={[text, { color: Colors.primary, fontSize: 18 }]}>
            {total}
          </Text>
        </Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.white,
              margin: 10,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: Colors.primary,
              flex: 1,
              height: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text
              style={{
                color: Colors.primary,
                textAlign: "center",
                marginHorizontal: 20,
              }}
            >
              Continue Shopping
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={data.length === 0}
            activeOpacity={data.length === 0 ? 1 : 0.5}
            style={{
              backgroundColor:
                data.length === 0 ? Colors.primaryLight : Colors.primary,
              margin: 10,
              borderRadius: 100,
              flex: 1,
              height: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              navigation.navigate("Address");
            }}
          >
            <Text
              style={{
                color: "#fff",
                // fontSize: 18,
                textAlign: "center",
                marginHorizontal: 20,
              }}
            >
              Checkout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 30,
    // backgroundColor: 'red',
  },
  gridView: {
    marginTop: 20,
    flex: 1,
  },
  itemContainer: {
    justifyContent: "center",
    borderRadius: 10,
    borderColor: Colors.primaryLight,
    borderWidth: 0.3,

    // shadowColor: 'gray',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.3,
    // shadowRadius: 2,
    // elevation: 1,

    padding: 10,

    alignItems: "center",
    backgroundColor: "#fff",
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

export default CartScreen;
