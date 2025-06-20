import { AuthProvider } from "@/hooks/authContext";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef } from "react";
import { Animated } from "react-native";

export default function RootLayout() {
  const colorScheme = "dark";
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pathName = usePathname();


  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [pathName]);

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </Animated.View>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  );
}
