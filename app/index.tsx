import { Link } from "expo-router";
import React, { useCallback, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import SplashScreen from "../components/SplashScreen";

export default function Index() {
  const [showSplash, setShowSplash] = useState(true);
  const fadeIn = useRef(new Animated.Value(0)).current;

  const handleSplashFinish = useCallback(() => {
    setShowSplash(false);
    // Fade in main content after splash finishes
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeIn]);

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeIn }]}>
      {/* Sportverse Logo */}
      <View style={styles.logoContainer}>
        <View style={styles.logoWrapper}>
          <Text style={styles.logoText}>SV</Text>
        </View>
        <Text style={styles.brandText}>SPORTVERSE</Text>
      </View>

      {/* Welcome Text */}
      <Text style={styles.welcomeTitle}>Welcome to Sportverse</Text>
      <Text style={styles.welcomeSubtitle}>
        In this app you can find out sport universe
      </Text>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <Link href="/signin" asChild>
          <TouchableOpacity style={styles.signInButton}>
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/signup" asChild>
          <TouchableOpacity style={styles.signUpButton}>
            <Text style={styles.signUpButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </Link>
      </View>

      {/* Footer Text */}
      <Text style={styles.footerText}>
        Already have an account? <Text style={styles.footerLink}>Sign Up</Text>
      </Text>

      <Text style={styles.registerText}>REGISTER AS CONTENT CREATOR</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    paddingHorizontal: 30,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoWrapper: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  logoText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  brandText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    letterSpacing: 2,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
    textAlign: "center",
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: "#CCCCCC",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 22,
  },
  buttonContainer: {
    width: "100%",
    marginBottom: 30,
  },
  signInButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 15,
    width: "100%",
  },
  signInButtonText: {
    color: "#1a1a1a",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  signUpButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    borderRadius: 8,
    width: "100%",
  },
  signUpButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  footerText: {
    fontSize: 14,
    color: "#CCCCCC",
    textAlign: "center",
    marginBottom: 20,
  },
  footerLink: {
    color: "#007AFF",
    fontWeight: "600",
  },
  registerText: {
    fontSize: 12,
    color: "#CCCCCC",
    textAlign: "center",
    fontWeight: "600",
    letterSpacing: 1,
  },
});
