import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Icon from "@expo/vector-icons";
import getStyle from "../../constants/styles";
import { LocalizationContext } from "../../context/cartContext/provider";
import Colors from "../../constants/Colors";

const VendorHomeScreen = () => {
  const { locale, t } = useContext(LocalizationContext);
  const { row, text, boldText, shadow } = getStyle();
  const StatsItem = ({ title, total, colors, icon }) => {
    return (
      <LinearGradient
        // Button Linear Gradient
        colors={colors}
        style={{
          borderRadius: 20,
          margin: 10,
          paddingVertical: 15,
          width: 160,
          justifyContent: "center",
          alignItems: "center",
          ...shadow,
        }}
      >
        <Icon.Feather
          name={icon}
          size={26}
          color="#fff"
          style={{ marginVertical: 16 }}
        />
        <Text style={{ ...text, color: Colors.white }}>{title}</Text>
        <Text
          style={{
            // lineHeight: 30,
            // backgroundColor:'red',
            fontSize: 20,
            marginTop: 10,
            color: Colors.white,
          }}
        >
          {total}
        </Text>
      </LinearGradient>
    );
  };

  const renderAllStats = () => {
    return (
      <View style={{ ...row, justifyContent: "center", flexWrap: "wrap" }}>
        <StatsItem
          title={t("Total Sales")}
          total="55$"
          colors={["#570ff2", "#793ff5"]}
          icon="dollar-sign"
        />
        <StatsItem
          title={t("Total Orders")}
          total="25"
          colors={["#f2570f", "#f5793f"]}
          icon="aperture"
        />
        <StatsItem
          title={t("Total Products")}
          total="605"
          colors={["#c80ff2", "#d33ff5"]}
          icon="codesandbox"
        />
        <StatsItem
          title={t("Total Customers")}
          total="6995"
          colors={["#0faaf2", "#3fbbf5"]}
          icon="user"
        />
      </View>
    );
  };

  const renderLastOrders = () => {
    return (
      <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
        <Text style={boldText}>{t("Last orders")}</Text>
      </View>
    );
  };

  const renderLastreviews = () => {
    return (
      <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
        <Text style={boldText}>{t("Last reviews")}</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {renderAllStats()}
      {renderLastOrders()}
      {renderLastreviews()}
    </View>
  );
};

export default VendorHomeScreen;

const styles = StyleSheet.create({});
