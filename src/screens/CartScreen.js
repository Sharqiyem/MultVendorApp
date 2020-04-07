import React, { useContext } from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import * as Icon from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';

import { StoreContext } from '../context/cartContext/provider';
import types from '../context/cartContext/types';
import Colors from '../constants/Colors';

const CartScreen = ({ navigation }) => {
  const route = useRoute();

  const title = route.params.name || route.name;
  //   console.log({ route });
  // navigation.setOptions({
  //   title,
  // });
  const { state, dispatch } = useContext(StoreContext);

  const removeItem = (item) => {
    dispatch({ type: types.CART_REMOVE_ITEM, payload: item });
  };

  const incItem = (item) => {
    dispatch({ type: types.CART_ADD, payload: item });
  };

  const decItem = (item) => {
    dispatch({ type: types.CART_REMOVE, payload: item });
  };

  const data = state.cartItems;
  console.log('cartItems', data);

  const total = state.cartItems.reduce(
    (sum, item) => sum + item.quantity * item.item.price,
    0
  );

  return (
    <>
      <View style={{ flex: 1, paddingTop: 10 }}>
        <FlatGrid
          style={{ marginBottom: 135 }}
          itemDimension={200}
          items={data}
          renderItem={({ item }) => {
            console.log('Cart ', item);
            return (
              <View style={styles.itemContainer}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignSelf: 'flex-start',
                    margin: 5,
                  }}
                >
                  <Text style={{ fontSize: 16 }} numberOfLines={2}>
                    {item.item.name}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                    }}
                  >
                    {item.item.images && item.item.images[0] ? (
                      <Image
                        style={{ width: 70, height: 70, margin: 5 }}
                        resizeMode='stretch'
                        source={{ uri: item.item.images[0] }}
                      />
                    ) : (
                      <Image
                        style={{ width: 70, height: 70, margin: 5 }}
                        source={{
                          uri:
                            'https://facebook.github.io/react-native/img/tiny_logo.png',
                        }}
                      />
                    )}
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                      }}
                    >
                      <View
                        style={{
                          marginVertical: 5,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <View style={{ flex: 1 }}>
                          <Text numberOfLines={1}>Price</Text>
                        </View>
                        <View
                          style={{
                            flex: 1,
                            alignItems: 'flex-end',
                            marginHorizontal: 5,
                          }}
                        >
                          <Text numberOfLines={1}>{item.item.price} $</Text>
                        </View>
                      </View>

                      <View
                        style={{
                          marginVertical: 5,
                          flexDirection: 'row',
                          alignItems: 'space-between',
                        }}
                      >
                        <View style={{ flex: 1 }}>
                          <Text numberOfLines={2}>Quantity</Text>
                        </View>
                        <View
                          style={{
                            // flex: 1,
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => {
                              decItem(item.item);
                            }}
                          >
                            <Icon.Feather
                              name='minus-circle'
                              size={20}
                              color={Colors.primary}
                              style={{ marginHorizontal: 5 }}
                            />
                          </TouchableOpacity>
                          <Text style={{ marginHorizontal: 3 }}>
                            {item.quantity}
                          </Text>
                          <TouchableOpacity
                            onPress={() => {
                              incItem(item.item);
                            }}
                          >
                            <Icon.Feather
                              name='plus-circle'
                              size={20}
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
                  style={{ alignSelf: 'flex-end' }}
                  onPress={() => {
                    removeItem(item.item);
                  }}
                >
                  <Icon.MaterialIcons
                    name='delete'
                    size={26}
                    color='gray'
                    style={{ marginHorizontal: 5 }}
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
      {/* </ScrollView> */}
      <View style={styles.tabBarInfoContainer}>
        <Text
          style={{
            margin: 10,
            textAlign: 'left',
            marginHorizontal: 20,
            fontSize: 18,
          }}
        >
          Total Amount: <Text style={{ color: Colors.primary }}>{total}</Text>
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.white,
              padding: 10,
              margin: 10,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: Colors.primary,
              flex: 1,
              alignSelf: 'stretch',
            }}
          >
            <Text
              style={{
                color: Colors.primary,
                fontSize: 18,
                textAlign: 'center',
                marginHorizontal: 20,
              }}
            >
              Buy
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.primary,
              padding: 10,
              margin: 10,
              borderRadius: 115,
              alignSelf: 'stretch',
              flex: 1,
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontSize: 18,
                textAlign: 'center',
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  contentContainer: {
    paddingTop: 30,
  },
  gridView: {
    marginTop: 20,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'center',
    borderRadius: 20,
    borderColor: Colors.primary,
    borderWidth: 0.3,

    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 1,

    padding: 10,

    alignItems: 'center',
    // backgroundColor: 'gray'
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
export default CartScreen;
