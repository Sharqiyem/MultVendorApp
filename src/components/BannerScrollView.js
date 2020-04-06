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

export const BannerScrollView = (props) => {
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
      <View style={styles.imageContiner}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={require('../../assets/images/Stores/1.jpeg')}
        />
        <View style={styles.itemTwoOverlay} />
      </View>
      <View style={styles.imageContiner}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={require('../../assets/images/Stores/2.jpg')}
        />
        <View style={styles.itemTwoOverlay} />
      </View>
      <View style={styles.imageContiner}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={require('../../assets/images/Stores/3.jpeg')}
        />
        <View style={styles.itemTwoOverlay} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageContiner: {
    flex: 1,
    height: 180,
    width: width - 50,
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
  itemTwoOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: Colors.primary,
    opacity: 0.2,
  },
});
