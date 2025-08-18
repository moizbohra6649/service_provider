import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import BottomNav from './common/BottomNav';

export default function ProfileScreen() {
  return (
    <>
      <ScrollView style={styles.container}>
                    <TouchableOpacity onPress={() => router.replace('/dashboard')}>
                      <Text style={styles.backArrow}>
                        
              <Svg width="20" height="16" viewBox="0 0 20 16" fill="none">
              <Path d="M19.0917 8.00004C19.0917 8.29841 18.9732 8.58455 18.7622 8.79553C18.5512 9.00651 18.2651 9.12504 17.9667 9.12504H4.18546L9.01546 13.9541C9.2268 14.1654 9.34553 14.4521 9.34553 14.751C9.34553 15.0499 9.2268 15.3365 9.01546 15.5478C8.80411 15.7592 8.51747 15.8779 8.21858 15.8779C7.9197 15.8779 7.63305 15.7592 7.42171 15.5478L0.671707 8.79785C0.566827 8.69333 0.483611 8.56914 0.42683 8.4324C0.370049 8.29565 0.34082 8.14904 0.34082 8.00097C0.34082 7.85291 0.370049 7.7063 0.42683 7.56955C0.483611 7.43281 0.566827 7.30862 0.671707 7.2041L7.42171 0.4541C7.52635 0.349453 7.65059 0.266442 7.78732 0.209807C7.92404 0.153173 8.07059 0.124023 8.21858 0.124023C8.36657 0.124023 8.51312 0.153173 8.64985 0.209807C8.78658 0.266442 8.91081 0.349453 9.01546 0.4541C9.1201 0.558747 9.20311 0.682981 9.25975 0.819709C9.31638 0.956437 9.34553 1.10298 9.34553 1.25097C9.34553 1.39897 9.31638 1.54551 9.25975 1.68224C9.20311 1.81897 9.1201 1.9432 9.01546 2.04785L4.18546 6.87504H17.9667C18.2651 6.87504 18.5512 6.99356 18.7622 7.20454C18.9732 7.41552 19.0917 7.70167 19.0917 8.00004Z" fill="#1B2431"/>
              </Svg> 
              
                      </Text>
                    </TouchableOpacity>
        {/* User Info */}
        <View style={styles.profileHeader}>
          <Ionicons name="person-circle-outline" size={100} color="#000" />
          <Text style={styles.userName}>UserName</Text>
        </View>

        {/* Become a Service Partner Card */}
        <View style={styles.partnerCard}>
          <Text style={styles.partnerTitle}>Become a Service Partner</Text>
          <Text style={styles.partnerDesc}>
            Join our network of professionals and start receiving job requests.
          </Text>
          <TouchableOpacity style={styles.partnerButton} onPress={() => router.replace('/become-provider')}>
            <Ionicons name="briefcase-outline" size={18} color="#1a434e" />
            <Text style={styles.partnerButtonText}>Become a Service Partner</Text>
          </TouchableOpacity>
        </View>

        {/* Support Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <TouchableOpacity style={styles.option}>
            <Ionicons name="call-outline" size={20} color="#000" />
            <Text style={styles.optionText}>Contact Us</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option}>
            <Ionicons name="help-circle-outline" size={20} color="#000" />
            <Text style={styles.optionText}>How works?</Text>
          </TouchableOpacity>
                    <TouchableOpacity style={styles.option}>
            <Ionicons name="help-circle-outline" size={20} color="#000" />
            <Text style={styles.optionText}>Saved Address</Text>
          </TouchableOpacity>
                    <TouchableOpacity style={styles.option}>
            <Ionicons name="document-text-outline" size={20} color="#000" />
            <Text style={styles.optionText}>Privacy Policy</Text>
          </TouchableOpacity>
                    <TouchableOpacity style={styles.option}>
            <Ionicons name="document-text-outline" size={20} color="#000" />
            <Text style={styles.optionText}>Logout</Text>
          </TouchableOpacity>
        </View>

       

      </ScrollView>
      <BottomNav />
    </>
  );
}

const styles = StyleSheet.create({
        backArrow: { fontSize: 24, marginBottom: 20, marginTop:20, padding: 16 },

  container: {
    flex: 1,
    backgroundColor: '#fff',
    // padding: 16,
  },
  profileHeader: {
    alignItems: 'center',
    marginTop: 20,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 2,
  },
  partnerCard: {
    backgroundColor: '#1a434e',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 12,
    padding: 2,
  },
  partnerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    paddingBottom: 10
  },
  partnerDesc: {
    color: '#f0e6e6',
    fontSize: 14,
    paddingBottom: 10,
    marginBottom: 12,
  },
  partnerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    // width: '100%',
    paddingVertical: 8,
    paddingHorizontal: 12,
textAlign: 'center',
    borderRadius: 30,
    // alignSelf: 'center',
  },
  partnerButtonText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1a434e',
    // width: '100%',
    // textAlign: 'center'
    // alignItems: 'center',
  },
  section: {
    marginHorizontal: 16,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  optionText: {
    marginLeft: 10,
    fontSize: 15,
    color: '#000',
  },
});
