import React from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import Colors from "../constants/Colors";
 import getStyle from "../constants/styles";
import { LocalizationContext } from "../context/cartContext/provider";

const Loading = () => {
  const { t, locale } = React.useContext(LocalizationContext);
  const { text, centerContainer } = getStyle(locale === "ar");

  return (
    <View style={centerContainer}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
