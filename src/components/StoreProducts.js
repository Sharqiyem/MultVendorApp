import * as React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import Layout from "../constants/Layout";
import { StoreContext } from "../context/cartContext/provider";
import types from "../context/cartContext/types";
import PropTypes from "prop-types";
import { ProductCycleItem } from "./Product-Cycle-item";
import useGetProductsByStoreId from "../hooks/useGetProductsByStoreId";

export const StoreProducts = ({ storeId }) => {
  const [data, isLoading] = useGetProductsByStoreId(storeId);

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
      showsVerticalScrollIndicator={false}
      numColumns={3}
      data={data}
      renderItem={({ item }) => <ProductCycleItem item={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};
