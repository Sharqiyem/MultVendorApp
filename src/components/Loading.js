import React from "react";
import { StyleSheet, ActivityIndicator, View } from "react-native";
import Colors from "../constants/Colors";
import { globalStyles } from "../constants/styles";

const Loading = () => {
  return (
    <View style={globalStyles.centerContainer}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
