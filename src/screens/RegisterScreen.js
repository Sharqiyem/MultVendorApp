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
  ActivityIndicator,
  StatusBar,
} from "react-native";
import Colors from "../constants/Colors";
import { Logo } from "../components";

import getStyle from "../constants/styles";

import Layout from "../constants/Layout";
import { Ionicons, Feather } from "@expo/vector-icons";
import firebase from "../config/firebase.config";
import { AuthContext } from "../context/authContext/provider";
import { LocalizationContext } from "../context/cartContext/provider";
import FirebaseAuth from "../services/firebaseAuth";
export default function RegisterScreen({ navigation }) {
  const { t } = React.useContext(LocalizationContext);
  const {
    textInput,
    row,
    error: errorStyle,
    buttonPrimary,
    statusBar,
    textinputIcon,
  } = getStyle();

  const { state, signIn } = React.useContext(AuthContext);

  const [email, setEmail] = React.useState("a@a.com");
  const [name, setName] = React.useState("name");
  const [password, setPassword] = React.useState("123456");
  const [confirmPassword, setConfirmPassword] = React.useState("123456");
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleRegister = () => {
    setIsLoading(true);
    setError("");
    FirebaseAuth.register(email, password, name)
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
      {Platform.OS === "ios" && <StatusBar barStyle="dark-content" />}

      {/* <View style={statusBar} /> */}
      <View style={{ alignItems: "center", marginTop: 100 }}>
        <Text style={{ fontSize: 24 }}>{t("Let's Get Started")}</Text>
        <Text style={{ color: Colors.gray }}>
          {t("Create an account to get all features")}
        </Text>
      </View>

      <View style={{ flex: 1, margin: 20 }}>
        <View style={{ justifyContent: "center" }}>
          <Feather
            name="user"
            size={20}
            style={getStyle().textinputIcon}
            color={Colors.primaryLight}
          />
          <TextInput
            style={textInput}
            placeholder={t("Name")}
            placeholderStyle={{ textAlign: "center" }}
            onChangeText={(text) => setName(text)}
            value={name}
            autoCorrect={false}
          />
        </View>

        <View style={{ justifyContent: "center" }}>
          <Feather
            name="mail"
            size={20}
            style={getStyle().textinputIcon}
            color={Colors.primaryLight}
          />
          <TextInput
            style={textInput}
            placeholder={t("Email")}
            placeholderStyle={{ textAlign: "center" }}
            onChangeText={(text) => setEmail(text)}
            value={email}
            autoCorrect={false}
            autoCapitalize="none"
          />
        </View>

        <View style={{ justifyContent: "center" }}>
          <Feather
            name="lock"
            size={20}
            style={getStyle().textinputIcon}
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

        <View style={{ justifyContent: "center" }}>
          <Feather
            name="lock"
            size={20}
            style={getStyle().textinputIcon}
            color={Colors.primaryLight}
          />
          <TextInput
            style={textInput}
            placeholder={t("Confirm Password")}
            placeholderStyle={{ textAlign: "center" }}
            onChangeText={(text) => setConfirmPassword(text)}
            value={confirmPassword}
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry
          />
        </View>
        <TouchableOpacity onPress={handleRegister} style={buttonPrimary}>
          <Text style={{ textAlign: "center", color: Colors.white }}>
            {t("Register")}
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
        {error ? <Text style={errorStyle}>{error}</Text> : null}

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
            <Text style={{ textAlign: "center" }}>{t("Or Connect using")}</Text>
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
              color={Colors.primary}
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
              navigation.navigate("Login");
            }}
            style={[
              {
                height: 50,
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <Text
              style={[
                {
                  textAlign: "center",
                  color: Colors.primary,
                  fontSize: 16,
                },
                // link,
              ]}
            >
              {t("I already have an account")}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

RegisterScreen.navigationOptions = {
  title: "",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
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
