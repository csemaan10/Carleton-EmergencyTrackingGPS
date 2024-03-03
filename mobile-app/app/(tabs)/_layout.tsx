import { Tabs } from "expo-router";
import { Image } from "react-native";
import { icons } from "../../constants";
import { StyleSheet } from "react-native";
import Toast from "react-native-toast-message";

const styles = StyleSheet.create({
  imageStyling: { width: 24, height: 24 },
});

const Layout = () => {
  return (
    <>
      <Tabs>
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <Image
                source={icons.home}
                resizeMode="contain"
                style={styles.imageStyling}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            headerShown: false,
            tabBarIcon: () => (
              <Image
                source={icons.settings}
                resizeMode="contain"
                style={styles.imageStyling}
              />
            ),
          }}
        />
      </Tabs>
      <Toast position="top" topOffset={10} />
    </>
  );
};

export default Layout;
