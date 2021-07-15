import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Colors from "../constants/Colors";
import getStyle from "../constants/styles";
import { LocalizationContext } from "../context/cartContext/provider";

const ListEmptyComponent = () => {
  const { t, locale } = React.useContext(LocalizationContext);
  const { text, centerContainer } = getStyle(locale === "ar");

  return (
    <View style={centerContainer}>
      <Text style={text}>{t("No data")}</Text>
    </View>
  );
};

export default ListEmptyComponent;

const styles = StyleSheet.create({});
