import { StyleSheet } from "react-native";
import { colors, font, sizes } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    marginTop: sizes.small,
    flex: 1,
  },
  buttonContainer: {
    marginBottom: sizes.xSmall,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 5,
  },
  button: { backgroundColor: "transparent" },
  title: {
    color: colors.primary,
    fontWeight: "bold",
  },
  subTitle: {
    color: colors.secondary,
    fontSize: sizes.small,
  },
  checkBoxContainer: {
    backgroundColor: "transparent",
    padding: 0,
    marginRight: 0,
    marginBottom: 0,
    marginTop: 0,
    marginLeft: 0,
  },
  badgeStyle: {
    borderRadius: 5,
  },
});

export default styles;
