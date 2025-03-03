import { AuthProvider } from "@/contexts/AuthContext";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

const RootLayout = () => {
  return (
    <AuthProvider>
      <StatusBar barStyle={"default"} backgroundColor={"#ff8c00"} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#ff8c00" },
          headerTintColor: "white",
          headerTitleStyle: { fontSize: 20, fontWeight: "bold" },
          headerTitleAlign: "center",
          contentStyle: {
            // paddingHorizontal: 10,
            // paddingTop: 10,
            backgroundColor: "white",
          },
          navigationBarHidden: true,
        }}
      >
        <Stack.Screen name="index" options={{ title: "Home Page" }} />
        <Stack.Screen name="notes" options={{ headerTitle: "Notes" }} />
      </Stack>
    </AuthProvider>
  );
};

export default RootLayout;
