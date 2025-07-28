import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Toast from 'react-native-toast-message';
import { COLORS } from '../theme';
import { BASE_URL } from './config';
import { InternetChecker, useInternet } from './InternetChecker';
import { commonStyles } from './styles';

export default function Login() {
  const [mobile, setMobile] = useState('');
  const [buttonScale, setButtonScale] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const isConnected = useInternet();

  const handleContinue = async () => {
    if (mobile.length === 10) {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/api/auth/send-otp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone: mobile }),
        });
        const data = await response.json();
        Toast.show({
          type: data.status === 'success' ? 'success' : 'error',
          text1: data.message || (data.status === 'success' ? 'OTP sent' : 'Failed to send OTP'),
        });

        if (data.status === 'success') {
          if (data.otp) {
            // Show OTP in popup, then redirect on OK
            Alert.alert(
              'OTP Sent',
              `Your OTP is: ${data.otp}`,
              [
                {
                  text: 'OK',
                  onPress: () => router.replace({ pathname: '/otp', params: { mobile, otp: data.otp } }),
                },
              ],
              { cancelable: false }
            );
          } else {
            // No OTP in response, just redirect
            router.replace({ pathname: '/otp', params: { mobile } });
          }
        }
      } catch (error) {
        Toast.show({ type: 'error', text1: 'Network error. Please try again.' });
      } finally {
        setLoading(false);
      }
    } else {
      Toast.show({ type: 'error', text1: 'Please enter a valid 10-digit mobile number.' });
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
        {/* Logo and Welcome */}
        <Animatable.View animation="fadeInDown" delay={200} style={commonStyles.logoContainer}>
          <View style={commonStyles.logoShadow}>
            <Image
              source={require('../assets/logo.png')}
              style={commonStyles.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={commonStyles.title}>Welcome Back!</Text>
        </Animatable.View>

        {/* Input and Button */}
        <Animatable.View animation="fadeInUp" delay={400} style={commonStyles.form}>
          <View style={commonStyles.inputWrapper}>
            <Ionicons name="call-outline" size={22} color={COLORS.gray} style={commonStyles.inputIcon} />
            <TextInput
              placeholder="Enter your mobile number"
              keyboardType="phone-pad"
              value={mobile}
              onChangeText={setMobile}
              placeholderTextColor={COLORS.gray}
              style={commonStyles.input}
              maxLength={10}
            />
          </View>
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
              onPress={handleContinue}
              activeOpacity={0.8}
              disabled={!isConnected || loading}
            >
              {loading ? (
                <Text style={commonStyles.buttonText}>Loading...</Text>
              ) : (
                <Text style={commonStyles.buttonText}>Continue</Text>
              )}
            </TouchableOpacity>
          </Animatable.View>
        </Animatable.View>
      </View>
      <InternetChecker />
      <Toast />
    </LinearGradient>
  );
}