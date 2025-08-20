import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';


export default function Layout() {
  return (
    <GestureHandlerRootView>
          <Stack screenOptions={{ headerShown: false }} />
      <Toast />
    </GestureHandlerRootView>
  );
}

