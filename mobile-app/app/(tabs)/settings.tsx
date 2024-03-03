import React, { useState } from "react";
import { View, StyleSheet, GestureResponderEvent } from "react-native";
import { Text, Switch, Button } from "@rneui/themed";
import { sizes } from "../../constants";
import { router } from "expo-router";
import { updateCurrentUser } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebaseConfig";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  settingBtn: {
    marginTop: sizes.small,
    backgroundColor: "black",
  },
});

const Settings = () => {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);
  const [isSearchBarEnabled, setIsSearchBarEnabled] = useState(true);

  const toggleDarkMode = () => {
    setIsDarkModeEnabled(!isDarkModeEnabled);
  };

  const toggleSearchBar = () => {
    setIsSearchBarEnabled(!isSearchBarEnabled);
  };

  const handleAboutPress = () => {};

  const handleLogoutPress = (event: GestureResponderEvent) => {
    event.preventDefault();
    updateCurrentUser(FIREBASE_AUTH, null);
    router.push("/login");
  };

  return (
    <View style={styles.container}>
      <Text h4>General Settings</Text>
      <View style={styles.settingItem}>
        <Text>Dark Mode</Text>
        <Switch
          value={isDarkModeEnabled}
          onValueChange={toggleDarkMode}
          color="black"
        />
      </View>

      <Text h4>Features</Text>
      <View style={styles.settingItem}>
        <Text>Search Bar</Text>
        <Switch
          value={isSearchBarEnabled}
          onValueChange={toggleSearchBar}
          color="black"
        />
      </View>

      <Text h4>Actions</Text>
      <Button
        title="About"
        onPress={handleAboutPress}
        buttonStyle={styles.settingBtn}
      />
      <Button
        title="Log Out"
        onPress={handleLogoutPress}
        buttonStyle={styles.settingBtn}
      />
    </View>
  );
};

export default Settings;
