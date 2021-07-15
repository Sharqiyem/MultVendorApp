import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import Constants from "expo-constants";

import Colors from "../constants/Colors";
import { Logo } from "../components";

import getStyle from "../constants/styles";

import Layout from "../constants/Layout";
import { Ionicons, Feather } from "@expo/vector-icons";
import { AuthContext } from "../context/authContext/provider";
import { LocalizationContext } from "../context/cartContext/provider";
import FirebaseAuth from "../services/firebaseAuth";

export default function LoginScreen({ navigation }) {
  const { t, locale } = React.useContext(LocalizationContext);
  const {
    textInput,
    row,
    error: errorStyle,
    buttonPrimary,
    buttonOutline,
    statusBar,
    textinputIcon,
    flexDir,
  } = getStyle(locale === "ar");

  const { state, signIn } = React.useContext(AuthContext);

  const [email, setEmail] = React.useState("a@a.com");
  const [password, setPassword] = React.useState("123456");
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const onLoginPress = () => {
    setIsLoading(true);
    setError("");
    FirebaseAuth.login(email, password)
      .then((user) => {
        signIn(user);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(JSON.stringify(err));
        setError(err);
      });
  };

  return (
    <View style={styles.container}>
      {/* {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />} */}

      {/* Header */}
      <View style={{ alignItems: "center" }}>
        <Logo style={{ marginTop: 100, marginBottom: 20 }} />
        <Text style={{ fontSize: 24, color: Colors.white }}>
          {t("Welcome back")}
        </Text>
        <Text style={{ color: Colors.white }}>
          {t("Login to your account")}
        </Text>
      </View>

      {/* Form */}
      <View style={{ flex: 1, margin: 20 }}>
        {/* Input emial */}
        <View style={{ justifyContent: "center", marginVertical: 5 }}>
          <Feather
            name="user"
            size={20}
            style={textinputIcon}
            color={Colors.primaryLight}
          />
          <TextInput
            style={[textInput]}
            keyboardType="email-address"
            placeholder={t("Email")}
            placeholderStyle={{ textAlign: "center" }}
            onChangeText={(text) => setEmail(text)}
            value={email}
            autoCorrect={false}
            autoCapitalize="none"
          />
        </View>

        {/* Input password */}
        <View style={{ justifyContent: "center", marginVertical: 5 }}>
          <Feather
            name="lock"
            size={20}
            style={textinputIcon}
            color={Colors.primaryLight}
          />
          <TextInput
            style={textInput}
            placeholder={t("Password")}
            placeholderStyle={{ textAlign: "center" }}
            onChangeText={(text) => setPassword(text)}
            value={password}
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ForgotPassword");
          }}
          style={[
            {
              marginVertical: 5,
            },
            flexDir,
          ]}
        >
          <Text
            style={{
              textDecorationLine: "underline",
            }}
          >
            {t("Forgot password?")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={isLoading}
          onPress={onLoginPress}
          style={[buttonOutline, {}]}
        >
          <Text style={{ textAlign: "center", color: Colors.white }}>
            {t("Login")}
          </Text>
        </TouchableOpacity>

        {isLoading ? (
          <ActivityIndicator
            style={{
              alignSelf: "center",
              width: Layout.window.width,
            }}
            size={"large"}
            color={Colors.primary}
          />
        ) : null}
        {error ? <Text style={{}}>{error}</Text> : null}

        {/* Social media login */}
        <View
          style={[
            row,
            {
              justifyContent: "space-around",
              alignItems: "center",
              marginVertical: 20,
            },
          ]}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ textAlign: "center", color: Colors.white }}>
              {t("Or Connect using")}
            </Text>
          </View>
          <View
            style={[
              row,
              { flex: 1, justifyContent: "center", alignItems: "center" },
            ]}
          >
            <Ionicons
              name="logo-facebook"
              size={30}
              style={{ marginHorizontal: 10 }}
              color={Colors.blue}
            />

            <Ionicons
              name="logo-google"
              size={30}
              style={{ marginHorizontal: 10 }}
              color={Colors.secondary}
            />
          </View>
        </View>

        <View
          style={[
            {
              // backgroundColor: 'red',
              marginBottom: 10,
              flex: 1,
              marginHorizontal: 20,
              justifyContent: "flex-end",
            },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Register");
            }}
            style={{
              height: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>
              {t("Don't have an account?")}{" "}
              <Text
                style={[
                  {
                    // color: Colors.white,
                    textDecorationLine: "underline",
                  },
                  // link,
                ]}
              >
                {t("Sign Up")}
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

LoginScreen.navigationOptions = {
  title: "",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.primary,
  },
});
