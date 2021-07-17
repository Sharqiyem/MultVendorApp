import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useForm, Controller, useController } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-root-toast";

import getStyle from "../../constants/styles";
import { AuthContext } from "../../context/authContext/provider";
import { LocalizationContext } from "../../context/cartContext/provider";

import Colors from "../../constants/Colors";

import * as Icon from "@expo/vector-icons";

import firebase from "../../config/firebase.config";
import { uploadImageAsync } from "../../core/imageHelper";
import { useGetStoreByStoreId } from "../../hooks";

const EditStoreScreen = () => {
  const { state } = React.useContext(AuthContext);
  const [store, isLoadingStore] = useGetStoreByStoreId(
    state?.userData?.storeId
  );

  const { t, isRTL, locale } = React.useContext(LocalizationContext);
  const {
    buttonPrimary,
    text,
    fieldContainer,
    row,
    error: errorStyle,
    textInput,
    textArea,
    shadow,
    boldText,
  } = getStyle(locale === "ar");

  //useForm
  const {
    control,
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [imageurl, setImageurl] = useState(store?.image || null);

  useEffect(() => {
    if (store) {
      setImageurl(store.image);
    }
  }, [store]);

  const handleSend = async (data) => {
    const userId = firebase.auth().currentUser.uid;
    const storeObject = {
      name: data.nameAr,
      names: {
        ar: data.nameAr,
        en: data.nameEn,
      },
      description: data.descriptionAr,
      descriptions: {
        ar: data.descriptionAr,
        en: data.descriptionEn,
      },

      userId,

      image: imageurl,
    };
    console.log("Store ", storeObject);
  };

  const pickImage = async () => {
    console.log("pickImage");
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setIsLoading(true);
      const uploadUrl = await uploadImageAsync(result.uri, "avatars");
      setImageurl(uploadUrl);
      setIsLoading(false);
    }
  };

  const renderStoreImage = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          pickImage();
        }}
      >
        <ImageBackground
          style={{
            height: 150,
            width: "100%",
            //   backgroundColor: "red",
            justifyContent: "center",
            alignItems: "center",
          }}
          source={{ uri: isLoading ? null : imageurl }}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={Colors.primary} />
          ) : (
            <View
              style={{
                backgroundColor: "rgba(0,0,0,0.5)",
                justifyContent: "center",
                alignItems: "center",
                padding: 5,
                borderRadius: 5,
              }}
            >
              <Icon.Feather
                name={imageurl ? "edit" : "image"}
                size={20}
                color={Colors.white}
                style={{ margin: 3 }}
              />
              <Text style={{ ...boldText, fontSize: 12, color: Colors.white }}>
                {imageurl ? t("Change image") : t("Select image")}
              </Text>
            </View>
          )}
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const renderInputName = () => {
    return (
      <View style={{ ...fieldContainer, paddingVertical: 5 }}>
        <Text style={text}>{t("Store name")}</Text>

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[textInput, { marginHorizontal: 0 }]}
              placeholder={t("Input store name in Arabic")}
              placeholderStyle={{ textAlign: "center" }}
              autoCorrect={false}
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="nameAr"
          rules={{ required: true }}
          defaultValue={store?.names?.ar || ""}
        />
        {errors.nameAr && (
          <Text style={errorStyle}>{t("Errors.This field is required")}</Text>
        )}

        <Controller
          control={control}
          rules={
            {
              // required: true,
            }
          }
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[textInput, { marginHorizontal: 0 }]}
              placeholder={t("Input store name in English")}
              placeholderStyle={{ textAlign: "center" }}
              autoCorrect={false}
              autoCapitalize="none"
              onBlur={onBlur}
              underlineColorAndroid={"transparent"}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="nameEn"
          // rules={{ required: true }}
          defaultValue={store?.names?.en || ""}
        />
        {errors.nameEn && (
          <Text style={errorStyle}>{t("Errors.This field is required")}</Text>
        )}
      </View>
    );
  };

  const renderInputDescription = () => {
    return (
      <View style={{ ...fieldContainer, paddingVertical: 5 }}>
        <Text style={text}>{t("Store description")}</Text>

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              multiline
              style={[textInput, textarea]}
              isRTL={isRTL}
              maxLength={100}
              placeholder={t("Input store description in Arabic")}
              placeholderTextColor={"#c7c7c7"}
              containerStyle={styles.textareaContainer}
              underlineColorAndroid={"transparent"}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              defaultValue=""
            />
          )}
          name="descriptionAr"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.descriptionAr && (
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
              placeholder={t("Input store description in English")}
              placeholderTextColor={"#c7c7c7"}
              containerStyle={styles.textareaContainer}
              underlineColorAndroid={"transparent"}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              defaultValue=""
            />
          )}
          name="descriptionEn"
          rules={{ required: true }}
          defaultValue=""
        />
        {errors.descriptionEn && (
          <Text style={errorStyle}>{t("Errors.This field is required")}</Text>
        )}
      </View>
    );
  };

  const renderSaveButton = () => {
    return (
      <View style={[styles.newProductContainer]}>
        <TouchableOpacity
          onPress={handleSubmit(handleSend)}
          style={[buttonPrimary, row, { width: "100%" }]}
        >
          {/* <Icon.Feather
            name="save"
            size={20}
            color={Colors.white}
            style={{ marginHorizontal: 5 }}
          /> */}
          <Text style={{ ...text, color: Colors.white }}>{t("SAVE")}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        extraHeight={20}
        extraScrollHeight={130}
        contentContainerStyle={{ backgroundColor: "#fff" }}
        style={{ backgroundColor: "#fff" }}
        contentContainerStyle={{
          paddingBottom: 60,
        }}
        // contentContainerStyle={{ flexGrow: 1 }}
        scrollEnabled
      >
        {renderStoreImage()}
        <View style={styles.formContainer}>
          {renderInputName()}
          {renderInputDescription()}
        </View>
      </KeyboardAwareScrollView>
      {renderSaveButton()}
    </View>
  );
};

export default EditStoreScreen;

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
  newProductContainer: {
    backgroundColor: "#f0f0f0",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },

  textareaContainer: {
    marginVertical: 10,
  },
});
