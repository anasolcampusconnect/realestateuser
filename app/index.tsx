import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  Dimensions, 
  SafeAreaView,
  Platform,
  ImageBackground
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const { width, height } = Dimensions.get('window');

const Landing = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground 
        source={require('../assets/images/landing_bg.png')} 
        style={styles.background}
      >
        <View style={styles.overlay}>
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.logoRow}>
              <Text style={styles.logoText}>REAL NEST</Text>
              <View style={styles.logoTag} />
            </View>

            <View style={styles.content}>
              <Text style={styles.welcomeText}>Welcome to</Text>
              <Text style={styles.mainTitle}>Premium Luxury Living</Text>
              <Text style={styles.subTitle}>
                Discover the most prestigious residential projects crafted for your aspirations.
              </Text>

              <View style={styles.btnContainer}>
                <TouchableOpacity 
                  style={styles.primaryBtn} 
                  onPress={() => router.push('/Home')}
                >
                  <Text style={styles.primaryBtnText}>EXPLORE PROJECTS</Text>
                  <Ionicons name="arrow-forward" size={18} color="#000" />
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.secondaryBtn} 
                  onPress={() => router.push('/Login')}
                >
                  <Text style={styles.secondaryBtnText}>Login to Dashboard</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Part of the Real Nest Global Ventures</Text>
            </View>
          </SafeAreaView>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  safeArea: {
    flex: 1,
    width: Platform.OS === 'web' ? '67%' : '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 60,
    left: 40,
  },
  logoText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: -1,
  },
  logoTag: {
    width: 20,
    height: 20,
    backgroundColor: '#FBB03B',
    marginLeft: 6,
    transform: [{ skewX: '-20deg' }],
  },
  content: {
    marginTop: 80,
    maxWidth: 600,
  },
  welcomeText: {
    color: '#FBB03B',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  mainTitle: {
    color: '#fff',
    fontSize: 48,
    fontWeight: '900',
    lineHeight: 56,
    marginTop: 15,
  },
  subTitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 18,
    lineHeight: 28,
    marginTop: 25,
    fontWeight: '500',
  },
  btnContainer: {
    marginTop: 50,
    flexDirection: 'row',
    gap: 20,
    flexWrap: 'wrap',
  },
  primaryBtn: {
    backgroundColor: '#FBB03B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 4,
    gap: 10,
    minWidth: 220,
  },
  primaryBtnText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  secondaryBtn: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: 4,
    minWidth: 220,
  },
  secondaryBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  footerText: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
});

export default Landing;
