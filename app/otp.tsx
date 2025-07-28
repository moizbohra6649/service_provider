// app/otp.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { COLORS, FONTS, SIZES } from '../theme';
import { BASE_URL } from './config';
import { useInternet } from './InternetChecker';
import { commonStyles } from './styles';

export default function OtpScreen() {
  const { mobile, otp: sentOtp } = useLocalSearchParams<{ mobile: string; otp?: string }>();
  const [otp, setOtp] = useState('');
  const [buttonScale, setButtonScale] = useState(1);
  const router = useRouter();
  const isConnected = useInternet();

  const handleVerify = async () => {
    if (otp.length === 6) {
      try {
        const response = await fetch(`${BASE_URL}/api/auth/verify-otp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone: mobile, otp }),
        });
        const data = await response.json();

        if (data.token && data.user) {
          await AsyncStorage.setItem('userToken', data.token);
          await AsyncStorage.setItem('userData', JSON.stringify(data.user));
          router.replace('/tabs/home'); // Use replace to clear history
        } else if (data.message === 'OTP verified') {
          router.replace('/tabs/home'); // Use replace to clear history
        } else if (data.message) {
          alert(data.message); // Show API error message
        } else {
          alert('Invalid OTP. Please try again.');
        }
      } catch (error) {
        alert('Network error. Please try again.');
      }
    } else {
      alert('Please enter a valid 6-digit OTP.');
    }
  };

  return (
    <LinearGradient
      colors={[COLORS.primary, COLORS.secondary ?? COLORS.primary, COLORS.background]}
      style={commonStyles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={commonStyles.container}>
        {/* Logo and Header */}
        <Animatable.View animation="fadeInDown" delay={200} style={commonStyles.header}>
          <View style={commonStyles.logoShadow}>
            <Image
              source={require('../assets/logo.png')}
              style={commonStyles.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={commonStyles.title}>Verify OTP</Text>
          <Text style={commonStyles.subtitle}>Sent to +91 {mobile}</Text>
        </Animatable.View>

        {/* Animated form */}
        <Animatable.View animation="fadeInUp" delay={400} style={commonStyles.form}>
          <TextInput
            placeholder="Enter OTP"
            keyboardType="numeric"
            maxLength={6}
            value={otp}
            onChangeText={text => setOtp(text.replace(/[^0-9]/g, ''))} // Only allow numbers
            style={styles.input}
            placeholderTextColor={COLORS.gray}
          />
          <Animatable.View
            animation="pulse"
            iterationCount="infinite"
            duration={2000}
            style={{ width: '100%' }}
          >
            <TouchableOpacity
              style={[commonStyles.button, { transform: [{ scale: buttonScale }] }]}
              onPressIn={() => setButtonScale(0.96)}
              onPressOut={() => setButtonScale(1)}
              onPress={handleVerify}
              activeOpacity={0.8}
              disabled={!isConnected} // Disable button if not connected
            >
              <Text style={commonStyles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </Animatable.View>
        </Animatable.View>

        {/* Internet connection checker - Uncomment to use banner
        <InternetChecker /> */}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  
  input: {
    backgroundColor: COLORS.white,
    height: 50,
    borderRadius: SIZES.radius * 1.5,
    paddingHorizontal: SIZES.base * 2,
    color: COLORS.text,
    ...FONTS.input,
    marginBottom: SIZES.base * 2,
    width: '100%',
    textAlign: 'center',
    fontSize: 22,
    letterSpacing: 8,
  },
  
});
