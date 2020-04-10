import * as React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from 'react-native';
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';
import Layout from '../constants/Layout';
import { StoreContext } from '../context/cartContext/provider';
import types from '../context/cartContext/types';
import PropTypes from 'prop-types';
import productHooks from '../hooks/useGetDataByCollection';
import { ProductCycleItem } from './Product-Cycle-item';
// import { ProductCycleItem } from './';

export const StoreProducts = ({ storeId }) => {
  const [data, isLoading] = productHooks.useGetProductsByStoreId(storeId);

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
