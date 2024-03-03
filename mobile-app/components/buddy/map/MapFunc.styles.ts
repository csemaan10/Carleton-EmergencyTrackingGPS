import { StyleSheet } from "react-native";
import { sizes } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topLayer: {
    margin: sizes.small,
  },
  locationText: {
    fontWeight: "700",
    marginBottom: sizes.small,
  },
  launchMapBtn: {
    borderColor: "black",
    backgroundColor: "black",
    marginBottom: sizes.small,
  },
  buttonText: {
    color: "white",
  },
  map: {
    flex: 1,
    width: "100%",
  },
});

export default styles;
