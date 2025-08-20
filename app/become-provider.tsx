import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Svg, { Path } from "react-native-svg";
import BottomNav from "./common/BottomNav";

export default function BecomeServiceProviderScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [cityOpen, setCityOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [cityValue, setCityValue] = useState(null);
  const [categoryValue, setCategoryValue] = useState(null);
  const [uploadDocument, setUploadDocument] = useState<string | null>(null);
  const [livePhoto, setLivePhoto] = useState<string | null>(null);

  const [cityItems] = useState([
    { label: "Delhi", value: "delhi" },
    { label: "Mumbai", value: "mumbai" },
  ]);

  const [categoryItems] = useState([
    { label: "Electrician", value: "electrician" },
    { label: "Plumber", value: "plumber" },
  ]);

  const pickImage = async (type: any) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;
      if (type === "document") {
        setUploadDocument(imageUri);
      } else {
        setLivePhoto(imageUri);
      }
    }
  };

  const onSubmit = (data: any) => {
    router.replace("/dashboard");
  };

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
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

        <View style={styles.headerContainer}>
          <Text style={styles.heading}> Become a Service Provider</Text>
          <Text style={styles.subHeading}>Join us and grow your business</Text>
        </View>

        {[
          ["Name", "name"],
          ["Phone", "phone"],
          ["Whatsapp", "whatsapp"],
          ["Email", "email"],
          ["Experience", "experience"],
        ].map(([label, name]) => (
          <View key={name} style={styles.inputGroup}>
            <Text style={styles.label}>{label}</Text>
            <Controller
              control={control}
              name={name}
              rules={{ required: `${label} is required` }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder={`Enter your ${label.toLowerCase()}`}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {/* {errors[name] && (
              <Text style={styles.error}>{errors[name].message}</Text>
            )} */}
          </View>
        ))}

        <Text style={styles.label}>City</Text>
        <DropDownPicker
          open={cityOpen}
          value={cityValue}
          items={cityItems}
          setOpen={setCityOpen}
          setValue={setCityValue}
          setItems={() => {}}
          style={styles.dropdown}
          placeholder="Select city"
          zIndex={3000}
          zIndexInverse={1000}
        />
        {/* {!cityValue && <Text style={styles.error}>City is required</Text>} */}

        <Text style={styles.label}>Category</Text>
        <DropDownPicker
          open={categoryOpen}
          value={categoryValue}
          items={categoryItems}
          setOpen={setCategoryOpen}
          setValue={setCategoryValue}
          setItems={() => {}}
          style={styles.dropdown}
          placeholder="Select category"
          zIndex={2000}
          zIndexInverse={2000}
        />
        {/* {!categoryValue && (
          <Text style={styles.error}>Category is required</Text>
        )} */}

        <Text style={styles.label}>Upload Document</Text>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => pickImage("document")}
        >
          <Text style={styles.uploadButtonText}>Choose Document</Text>
        </TouchableOpacity>
        {uploadDocument && (
          <Image source={{ uri: uploadDocument }} style={styles.imagePreview} />
        )}
        {/* {!uploadDocument && (
          <Text style={styles.error}>Document is required</Text>
        )} */}

        <Text style={styles.label}>Live Photo</Text>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => pickImage("live")}
        >
          <Text style={styles.uploadButtonText}>Upload Live Photo</Text>
        </TouchableOpacity>
        {livePhoto && (
          <Image source={{ uri: livePhoto }} style={styles.imagePreview} />
        )}
        {/* {!livePhoto && <Text style={styles.error}>Live photo is required</Text>} */}

        <Text style={styles.termsText}>
          By selecting Submit, I agree to the{" "}
          <Text style={styles.linkText}>Terms of Service</Text>,{" "}
          <Text style={styles.linkText}>Payment Terms</Text> and{" "}
          <Text style={styles.linkText}>Privacy Policy</Text>.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace('/pages/VerificationPendingScreen')}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
      <BottomNav />
    </>
  );
}

const styles = StyleSheet.create({
  backArrow: { fontSize: 24, marginBottom: 20, marginTop: 20 },

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  headerContainer: {
    marginBottom: 24,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    paddingLeft: 0,
    marginLeft: -3,
  },
  subHeading: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
    paddingLeft: 3,
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: "600",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 9999,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#f8f8f8",
    fontSize: 16,
    color: "#000",
  },
  dropdown: {
    marginBottom: 12,
    borderRadius: 9999,
    borderColor: "#ccc",
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 12,
  },
  uploadButton: {
    backgroundColor: "#000",
    padding: 12,
    borderRadius: 9999,
    alignItems: "center",
    marginBottom: 8,
  },
  uploadButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  button: {
    backgroundColor: "#1a434e",
    padding: 14,
    borderRadius: 9999,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 60,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  error: {
    color: "red",
    fontSize: 13,
    marginBottom: 6,
  },
  termsText: {
    fontSize: 12,
    color: "#555",
    textAlign: "center",
    marginTop: 20,
  },
  linkText: {
    color: "#6C27FF",
    textDecorationLine: "underline",
  },
});
