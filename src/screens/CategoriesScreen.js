import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Colors from '../constants/Colors';
import {
  StoreListItem,
  CategoryListItem,
  CategoryList,
} from '../components/index';
import { LocalizationContext } from '../context/cartContext/provider';
import getStyle from '../constants/styles';
export default function CategoriesScreen({ navigation }) {
  const { t, changeLang } = React.useContext(LocalizationContext);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          height: 50,
          backgroundColor: Colors.primary,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View style={getStyle().textInputLight}>
          <Text style={{ color: Colors.white }}>Search your category</Text>
        </View>
      </View>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <CategoryList navigation={navigation} />
      </ScrollView>
    </SafeAreaView>
  );
}

CategoriesScreen.navigationOptions = {
  // header: null,
  // headerShown: false,
  title: 'sda',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
