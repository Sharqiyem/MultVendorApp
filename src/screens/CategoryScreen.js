import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { ExStoreDetailHeader, ExProductCycleItem } from '../components';
import Colors from '../constants/Colors';

export default function CategoryScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{ margin: 5, marginVertical: 15 }}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <ExProductCycleItem />
          <ExProductCycleItem />
          <ExProductCycleItem />
          <ExProductCycleItem />
          <ExProductCycleItem />
        </View>
      </View>
    </ScrollView>
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
