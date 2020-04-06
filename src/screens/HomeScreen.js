import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import types from '../context/types';
import { StoreContext } from '../context/provider';
import {
  ExProductCycleItem,
  BannerScrollView,
  StoreScrollView,
  ExCategoryCycleItem,
} from '../components/index';
import Colors from '../constants/Colors';

export default function HomeScreen({ navigation }) {
  const { dispatch } = React.useContext(StoreContext);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Banner */}
      <View style={{ marginVertical: 5 }}>
        <BannerScrollView />
      </View>

      {/* Shop By Stores */}
      <View style={{ margin: 5 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 15,
          }}
        >
          <View styles={{}}>
            <Text style={{ fontSize: 20 }}>Shop by Stores</Text>
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
              Sell All
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
          <ExCategoryCycleItem />
          <ExCategoryCycleItem />
          <ExCategoryCycleItem />
          <ExCategoryCycleItem />
          <ExCategoryCycleItem />
        </View>
      </View>

      {/* <ExListCardItem /> */}
      {/* <ExListCardItem /> */}
      {/* <ExListCardItem /> */}

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

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <ExProductCycleItem />
          <ExProductCycleItem />
          <ExProductCycleItem />
        </View>
      </View>
    </ScrollView>
  );
}

HomeScreen.navigationOptions = {
  header: null,
  // headerShown: false,
  title: 'sda',
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
