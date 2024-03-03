import { Stack } from "expo-router";
import Toast from "react-native-toast-message";

export { Stack } from "expo-router";

const StackLayout = () => {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Stack>
        <Stack.Screen
          name="login"
          options={{
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name="register"
          options={{
            headerTitle: "",
          }}
        />
      </Stack>
      <Toast position="top" topOffset={10} />
    </>
  );
};

export default StackLayout;
