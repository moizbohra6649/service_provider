// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { useLocalSearchParams, useRouter } from 'expo-router';
// import React, { useRef, useState } from 'react';
// import {
//   Image,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View
// } from 'react-native';
// import Toast from 'react-native-toast-message';
// import { BASE_URL } from './config';
// import { useInternet } from './InternetChecker';

// export default function OtpScreen() {
//   const { mobile } = useLocalSearchParams<{ mobile: string }>();
//   const router = useRouter();
//   const isConnected = useInternet();

//   const [otp, setOtp] = useState(['', '', '', '', '', '']);
//   const [loading, setLoading] = useState(false);
//   const inputs = useRef<(TextInput | null)[]>([]);

//   const handleChange = (text: string, index: number) => {
//     const updatedOtp = [...otp];
//     updatedOtp[index] = text.replace(/[^0-9]/g, '');
//     setOtp(updatedOtp);

//     if (text && index < 5) {
//       inputs.current[index + 1]?.focus();
//     } else if (text === '' && index > 0) {
//       inputs.current[index - 1]?.focus();
//     }
//   };

//   const handleVerify = async () => {
//     const finalOtp = otp.join('');

//     if (finalOtp.length !== 6) {
//       Toast.show({ type: 'error', text1: 'Please enter a valid 5-digit OTP.' });
//       return;
//     }

//     if (!isConnected) {
//       Toast.show({ type: 'error', text1: 'No internet connection' });
//       return;
//     }

//     setLoading(true);
//     try {
//       const response = await fetch(`${BASE_URL}/api/auth/verify-otp`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ phone: mobile, otp: finalOtp }),
//       });

//       const data = await response.json();

//       if (data.status === 'success') {
//         if (data.token && data.user) {
//           await AsyncStorage.setItem('userToken', data.token);
//           await AsyncStorage.setItem('userData', JSON.stringify(data.user));
//         }
//         router.replace('/tabs/home');
//       } else {
//         Toast.show({ type: 'error', text1: data.message || 'Invalid OTP' });
//       }
//     } catch (error) {
//       Toast.show({ type: 'error', text1: 'Something went wrong. Try again.' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
//       <Text style={styles.title}>Verify your Phone number</Text>
//       <Text style={styles.subtitle}>Sent to +91 {mobile}</Text>

//       <View style={styles.otpContainer}>
//         {otp.map((digit, index) => (
//           <TextInput
//             key={index}
//             ref={(ref) => (inputs.current[index] = ref)}
//             style={styles.otpInput}
//             keyboardType="number-pad"
//             maxLength={1}
//             value={digit}
//             onChangeText={(text) => handleChange(text, index)}
//             textAlign="center"
//           />
//         ))}
//       </View>

//       <TouchableOpacity
//         style={[styles.button, { opacity: loading ? 0.6 : 1 }]}
//         onPress={handleVerify}
//         disabled={loading}
//       >
//         <Text style={styles.buttonText}>{loading ? 'Verifying...' : 'Verify'}</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 30,
//   },
//   logo: {
//     width: 80,
//     height: 80,
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: '600',
//     marginBottom: 8,
//     color: '#000',
//   },
//   subtitle: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 30,
//   },
//   otpContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '80%',
//     marginBottom: 30,
//   },
//   otpInput: {
//     borderBottomWidth: 2,
//     borderColor: '#888',
//     fontSize: 24,
//     paddingVertical: 8,
//     width: 40,
//     marginHorizontal: 5,
//     color: '#000',
//   },
//   button: {
//     backgroundColor: '#e91e63',
//     paddingVertical: 14,
//     paddingHorizontal: 50,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// VerifyPhoneScreen.js
import { router } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Path, Svg } from 'react-native-svg';
import styles from './styles';



import { StackNavigationProp } from '@react-navigation/stack';
import Loader from './common/Loader';

type VerifyPhoneScreenProps = {
  navigation: StackNavigationProp<any>;
};

const VerifyPhoneScreen = ({ navigation }: VerifyPhoneScreenProps) => {
  const [code, setCode] = useState(['', '', '', '']);
    const [loading, setLoading] = useState(false);
  

  const handleCodeChange = (value: string, index: number) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={verifyStyles.backArrow}>
          
<Svg width="20" height="16" viewBox="0 0 20 16" fill="none">
<Path d="M19.0917 8.00004C19.0917 8.29841 18.9732 8.58455 18.7622 8.79553C18.5512 9.00651 18.2651 9.12504 17.9667 9.12504H4.18546L9.01546 13.9541C9.2268 14.1654 9.34553 14.4521 9.34553 14.751C9.34553 15.0499 9.2268 15.3365 9.01546 15.5478C8.80411 15.7592 8.51747 15.8779 8.21858 15.8779C7.9197 15.8779 7.63305 15.7592 7.42171 15.5478L0.671707 8.79785C0.566827 8.69333 0.483611 8.56914 0.42683 8.4324C0.370049 8.29565 0.34082 8.14904 0.34082 8.00097C0.34082 7.85291 0.370049 7.7063 0.42683 7.56955C0.483611 7.43281 0.566827 7.30862 0.671707 7.2041L7.42171 0.4541C7.52635 0.349453 7.65059 0.266442 7.78732 0.209807C7.92404 0.153173 8.07059 0.124023 8.21858 0.124023C8.36657 0.124023 8.51312 0.153173 8.64985 0.209807C8.78658 0.266442 8.91081 0.349453 9.01546 0.4541C9.1201 0.558747 9.20311 0.682981 9.25975 0.819709C9.31638 0.956437 9.34553 1.10298 9.34553 1.25097C9.34553 1.39897 9.31638 1.54551 9.25975 1.68224C9.20311 1.81897 9.1201 1.9432 9.01546 2.04785L4.18546 6.87504H17.9667C18.2651 6.87504 18.5512 6.99356 18.7622 7.20454C18.9732 7.41552 19.0917 7.70167 19.0917 8.00004Z" fill="#1B2431"/>
</Svg> 

        </Text>
      </TouchableOpacity>

      <Text style={verifyStyles.heading}>Verify your phone number</Text>
      <Text style={verifyStyles.subheading}>
        Enter the code that was sent to your WhatsApp number{'\n'}
        <Text style={verifyStyles.phone}>+234 808 547 2417</Text>
      </Text>

      <View style={verifyStyles.codeContainer}>
        {code.map((val, index) => (
          <TextInput
            key={index}
            style={verifyStyles.codeInput}
            maxLength={1}
            keyboardType="numeric"
            value={val}
            onChangeText={(value) => handleCodeChange(value, index)}
          />
        ))}
      </View>
  
      <Text style={verifyStyles.didNotReceive}>Did not receive the code?</Text>
  
      <TouchableOpacity
          style={verifyStyles.resendButton}
          onPress={() => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              router.replace("/AllowLocationScreen");
            }, 1500); // simulate API or verification
          }}
          disabled={loading}
        >
          {loading ? (
               <Loader size="small" color="#000" />

          ) : (
        <Text style={verifyStyles.resendButtonText}>Resend Code</Text>
          )}
        </TouchableOpacity>
    </View>
  );
};

const verifyStyles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: 'flex-start', backgroundColor: '#fff' } as ViewStyle,
  backArrow: { fontSize: 24, marginBottom: 20, marginTop:30 } as TextStyle,
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, textAlign: 'left' } as TextStyle,
  subheading: { color: '#555', marginBottom: 30, textAlign: 'left' } as TextStyle,
  phone: { fontWeight: 'bold', color: '#000' } as TextStyle,
  codeContainer: { flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 20 } as ViewStyle,
  codeInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: 60,
    marginRight: 10,
    height: 60,
    textAlign: 'center',
    fontSize: 24,
    borderRadius: 10
  } as TextStyle,
  didNotReceive: { textAlign: 'left', marginTop: 15, marginBottom: 10 } as TextStyle,
  resendButton: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 25,
    padding: 12,
    alignItems: 'center',
    width: '40%',
    marginTop: 10,
  } as ViewStyle,
  resendButtonText: { fontWeight: 'bold' } as TextStyle
});

export default VerifyPhoneScreen;

