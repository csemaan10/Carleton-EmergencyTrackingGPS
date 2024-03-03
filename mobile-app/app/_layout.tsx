import { Stack } from "expo-router";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import HeaderComponent from "../components/common/Header";

const StackLayout = () => {
  const [fontsLoaded] = useFonts({
    DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
    DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
  });

  const performAsyncAction = async () => {
    if (fontsLoaded) {
      // Show home page only if fonts are loaded
      await SplashScreen.hideAsync();
    }
  };

  useEffect(() => {
    performAsyncAction();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <Stack>
      <Stack.Screen
        name="(tabs)"
        options={{
          headerTitle: "",
          header: () => <HeaderComponent goBack={false} />,
        }}
      />
    </Stack>
  );
};

export default StackLayout;
