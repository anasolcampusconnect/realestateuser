import { Stack } from 'expo-router';
import { FavoritesProvider } from '../context/FavoritesContext';
import { Colors } from '../constants/theme';

export default function Layout() {
  return (
    <FavoritesProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: Colors.background },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="Login" options={{ headerShown: false }} />
        <Stack.Screen name="Register" options={{ headerShown: false }} />
        <Stack.Screen name="Home" options={{ headerShown: false }} />
        <Stack.Screen name="PropertyDetails" options={{ headerShown: false }} />
        <Stack.Screen name="EditProfile" options={{ headerShown: false }} />
      </Stack>
    </FavoritesProvider>
  );
}
