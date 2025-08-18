import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import BottomNav from "./common/BottomNav";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header & Search */}
      <View style={styles.headerContainer}>
        <Text style={styles.greeting}>Good Afternoon, Ayomide</Text>
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={20} color="#888" />
          <TextInput
            placeholder="Search for 'Indoor Cleaning'"
            style={styles.searchInput}
          />
        </View>
      </View>

      <ScrollView
        style={styles.scrollArea}
        showsVerticalScrollIndicator={false}
      >
        <Section
          title="Popular Services on Skillr"
          items={[
            {
              label: "Cleaning the house",
              image: require("../assets/images/icon1.jpg"),
            },
            {
              label: "Painting the house",
              image: require("../assets/images/icon2.jpg"),
            },
            {
              label: "Painting the house",
              image: require("../assets/images/icon2.jpg"),
            },
            {
              label: "Painting the house",
              image: require("../assets/images/icon2.jpg"),
            },
            {
              label: "Painting the house",
              image: require("../assets/images/icon2.jpg"),
            },
            {
              label: "Painting the house",
              image: require("../assets/images/icon2.jpg"),
            },
          ]}
        />

        <CategoryRow
          title="Browse all categories"
          categories={[
            "Plumbing",
            "Carpentry",
            "Painting",
            "Cleaning",
            "Electrical",
          ]}
        />

        {/* Large Banner */}
        <View style={styles.banner}>
          <Image
            source={require("../assets/images/icon1.jpg")}
            style={styles.bannerImage}
          />
          <Text style={styles.bannerText}>Professional cleaning services</Text>
          <TouchableOpacity style={styles.exploreButton}>
            <Text style={styles.exploreButtonText}>Explore</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomNav/>
    </View>
  );
};

type SectionProps = {
  title: string;
  items: {
    label: string;
    image: any;
    price?: string;
  }[];
};

const Section: React.FC<SectionProps> = ({ title, items }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.viewAll}>View all</Text>
    </View>

    <FlatList
      data={items}
      scrollEnabled={false}
      keyExtractor={(item, index) => index.toString()}
      numColumns={2} 
      columnWrapperStyle={{ justifyContent: "space-between" }}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.cardGrid} onPress={() => router.replace("/user-job-post")}>
          <View >
            <Image source={item.image} style={styles.cardImage} />
            {item.price && (
              <View style={styles.priceTag}>
                <Text style={styles.priceText}>Starts @ {item.price}</Text>
              </View>
            )}
            <Text style={styles.cardLabel}>{item.label}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  </View>
);

const CategoryRow = ({ title, categories }) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.viewAll}>View all</Text>
    </View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {categories.map((cat, idx) => (
        <View key={idx} style={styles.categoryBubble}>
          <Text>{cat}</Text>
        </View>
      ))}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  headerContainer: { padding: 20, backgroundColor: "#1a434e" },
  greeting: { color: "#fff", fontSize: 18, paddingTop:20, marginBottom: 15 },
  searchBox: {
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: { marginLeft: 10, flex: 1 },
  scrollArea: { paddingHorizontal: 20, marginBottom: 60 },
  section: { marginTop: 25 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  sectionTitle: { fontSize: 16, fontWeight: "600" },
  viewAll: { color: "#1a434e" },
  card: { marginRight: 15, width: 140 },
  cardImage: { width: "100%", height: 90, borderRadius: 10 },
  cardLabel: { marginTop: 5, marginBottom: 10, fontSize: 13 },
  priceTag: {
    position: "absolute",
    top: 5,
    left: 5,
    backgroundColor: "#a855f7",
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  priceText: { color: "#fff", fontSize: 10 },
  categoryBubble: {
    backgroundColor: "#eee",
    padding: 10,
    marginRight: 10,
    borderRadius: 30,
    paddingHorizontal: 15,
  },
  banner: {
    marginVertical: 20,
    borderRadius: 15,
    overflow: "hidden",
    position: "relative",
  },
  bannerImage: { width: "100%", height: 140 },
  bannerText: {
    position: "absolute",
    top: 20,
    left: 20,
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  exploreButton: {
    position: "absolute",
    bottom: 15,
    left: 20,
    backgroundColor: "#1a1a2e",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  exploreButtonText: { color: "#fff" },
  bottomCta: {
    alignItems: "center",
    marginTop: 25,
    marginBottom: 10,
  },
  ctaButton: {
    marginTop: 8,
    backgroundColor: "#5D2EEA",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  ctaText: {
    color: "#fff",
    fontWeight: "600",
  },
  cardGrid: {
    width: "48%", // for 2-column layout with spacing
    marginBottom: 15,
  },

  bottomNav: {
      position: "absolute",
      bottom: 0,
      backgroundColor: "#fff",
      height: 60,
      width: "100%",
      borderTopColor: "#ddd",
      borderTopWidth: 1,
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
  },
  navItem: { fontSize: 13, color: "#333" },
});

export default HomeScreen;
