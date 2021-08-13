import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as Icon from "@expo/vector-icons";

import Colors from "../../constants/Colors";
import getStyle from "../../constants/styles";
import { LocalizationContext } from "../../context/cartContext/provider";

const SearchScreen = ({ navigation }) => {
  const { t, isRTL, locale } = React.useContext(LocalizationContext);
  const {
    textInput,
    error: errorStyle,
    buttonPrimary,
  } = getStyle(locale === "ar");

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginHorizontal: 10, paddingBottom:5 }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: "absolute",
            left: 0,
            width: 40,
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <Icon.Feather
            name="arrow-left"
            size={25}
            color={Colors.primaryLight}
            style={{}}
          />
        </TouchableOpacity>
        <TextInput
          style={textInput}
          placeholder={t("Name")}
          placeholderStyle={{ textAlign: "center" }}
          onChangeText={(text) => setName(text)}
          value={""}
          autoFocus
          autoCorrect={false}
          autoCapitalize="none"
        />
      </View>
      <View style={{ flex: 1, backgroundColor: "#fff" }}></View>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});
