import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Button,
  Platform,
} from 'react-native';
import types from '../context/cartContext/types';
import {
  StoreContext,
  LocalizationContext,
} from '../context/cartContext/provider';
import {
  ExProductCycleList,
  BannerScrollView,
  StoreScrollView,
  ExCategoryCycleItem,
} from '../components/index';
import Colors from '../constants/Colors';
import getStyle from '../constants/styles.js';
import productHooks from '../hooks/useGetDataByCollection';
import firebase from '../config/firebase.config';

export default function HomeScreen({ navigation }) {
  //Test firebase

  const { t, changeLang } = React.useContext(LocalizationContext);
  const [data, isLoading] = productHooks.useGetDataByCollection('products');

  React.useEffect(() => {
    //hack android header center text
    if (Platform.OS === 'android') {
      navigation.setOptions({
        headerTitleStyle: {
          textAlign: 'center',
          width: 380,
        },
      });
    }
  }, []);
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Button
        title='Lang'
        onPress={() => {
          changeLang();
        }}
      />

      {/* Banner */}
      <View style={{ marginVertical: 5 }}>
        <BannerScrollView />
      </View>

      {/* Shop By Stores */}
      <View style={{ margin: 5 }}>
        <View
          style={[
            getStyle().row,
            {
              justifyContent: 'space-between',
              marginVertical: 15,
            },
          ]}
        >
          <View styles={{}}>
            <Text style={{ fontSize: 20 }}>{t('Shop by Stores')}</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Stores');
            }}
            style={{
              backgroundColor: Colors.primary,
              borderRadius: 15,
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 12,
                padding: 5,
                paddingHorizontal: 10,
                color: Colors.white,
              }}
            >
              {t('See All')}
            </Text>
          </TouchableOpacity>
        </View>
        <StoreScrollView navigation={navigation} />
      </View>

      {/* Shop By categories */}
      <View style={{ margin: 5, marginVertical: 15 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 15,
          }}
        >
          <View styles={{}}>
            <Text style={{ fontSize: 20 }}>Shop by Categories</Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Categories');
            }}
            style={{
              backgroundColor: Colors.primary,
              borderRadius: 15,
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 12,
                padding: 5,
                paddingHorizontal: 10,
                color: Colors.white,
              }}
            >
              Sell All
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <ExCategoryCycleItem />
        </View>
      </View>

      <View style={{ margin: 5, marginVertical: 15 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 10,
          }}
        >
          <View styles={{}}>
            <Text style={{ fontSize: 20 }}>Past orders</Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.primary,
              borderRadius: 15,
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 12,
                padding: 5,
                paddingHorizontal: 10,
                color: Colors.white,
              }}
            >
              Sell All
            </Text>
          </TouchableOpacity>
        </View>

        <ExProductCycleList />
      </View>
    </ScrollView>
  );
}

HomeScreen.navigationOptions = {
  title: 'TITLE',
  headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
  headerStyle: {
    backgroundColor: 'red',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
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
});
