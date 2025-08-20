import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import type { StackNavigationProp } from "@react-navigation/stack";
import countries from "country-calling-code";
import { router } from "expo-router";
import { PhoneNumberUtil } from "google-libphonenumber";
import Svg, { Path } from "react-native-svg";
import Toast from "react-native-toast-message";
import Loader from "./common/Loader";
import { apiPost } from "./common/api";

const phoneUtil = PhoneNumberUtil.getInstance();

function validatePhoneNumber(dialCode: string, phone: string): boolean {
  // remove '+'
  const code = dialCode.replace("+", "");

  // find country by dial code
  const country = countries.find(c => c.countryCodes.includes(code));
  if (!country) return false;

  const region = country.isoCode2; // e.g. "IN", "US"

  try {
    const number = phoneUtil.parse(phone, region);
    return phoneUtil.isValidNumber(number);
  } catch {
    return false;
  }
}

type SignUpScreenProps = {
  navigation: StackNavigationProp<any>;
};

const SignUpScreen = ({ navigation }: SignUpScreenProps) => {
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const sendOtp = async (phone: string) => {
    try {
      const result = await apiPost("/api/auth/send-otp", { phone });
      return result;
    } catch (error) {
      throw error;
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
          <View style={styles.phoneBox}>
            <TextInput
              style={styles.phoneInput}
              placeholder="Enter mobile number"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
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
          onPress={async () => {
            // Validation for empty or less than 10 digits
            if (!phone || phone.length < 10) {
              Toast.show({
                type: "error",
                text1: "Invalid Number",
                text2: "Please enter a valid 10-digit mobile number.",
              });
              return;
            } else if (!validatePhoneNumber(countryCode, phone)) {
              Toast.show({
                type: "error",
                text1: "Invalid Number",
                text2: "Please enter a valid mobile number.",
              });
              return;
            }
            setLoading(true);
            try {
              await sendOtp(countryCode + phone);
              await AsyncStorage.setItem("mobileNumber", countryCode + phone); // Save to local storage
              setLoading(false);
              router.replace("/otp");
            } catch (e) {
              setLoading(false);
              Toast.show({
                type: "error",
                text1: "OTP Error",
                text2: "Failed to send OTP. Please try again.",
              });
            }
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
    </>
  );
};

const styles = StyleSheet.create<{
  backArrow: TextStyle;
  container: ViewStyle;
  heading: TextStyle;
  row: ViewStyle;
  countryCodeBox: ViewStyle;
  countryCodeInput: TextStyle;
  phoneBox: ViewStyle;
  phoneInput: TextStyle;
  infoBox: ViewStyle;
  infoText: TextStyle;
  continueButton: ViewStyle;
  continueButtonText: TextStyle;
  orText: TextStyle;
  socialButton: ViewStyle;
}>({
  backArrow: { fontSize: 24, marginBottom: 20, marginTop: 30 } as TextStyle,

  container: {
    padding: 20,
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "#fff",
  },
  heading: { fontSize: 22, fontWeight: "bold", marginBottom: 30 },
  row: { flexDirection: "row", gap: 10 },
  countryCodeBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    justifyContent: "center",
    width: "25%",
    height: 48,
  },
  countryCodeInput: { fontSize: 16 },
  phoneBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 48,
    justifyContent: "center",
  },
  phoneInput: { fontSize: 16 },
  infoBox: {
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    padding: 10,
    marginTop: 15,
    marginBottom: 20,
  },
  infoText: { fontSize: 14, color: "#444" },
  continueButton: {
    backgroundColor: "#1a434e",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 20,
  },
  continueButtonText: { color: "#fff", fontWeight: "bold" },
  orText: { textAlign: "center", marginVertical: 10, color: "#999" },
  socialButton: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 12,
    borderRadius: 25,
    alignItems: "center",
    marginVertical: 5,
  },
});

export default SignUpScreen;
