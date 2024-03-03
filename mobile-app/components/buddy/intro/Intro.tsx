import React, { FC, useContext } from "react";
import { View } from "react-native";
import { Badge, Text } from "@rneui/themed";
import { sizes } from "../../../constants";
import styles from "./Intro.styles";

interface IntroProps {
  name: string;
  status: string;
}

const Intro: FC<IntroProps> = ({ name, status }) => {
  return (
    <View style={styles.container}>
      <Text h2>{name}</Text>
      <View style={styles.statusContainer}>
        <Text style={{ fontWeight: "bold", marginRight: 3 }}>Status:</Text>
        <View>
          <Badge
            value={status}
            status={status === "Safe" ? "success" : "error"}
            badgeStyle={styles.statusBadge}
          />
        </View>
      </View>
    </View>
  );
};

export default Intro;
