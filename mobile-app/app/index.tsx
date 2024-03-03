import React from "react";
import { Redirect, useRootNavigationState } from "expo-router";
import { SafeAreaView } from "react-native";
import { colors } from "../constants";

const Index = () => {
  const rootNavigationState = useRootNavigationState();
  if (!rootNavigationState?.key) return null;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.lightWhite }}>
      <Redirect href="/login" />
    </SafeAreaView>
  );
};

export default Index;
