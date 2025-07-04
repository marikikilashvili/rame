import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useState } from "react";
import CustomSplashScreen from "../components/SplashScreen";

export default function RootLayout() {
  const [loaded] = useFonts({
    "Moto Sans Georgian": require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [showSplash, setShowSplash] = useState(true);

  // Show custom splash screen while fonts are loading or splash is active
  if (!loaded || showSplash) {
    return <CustomSplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
