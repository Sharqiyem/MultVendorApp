// Dependencies import
import React, { Component } from "react";
import { View, Text } from "react-native";
import SettingsRowStyle from "../constants/SettingsRowStyle";
import getStyle from "../constants/styles";
import { LocalizationContext } from "../context/cartContext/provider";

// Styles deconstructing
const { container, containerSection, textSection } = SettingsRowStyle;

// Class for section rows
const SectionRow = ({ label, children }) => {
  const { t, locale } = React.useContext(LocalizationContext);
  const { text, boldText } = getStyle(locale === "ar");

  return (
    <View style={container}>
      <View style={containerSection}>
        <Text style={[textSection, boldText]} numberOfLines={1}>
          {label}
        </Text>
      </View>
      <View>{children}</View>
    </View>
  );
};

// Component export
export default SectionRow;
