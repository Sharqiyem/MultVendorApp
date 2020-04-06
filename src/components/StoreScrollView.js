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

const { width } = Dimensions.get('window');

export const StoreScrollView = ({ navigation }) => {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        // backgroundColor: 'red',
        flexWrap: 'wrap',
        height: 200,
      }}
      pagingEnabled
      // ref={this.myRef}
      // ref={scrollView => {
      //   this._scrollView = scrollView;
      // }}
      onMomentumScrollEnd={(e) => {
        // scroll animation ended
        // console.log(e.nativeEvent.contentOffset.x);
        // console.log(e.nativeEvent.contentOffset.y);
        // this.setState({ scrollX: e.nativeEvent.contentOffset.x / 414 });
      }}
    >
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Store', {
            name: 'Shop 1',
          })
        }
      >
        <View style={styles.imageContiner}>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={require('../../assets/images/Stores/1.jpeg')}
          />
        </View>
        <Text style={styles.shopTitle}>Shop 1</Text>
        <Text style={styles.shopSubTitle}>Vegitables and fruits</Text>
      </TouchableOpacity>

      <View>
        <View style={styles.imageContiner}>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={require('../../assets/images/Stores/2.jpg')}
          />
        </View>
        <Text style={styles.shopTitle}>Shop 2</Text>
        <Text style={styles.shopSubTitle}>Sweets</Text>
      </View>

      <View>
        <View style={styles.imageContiner}>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={require('../../assets/images/Stores/3.jpeg')}
          />
        </View>
        <Text style={styles.shopTitle}>Shop 3</Text>
        <Text style={styles.shopSubTitle}>Sweets</Text>
      </View>
      <View>
        <View style={styles.imageContiner}>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={require('../../assets/images/Stores/4.jpg')}
          />
        </View>
        <Text style={styles.shopTitle}>Shop 4</Text>
        <Text style={styles.shopSubTitle}>Vegitables and fruits</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageContiner: {
    flex: 1,
    height: 180,
    width: width / 2 - 50,
    overflow: 'hidden',
    alignItems: 'stretch',
    margin: 3,
    // backgroundColor: 'red'
  },
  image: {
    height: '100%',
    width: '100%',
    // backgroundColor: 'red',

    // width: null,
    // height: null,
  },
  shopTitle: {
    fontSize: 20,
    marginHorizontal: 5,
    width: width / 2 - 50,
  },
  shopSubTitle: {
    fontSize: 15,
    marginHorizontal: 5,
    width: width / 2 - 50,
  },
});
