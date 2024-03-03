import { StyleSheet } from "react-native";
import { colors, font, sizes } from "../../../constants";

const styles = StyleSheet.create({
  button: {
    marginRight: sizes.small,
    borderColor: "black",
    backgroundColor: "black",
  },
  buttonTitle: {
    color: "white",
  },
  diaLogTextInput: {
    borderWidth: 2,
    padding: 5,
    fontSize: 20,
    fontWeight: "300",
    marginBottom: 10,
  },
});

export default styles;
