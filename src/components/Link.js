import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import getStyle from "../constants/styles";
import { LocalizationContext } from "../context/cartContext/provider";

const Link = ({ onPress }) => {
  const { locale, t } = useContext(LocalizationContext);
  const { boldText } = getStyle(locale === "ar");
  return (
    <TouchableOpacity
      onPress={() => {
        if (onPress) onPress();
      }}
      style={styles.container}
    >
      <Text style={[boldText, styles.text]}>{t("See All")}</Text>
    </TouchableOpacity>
  );
};

export default Link;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryLighter,
    borderRadius: 15,
    padding: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 12,
    paddingHorizontal: 10,
    color: Colors.primary,
  },
});
