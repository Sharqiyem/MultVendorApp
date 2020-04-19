import * as React from 'react';
import {
  Text,
  StyleSheet,
  View,
  // Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { LocalizationContext } from '../context/cartContext/provider';

import { Image } from 'react-native-expo-image-cache';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import productHooks from '../hooks/useGetDataByCollection';

export const ExCategoryCycleItem = ({ navigation }) => {
  const [data, isLoading] = productHooks.useGetDataByCollection('categories');

  if (isLoading)
    return (
      <ActivityIndicator
        style={{
          alignSelf: 'center',
          width: Layout.window.width,
        }}
        size={'large'}
        color={Colors.primary}
      />
    );

  return (
    <FlatList
      numColumns={3}
      data={data}
      renderItem={({ item }) => (
        <CategoryCycleItem item={item} navigation={navigation} />
      )}
      keyExtractor={(item) => item.id}
    />
  );

  // return <CategoryCycleItem item={item} />;
};
export const CategoryCycleItem = ({ item, navigation }) => {
  const { locale } = React.useContext(LocalizationContext);
  return (
    <TouchableOpacity
      style={styles.container}
      key={item.id}
      onPress={() => {
        navigation.navigate('Category', { item });
      }}
    >
      <View style={styles.itemTwoContainer}>
        <Image
          style={styles.itemTwoImage}
          // source={{ uri: item.image }}
          {...{ uri: item.image }}
        />
      </View>
      <Text style={styles.itemTwoTitle}>{item.names[locale]}</Text>
    </TouchableOpacity>
  );
};

const itemsPerRow = 3;
const margenHorizontal = 15;
const width =
  Layout.window.width / itemsPerRow - itemsPerRow * margenHorizontal;
const raduisWidth = width / 2;
const styles = StyleSheet.create({
  container: {
    // backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: margenHorizontal,
    marginVertical: 5,
  },

  itemTwoContainer: {
    // paddingBottom: 10,
    backgroundColor: 'red',
    marginBottom: 2,
    width: width,
    // height: width,
    borderRadius: raduisWidth,
  },

  itemTwoTitle: {
    color: Colors.black,
    fontSize: 15,
    width: width,
    textAlign: 'center',
  },

  itemTwoImage: {
    width: '100%',
    height: width,
    borderRadius: raduisWidth,
  },
});
