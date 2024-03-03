import { View, SafeAreaView, TextInput, StyleSheet } from "react-native";
import { Text, Button } from "@rneui/themed";
import React, { useState } from "react";
import { Link, useNavigation } from "expo-router";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { sizes } from "../../constants";
import { signInWithEmailAndPassword, updateCurrentUser } from "firebase/auth";
import { FIREBASE_AUTH } from "../../firebaseConfig";

const styles = StyleSheet.create({
  contentView: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    marginHorizontal: 50,
    backgroundColor: "white",
    paddingTop: 20,
  },
  titleContainer: {
    justifyContent: "center",
  },
  titleText: {
    fontSize: 45,
    textAlign: "center",
    fontWeight: "200",
  },
  loginTextField: {
    borderBottomWidth: 1,
    height: 60,
    fontSize: 30,
    marginVertical: 10,
    fontWeight: "300",
  },
  settingBtn: {
    marginTop: sizes.small,
    backgroundColor: "black",
    color: "white",
    textAlign: "center",
    padding: sizes.small,
    fontWeight: "bold",
    fontSize: sizes.medium,
  },
});

const Login = () => {
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  const nav = useNavigation<NativeStackNavigationProp<any>>();

  const goToMainFlow = async () => {
    // Login Query
    if (email && password) {
      try {
        const response = await signInWithEmailAndPassword(
          FIREBASE_AUTH,
          email,
          password
        );
        if (response.user) {
          // found user
          updateCurrentUser(FIREBASE_AUTH, response.user);
          setEmail(undefined);
          setPassword(undefined);
          nav.navigate("(tabs)", { screen: "home" });
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.contentView}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Emergency GPS Tracking</Text>
          </View>
          <View>
            <TextInput
              style={styles.loginTextField}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              inputMode="email"
            />
            <TextInput
              style={styles.loginTextField}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>
          <Button
            title="Login"
            onPress={goToMainFlow}
            buttonStyle={styles.settingBtn}
          />
          <Link href="/register" style={styles.settingBtn}>
            Sign up
          </Link>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Login;
