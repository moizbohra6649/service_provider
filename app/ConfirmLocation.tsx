import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function ConfirmLocation() {
  const router = useRouter();
  const [region, setRegion] = useState({
    latitude: 6.6018,
    longitude: 3.3515,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const handleConfirm = () => {
    console.log("Confirmed location:", region);
    router.replace("/dashboard"); // Change to your desired route
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Confirm your home address</Text>
      </View>

      {/* Map */}
      <MapView style={{ flex: 1 }} region={region} onRegionChangeComplete={setRegion}>
        <Marker coordinate={region} pinColor="purple" />
      </MapView>

      {/* Location Card */}
      <View style={styles.locationCard}>
        <Ionicons name="location-outline" size={20} color="#000" />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.locationTitle}>Tisco Plaza House, Ikeja</Text>
          <Text style={styles.locationSubtitle}>Lagos, Nigeria</Text>
        </View>
      </View>

      {/* Confirm Button */}
      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmButtonText}>Confirm Location</Text>
      </TouchableOpacity>

    
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', padding: 15, paddingTop: 30, backgroundColor: '#fff' },
  headerText: { fontSize: 16, fontWeight: '600', marginLeft: 10 },
  locationCard: {
    position: 'absolute',
    top: 60,
    left: '5%',
    right: '5%',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
  },
  locationTitle: { fontWeight: 'bold', fontSize: 14 },
  locationSubtitle: { fontSize: 12, color: '#666' },
  confirmButton: {
    position: 'absolute',
    bottom: 70,
    left: '5%',
    right: '5%',
    backgroundColor: '#1a434e',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 4,
  },
  confirmButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
  bottomSlider: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 5,
    backgroundColor: '#8c8c8c',
    padding: 6,
    borderRadius: 20,
  },
  sliderDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#fff', marginHorizontal: 3 },
});
