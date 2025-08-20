import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Svg, { Path } from "react-native-svg";
import SwipeButton from "rn-swipe-button";
import BottomNav from "./common/BottomNav";

export default function VendorOrderScreen() {
  // Example coordinates for Green Park, New Delhi
  const location = {
    latitude: 28.5672,
    longitude: 77.2100,
  };

  return (
    <>
      <View style={styles.container}>
        {/* Back Arrow */}
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
          <Text style={styles.heading}>Job Request</Text>
        </View>

        {/* Order Card */}
        <MapView
            style={styles.map}
            initialRegion={{
              ...location,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker coordinate={location} title="Customer Location" />
          </MapView>
        <View style={styles.card}>
          <View style={styles.header}>
            <View style={styles.iconCircle}>
              <Ionicons name="construct-outline" size={28} color="#1a434e" />
            </View>
            <Text style={styles.headerText}>Plumbing Service</Text>
          </View>

          <View style={styles.divider} />

          {/* Location */}
          <View style={styles.infoRow}>
            <MaterialIcons name="location-on" size={20} color="#000" />
            <Text style={styles.infoText}>123, Green Park, New Delhi</Text>
          </View>

          {/* Map */}
          

          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={20} color="#000" />
            <Text style={styles.infoText}>Today, 4:30 PM</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="cash-outline" size={20} color="#000" />
            <Text style={styles.infoText}>₹500 Estimated</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="person-outline" size={20} color="#000" />
            <Text style={styles.infoText}>Rohan Verma</Text>
          </View>
        </View>

        {/* Swipe to Accept */}
        <SwipeButton
          thumbIconBackgroundColor="#fff"
          thumbIconComponent={() => (
            <Ionicons name="checkmark" size={20} color="#28A745" />
          )}
          title="Swipe to Accept Order"
          titleColor="#fff"
          containerStyles={styles.swipeAccept}
          railBackgroundColor="#1a434e"
          railFillBackgroundColor="#1a434e"
          onSwipeSuccess={() => alert("Order Accepted")}
        />

        {/* Decline Option */}
        <TouchableOpacity style={styles.declineButton}>
          <Text style={styles.declineText}>Decline</Text>
        </TouchableOpacity>
      </View>
      <BottomNav />
    </>
  );
}

const styles = StyleSheet.create({
  backArrow: { fontSize: 24, marginBottom: 10, marginTop: 20 },
  headerContainer: { marginBottom: 24 },
  heading: { fontSize: 22, fontWeight: "bold", color: "#000" },
  container: { flex: 1, backgroundColor: "#F1F4F8", padding: 16 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    marginBottom: 20,
  },
  header: { flexDirection: "row", alignItems: "center" },
  iconCircle: {
    width: 50,
    height: 50,
    backgroundColor: "#E8F3FF",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: { fontSize: 18, fontWeight: "bold", marginLeft: 12, color: "#222" },
  divider: { height: 1, backgroundColor: "#eee", marginVertical: 12 },
  infoRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  infoText: { fontSize: 15, marginLeft: 8, color: "#555" },
  swipeAccept: { borderRadius: 30, overflow: "hidden", marginTop: 20 },
  declineButton: { marginTop: 14, alignItems: "center" },
  declineText: { color: "#FF3B30", fontSize: 16, fontWeight: "600" },
  map: {
    width: "100%",
    height: 150,
    borderRadius: 10,
    marginVertical: 10,
  },
});
