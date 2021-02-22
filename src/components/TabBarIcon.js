import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';

import Colors from '../constants/Colors';

export default function TabBarIcon(props) {
  return (
    <Ionicons
      name={props.name}
      size={25}
      style={{ marginBottom: -3 }}
      color={props.focused ? Colors.secondary : Colors.primaryLight}
    />
  );
}
