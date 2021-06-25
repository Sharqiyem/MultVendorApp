import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Colors from "../constants/Colors";
import getStyle, { globalStyles } from "../constants/styles";
import { LocalizationContext } from "../context/cartContext/provider";

const ListEmptyComponent = () => {
  const { t } = React.useContext(LocalizationContext);

  return (
    <View style={globalStyles.centerContainer}>
      <Text style={getStyle().text}>{t("No data")}</Text>
    </View>
  );
};

export default ListEmptyComponent;

const styles = StyleSheet.create({});
