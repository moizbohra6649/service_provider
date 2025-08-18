import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import BottomNav from './common/BottomNav';

export default function NotificationScreen() {
  const router = useRouter();
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'vendorApproved',
      title: 'Your vendor account is approved 🎉',
      description: 'Congratulations! You can now start offering your services.',
      time: '2 min ago',
      icon: 'checkmark-circle',
      color: '#4CAF50',
      link: '/vendor/dashboard',
    },
    {
      id: '2',
      type: 'newJobPost',
      title: 'New Job Available',
      description: 'A user posted a plumbing job in your area. Accept it before it’s gone!',
      time: '10 min ago',
      icon: 'briefcase-outline',
      color: '#2196F3',
      link: '/VendorOrderScreen',
    },
    {
      id: '3',
      type: 'workAccepted',
      title: 'Work Request Accepted',
      description: 'You have accepted the electrical work request from John.',
      time: '1 hr ago',
      icon: 'hammer-outline',
      color: '#FF9800',
      link: '/vendor/my-orders',
    },
  ]);

  const handleNotificationPress = (link) => {
    router.push(link);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleNotificationPress(item.link)}
    >
      <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
        <Ionicons name={item.icon} size={24} color="#fff" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Notifications</Text>
          </View>

          <FlatList
            data={notifications}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ padding: 15 }}
            ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
          />
        </View>
      </ScrollView>
      <BottomNav />
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    elevation: 2,
    marginTop: 20,
  },
  headerText: { fontSize: 18, fontWeight: 'bold', marginLeft: 10 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 1,
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  title: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  description: { fontSize: 14, color: '#555', marginTop: 2 },
  time: { fontSize: 12, color: '#999', marginTop: 4 },
});
