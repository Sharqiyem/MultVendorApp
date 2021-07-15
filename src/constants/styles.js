import * as React from "react";
import { StyleSheet, Dimensions } from "react-native";
import Constants from "expo-constants";

import Colors from "./Colors";
import I18n from "../i18n/i18n";
import { LocalizationContext } from "../context/cartContext/provider";
import Fonts from "./Fonts";

const { width } = Dimensions.get("window");

const inputTextHeight = 40;

const getStyle = (isRTL = true) => {
  // const { locale } = React.useContext(LocalizationContext);

  // const isRTL = locale === "ar";
  return {
    container: {
      flex: 1,
    },

    box: {
      backgroundColor: "#f8f8f8",
      borderRadius: 5,
      width: width - 20,
      marginVertical: 5,
      alignSelf: "center",
    },
    shadow: {
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 5,
    },

    row: {
      flexDirection: isRTL ? "row-reverse" : "row",
    },
    flexDir: { alignItems: isRTL ? "flex-end" : "flex-start" },
    transform: [{ scaleX: isRTL ? -1 : 1 }],
    text: {
      textAlign: isRTL ? "right" : "left",
      fontFamily: isRTL ? "DroidKufi" : "DroidKufi",
      fontSize: 14,
      // backgroundColor:'red'
    },
    primaryText: {
      textAlign: isRTL ? "right" : "left",
      fontFamily: isRTL ? "DroidKufi" : "DroidKufi",
      fontSize: 14,
      color: Colors.primary,
    },
    textHeader: {
      textAlign: isRTL ? "right" : "left",
      fontFamily: isRTL ? "DroidKufi" : "DroidKufi",
      fontSize: 16,
    },
    boldText: {
      textAlign: isRTL ? "right" : "left",
      fontFamily: Fonts.primaryBold,
    },
    screenTitle: {
      textAlign: "center",
      fontSize: 14,
      color: "#fff",
      padding: 20,
    },

    error: {
      textAlign: isRTL ? "right" : "left",
      // fontSize: isRTL ? 18 : 16,
      color: "red",
      paddingHorizontal: 5,
    },
    statusBar: {
      backgroundColor: Colors.primary,
      height: Constants.statusBarHeight,
    },
    angleIcon: isRTL ? "angle-left" : "angle-right",

    textinputIcon: {
      marginHorizontal: 15,
      alignSelf: "center",
      position: "absolute",
      right: isRTL ? 0 : null,
      left: !isRTL ? 0 : null,
      zIndex: 10,
    },
    //Forms
    textInput: {
      fontFamily: isRTL ? "DroidKufi" : "DroidKufi",
      height: inputTextHeight,
      borderColor: Colors.primaryLight,
      borderWidth: 1,
      textAlign: "center",
      borderRadius: inputTextHeight / 2,
      marginVertical: 5,
      paddingVertical: 5,
      paddingHorizontal: 15,
      color: Colors.darkGray,
      backgroundColor: "#fff",
      fontSize: 16,
    },
    textInputLight: {
      width: "90%",
      fontFamily: isRTL ? "DroidKufi" : "DroidKufi",
      height: inputTextHeight - 5,
      textAlign: "center",
      // borderColor: Colors.primaryLight,
      // borderWidth: 1,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: (inputTextHeight - 5) / 2,
      marginVertical: 5,
      paddingVertical: 5,
      paddingHorizontal: 15,
      color: Colors.darkGray,
      backgroundColor: Colors.primaryLight,
      fontSize: 14,
    },
    buttonPrimary: {
      height: inputTextHeight,

      backgroundColor: Colors.primary,

      textAlign: "center",
      borderRadius: inputTextHeight / 2,
      marginVertical: 5,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonOutline: {
      height: inputTextHeight,
      // backgroundColor: Colors.white,
      borderColor: Colors.primaryLight,
      borderWidth: 1,
      textAlign: "center",
      borderRadius: inputTextHeight / 2,
      marginVertical: 5,
      justifyContent: "center",
    },
    link: {
      borderBottomColor: Colors.primary,
      borderBottomWidth: 1,
    },

    bottomContainer: {
      backgroundColor: "#fff",
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      paddingHorizontal: 15,
      paddingVertical: 5,
    },
    fieldContainer: {
      backgroundColor: "rgba(0,0,0,0.03)",
      marginVertical: 0,
      paddingVertical: 10,
      marginVertical: 5,
      paddingHorizontal: 10,
      borderRadius: 10,
    },

    categoryContainer: {
      backgroundColor: "rgba(0,0,0,0.03)",
      paddingVertical: 15,
      paddingHorizontal: 10,
      borderRadius: 10,
      // backgroundColor:'red',
      // marginVertical: 0,
      // marginVertical: 5,
    },
    centerContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  };
};

export default getStyle;
