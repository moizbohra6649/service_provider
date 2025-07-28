// theme.ts

export const COLORS = {
  primary: '#A67EF8',
  secondary: '#b79aeeff',
  background: '#F4EEFF',
  white: '#FFFFFF',
  black: '#000000',
  text: '#333333',
  error: '#FF4D4F',
  gray: '#888',
  inputBg: '#FFFFFF',
  shadow: 'rgba(0, 0, 0, 0.1)',
};

export const SIZES = {
  base: 8,
  font: 14,
  radius: 12,
  padding: 20,
};

export const FONTS = {
  title: {
    fontSize: 28,
    fontWeight: '700' as const,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '500' as const,
  },
  input: {
    fontSize: 16,
    fontWeight: '400' as const,
  },
  button: {
    fontSize: 16,
    fontWeight: '600' as const,
  },
};
