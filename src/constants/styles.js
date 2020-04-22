import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Constants from 'expo-constants';

import Colors from './Colors';
import I18n from '../i18n/i18n';
import { LocalizationContext } from '../context/cartContext/provider';

const { width } = Dimensions.get('window');

const inputTextHeight = 38;
export const globalStyles = StyleSheet.create({
  logoImage: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginVertical: 20,
    borderRadius: 3,
  },
  //white btn on non-white background
  mainButton: {
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: Colors.WHITE,
    borderColor: Colors.WHITE,
    marginVertical: 5,
    width: '80%',
    alignSelf: 'center',
  },
  mainButtonLabel: {
    textAlign: 'center',
    margin: 3,
    padding: 2,
    color: Colors.PRIMARYCOLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //transarent btn on non-white background
  secondButton: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: Colors.WHITE,
    marginVertical: 5,
    width: '80%',
    alignSelf: 'center',
  },
  secondButtonLabel: {
    textAlign: 'center',
    margin: 3,
    padding: 2,
    color: Colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //red btn on white background
  primaryButton: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: Colors.PRIMARYCOLOR,
    backgroundColor: Colors.PRIMARYCOLOR,
    marginVertical: 5,
    width: '80%',
    alignSelf: 'center',
  },
  primaryButtonLabel: {
    textAlign: 'center',
    margin: 3,
    padding: 2,
    color: Colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    margin: 5,
    fontSize: 13,
    color: Colors.errorColor,
    lineHeight: 24,
  },
});

const getStyle = () => {
  const {
    // isRTL,

    locale,
  } = React.useContext(LocalizationContext);

  const isRTL = locale === 'ar';
  return {
    container: {
      flex: 1,
    },

    box: {
      backgroundColor: '#f8f8f8',
      borderRadius: 5,
      width: width - 20,
      marginVertical: 5,
      alignSelf: 'center',
    },
    shadow: {
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      elevation: 3,
    },

    row: {
      flexDirection: isRTL ? 'row-reverse' : 'row',
    },
    flexDir: { alignItems: isRTL ? 'flex-end' : 'flex-start' },
    transform: [{ scaleX: isRTL ? -1 : 1 }],
    text: {
      textAlign: isRTL ? 'right' : 'left',
      // fontFamily: isRTL ? 'DroidKufi' : 'DroidKufi',
      fontSize: 14,
    },
    textHeader: {
      textAlign: isRTL ? 'right' : 'left',
      fontSize: 20,
    },
    boldText: {
      // fontFamily: isRTL ? 'DroidKufi-Bold' : 'DroidKufi-Bold', //'space-mono-Bold'
    },
    screenTitle: {
      textAlign: 'center',
      fontSize: 22,
      color: '#fff',
      padding: 20,
    },

    error: {
      textAlign: isRTL ? 'right' : 'left',
      fontSize: isRTL ? 18 : 16,
      color: 'red',
      paddingHorizontal: 5,
    },
    statusBar: {
      backgroundColor: Colors.primary,
      height: Constants.statusBarHeight,
    },
    angleIcon: isRTL ? 'angle-left' : 'angle-right',

    textinputIcon: {
      marginHorizontal: 15,
      alignSelf: 'center',
      position: 'absolute',
      right: isRTL ? 0 : null,
      left: !isRTL ? 0 : null,
      zIndex: 10,
    },
    //Forms
    textInput: {
      fontFamily: isRTL ? 'DroidKufi' : 'DroidKufi',
      height: inputTextHeight,
      borderColor: Colors.primaryLight,
      borderWidth: 1,
      textAlign: 'center',
      borderRadius: inputTextHeight / 2,
      marginVertical: 5,
      paddingVertical: 10,
      paddingHorizontal: 15,
      color: Colors.darkGray,
      backgroundColor: '#fff',
      fontSize: 16,
    },
    buttonPrimary: {
      height: inputTextHeight,

      backgroundColor: Colors.primary,

      textAlign: 'center',
      borderRadius: inputTextHeight / 2,
      marginVertical: 5,
      justifyContent: 'center',
    },
    buttonOutline: {
      height: inputTextHeight,
      backgroundColor: Colors.white,
      borderColor: Colors.primaryLight,
      borderWidth: 1,
      textAlign: 'center',
      borderRadius: inputTextHeight / 2,
      marginVertical: 5,
      justifyContent: 'center',
    },
    link: {
      borderBottomColor: Colors.primary,
      borderBottomWidth: 1,
    },
  };
};

export default getStyle;
