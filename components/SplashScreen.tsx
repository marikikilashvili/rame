import React, { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, Text, View } from "react-native";

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const fadeIn = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start fade in after 0.5 seconds fade in
    const timer = setTimeout(() => {
      Animated.timing(fadeIn, {
        toValue: 1,
        duration: 500, // 0.5 seconds fade in
        useNativeDriver: true,
      }).start();
    }, 0);

    // Start fade out after 2.5 seconds
    const timer2 = setTimeout(() => {
      Animated.timing(fadeIn, {
        toValue: 0,
        duration: 500, // 0.5 seconds fade out
        useNativeDriver: true,
      }).start(() => {
        onFinish(); // Call when animation completes
      });
    }, 2500);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, [fadeIn, onFinish]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.container, { opacity: fadeIn }]}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/images/splash-icon.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.welcomeText}>Welcome to Rame Universe</Text>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181E2A",
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
  },
});
