import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../theme';
import { logout } from '../logout'; // Adjust path if needed

export default function ProfileScreen() {
  const router = useRouter();

  // Dummy user data (replace with real user data)
  const user = {
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+91 9876543210',
    whatsapp: '+91 9876543210',
    avatar: require('../../assets/logo.png'), // Replace with user photo if available
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
    <View style={{ flex: 1, backgroundColor: '#f9f8ff' }}>
      {/* Gradient Header */}
      <LinearGradient
        colors={[COLORS.primary, COLORS.secondary ?? COLORS.primary]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.headerTitle}>Profile</Text>
      </LinearGradient>

      {/* Overlapping Avatar */}
      <View style={styles.avatarWrapper}>
        <Image source={user.avatar} style={styles.avatar} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Profile Card */}
        <View style={styles.card}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>
          <Text style={styles.infoLabel}>Phone</Text>
          <Text style={styles.infoValue}>{user.phone}</Text>
          <Text style={styles.infoLabel}>WhatsApp</Text>
          <Text style={styles.infoValue}>{user.whatsapp}</Text>

          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => router.push('/edit-profile')}
            activeOpacity={0.85}
          >
            <Text style={styles.editBtnText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/become-provider')}
            activeOpacity={0.85}
          >
            <Text style={styles.buttonText}>Become a Service Provider</Text>
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* My Services Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Services</Text>
          <Text style={styles.sectionText}>You have not added any services yet.</Text>
        </View>
      </ScrollView>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogoutPress}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const AVATAR_SIZE = 110;

const styles = StyleSheet.create({
  header: {
    height: 140,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 24,
    elevation: 8,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  avatarWrapper: {
    position: 'absolute',
    top: 70,
    alignSelf: 'center',
    zIndex: 10,
    elevation: 10,
    backgroundColor: '#fff',
    borderRadius: AVATAR_SIZE / 2 + 8,
    padding: 6,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  avatar: {
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: AVATAR_SIZE / 2,
    borderWidth: 3,
    borderColor: COLORS.primary,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 24,
    marginTop: AVATAR_SIZE / 2 + 24, // Push card down for overlap
    borderRadius: 20,
    alignItems: 'center',
    padding: 28,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#888',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '600',
    marginTop: 6,
  },
  infoValue: {
    fontSize: 15,
    color: '#444',
    marginBottom: 2,
  },
  editBtn: {
    backgroundColor: COLORS.secondary ?? COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 28,
    borderRadius: 18,
    marginTop: 14,
    marginBottom: 6,
  },
  editBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 0.5,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
    marginTop: 10,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 28,
    marginHorizontal: 32,
    borderRadius: 1,
  },
  section: {
    marginHorizontal: 32,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 15,
    color: '#888',
  },
  logoutBtn: {
    position: 'absolute',
    bottom: 24,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 36,
    paddingVertical: 12,
    elevation: 4,
    shadowColor: '#6a1b9a',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  logoutText: {
    color: '#6a1b9a',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
});
