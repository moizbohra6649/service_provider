import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TABS = [
  { label: "Explore", icon: "compass-outline", route: "dashboard" },
  { label: "Active Jobs", icon: "briefcase-outline", route: "UserPost" },
  { label: "Notifications", icon: "notifications-outline", route: "Notification" },
  { label: "Profile", icon: "person-outline", route: "profile" }
];

export default function BottomNav() {
  const navigation = useNavigation() as any;
  const route = useRoute(); // Get current active route

  return (
    <View style={styles.bottomNav}>
      {TABS.map((tab) => {
        const isActive = route.name === tab.route;
        return (
          <TouchableOpacity
            key={tab.label}
            style={styles.navItem}
            onPress={() => navigation.navigate(tab.route)}
          >
            <Ionicons
              name={tab.icon}
              size={20}
              color={isActive ? "#1a434e" : "#000"}
            />
            <Text style={[styles.navText, { color: isActive ? "#1a434e" : "#000" }]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
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
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
  },
});
