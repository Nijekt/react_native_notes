import { Text, View, Image, TouchableOpacity } from "react-native";
import Postimage from "@/assets/images/post-it.png";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const HomePage = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Image source={Postimage} style={styles.image} />
      <Text style={styles.title}>Weclome to Notes-App</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("./notes")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },

  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HomePage;
