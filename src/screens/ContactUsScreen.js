import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Colors from "../constants/Colors";

import getStyle from "../constants/styles";

import firebase from "../config/firebase.config";
import { LocalizationContext } from "../context/cartContext/provider";
import { AuthContext } from "../context/authContext/provider";

export default function ContactUsScreen({ navigation }) {
  //useForm
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const { t, isRTL, locale } = React.useContext(LocalizationContext);
  const {
    textInput,
    textArea,
    error: errorStyle,
    buttonPrimary,
  } = getStyle(locale === "ar");

  const { state } = React.useContext(AuthContext);

  const handleSend = async (data) => {
    const userId = firebase.auth().currentUser.uid;
    const msg = {
      email: data.email,
      title: data.title,
      message: data.message,
      userId,
      user: state.userData,
    };
    console.log("msg", msg);

    try {
      setIsLoading(true);
      const db = firebase.firestore();
      await db.collection("messages").add(msg);
      alert(
        "Your message sent successfully. we will contact you as soon as possible"
      );
      reset();
    } catch (err) {
      console.log("messages err", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      extraHeight={40}
      extraScrollHeight={130}
      contentContainerStyle={{ backgroundColor: "#fff" }}
      style={{ backgroundColor: "#fff" }}
      contentContainerStyle={{ flexGrow: 1 }}
      scrollEnabled
    >
      <View style={styles.formContainer}>
        {/* <View style={{ height: 500 }} /> */}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={textInput}
              placeholder={t("Email")}
              placeholderStyle={{ textAlign: "center" }}
              autoCorrect={false}
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="email"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.email && (
          <Text style={errorStyle}>{t("Errors.This field is required")}</Text>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[textInput, { marginTop: 10 }]}
              placeholder={t("Title")}
              placeholderStyle={{ textAlign: "center" }}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="title"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.title && (
          <Text style={errorStyle}>{t("Errors.This field is required")}</Text>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              multiline
              style={[textInput, textArea]}
              isRTL={isRTL}
              maxLength={100}
              placeholder={t("Message content")}
              placeholderTextColor={"#c7c7c7"}
              containerStyle={styles.textareaContainer}
              underlineColorAndroid={"transparent"}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              defaultValue=""
            />
          )}
          name="message"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.message && (
          <Text style={errorStyle}>{t("Errors.This field is required")}</Text>
        )}
        <TouchableOpacity
          disabled={isLoading}
          onPress={handleSubmit(handleSend)}
          style={buttonPrimary}
        >
          <Text style={{ textAlign: "center", color: Colors.white }}>
            {t("SEND")}
          </Text>
        </TouchableOpacity>
        {error ? <Text style={errorStyle}>{error.message}</Text> : null}
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  formContainer: {
    padding: 8,
    flex: 1,
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
    paddingVertical: 30,
  },

  textareaContainer: {
    marginVertical: 10,
  },
});
