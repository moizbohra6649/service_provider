import AsyncStorage from '@react-native-async-storage/async-storage';

export async function logout(router: any) {
  await AsyncStorage.clear();
  router.replace('/login'); // Prevents back navigation
}