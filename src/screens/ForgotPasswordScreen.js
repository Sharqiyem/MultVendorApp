import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  TouchableOpacity,
} from "react-native";
import Colors from "../constants/Colors";
import { Logo } from "../components";

import getStyle from "../constants/styles";

import Layout from "../constants/Layout";
import { Ionicons } from "@expo/vector-icons";
import { LocalizationContext } from "../context/cartContext/provider";

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = React.useState("");
  const { t, isRTL, locale } = React.useContext(LocalizationContext);
  const {
    textInput,
    error: errorStyle,
    buttonPrimary,
  } = getStyle(locale === "ar");

  return (
    <View style={styles.container}>
      {/* <Logo style={{ marginVertical: 100 }} /> */}
      <View style={{ flex: 1, margin: 20 }}>
        <TextInput
          style={textInput}
          placeholder="Email"
          placeholderStyle={{ textAlign: "center" }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          autoCorrect={false}
          autoCapitalize="none"
        />

        <TouchableOpacity onPress={() => {}} style={buttonPrimary}>
          <Text style={{ textAlign: "center", color: Colors.white }}>
            RESET PASSWORD
          </Text>
        </TouchableOpacity>
        {/* Social media login */}
      </View>
    </View>
  );
}

ForgotPasswordScreen.navigationOptions = {
  title: "",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: Colors.white,
  },

  tabBarInfoContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: "center",
    // backgroundColor: '#fbfbfb',
    paddingVertical: 30,
  },
});
