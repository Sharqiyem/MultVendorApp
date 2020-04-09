import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { ExStoreDetailHeader, ExProductCycleList } from '../components';
import Colors from '../constants/Colors';
import { centerHeaderTitleAndroid } from '../core/functions';

export default function CategoryScreen({ navigation }) {
  centerHeaderTitleAndroid(navigation);

  return (
    <View style={styles.container}>
      <ExProductCycleList />
    </View>
  );
}

CategoryScreen.navigationOptions = {
  // header: null,
  title: 's',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
  },

  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },

  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  btnText: {
    fontSize: 17,
    color: '#fff',
    textAlign: 'center',
  },
});
