import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Auth = () => {
  return (
    <View style={styles.container}>
      <Text>Auth</Text>
    </View>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
});
