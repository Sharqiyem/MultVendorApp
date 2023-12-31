import { useLinking } from "@react-navigation/native";
import * as Linking from "expo-linking";

export default function (containerRef) {
  return useLinking(containerRef, {
    prefixes: [Linking.makeUrl("/")],
    config: {
      Home: {
        path: "stack",
        initialRouteName: "Home",

        screens: {
          Home: "home",
          Details: "details",
        },
      },
      Links: "links",
    },
  });
}
