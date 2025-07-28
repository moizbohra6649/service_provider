import NetInfo from '@react-native-community/netinfo';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function useInternet() {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected ?? false);
    });
    return () => unsubscribe();
  }, []);

  return isConnected;
}

export function InternetChecker() {
  const isConnected = useInternet();

  if (isConnected) return null;

  return (
    <View style={styles.banner}>
      <Text style={styles.text}>No Internet Connection</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: '#d32f2f',
    padding: 10,
    alignItems: 'center',
    zIndex: 999,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});