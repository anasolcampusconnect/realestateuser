import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  KeyboardAvoidingView, 
  Platform,
  Dimensions,
  Image,
  ImageBackground
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '../constants/theme';

const { width, height } = Dimensions.get('window');

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Left Panel - Image (Web Only) */}
      {Platform.OS === 'web' && width > 800 && (
        <View style={styles.leftPanel}>
          <ImageBackground 
            source={require('../assets/images/landing_bg.png')} 
            style={styles.heroImage}
            resizeMode="cover"
          >
            <View style={styles.heroOverlay}>
              <View style={styles.heroHeader}>
                <View style={styles.heroLogoCircle}>
                  <Ionicons name="business" size={24} color={Colors.white} />
                </View>
                <View>
                  <Text style={styles.heroLogoText}>REAL</Text>
                  <Text style={styles.heroLogoSub}>NEST</Text>
                </View>
              </View>

              <View style={styles.heroContent}>
                <Text style={styles.heroTitle}>Find Your{"\n"}Sweet Home</Text>
                <Text style={styles.heroSubtitle}>
                  Schedule visit just a few clicks, visit in just a few clicks
                </Text>
                <View style={styles.dotRow}>
                  <View style={[styles.dot, styles.activeDot]} />
                  <View style={styles.dot} />
                  <View style={styles.dot} />
                </View>
              </View>
            </View>
          </ImageBackground>
        </View>
      )}

      {/* Right Panel - Form */}
      <View style={styles.rightPanel}>
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.formWrapper}
          >
            <View style={styles.formHeader}>
              <TouchableOpacity style={styles.topBtn} onPress={() => router.push('/Register')}>
                <Text style={styles.topBtnText}>Sign Up</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.formContent}>
              <Text style={styles.welcomeTitle}>Welcome Back to{"\n"}Real Nest!</Text>
              <Text style={styles.welcomeSub}>Sign in to your account</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Your Email</Text>
                <TextInput 
                  style={styles.input}
                  placeholder="info.user@mail.com"
                  placeholderTextColor={Colors.textLight}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <View style={styles.passwordWrapper}>
                  <TextInput 
                    style={styles.passwordInput}
                    placeholder="••••••••"
                    placeholderTextColor={Colors.textLight}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                  <TouchableOpacity>
                    <Ionicons name="eye-outline" size={20} color={Colors.textMuted} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.formFooter}>
                <TouchableOpacity 
                  style={styles.rememberRow} 
                  onPress={() => setRememberMe(!rememberMe)}
                >
                  <View style={[styles.checkbox, rememberMe && styles.checkboxActive]}>
                    {rememberMe && <Ionicons name="checkmark" size={12} color={Colors.white} />}
                  </View>
                  <Text style={styles.rememberText}>Remember Me</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.forgotText}>Forget Password?</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.loginBtn} onPress={() => router.push('/Home')}>
                <Text style={styles.loginBtnText}>Log In</Text>
              </TouchableOpacity>

              <View style={styles.bottomLinkRow}>
                <Text style={styles.bottomLinkText}>Don't have any account? </Text>
                <TouchableOpacity onPress={() => router.push('/Register')}>
                  <Text style={styles.bottomLinkAction}>Register</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.background,
  },
  leftPanel: {
    flex: 1.2,
    backgroundColor: Colors.secondary,
  },
  heroImage: {
    flex: 1,
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: 'rgba(30, 33, 25, 0.45)',
    padding: 60,
    justifyContent: 'space-between',
  },
  heroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  heroLogoCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroLogoText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1,
  },
  heroLogoSub: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '400',
    marginTop: -4,
  },
  heroContent: {
    paddingBottom: 40,
  },
  heroTitle: {
    color: Colors.white,
    fontSize: 56,
    fontWeight: '900',
    lineHeight: 64,
    marginBottom: 20,
  },
  heroSubtitle: {
    color: 'rgba(250,249,245,0.85)',
    fontSize: 18,
    fontWeight: '500',
    maxWidth: 400,
    lineHeight: 28,
    marginBottom: 40,
  },
  dotRow: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(250,249,245,0.25)',
  },
  activeDot: {
    width: 24,
    backgroundColor: Colors.primary,
  },
  rightPanel: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  formWrapper: {
    flex: 1,
    paddingHorizontal: Platform.OS === 'web' ? '15%' : 30,
  },
  formHeader: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingTop: Platform.OS === 'web' ? 0 : 40, // Added for mobile status bar safety
  },
  topBtn: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 20,
  },
  topBtnText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  formContent: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 60,
  },
  welcomeTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: Colors.text,
    lineHeight: 44,
    marginBottom: 8,
  },
  welcomeSub: {
    fontSize: 16,
    color: Colors.textMuted,
    marginBottom: 40,
    fontWeight: '500',
  },
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 10,
  },
  input: {
    backgroundColor: Colors.inputBg,
    borderWidth: 1.5,
    borderColor: Colors.inputBorder,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: Colors.text,
  },
  passwordWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputBg,
    borderWidth: 1.5,
    borderColor: Colors.inputBorder,
    borderRadius: 10,
    paddingHorizontal: 16,
  },
  passwordInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: Colors.text,
  },
  formFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 35,
  },
  rememberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  rememberText: {
    fontSize: 14,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  forgotText: {
    fontSize: 14,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  loginBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: Colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  loginBtnText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '800',
  },
  bottomLinkRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bottomLinkText: {
    fontSize: 14,
    color: Colors.textMuted,
    fontWeight: '500',
  },
  bottomLinkAction: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '800',
  },
});

export default Login;
