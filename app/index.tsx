import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../theme';
import SplashScreen from './SplashScreen';

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Show splash for 2 seconds, then check login
    const timer = setTimeout(async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        setLoading(false); // Show home
      } else {
        router.replace('/Login');
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    router.replace('/Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>🏠 Welcome Home</Text>
      <Button title="Logout" onPress={handleLogout} color={COLORS.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 22, color: COLORS.primary, marginBottom: 20 },
});
