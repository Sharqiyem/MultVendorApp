import * as React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  // Image,
  FlatList,
} from 'react-native';
import { Image } from 'react-native-expo-image-cache';

import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import Layout from '../constants/Layout';
import { StoreContext } from '../context/cartContext/provider';
import types from '../context/cartContext/types';
import PropTypes from 'prop-types';
import productHooks from '../hooks/useGetDataByCollection';

export const ExProductCycleList = () => {
  const [data, isLoading] = productHooks.useGetDataByCollection('products');

  if (isLoading) return <Text> Loading </Text>;

  return (
    <FlatList
      numColumns={3}
      data={data}
      renderItem={({ item }) => <ProductCycleItem item={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};
export const ProductCycleItem = ({ item }) => {
  const { dispatch } = React.useContext(StoreContext);

  const addToCart = (productItem) => {
    dispatch({ type: types.CART_ADD, payload: productItem });
  };

  return (
    <View style={styles.container} key={item.id}>
      <View style={styles.itemTwoContainer}>
        <Image
          style={styles.itemTwoImage}
          // source={{ uri: item.images[0] }}
          {...{ uri: item.images[0] }}
        />
      </View>
      <Text style={styles.itemTwoTitle}>{item.name}</Text>

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
    // backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: margenHorizontal,
    marginVertical: 5,
  },
  button: {
    position: 'absolute',
    top: -5,
    right: 5,
    width: 40,
    height: 40,
    borderRadius: 20,
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

    fontSize: 15,
  },
  btnText: {
    color: Colors.white,

    fontSize: 28,
    alignSelf: 'center',
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
    width: '100%',
    height: width,
    borderRadius: raduisWidth,
  },
  itemTwoOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: Colors.primary,
    opacity: 0.7,
  },
});
