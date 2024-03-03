import { View, SafeAreaView, TextInput, StyleSheet } from "react-native";
import { Text, Button } from "@rneui/themed";
import React, { useState } from "react";
import { useNavigation } from "expo-router";
import { sizes } from "../../constants";
import { FIREBASE_AUTH, FIREBASE_DB } from "../../firebaseConfig";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { collection, setDoc, doc } from "firebase/firestore";

import { createUserWithEmailAndPassword } from "firebase/auth";
import Toast from "react-native-toast-message";

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
  registerTextField: {
    borderBottomWidth: 1,
    height: 60,
    fontSize: 30,
    marginVertical: 10,
    fontWeight: "300",
  },
  btnStyle: {
    marginTop: sizes.small,
    backgroundColor: "black",
  },
});

const Register = () => {
  const [email, setEmail] = useState<string | undefined>();
  const [name, setName] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();

  const nav = useNavigation<NativeStackNavigationProp<any>>();

  const goToMainFlow = async () => {
    // register Query
    if (email && password) {
      try {
        const response = await createUserWithEmailAndPassword(
          FIREBASE_AUTH,
          email,
          password
        );

        if (response.user) {
          // await createProfile(response);
          const userCollectionRef = collection(FIREBASE_DB, "users");
          const userDocRef = doc(userCollectionRef, email);
          // Add user data to the 'users' collection with email as the document ID
          await setDoc(userDocRef, { email, name });
          Toast.show({ text1: "Registered!" });
          setEmail(undefined);
          setPassword(undefined);
          setName(undefined);
          nav.goBack();
        }
      } catch (err) {
        console.error("Something went wrong in register");
        console.error(err);
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.contentView}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Register</Text>
          </View>
          <View>
            <TextInput
              style={styles.registerTextField}
              placeholder="Name"
              value={name}
              onChangeText={setName}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.registerTextField}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              inputMode="email"
            />
            <TextInput
              style={styles.registerTextField}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>
          <Button
            title="Sign Up"
            onPress={goToMainFlow}
            buttonStyle={styles.btnStyle}
          />
          <Button
            title="Go Back"
            buttonStyle={styles.btnStyle}
            onPress={nav.goBack}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Register;
