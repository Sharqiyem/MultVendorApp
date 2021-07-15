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
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Colors from "../constants/Colors";
import { Logo } from "../components";

import getStyle from "../constants/styles";

import Layout from "../constants/Layout";
import { Ionicons } from "@expo/vector-icons";
import firebase from "../config/firebase.config";
import FirebaseAuth, {
  reauthenticate,
  changePassword,
} from "../services/firebaseAuth";
import { LocalizationContext } from "../context/cartContext/provider";
export default function ChangePasswordScreen({ navigation }) {
  const [password, setPassword] = React.useState("");
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const { t, locale } = React.useContext(LocalizationContext);

  const { textInput, buttonPrimary, error: errorStyle } = getStyle(locale === "ar");

  const handleChangePassword = () => {
    setIsLoading(true);
    setError("");
    FirebaseAuth.changePassword(currentPassword, password)
      .then(() => {
        alert("Password was changed successfully");
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  };
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, margin: 20 }}>
        <TextInput
          style={textInput}
          placeholder="Current Password"
          placeholderStyle={{ textAlign: "center" }}
          onChangeText={(text) => setCurrentPassword(text)}
          value={currentPassword}
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry
        />
        <TextInput
          style={textInput}
          placeholder="Password"
          placeholderStyle={{ textAlign: "center" }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry
        />

        <TouchableOpacity
          disabled={isLoading}
          onPress={handleChangePassword}
          style={buttonPrimary}
        >
          <Text style={{ textAlign: "center", color: Colors.white }}>SAVE</Text>
        </TouchableOpacity>
        {isLoading && (
          <ActivityIndicator
            style={{
              alignSelf: "center",
              width: Layout.window.width,
            }}
            size={"large"}
            color={Colors.primary}
          />
        )}
        {error ? <Text style={errorStyle}>{error}</Text> : null}
      </View>
    </View>
  );
}

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
