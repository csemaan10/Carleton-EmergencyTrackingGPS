import React, { FC, useEffect } from "react";
import { Header } from "@rneui/base";
import { TouchableOpacity } from "react-native-gesture-handler";
import { View, Text } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { sizes } from "../../constants";
import { router, useNavigation } from "expo-router";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface HeaderComponentProps {
  goBack: boolean;
}

const HeaderComponent: FC<HeaderComponentProps> = ({ goBack }) => {
  const nav = useNavigation<NativeStackNavigationProp<any>>();
  return (
    <Header
      backgroundImageStyle={{}}
      barStyle="default"
      centerComponent={{
        text: "E.G.T.S",
        style: {
          color: "#fff",
          fontSize: sizes.large,
          marginTop: 7,
          fontWeight: "bold",
          letterSpacing: 2,
        },
      }}
      centerContainerStyle={{}}
      containerStyle={{ backgroundColor: "black" }}
      leftComponent={
        goBack ? (
          <View style={{ marginTop: 7 }}>
            <TouchableOpacity
              onPress={() => {
                nav.goBack();
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <AntDesign name="arrowleft" size={24} color="white" />
                <Text style={{ color: "white", marginLeft: 3 }}>Go Back</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          {}
        )
      }
      leftContainerStyle={{}}
      linearGradientProps={{}}
      placement="center"
      rightComponent={
        <View>
          <TouchableOpacity onPress={() => {}}>
            <Ionicons
              name="notifications-circle-outline"
              size={36}
              color="white"
            />
          </TouchableOpacity>
        </View>
      }
      rightContainerStyle={{}}
      statusBarProps={{ backgroundColor: "black" }}
    />
  );
};

export default HeaderComponent;
