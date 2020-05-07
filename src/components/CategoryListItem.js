import * as React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import productHooks from '../hooks/useGetDataByCollection';
import getStyle from '../constants/styles';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';
import { FontAwesome } from '@expo/vector-icons';
import { LocalizationContext } from '../context/cartContext/provider';

const widowWidth = Dimensions.get('window').width;

export const CategoryList = ({ navigation }) => {
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
  const { t, locale } = React.useContext(LocalizationContext);

  const angleIcon = getStyle().angleIcon;

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
          <Text style={[getStyle().textHeader, { color: Colors.primary }]}>
            {item.names[locale]}
          </Text>
        </View>

        <View style={[getStyle().row, { alignItems: 'center' }]}>
          <Text style={[getStyle().text, styles.shopSubTitle]}>(35)</Text>
          <Text style={[getStyle().text, styles.shopSubTitle]}>
            {t('Products')}
          </Text>
        </View>
        {/* <Text style={styles.timeText}>07:00AM:08PM</Text>  */}
      </View>
      <FontAwesome
        name={angleIcon}
        size={25}
        style={{ alignSelf: 'center' }}
        color={Colors.grey}
      />
    </TouchableOpacity>
  );
};

const width = widowWidth / 3 - 50;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 5,
    marginVertical: 10,
    backgroundColor: Colors.white,
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderBottomColor: Colors.grey,
    borderBottomWidth: 0.5,
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
    marginHorizontal: 20,
  },
  image: {
    height: '100%',
    width: '100%',

    // borderRadius: width / 2,
  },

  shopSubTitle: {
    margin: 5,
  },
  timeText: {
    padding: 6,
  },
});
