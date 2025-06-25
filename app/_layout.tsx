import { AuthProvider } from "@/hooks/authContext";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  const colorScheme = "dark";


  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="MovieDetailView"  options={{ headerShown: false, presentation: 'modal' }} />
            <Stack.Screen name="StreamSelectionView"  options={{ headerShown: true, presentation: 'modal' }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  );
}
