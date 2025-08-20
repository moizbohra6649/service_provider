import { StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../theme';

export const commonStyles = StyleSheet.create({
  // Splash, Login, OTP
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: SIZES?.padding ?? 16,
  },
  logoShadow: {
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 10,
    borderRadius: 80,
    backgroundColor: COLORS.white,
    padding: 10,
    marginBottom: SIZES?.base ?? 8,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  title: {
    ...FONTS?.title,
    color: COLORS.white,
    marginTop: 8,
    letterSpacing: 1,
  },
  form: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: COLORS.inputBg,
    padding: SIZES?.base ? SIZES.base * 2 : 16,
    borderRadius: SIZES?.radius ? SIZES.radius * 2 : 20,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: SIZES?.radius ? SIZES.radius * 1.5 : 12,
    marginBottom: SIZES?.base ? SIZES.base * 2 : 16,
    paddingHorizontal: SIZES?.base ? SIZES.base * 1.5 : 12,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 50,
    color: COLORS.text,
    ...FONTS?.input,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES?.base ? SIZES.base * 1.5 : 12,
    borderRadius: SIZES?.radius ? SIZES.radius * 1.5 : 12,
    width: '100%',
    alignItems: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    color: COLORS.white,
    ...FONTS?.button,
    letterSpacing: 1,
    fontWeight: 'bold',
  },

  // Become Provider
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#6a1b9a',
    paddingHorizontal: 15,
    paddingVertical: 16,
  },
  scroll: {
    padding: 16,
    paddingBottom: 100,
  },
  dropdownContainer: {
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dropdown: {
    height: 50,
    width: '100%',
  },
  dropdownLabel: {
    paddingHorizontal: 10,
    paddingTop: 10,
    color: '#444',
    fontWeight: '500',
  },
  uploadBtn: {
    backgroundColor: '#ece6f2',
    padding: 12,
    borderRadius: 10,
    marginTop: 12,
    alignItems: 'center',
  },
  uploadText: {
    color: '#6a1b9a',
    fontWeight: '600',
  },
  previewImage: {
    width: 120,
    height: 120,
    marginTop: 8,
    alignSelf: 'center',
    borderRadius: 8,
  },
  submitBtn: {
    backgroundColor: '#6a1b9a',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  submitText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: SIZES.base * 3,
  },
  header: {
    alignItems: 'center',
    marginBottom: SIZES.base * 3,
  },
  subtitle: {
    ...FONTS.subtitle,
    color: COLORS.white, // Changed to white
    marginTop: 4,
  },
});

export default commonStyles;