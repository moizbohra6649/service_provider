import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function AllowLocationScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Illustration */}
      <Image
        source={require('../assets/images/Address-amico1.png')}
        style={styles.illustration}
        resizeMode="contain"
      />

      {/* Title */}
      <Text style={styles.title}>Allow location access?</Text>
      <Text style={styles.subtitle}>
        We need your location to easily find professionals around you.
      </Text>

      {/* Buttons */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace('/ConfirmLocation')}
      >
        <Text style={styles.buttonText}>Allow location access</Text>
      </TouchableOpacity>

      {/* Skip */}
      <TouchableOpacity
        onPress={() => router.replace('/dashboard')}
        style={{ marginTop: 20 }}
      >
        <Text style={styles.skipText}>Skip this step</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center', // horizontal center
    justifyContent: 'center', // vertical center
    padding: 20,
  },
  illustration: {
    width: 250,
    height: 250,
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginHorizontal: 30,
    marginTop: 10,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#1a434e',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  skipText: {
    color: '#000',
    fontSize: 14,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
});
