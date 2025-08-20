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
                  onPress: () => router.push({ pathname: '/otp', params: { mobile, otp: data.otp } }),
                },
              ],
              { cancelable: false }
            );
          } else {
            // No OTP in response, just redirect
            router.push({ pathname: '/otp', params: { mobile } });
          }
        }else{
          Toast.show({ type: 'error', text1: data.message});
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
    <>
      <View style={styles.container}>
        <TouchableOpacity>
          <Text style={styles.backArrow}>
            <Svg width="20" height="16" viewBox="0 0 20 16" fill="none">
              <Path
                d="M19.0917 8.00004C19.0917 8.29841 18.9732 8.58455 18.7622 8.79553C18.5512 9.00651 18.2651 9.12504 17.9667 9.12504H4.18546L9.01546 13.9541C9.2268 14.1654 9.34553 14.4521 9.34553 14.751C9.34553 15.0499 9.2268 15.3365 9.01546 15.5478C8.80411 15.7592 8.51747 15.8779 8.21858 15.8779C7.9197 15.8779 7.63305 15.7592 7.42171 15.5478L0.671707 8.79785C0.566827 8.69333 0.483611 8.56914 0.42683 8.4324C0.370049 8.29565 0.34082 8.14904 0.34082 8.00097C0.34082 7.85291 0.370049 7.7063 0.42683 7.56955C0.483611 7.43281 0.566827 7.30862 0.671707 7.2041L7.42171 0.4541C7.52635 0.349453 7.65059 0.266442 7.78732 0.209807C7.92404 0.153173 8.07059 0.124023 8.21858 0.124023C8.36657 0.124023 8.51312 0.153173 8.64985 0.209807C8.78658 0.266442 8.91081 0.349453 9.01546 0.4541C9.1201 0.558747 9.20311 0.682981 9.25975 0.819709C9.31638 0.956437 9.34553 1.10298 9.34553 1.25097C9.34553 1.39897 9.31638 1.54551 9.25975 1.68224C9.20311 1.81897 9.1201 1.9432 9.01546 2.04785L4.18546 6.87504H17.9667C18.2651 6.87504 18.5512 6.99356 18.7622 7.20454C18.9732 7.41552 19.0917 7.70167 19.0917 8.00004Z"
                fill="#1B2431"
              />
            </Svg>
          </Text>
        </TouchableOpacity>
        <Text style={styles.heading}>Sign up to Service Provider</Text>

        <View style={styles.row}>
          <View style={styles.countryCodeBox}>
            <TextInput
              style={styles.countryCodeInput}
              value={countryCode}
              onChangeText={setCountryCode}
              maxLength={4}
              keyboardType="phone-pad"
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
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            You will receive an OTP code from Skillr to confirm your number.
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.continueButton, loading && { opacity: 0.7 }]}
          onPress={() => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              router.replace("/otp");
            }, 1500); // simulate API or verification
          }}
          disabled={loading}
        >
          {loading ? (
               <Loader size="small" color="#fff" />

          ) : (
            <Text style={styles.continueButtonText}>Continue</Text>
          )}
        </TouchableOpacity>
      </View>
      <InternetChecker />
      <Toast />
    </LinearGradient>
  );
}