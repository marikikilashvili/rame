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
      <Animated.View style={[styles.imageContainer, { opacity: fadeIn }]}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.image}
        />
      </Animated.View>
      <Animated.View style={[styles.textContainer, { opacity: fadeIn }]}>
        <Text style={styles.text}>Welcome to Sport Universe</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181E2A",
    position: "relative",
  },
  imageContainer: {
    position: "absolute",
    top: 136,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  image: {
    width: 173,
    height: 242,
    resizeMode: "contain",
  },
  textContainer: {
    position: "absolute",
    bottom: 35,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  text: {
    fontFamily: "Noto Sans Georgian",
    fontWeight: "500",
    fontStyle: "normal",
    fontSize: 14,
    lineHeight: 14,
    letterSpacing: 0,
    color: "rgba(136, 136, 136, 1)",
    textAlign: "center",
  },
});
