import { router } from "expo-router";
import React, { useEffect } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Congratulations() {
  useEffect(() => {
    // Auto redirect after 3 seconds
    const timer = setTimeout(() => {
      router.push("/main");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleBackToHome = () => {
    router.push("/main");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.illustrationContainer}>
          <Image
            source={require("../assets/images/illustration1.png")}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Congratulations</Text>

        <Text style={styles.description}>
          Your account is ready to use. You will be redirected to the home page
          in a few seconds
        </Text>

        <TouchableOpacity style={styles.homeButton} onPress={handleBackToHome}>
          <Text style={styles.homeButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    marginRight: 20,
    marginLeft: 20,

    height: 490,
    paddingTop: 60,
    paddingRight: 20,
    paddingBottom: 40,
    paddingLeft: 20,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    shadowColor: "#AAAAAA",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: "auto",
  },
  illustrationContainer: {
    marginBottom: 40,
  },
  illustration: {
    width: 130,
    height: 119,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  homeButton: {
    backgroundColor: "##2C3E50",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 8,
    alignItems: "center",
    minWidth: 200,
  },
  homeButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
