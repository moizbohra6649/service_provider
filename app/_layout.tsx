import { Stack } from 'expo-router';
import Toast from 'react-native-toast-message';

export default function Layout() {
  return (
    <>
      {/* Navigation stack */}
      <Stack screenOptions={{ headerShown: false }} />

      {/* Toast provider must be in the layout */}
      <Toast />
    </>
  );
}
