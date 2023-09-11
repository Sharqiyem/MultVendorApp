import * as React from "react";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Platform,
  // Image
} from "react-native";
import Constants from "expo-constants";

import { Image } from "react-native-expo-image-cache";

import { Ionicons } from "@expo/vector-icons";

import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import { LocalizationContext } from "../context/cartContext/provider";
import getStyle from "../constants/styles";

export const StoreDetailHeader = ({ store }) => {
  const { locale, t } = React.useContext(LocalizationContext);
  const { boldText, row } = getStyle(locale === "ar");
  const storeName = store?.names[locale] || store?.name;

  return (
    <View style={styles.itemTwoContent}>
      <Text style={styles.itemTwoTitle}>{storeName}</Text>
      <View
        style={{
          ...row,
          // justifyContent: 'space-arround',
          alignItems: "center",
          alignSelf: "center",
          marginHorizontal: 5,
        }}
      >
        <Text style={{}}>{t("Social Media")} : </Text>
        <Ionicons
          name="logo-facebook"
          size={25}
          style={{ marginHorizontal: 10 }}
          color={Colors.primary}
        />
        <Ionicons
          name="logo-youtube"
          size={25}
          style={{ marginHorizontal: 10 }}
          color={Colors.primary}
        />
        <Ionicons
          name="logo-instagram"
          size={25}
          style={{ marginHorizontal: 10 }}
          color={Colors.primary}
        />
      </View>
      <View
        style={{
          ...row,
          justifyContent: "space-between",
          marginHorizontal: 5,
          marginVertical: 25,
        }}
      >
        <View
          style={{
            alignItems: "center",
            padding: 10,
            borderRadius: 5,
          }}
        >
          <Text style={[boldText, styles.metaText]}>{t("Products")}</Text>
          <Text style={styles.metaText}>22</Text>
        </View>
        <View
          style={{
            alignItems: "center",
            padding: 10,
            borderRadius: 5,
          }}
        >
          <Text style={[boldText, styles.metaText]}>{t("Orders")}</Text>
          <Text style={styles.metaText}>22</Text>
        </View>
        <View
          style={{
            alignItems: "center",
            padding: 10,
            borderRadius: 5,
          }}
        >
          <Text style={[boldText, styles.metaText]}>{t("Reviews")}</Text>
          <Text style={styles.metaText}>22</Text>
        </View>
      </View>
      <Text style={styles.addressTitle}>{t("Address")}</Text>
      <Text style={styles.addressTitle}>12 Tah str.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemTwoTitle: {
    fontSize: 20,
    textAlign: "center",
    paddingVertical: 15,
  },
  itemTwoSubTitle: {
    fontSize: 15,
    marginVertical: 10,
    marginHorizontal: 5,
    textAlign: "center",
  },
  addressTitle: {
    fontSize: 15,
    marginVertical: 5,
    textAlign: "center",
  },
  metaText: {
    fontSize: 14,
    marginHorizontal: 10,
    lineHeight: 20,
  },
});
