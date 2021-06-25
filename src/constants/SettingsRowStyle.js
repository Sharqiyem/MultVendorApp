import { StyleSheet } from "react-native";

const SettingsRowStyle = StyleSheet.create({
  container: {
    marginBottom: 8,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  containerSection: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  containerInSection: {
    flex: 1,
    height: 50,
    borderRadius: 1,
    // borderBottomWidth: 0.2,
  },
  containerInnerSection: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  containerInnerSectionMiddle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    flex: 6,
    flexDirection: "row",
    fontSize: 15,
    color: "black",
  },
  textSection: {
    flex: 1,
    textAlign: "left",
    fontSize: 15,
    fontWeight: "bold",
    color: "black",
    paddingHorizontal: 15,
  },
  iconRightStyle: {
    flex: 1,
    textAlign: "center",
  },
  iconLeftStyle: {
    flex: 1,
    textAlign: "center",
  },
  switchSt: {
    flex: 1,
  },
  checkSt: {
    flex: 1,
  },
  sliderSt: {
    marginHorizontal: 16,
  },
});

export default SettingsRowStyle;
