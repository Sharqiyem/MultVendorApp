import * as React from "react";
import { StyleSheet, View, Share, Linking, Text } from "react-native";

import Colors from "../constants/Colors";

import firebase from "../config/firebase.config";
import { AuthContext } from "../context/authContext/provider";
import { LocalizationContext } from "../context/cartContext/provider";
import SettingsNavigateRow from "../components/SettingsNavigateRow";
import SectionRow from "../components/SettingsSectionRow";
import SettingsPage from "../components/SettingsPage";
import getStyle from "../constants/styles";

export default function ProfileScreen({ navigation }) {
  const { state, signOut } = React.useContext(AuthContext);
  const { t, changeLang, locale } = React.useContext(LocalizationContext);

  const { text } = getStyle(locale === "ar");

  // console.log("AuthContext state", state);
  const [] = React.useState(false);
  const [] = React.useState(40);
  const [] = React.useState(false);

  const handleSignOut = async () => {
    firebase.auth().signOut();
    signOut();
  };

  const onShareApp = async () => {
    try {
      const result = await Share.share({
        title: "Share App",
        url: "www.youtube.com",
        message: "A Store | A Mobile app for online multi vender shopping",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const onRateApp = () => {
    //TODO: rewrite links and content
    const APP_STORE_LINK_ID = "id375380948";
    const link = `itms-apps://itunes.apple.com/us/app/id${APP_STORE_LINK_ID}?mt=8`;

    Linking.canOpenURL(link)
      .then(
        (supported) => {
          supported && Linking.openURL(link);
        },
        (err) => console.log(err)
      )
      .catch((err) => console.log(err));

    //Translate conetnt
    // const options = {
    //   AppleAppID: '2193813192',
    //   GooglePackageName: 'com.mazin.napatapay',
    //   AmazonPackageName: 'com.mazin.napatapay',
    //   OtherAndroidURL: 'http://www.randomappstore.com/app/47172391',
    //   preferredAndroidMarket: AndroidMarket.Google,
    //   preferInApp: false,
    //   openAppStoreIfInAppFails: true,
    //   fallbackPlatformURL: 'https://www.napatapay.com',
    // };
    // Rate.rate(options, (success) => {
    //   if (success) {
    //     // this technically only tells us if the user successfully
    //     //went to the Review Page. Whether they actually did anything,
    //     // we do not know.
    //     this.setState({ rated: true });
    //     console.log(this.state.rated);
    //   }
    // });
  };

  const navigateToScreen = (screen, params = {}) => {
    navigation.navigate(screen, params);
  };

  const renderSections = () => {
    return (
      <SettingsPage key={locale}>
        <SectionRow label={t("Account")}>
          <SettingsNavigateRow
            label={t("Edit profile")}
            iconName="user"
            onPressCallback={() => {
              navigateToScreen("EditProfile");
            }}
          />

          <SettingsNavigateRow
            label={t("Change password")}
            iconName="lock"
            onPressCallback={() => {
              navigateToScreen("ChangePassword");
            }}
          />

          <SettingsNavigateRow
            onPressCallback={handleSignOut}
            iconName="log-out"
            label={t("Sign out")}
          />
        </SectionRow>

        {state.isVendor && (
          <SectionRow label={t("My store")}>
            <SettingsNavigateRow
              label={t("Change store")}
              iconName="shopping-bag"
              onPressCallback={() => {}}
            />
            <SettingsNavigateRow
              label={t("Disable store")}
              iconName="edit"
              onPressCallback={() => {}}
            />
          </SectionRow>
        )}

        {!state.isDelivery && !state.isVendor && (
          <SectionRow label={t("Usage")}>
            <SettingsNavigateRow
              label={t("Orders")}
              iconName="edit"
              onPressCallback={() => {
                navigateToScreen("Orders");
              }}
            />
            <SettingsNavigateRow
              label={t("Addresses")}
              iconName="edit"
              onPressCallback={() => {
                navigateToScreen("Address", { fromProfile: true });
              }}
            />
          </SectionRow>
        )}
        <SectionRow label={t("App")}>
          <SettingsNavigateRow
            label={t("Change language")}
            iconName="globe"
            onPressCallback={() => {
              changeLang();
            }}
          />
          <SettingsNavigateRow
            label={t("Rate App")}
            iconName="star"
            onPressCallback={() => {
              onRateApp();
            }}
          />
          <SettingsNavigateRow
            label={t("Share App")}
            iconName="share"
            onPressCallback={() => {
              onShareApp();
            }}
          />
          <SettingsNavigateRow
            label={t("Contact Us")}
            iconName="mail"
            onPressCallback={() => {
              navigateToScreen("ContactUs");
            }}
          />

          <SettingsNavigateRow
            label={t("About Us")}
            iconName="info"
            onPressCallback={() => {
              navigateToScreen("AboutUs");
            }}
          />
        </SectionRow>
      </SettingsPage>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[text, { paddingHorizontal: 15, }]}>
        {t("Hello")} {state?.userData?.name}
      </Text>
      {renderSections()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 5,
    backgroundColor: Colors.white,
  },
});
