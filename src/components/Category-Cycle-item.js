import * as React from 'react';
import { Text, StyleSheet, View, Image, FlatList } from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import productHooks from '../hooks/useGetDataByCollection';

export const ExCategoryCycleItem = () => {
  const [data, isLoading] = productHooks.useGetDataByCollection('categories');

  if (isLoading) return <Text> Loading </Text>;

  // return <ProductCycleItem item={data[0]} />;
  return (
    <FlatList
      numColumns={3}
      data={data}
      renderItem={({ item }) => <CategoryCycleItem item={item} />}
      keyExtractor={(item) => item.id}
    />
  );

  // return <CategoryCycleItem item={item} />;
};
export const CategoryCycleItem = ({ item }) => (
  <View style={styles.container} key={item.id}>
    <View style={styles.itemTwoContainer}>
      <Image style={styles.itemTwoImage} source={{ uri: item.image }} />
    </View>
    <Text style={styles.itemTwoTitle}>{item.name}</Text>
  </View>
);

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
