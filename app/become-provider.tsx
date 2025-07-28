import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { logout } from './logout';

export default function BecomeServiceProvider() {
  const router = useRouter();

  const [fields, setFields] = useState({
    name: '',
    mobile: '',
    email: '',
    whatsapp: '',
    city: '',
    experience: '',
    serviceArea: '',
  });

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [category, setCategory] = useState(null);
  const [categoryItems, setCategoryItems] = useState([
    { label: 'Electrician', value: 'electrician' },
    { label: 'Plumber', value: 'plumber' },
    { label: 'Mechanic', value: 'mechanic' },
  ]);

  const [document, setDocument] = useState<any>(null);
  const [photo, setPhoto] = useState<any>(null);

  const handleImagePick = async (type: 'document' | 'photo') => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.6,
      allowsEditing: true,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      type === 'document' ? setDocument(uri) : setPhoto(uri);
    }
  };

  const handleSubmit = () => {
    // Basic validation
    if (
      !fields.name ||
      fields.mobile.length !== 10 ||
      !fields.email ||
      !category ||
      !document ||
      !photo
    ) {
      Alert.alert('Error', 'Please fill all required fields correctly.');
      return;
    }

    // Submit logic here
    Alert.alert('Success', 'Application submitted successfully!');
    router.back();
  };

  const handleLogoutPress = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => logout(router) },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* AppBar */}
      <LinearGradient
        colors={['#7b1fa2', '#512da8']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.appBar}
      >
        <TouchableOpacity onPress={() => router.back()} style={styles.appBarIcon}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.appBarTitle}>Become a Service Provider</Text>
        <View style={styles.appBarIcon} />
      </LinearGradient>

      {/* Form */}
      <ScrollView contentContainerStyle={styles.form}>
        {Object.entries(fields).map(([key, value]) => (
          <TextInput
            key={key}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            value={value}
            onChangeText={(text) => setFields({ ...fields, [key]: text })}
            keyboardType={key === 'mobile' || key === 'whatsapp' ? 'number-pad' : 'default'}
            maxLength={key === 'mobile' || key === 'whatsapp' ? 10 : undefined}
            style={styles.input}
            placeholderTextColor="#999"
          />
        ))}

        {/* Category Dropdown */}
        <DropDownPicker
          open={categoryOpen}
          value={category}
          items={categoryItems}
          setOpen={setCategoryOpen}
          setValue={setCategory}
          setItems={setCategoryItems}
          placeholder="Select Category"
          style={styles.dropdown}
          textStyle={{ fontSize: 14 }}
          dropDownContainerStyle={{ borderColor: '#ccc' }}
        />

        {/* Document Upload */}
        <TouchableOpacity onPress={() => handleImagePick('document')} style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>
            {document ? 'Change Document' : 'Upload Document (Aadhaar, PAN, DL)'}
          </Text>
        </TouchableOpacity>
        {document && <Image source={{ uri: document }} style={styles.preview} />}

        {/* Live Photo Upload */}
        <TouchableOpacity onPress={() => handleImagePick('photo')} style={styles.uploadButton}>
          <Text style={styles.uploadButtonText}>
            {photo ? 'Change Live Photo' : 'Upload Live Photo'}
          </Text>
        </TouchableOpacity>
        {photo && <Image source={{ uri: photo }} style={styles.preview} />}

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 30,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
  },
  appBarIcon: {
    width: 40,
    alignItems: 'center',
  },
  appBarTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  form: {
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 14,
    color: '#333',
  },
  dropdown: {
    borderRadius: 10,
    marginBottom: 16,
    borderColor: '#ccc',
  },
  uploadButton: {
    backgroundColor: '#eee',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  uploadButtonText: {
    color: '#555',
    fontSize: 14,
  },
  preview: {
    height: 100,
    width: '100%',
    marginBottom: 16,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  submitButton: {
    backgroundColor: '#6a1b9a',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 40,
    alignSelf: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
