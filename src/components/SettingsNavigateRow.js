import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import getStyle from '../constants/styles';
import { FontAwesome } from '@expo/vector-icons';
import SettingsRowStyle from '../constants/SettingsRowStyle';
import Colors from '../constants/Colors';

const SettingsNavigateRow = ({ onPressCallback, iconName, text }) => {
  const {
    containerInSection,
    containerInnerSection,
    iconLeftStyle,
    iconRightStyle,
    textStyle,
  } = SettingsRowStyle;

  const angleIcon = getStyle().angleIcon;
  //   console.log('angleIcon'.angleIcon);
  return (
    <TouchableOpacity onPress={onPressCallback}>
      <View style={containerInSection}>
        <View style={[containerInnerSection, getStyle().row]}>
          <FontAwesome
            name={iconName}
            size={25}
            style={iconLeftStyle}
            color={Colors.primary}
          />
          <Text
            style={[textStyle, getStyle().text]}
            numberOfLines={1}
            ellipsizeMode={'tail'}
          >
            {text}
          </Text>
          <FontAwesome
            name={angleIcon}
            size={25}
            style={iconRightStyle}
            color={Colors.primary}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SettingsNavigateRow;
