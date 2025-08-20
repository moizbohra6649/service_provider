import { ActivityIndicator, StyleSheet, View } from 'react-native';

type LoaderProps = {
  size?: 'small' | 'large' | number;
  color?: string;
  style?: object;
};

const Loader = ({ size = 'small', color = '#fff', style }: LoaderProps) => {
  return (
    <View style={[styles.loaderContainer, style]}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;
