import * as React from 'react';
import {
  Text,
  View,
  ScrollView,
  // Image,
  StyleSheet,
  Dimensions,
  Button,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'react-native-expo-image-cache';

import Colors from '../constants/Colors';
import productHooks from '../hooks/useGetDataByCollection';
import getStyle from '../constants/styles';
import Layout from '../constants/Layout';

const { width } = Dimensions.get('window');

const StoreScrollView = ({ navigation }) => {
  const { row, flexDir, text } = getStyle();
  const shopSubTitle = [text, styles.shopTitle];
  const [data, isLoading] = productHooks.useGetDataByCollection('stores');

  return (
    <ScrollView
      contentContainerStyle={[
        styles.scrollViewContentContainer,
        row,
        flexDir,
        text,
      ]}
      style={[styles.scrollViews]}
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled
    >
      {isLoading ? (
        <ActivityIndicator
          style={{
            alignSelf: 'center',
            width: Layout.window.width,
          }}
          size={'large'}
          color={Colors.primary}
        />
      ) : (
        data.map((item) => {
          const { id, name, image, description } = item;

          return (
            <TouchableOpacity
              key={id}
              onPress={() =>
                navigation.navigate('Store', {
                  item,
                })
              }
            >
              <View style={styles.imageContiner}>
                <Image
                  style={styles.image}
                  resizeMode='cover'
                  // eslint-disable-next-line global-require
                  // source={{ uri: image }}
                  {...{ uri: image }}
                />
              </View>
              <Text style={[text, styles.shopTitle]}>{name}</Text>
              <Text style={shopSubTitle}>{description}</Text>
            </TouchableOpacity>
          );
        })
      )}
    </ScrollView>
  );
};

export default StoreScrollView;
const styles = StyleSheet.create({
  scrollView: {
    marginRight: 10,
    // backgroundColor: 'red',

    // transform: [{ scaleX: -1 }],
  },
  scrollViewContentContainer: {},

  imageContiner: {
    flex: 1,
    height: 150,
    width: width / 2 - 50,
    overflow: 'hidden',
    alignItems: 'stretch',
    margin: 3,
    // backgroundColor: 'red'
  },
  image: {
    height: '100%',
    width: '100%',
    backgroundColor: Colors.primaryLight,
  },
  shopTitle: {
    fontSize: 14,
    marginHorizontal: 5,
    width: width / 2 - 50,
  },
  shopSubTitle: {
    fontSize: 12,
    color: Colors.gray,
    marginHorizontal: 5,
    width: width / 2 - 50,
  },
});
