import React, { useCallback, useEffect, useRef } from "react";
import { Animated, StyleSheet, Text } from "react-native";

export default function Index() {
  const fadeIn = useRef(new Animated.Value(0)).current;

  const handleSplashFinish = useCallback(() => {
    // Fade in main content after splash finishes
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeIn]);

  useEffect(() => {
    handleSplashFinish();
  }, [handleSplashFinish]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeIn }]}>
      <Text style={styles.mainText}>Your main app content</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  mainText: {
    fontSize: 18,
    color: "#333",
  },
});
