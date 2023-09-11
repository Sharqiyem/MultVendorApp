export const tabBarOptions = {
  safeAreaInset: { bottom: "always" },
  indicatorStyle: {
    display: "none",
    color: "#fff",
    height: 0, //this works
    borderColor: "transparent",
    borderBottomWidth: 0,
  },
  labelStyle: { fontSize: 10, fontFamily: Fonts.primaryRegular },
  style: {
    backgroundColor: Colors.tabBarBG,
    paddingBottom: Platform.OS === "ios" ? 20 : 0,
    // paddingBottom: 20,
  },
  activeTintColor: Colors.tabIconSelected,
  inactiveTintColor: Colors.primaryLight,
  showIcon: true,
  keyboardHidesTabBar: true,
};
