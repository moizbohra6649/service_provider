import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Path } from "react-native-svg";
import BottomNav from "../common/BottomNav";

export default function VisitingChargesScreen() {
  const [loading, setLoading] = useState(true);
  const [charges, setCharges] = useState({ visit: 200, min: 300, max: 500 });

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // 1.5s load time

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#000" />
          <Text style={styles.loadingText}>Fetching visiting charges...</Text>
        </View>
      ) : (
        <View style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
          <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
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

            {/* Title */}
            <Text style={styles.header}>Summary</Text>
            <Text style={styles.subHeader}>Visiting Charges</Text>

            {/* Charges Card */}
            <View style={styles.card}>
              <View style={styles.row}>
                <Ionicons name="walk-outline" size={20} color="#333" />
                <Text style={styles.rowText}>Visit</Text>
                <Text style={styles.price}>₹{charges.visit}</Text>
              </View>
              <View style={styles.row}>
                <Ionicons name="trending-down-outline" size={20} color="#333" />
                <Text style={styles.rowText}>Minimum</Text>
                <Text style={styles.price}>₹{charges.min}</Text>
              </View>
              <View style={styles.row}>
                <Ionicons name="trending-up-outline" size={20} color="#333" />
                <Text style={styles.rowText}>Maximum</Text>
                <Text style={styles.price}>₹{charges.max}</Text>
              </View>
            </View>

            {/* Bill Summary */}
            <View style={styles.card}>
              <View style={styles.row}>
                <Text style={styles.rowText}>Sub Total</Text>
                <Text style={styles.price}>
                  ₹{charges.visit + charges.min + charges.max}
                </Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.rowText}>Platform Fee</Text>
                <Text style={styles.price}>₹50</Text>
              </View>
              <View style={styles.row}>
                <Text style={[styles.rowText, { color: "#27ae60" }]}>
                  Discount
                </Text>
                <Text style={[styles.price, { color: "#27ae60" }]}>- ₹20</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalText}>Total</Text>
                <Text style={styles.totalPrice}>
                  ₹{charges.visit + charges.min + charges.max + 50 - 20}
                </Text>
              </View>
            </View>
          </ScrollView>

          {/* Bottom Bar */}
          <View style={styles.bottomBar}>
           
            {/* <TouchableOpacity style={styles.bottomButton}>
              <Text style={styles.bottomButtonText}>Pay Now</Text>
            </TouchableOpacity> */}
              <TouchableOpacity onPress={()=> router.replace('/UserPost')} style={styles.bottomButton}>
              <Text style={styles.bottomButtonText}>Book a Service</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      <BottomNav />
    </>
  );
}

const styles = StyleSheet.create({
  backArrow: { fontSize: 24,  padding:16, marginTop: 20 },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 16,
    paddingTop: 16,
    marginTop: 0,
  },
  subHeader: {
    fontSize: 14,
    color: "#777",
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: 10,
    borderRadius: 10,
    padding: 12,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  rowText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  price: {
    fontSize: 16,
    fontWeight: "500",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 10,
    marginTop: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bottomBar: {
    position: "absolute",
    bottom: 60,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    elevation: 5,
  },
  bottomText: {
    fontSize: 16,
    color: "#333",
  },
  bottomButton: {
    backgroundColor: "#1a434e",
    paddingVertical: 10,
    marginRight: 10,
    paddingHorizontal: 25,
    borderRadius: 30,
  },
  bottomButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
