import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Svg, { Path } from "react-native-svg";
import BottomNav from "./common/BottomNav";

type Job = {
  id: string;
  title: string;
  description: string;
  price: string;
};

export default function UserPost() {
  const [activeTab, setActiveTab] = useState("inProgress");

  const latestJobs: Job[] = [
    { id: "1", title: "Plumbing Service",  description: "Build a responsive website using React.js", price: "₹5,00" },
    { id: "2", title: "Plumbing Service",  description: "Build a responsive website using React.js", price: "₹5,00" },
    { id: "3", title: "Plumbing Service",  description: "Build a responsive website using React.js", price: "₹5,00" },
  ];

  const completedJobs: Job[] = [
    { id: "3", title: "Plumbing Service", price: "₹6,00", description: "Node.js API for e-commerce" },
  ];

  const renderServiceItem = ({ item }: { item: Job }) => (
  <View style={styles.serviceCard}>
    <View style={styles.cardHeader}>
      <Text style={styles.serviceTitle}>{item.title}</Text>
      <View
        style={[
          styles.statusBadge,
          activeTab === "inProgress"
            ? styles.badgeInProgress
            : styles.badgeCompleted,
        ]}
      >
        <Text
          style={[
            styles.badgeText,
            activeTab === "inProgress"
              ? styles.badgeTextInProgress
              : styles.badgeTextCompleted,
          ]}
        >
          {activeTab === "inProgress" ? "In Progress" : "Completed"}
        </Text>
      </View>
    </View>
    <Text style={styles.serviceDescription}>{item.description}</Text>
    <Text style={styles.servicePrice}>{item.price}</Text>
  </View>
);


  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Back Button */}
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

        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.heading}>Active Jobs</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === "inProgress" && styles.activeTab]}
            onPress={() => setActiveTab("inProgress")}
          >
            <Text style={[styles.tabText, activeTab === "inProgress" && styles.activeTabText]}>
              In Progress
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === "completed" && styles.activeTab]}
            onPress={() => setActiveTab("completed")}
          >
            <Text style={[styles.tabText, activeTab === "completed" && styles.activeTabText]}>
              Completed
            </Text>
          </TouchableOpacity>
        </View>

        {/* Service List */}
        {activeTab === "inProgress" ? (
          <FlatList
            data={latestJobs}
            keyExtractor={(item) => item.id}
            renderItem={renderServiceItem}
          />
        ) : (
          <FlatList
            data={completedJobs}
            keyExtractor={(item) => item.id}
            renderItem={renderServiceItem}
          />
        )}
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
    marginBottom: 16,
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  cardHeader: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 6,
},
statusBadge: {
  paddingVertical: 4,
  paddingHorizontal: 8,
  borderRadius: 12,
},
badgeInProgress: {
  backgroundColor: "#FFF4E5",
},
badgeCompleted: {
  backgroundColor: "#E5F9E7",
},
badgeText: {
  fontSize: 12,
  fontWeight: "600",
},
badgeTextInProgress: {
  color: "#FF8C00",
},
badgeTextCompleted: {
  color: "#28A745",
},

  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#1B2431",
  },
  tabText: {
    fontSize: 16,
    color: "#888",
  },
  activeTabText: {
    color: "#1B2431",
    fontWeight: "bold",
  },
  serviceCard: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1B2431",
    marginBottom: 6,
    marginTop: 10
  },
  serviceDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
  },
});
