import { StyleSheet } from "react-native";
import { colors, font, sizes } from "../../../constants";

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  searchContainer: {
    backgroundColor: "white",
    borderWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.primary,
    margin: 10,
  },
  searchBar: {
    backgroundColor: "transparent",
    borderBottomWidth: 0,
    borderTopWidth: 0,
    margin: 0,
    width: "100%",
  },
  searchInput: {
    backgroundColor: "transparent",
    borderWidth: 0,
    color: colors.primary,
    padding: sizes.xSmall,
    fontSize: sizes.medium,
  },
  searchIcon: {
    color: colors.primary,
  },
});

export default styles;
