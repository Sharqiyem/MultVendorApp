import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import getStyle from "../constants/styles";
import { Feather, FontAwesome } from "@expo/vector-icons";
import SettingsRowStyle from "../constants/SettingsRowStyle";
import Colors from "../constants/Colors";
import { LocalizationContext } from "../context/cartContext/provider";

const SettingsNavigateRow = ({
  onPressCallback,
  iconName,
  label,
  Icon = Feather,
}) => {
  const {
    containerInSection,
    containerInnerSection,
    iconLeftStyle,
    iconRightStyle,
    textStyle,
  } = SettingsRowStyle;
  const { t, locale } = React.useContext(LocalizationContext);

  const { angleIcon, text, row } = getStyle(locale === "ar");

  return (
    <TouchableOpacity onPress={onPressCallback}>
      <View style={containerInSection}>
        <View style={[containerInnerSection, row, {}]}>
          <Icon
            name={iconName}
            size={20}
            style={iconLeftStyle}
            color={Colors.primary}
          />
          <Text
            style={[textStyle, text]}
            numberOfLines={1}
            ellipsizeMode={"tail"}
          >
            {label}
          </Text>
          <FontAwesome
            name={angleIcon}
            size={20}
            style={iconRightStyle}
            color={Colors.grey}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SettingsNavigateRow;
