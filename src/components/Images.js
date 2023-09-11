import React, { useState, useEffect } from "react";
import {
  Platform,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import InvertibleScrollView from "react-native-invertible-scroll-view";
import getStyle from "../constants/styles";
import * as Icon from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { LocalizationContext } from "../context/cartContext/provider";
import firebase from "../config/firebase.config";
import { uuidv4 } from "../core/stringHelper";

const Images = ({ items, onChange }) => {
  const { t, isRTL, locale } = React.useContext(LocalizationContext);

  const [images, setImages] = useState(items);
  const [isLoading, setIsLoading] = useState(false);

  const getStyles = getStyle(locale === "ar");

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  async function uploadImageAsync(uri) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const childId = uuidv4();
    const userId = firebase.auth().currentUser.uid;

    const ref = firebase.storage().ref(`products/${userId}`).child(childId);
    const snapshot = await ref.put(blob);

    // We're done with the blob, close and release it
    blob.close();

    return await snapshot.ref.getDownloadURL();
  }

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
      const uploadUrl = await uploadImageAsync(result.uri);
      const imagesTemp = [uploadUrl, ...images];
      setImages(imagesTemp);
      onChange(imagesTemp);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  const addFromCameraRoll = () => {
    console.log("addFromCameraRoll");
    let timeout = Platform.OS == "ios" ? 1000 : 10;

    setTimeout(() => {
      pickImage();
    }, timeout);
  };

  const removeImage = (index) => {
    let imagesTemp = [...images];
    imagesTemp.splice(index, 1);

    setImages([...imagesTemp]);
    onChange([...imagesTemp]);
  };
  return (
    <>
      <Text style={getStyles.text}>{t("Product images")}</Text>
      <View style={getStyles.row}>
        <TouchableOpacity
          style={styles.attachContainer}
          onPress={addFromCameraRoll}
        >
          <Icon.Ionicons name="add" size={40} color={Colors.white} />
        </TouchableOpacity>
        <InvertibleScrollView
          inverted={!isRTL}
          showsHorizontalScrollIndicator={false}
          horizontal
        >
          {isLoading ? (
            <View
              style={{
                ...styles.image,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator size="small" color={Colors.primary} />
            </View>
          ) : null}
          {images.map((item, index) => {
            return (
              <View key={index}>
                <Image
                  resizeMode="cover"
                  style={styles.image}
                  source={{ uri: item }}
                />
                <View style={styles.removeIcon}>
                  <TouchableOpacity onPress={() => removeImage(index)}>
                    <Icon.Ionicons
                      name="close"
                      size={26}
                      color={Colors.white}
                      // style={styles.removeIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </InvertibleScrollView>
      </View>
    </>
  );
};

export default Images;

const styles = StyleSheet.create({
  attachContainer: {
    width: 100,
    height: 100,
    backgroundColor: Colors.primaryLight,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    marginHorizontal: 5,
    borderRadius: 10,
  },
  removeIcon: {
    position: "absolute",
    right: 5,
    top: 0,
    backgroundColor: Colors.primary,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
});
