import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useState } from "react";
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
import Loader from "./common/Loader";

const PostJobScreen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(false);
  

  const [openCategory, setOpenCategory] = useState(false);
  const [categoryItems, setCategoryItems] = useState([
    { label: "Electrician", value: "electrician" },
    { label: "Plumber", value: "plumber" },
    { label: "Painter", value: "painter" },
  ]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  return (
    <>
      <ScrollView style={{ flex: 1, backgroundColor: "#fff", padding: 16 }}>
        <TouchableOpacity onPress={() => router.replace("/dashboard")}>
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
          <Text style={styles.heading}> Post Job</Text>
        </View>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Add Category:</Text>
        <DropDownPicker
          open={openCategory}
          value={category}
          items={categoryItems}
          setOpen={setOpenCategory}
          setValue={setCategory}
          setItems={setCategoryItems}
          placeholder="Select Category"
          style={{ marginTop: 10, marginBottom: 20 }}
        />

        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Job Title:</Text>
        <TextInput
          placeholder="Add a short title for your job"
          value={title}
          onChangeText={setTitle}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 10,
            padding: 12,
            marginTop: 10,
            marginBottom: 20,
          }}
        />

        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Description:</Text>
        <TextInput
          placeholder="Add a description for your job"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={5}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 10,
            padding: 12,
            marginTop: 10,
            marginBottom: 20,
            textAlignVertical: "top",
          }}
        />

        <Text style={{ fontWeight: "bold", fontSize: 16 }}>Images:</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 10 }}>
          {images.map((img, index) => (
            <Image
              key={index}
              source={{ uri: img }}
              style={{
                width: 80,
                height: 80,
                borderRadius: 8,
                marginRight: 10,
                marginBottom: 10,
              }}
            />
          ))}
          <TouchableOpacity
            onPress={pickImage}
            style={{
              width: 80,
              height: 80,
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="add" size={32} color="#ccc" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: "#1a434e",
            padding: 16,
            borderRadius: 30,
            alignItems: "center",
            marginTop: 30,
          }}
          onPress={() => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              router.replace("/pages/visitingChargesScreen"); // Navigate to dashboard after payment
            }, 1500); // simulate API or verification
          }}
          disabled={loading}
        >
          {loading ? (
            <Loader size="small" color="#fff" />
          ) : (
            <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
              Submit
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
      <BottomNav />
    </>
  );
};

export default PostJobScreen;

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
});
