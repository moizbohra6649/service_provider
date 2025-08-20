import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Easing,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BottomNav from '../common/BottomNav';

type VerificationPendingScreenProps = {
  onRefresh?: () => void;
  onEditProfile?: () => void;
  supportEmail?: string;
};

const VerificationPendingScreen: React.FC<VerificationPendingScreenProps> = ({
  onRefresh,
  onEditProfile,
  supportEmail = 'support@yourapp.com',
}) => {
  // Spin animation for ring
  const spin = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    loop.start();
    return () => loop.stop();
  }, [spin]);

  const rotate = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const handleSupport = () => {
    const url = `mailto:${supportEmail}?subject=Vendor%20Verification%20Help`;
    Linking.openURL(url).catch(() => {});
  };

  return (
    <>
      <SafeAreaView style={[styles.safe, { backgroundColor: '#F7F8FA' }]}>
        <View style={styles.container}>
          {/* Icon + Animated ring */}
          <View style={styles.illustrationWrap}>
            <Animated.View
              style={[styles.ring, { borderColor: '#1a434e', transform: [{ rotate }] }]}
            />
            <View style={[styles.illustration, { backgroundColor: '#FFFFFF' }]}>
              <Text style={styles.emoji} accessibilityLabel="Vendor verification pending">
                🪪
              </Text>
            </View>
          </View>

          {/* Headline */}
          <Text style={[styles.title, { color: '#0D1B2A' }]}>You're registered as a vendor</Text>

          {/* Subtext */}
          <Text style={[styles.subtitle, { color: '#4F6377' }]}>
            Once your profile is verified, you'll be notified. Stay tuned!
          </Text>

        

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity
              activeOpacity={0.9}
              style={[styles.btn, { backgroundColor: '#1a434e' }]}
              accessibilityRole="button"
              onPress={() => router.replace('/dashboard')}
            >
              <Text style={[styles.btnText, { color: '#FFFFFF' }]}>Back to Home</Text>
            </TouchableOpacity>
          </View>

          {/* Support */}
          <TouchableOpacity
            onPress={handleSupport}
            accessibilityRole="button"
            accessibilityLabel="Contact support"
          >
            <Text style={[styles.help, { color: '#1a434e' }]}>Need help? Contact support</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <BottomNav />
    </>
  );
};

export default VerificationPendingScreen;

// STYLES
const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 18,
  },
  illustrationWrap: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  ring: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 8,
    borderRightColor: 'transparent',
    borderTopColor: 'transparent',
  },
  illustration: {
    width: 120,
    height: 120,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 24,
  },
  emoji: { fontSize: 70 },
  title: { fontSize: 22, fontWeight: '700', textAlign: 'center' },
  subtitle: { fontSize: 15, textAlign: 'center', lineHeight: 22 },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
  },
  dot: { width: 8, height: 8, borderRadius: 4 },
  pillText: { fontSize: 13, fontWeight: '600' },
  actions: { flexDirection: 'row', gap: 12, marginTop: 8 },
  btn: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    minWidth: 140,
    alignItems: 'center',
  },
  btnText: { fontSize: 15, fontWeight: '700' },
  help: { marginTop: 6, fontSize: 13, textDecorationLine: 'underline' },
});
