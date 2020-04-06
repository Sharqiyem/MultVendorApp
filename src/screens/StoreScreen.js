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

export default function StoreScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ExStoreDetailHeader />

      <View
        style={{
          marginTop: -15,
          flexDirection: 'row',
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: Colors.primary,
            height: 50,
            // width: '100%',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderBottomColor: '#fff',
            borderBottomWidth: 1,
          }}
          onPress={() => {}}
        >
          <Text style={styles.btnText}>Products</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.primary,
            height: 50,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',

            // width: '100%',
          }}
          onPress={() => {}}
        >
          <Text style={styles.btnText}>Reviews</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.primary,
            height: 50,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',

            // width: '100%',
          }}
          onPress={() => {}}
        >
          <Text style={styles.btnText}>About</Text>
        </TouchableOpacity>
      </View>

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

StoreScreen.navigationOptions = {
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
