import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";

import Dialog from "react-native-dialog";
import Colors from "../../constants/Colors";

import firebase from "../../config/firebase.config";

import getStyle from "../../constants/styles";
import { AuthContext } from "../../context/authContext/provider";
import { LocalizationContext } from "../../context/cartContext/provider";
import { useGetCategoriesByStoreId, useGetDataByCollection } from "../../hooks";
import { ProductsContext } from "../../context/productsContext/provider";

const CuisineSelectorScreen = ({ navigation, route }) => {
  const { isRTL, locale } = React.useContext(LocalizationContext);
  const { row, text } = getStyle(locale === "ar");

  const { state: authState } = React.useContext(AuthContext);
  const { productTypes } = React.useContext(ProductsContext);

  console.log("authState", authState);

  // const [data, isLoadingCategories] = useGetDataByCollection("cuisines");

  const renderItem = ({ item }) => {
    const name = item?.names[!isRTL ? "ar" : "en"] || item?.name;
    return (
      <TouchableOpacity
        onPress={() => {
          if (route?.params?.onBack) {
            const field = route?.params?.field;
            route?.params?.onBack(item, field);
          }
          navigation.goBack();
        }}
        style={{
          ...styles.listItemContainer,
          ...row,
          justifyContent: "space-between",
        }}
      >
        <Text style={text}>{name}</Text>
      </TouchableOpacity>
    );
  };

  const renderList = () => {
    // if (isLoadingCategories) return null;
    return (
      <View style={{ margin: 15 }}>
        <FlatList
          data={productTypes}
          renderItem={renderItem}
          keyExtractor={(item) => item?.id}
        />
      </View>
    );
  };

  return <View style={styles.container}>{renderList()}</View>;
};

export default CuisineSelectorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  listItemContainer: {
    backgroundColor: "rgba(0,0,0,0.03)",
    marginVertical: 0,
    paddingVertical: 10,
    marginVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
});
