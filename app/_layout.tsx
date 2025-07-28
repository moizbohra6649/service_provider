import { Stack } from 'expo-router';
import Toast from 'react-native-toast-message';
// ...in your component tree...
<Toast />

export default function Layout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
