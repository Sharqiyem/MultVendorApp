import * as React from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  Button,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

const widowWidth = Dimensions.get('window').width;

export const StoreListItem = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate('Store', { name: 'Store 2' });
      }}
    >
      <View style={styles.imageContiner}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={require('../../assets/images/Stores/1.jpeg')}
        />
      </View>
      <View style={styles.textContiner}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <View styles={{}}>
            <Text style={{ fontSize: 20 }}>Shop 1</Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              flexDirection: 'row',
            }}
          >
            <Ionicons
              name="ios-star"
              size={20}
              style={{}}
              color={Colors.primaryLight}
            />
            <Ionicons
              name="ios-star"
              size={20}
              style={{}}
              color={Colors.primaryLight}
            />
            <Ionicons
              name="ios-star"
              size={20}
              style={{}}
              color={Colors.primaryLight}
            />
            <Ionicons
              name="ios-star-half"
              size={20}
              style={{}}
              color={Colors.primaryLight}
            />
          </View>
        </View>
        <Text style={styles.shopSubTitle}>Vegitables and fruits</Text>
        <Text style={styles.timeText}>07:00AM:08PM</Text>
      </View>
    </TouchableOpacity>
  );
};

const width = widowWidth / 3 - 50;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
  },
  imageContiner: {
    // flex: 1,
    height: width,
    width: width,
    overflow: 'hidden',
    alignItems: 'stretch',

    // backgroundColor: 'red'
  },
  textContiner: {
    flex: 1,
    marginHorizontal: 10,
  },
  image: {
    height: '100%',
    width: '100%',

    borderRadius: width / 2,
  },
  shopTitle: {
    fontSize: 20,
    marginHorizontal: 5,
  },
  shopSubTitle: {
    fontSize: 15,
    margin: 5,
  },
  timeText: {
    padding: 6,
  },
});
