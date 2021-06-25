// Dependencies import
import React from "react";
import { ScrollView, View } from "react-native";
import SettingsStyle from "../constants/SettingsStyle";

// Library main view definition
const SettingsPage = (props) => (
  <ScrollView
    style={SettingsStyle.container}
    showsVerticalScrollIndicator={false}
  >
    <View style={SettingsStyle.content}>{props.children}</View>
  </ScrollView>
);

export default SettingsPage;
