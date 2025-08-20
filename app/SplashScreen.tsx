import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { COLORS } from '../theme';

export default function SplashScreen() {
  return (
   
      <View style={styles.container}>
        <View style={styles.logoShadow}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoShadow: {
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
    borderRadius: 80,
    backgroundColor: COLORS.white,
    padding: 20,
  },
  logo: {
    width: 140,
    height: 140,
    borderRadius: 70,
  },
});