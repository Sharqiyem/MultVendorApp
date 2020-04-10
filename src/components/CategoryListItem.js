import * as React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import productHooks from '../hooks/useGetDataByCollection';
import getStyle from '../constants/styles';

const widowWidth = Dimensions.get('window').width;

export const CategoryList = ({ navigation }) => {
  const [data, isLoading] = productHooks.useGetDataByCollection('categories');

  if (isLoading) return <Text> Loading </Text>;

  // return <ProductCycleItem item={data[0]} />;
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <CategoryListItem item={item} navigation={navigation} />
      )}
      keyExtractor={(item) => item.id}
    />
  );

  // return <CategoryCycleItem item={item} />;
};

export const CategoryListItem = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      style={[styles.container, getStyle().row]}
      onPress={() => {
        navigation.navigate('Category', { item });
      }}
    >
      <View style={styles.imageContiner}>
        <Image
          style={styles.image}
          resizeMode='cover'
          source={{ uri: item.image }}
        />
      </View>
      <View style={styles.textContiner}>
        <View styles={{}}>
          <Text style={[getStyle().text, { fontSize: 20 }]}>{item.name}</Text>
        </View>

        <Text style={[getStyle().text, styles.shopSubTitle]}>
          (35) products
        </Text>
        {/* <Text style={styles.timeText}>07:00AM:08PM</Text>  */}
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

    // borderRadius: width / 2,
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
