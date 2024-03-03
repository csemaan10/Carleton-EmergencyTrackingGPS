import { StyleSheet } from "react-native";
import { sizes } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    marginTop: sizes.small,
    marginRight: sizes.small,
    marginLeft: sizes.small,
  },
  statusContainer: {
    flexDirection: "row",
    marginTop: sizes.small,
  },
  statusBadge: {
    borderRadius: 5,
  },
});

export default styles;
