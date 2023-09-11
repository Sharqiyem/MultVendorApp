import { Ionicons } from "@expo/vector-icons";
import * as React from "react";

import Colors from "../constants/Colors";

export default function TabBarIcon(props) {
  return (
    <Ionicons
      name={props.name}
      size={20}
      style={{
        // backgroundColor:'red',
        textAlign: "center",
        marginBottom: -3,
      }}
      color={props.focused ? Colors.tabBar : Colors.primaryLight}
    />
  );
}
