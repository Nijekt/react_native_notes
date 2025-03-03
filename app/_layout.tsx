import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { Stack } from "expo-router";
import {
  StatusBar,
  Touchable,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";

const HeaderLogout = () => {
  const { logout, user } = useAuth();

  return user ? (
    <TouchableOpacity style={styles.logoutButton} onPress={logout}>
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  ) : null;
};

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
          headerRight: () => <HeaderLogout />,
          contentStyle: {
            // paddingHorizontal: 10,
            // paddingTop: 10,
            backgroundColor: "white",
          },
          navigationBarColor: "transparent",
          // navigationBarHidden: true,
        }}
      >
        <Stack.Screen name="index" options={{ title: "Home Page" }} />
        <Stack.Screen name="notes" options={{ headerTitle: "Notes" }} />
        <Stack.Screen name="auth" options={{ headerTitle: "Auth" }} />
      </Stack>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#ff3b30",
    borderRadius: 8,
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default RootLayout;
