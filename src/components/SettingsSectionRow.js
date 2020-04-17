// Dependencies import
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import SettingsRowStyle from '../constants/SettingsRowStyle';
import getStyle from '../constants/styles';

// Styles deconstructing
const { container, containerSection, textSection } = SettingsRowStyle;

// Class for section rows
const SectionRow = ({ text, children }) => {
  return (
    <View style={container}>
      <View style={containerSection}>
        <Text
          style={[textSection, getStyle().text]}
          numberOfLines={1}
          ellipsizeMode={'tail'}
        >
          {text}
        </Text>
      </View>
      <View>{children}</View>
    </View>
  );
};

// Component export
export default SectionRow;
