import * as React from 'react';
import { StyleSheet, View, Share, Linking } from 'react-native';

import Colors from '../constants/Colors';

import firebase from '../config/firebase.config';
import { AuthContext } from '../context/authContext/provider';
import { LocalizationContext } from '../context/cartContext/provider';
import SettingsNavigateRow from '../components/SettingsNavigateRow';
import SectionRow from '../components/SettingsSectionRow';
import SettingsPage from '../components/SettingsPage';

export default function ProfileScreen({ navigation }) {
  const { signOut } = React.useContext(AuthContext);
  const { t, changeLang } = React.useContext(LocalizationContext);

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
        title: 'Share App',
        url: 'www.youtube.com',
        message: 'A Store | A Mobile app for online multi vender shopping',
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
    const APP_STORE_LINK_ID = 'id375380948';
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

  const navigateToScreen = (screen) => {
    navigation.navigate(screen);
  };

  const settings = () => {
    return (
      <SettingsPage>
        <SectionRow text='Account'>
          <SettingsNavigateRow
            text='Edit profile'
            iconName='user'
            onPressCallback={() => {
              navigateToScreen('EditProfile');
            }}
          />

          <SettingsNavigateRow
            text='Change password'
            iconName='edit'
            onPressCallback={() => {
              navigateToScreen('ChangePassword');
            }}
          />

          <SettingsNavigateRow
            onPressCallback={handleSignOut}
            iconName='sign-out'
            text={t('Sign out')}
          />
        </SectionRow>

        <SectionRow text='Usage'>
          <SettingsNavigateRow
            text='Orders'
            iconName='edit'
            onPressCallback={() => {
              navigateToScreen('Orders');
            }}
          />
          <SettingsNavigateRow
            text='Addresses'
            iconName='edit'
            onPressCallback={() => {
              navigateToScreen('Address');
            }}
          />
        </SectionRow>

        <SectionRow text='App'>
          <SettingsNavigateRow
            text='Change language'
            iconName='edit'
            onPressCallback={() => {
              changeLang();
            }}
          />
          <SettingsNavigateRow
            text='Rate App'
            iconName='edit'
            onPressCallback={() => {
              onRateApp();
            }}
          />
          <SettingsNavigateRow
            text='Share App'
            iconName='edit'
            onPressCallback={() => {
              onShareApp();
            }}
          />
          <SettingsNavigateRow
            text='Contact Us'
            iconName='edit'
            onPressCallback={() => {
              navigateToScreen('ContactUs');
            }}
          />

          <SettingsNavigateRow
            text='About US'
            iconName='edit'
            onPressCallback={() => {
              navigateToScreen('AboutUs');
            }}
          />
        </SectionRow>
      </SettingsPage>
    );
  };

  return (
    <View style={styles.container}>
      {/* <Text>Hello {email}</Text>
      <Button title={t('Sign out')} onPress={handleSignOut} />
      {renderBTNs()} */}
      {settings()}
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
