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
import Constants from "expo-constants";

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

  const { t, isRTL } = React.useContext(LocalizationContext);
  const { state } = React.useContext(AuthContext);

  // const msgInpuRef = React.useRef();

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
              style={getStyle().textInput}
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
          <Text style={getStyle().error}>
            {t("Errors.This field is required")}
          </Text>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[getStyle().textInput, { marginTop: 10 }]}
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
          <Text style={getStyle().error}>
            {t("Errors.This field is required")}
          </Text>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              multiline
              style={[getStyle().textInput, styles.textarea]}
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
              // ref={msgInpuRef}
            />
          )}
          // onFocus={() => msgInpuRef.current.focus()}
          name="message"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.message && (
          <Text style={getStyle().error}>
            {t("Errors.This field is required")}
          </Text>
        )}
        <TouchableOpacity
          disabled={isLoading}
          onPress={handleSubmit(handleSend)}
          style={getStyle().buttonPrimary}
        >
          <Text style={{ textAlign: "center", color: Colors.white }}>
            {t("SEND")}
          </Text>
        </TouchableOpacity>
        {error ? <Text style={getStyle().error}>{error.message}</Text> : null}
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    // paddingTop: Constants.statusBarHeight,
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
    // backgroundColor: '#fbfbfb',
    paddingVertical: 30,
  },
  textarea: {
    height: 80,
    textAlign: "center",
    textAlignVertical: "top", // hack android
    fontSize: 16,
  },
  textareaContainer: {
    marginVertical: 10,
  },
});
