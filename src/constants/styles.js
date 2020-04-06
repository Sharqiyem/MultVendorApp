import * as React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Colors from './Colors';
import I18n from '../i18n/i18n';
import { LocalizationContext } from '../context/provider';

const { width } = Dimensions.get('window');

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
  const { t, locale, setLocale } = React.useContext(LocalizationContext);

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

    text: {
      textAlign: isRTL ? 'right' : 'left',
      fontFamily: isRTL ? 'DroidKufi' : 'DroidKufi',
      fontSize: 14,
    },
    boldText: {
      fontFamily: isRTL ? 'DroidKufi-Bold' : 'DroidKufi-Bold', //'space-mono-Bold'
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
  };
};

export default getStyle;
