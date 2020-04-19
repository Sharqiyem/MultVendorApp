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
import { LocalizationContext } from '../context/cartContext/provider';

const image1 = require('../../assets/images/Stores/1.jpeg');
const image2 = require('../../assets/images/Stores/2.jpg');
const image3 = require('../../assets/images/Stores/3.jpeg');

const { width } = Dimensions.get('window');

export const BannerScrollView = () => {
  const { isRTL } = React.useContext(LocalizationContext);
  const initImagesState = [image1, image2, image3];
  const [images, setImages] = React.useState([]);

  React.useEffect(() => {
    if (!isRTL) {
      let cloneImages = [...initImagesState];
      cloneImages.reverse();
      setImages(cloneImages);
    } else {
      setImages(initImagesState);
    }
  }, [isRTL]);

  const carousel = React.useRef(null);
  const scrollToEnd = () => {
    if (!isRTL) {
      // console.log('scrollToEnd');
      carousel.current.scrollToEnd({ animated: false });
    }
  };

  return (
    <ScrollView
      key={isRTL}
      ref={carousel}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        // backgroundColor: 'red',
        flexWrap: 'wrap',
        height: 200,
      }}
      onContentSizeChange={scrollToEnd}
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
      {images.map((image, index) => {
        return (
          <View style={styles.imageContiner} key={`img-${index}`}>
            <Image style={styles.image} resizeMode='cover' source={image} />
            <View style={styles.itemTwoOverlay} />
          </View>
        );
      })}
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
