import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  Dimensions,
  SafeAreaView,
  Platform,
  ImageBackground,
  Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import PropertyCard from '../components/PropertyCard';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

const Home = () => {
  const router = useRouter();
  const [activeCity, setActiveCity] = useState('All');

  const cities = [
    { id: '1', name: 'All', projects: 171, available: 80 },
    { id: '2', name: 'Chennai', projects: 117, available: 44 },
    { id: '3', name: 'Bengaluru', projects: 20, available: 13 },
    { id: '4', name: 'Coimbatore', projects: 21, available: 10 },
    { id: '5', name: 'Hyderabad', projects: 10, available: 10 },
  ];

  const featuredProperties = [
    { id: '1', title: 'Casagrand Zenith', location: 'Chennai, TN', price: '$44L to $80L', beds: 2, image: require('../assets/images/house1.jpg'), status: 'Ongoing', acres: '2.5' },
    { id: '2', title: 'Casagrand Bloom', location: 'Bengaluru, KA', price: '$85L to $1.2Cr', beds: 3, image: require('../assets/images/house2.jpg'), status: 'New Launch', acres: '5.0' },
    { id: '3', title: 'Casagrand Estia', location: 'Chennai, TN', price: '$53L to $73L', beds: 2, image: require('../assets/images/banner.png'), status: 'Launching', acres: '2.4' },
    { id: '4', title: 'Casagrand Casablanca', location: 'Coimbatore, TN', price: '$1.2Cr to $3.7Cr', beds: 4, image: require('../assets/images/house1.jpg'), status: 'Ongoing', acres: '18.0' },
    { id: '5', title: 'Casagrand Highcity', location: 'Hyderabad, TS', price: '$49L to $67L', beds: 2, image: require('../assets/images/house2.jpg'), status: 'Ongoing', acres: '41.0' },
    { id: '6', title: 'Royal Paradise', location: 'Dubai, UAE', price: '$2.5Cr to $5Cr', beds: 5, image: require('../assets/images/banner.png'), status: 'Ready to Move', acres: '10.0' },
    { id: '7', title: 'Green Meadows', location: 'Pune, MH', price: '$35L to $60L', beds: 1, image: require('../assets/images/house1.jpg'), status: 'Ongoing', acres: '3.5' },
    { id: '8', title: 'Skyline Terrace', location: 'Mumbai, MH', price: '$1.5Cr to $3Cr', beds: 3, image: require('../assets/images/house2.jpg'), status: 'New Launch', acres: '1.2' },
    { id: '9', title: 'Ocean View', location: 'Goa, GA', price: '$80L to $1.5Cr', beds: 2, image: require('../assets/images/banner.png'), status: 'Ongoing', acres: '2.0' },
    { id: '10', title: 'Urban Heights', location: 'Gurgaon, HR', price: '$90L to $2Cr', beds: 3, image: require('../assets/images/house1.jpg'), status: 'New Launch', acres: '4.5' },
    { id: '11', title: 'Elite Enclave', location: 'Noida, UP', price: '$70L to $1.2Cr', beds: 3, image: require('../assets/images/house2.jpg'), status: 'Ongoing', acres: '3.8' },
    { id: '12', title: 'The Grand', location: 'Kolkata, WB', price: '$50L to $95L', beds: 2, image: require('../assets/images/banner.png'), status: 'Launching', acres: '2.2' },
  ];

  const [isCallModalVisible, setIsCallModalVisible] = useState(false);
  const supportNumber = "+91 98765 43210";

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Call Support Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isCallModalVisible}
        onRequestClose={() => setIsCallModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.callModalContent}>
            <View style={styles.modalHeader}>
              <View style={styles.iconCircle}>
                <Ionicons name="call" size={32} color="#000" />
              </View>
              <Text style={styles.modalTitle}>Contact Support</Text>
              <Text style={styles.modalSub}>Our agents are available 24/7 to assist you.</Text>
            </View>

            <View style={styles.numberBox}>
              <Text style={styles.numberLabel}>Direct Line</Text>
              <Text style={styles.phoneNumber}>{supportNumber}</Text>
            </View>

            <TouchableOpacity style={styles.modalCallBtn} onPress={() => setIsCallModalVisible(false)}>
              <Ionicons name="call" size={20} color="#000" />
              <Text style={styles.modalCallBtnText}>Call Now</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalCloseBtn} onPress={() => setIsCallModalVisible(false)}>
              <Text style={styles.modalCloseBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Header */}
      <SafeAreaView style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.logoRow}>
            <Text style={styles.logoText}>REAL NEST</Text>
            <View style={styles.logoTag} />
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity 
              style={styles.callBtn}
              onPress={() => setIsCallModalVisible(true)}
            >
              <Ionicons name="call" size={18} color="#000" />
              <Text style={styles.callBtnText}>Book Appointment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
              <Ionicons name="menu-outline" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Full-Width Luxury Hero Section */}
        <View style={styles.heroSection}>
          <ImageBackground 
            source={require('../assets/images/home_hero.png')} 
            style={styles.heroBg}
          >
            <View style={styles.heroOverlay}>
              <Text style={styles.heroMainTitle}>Residential Projects - Real Nest</Text>
              
              {/* Vertical Floating Actions */}
              <View style={styles.floatingActions}>
                <TouchableOpacity style={styles.floatBtn}>
                  <Ionicons name="create-outline" size={20} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.floatBtn}>
                  <Ionicons name="call-outline" size={20} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.floatBtn, { backgroundColor: '#25D366' }]}>
                  <Ionicons name="logo-whatsapp" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>

          {/* City Stats Tabs */}
          <View style={styles.tabsContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {cities.map(city => (
                <TouchableOpacity 
                  key={city.id} 
                  style={[styles.cityTab, activeCity === city.name && styles.activeCityTab]}
                  onPress={() => setActiveCity(city.name)}
                >
                  <Text style={[styles.cityName, activeCity === city.name && styles.activeCityName]}>{city.name}</Text>
                  <Text style={[styles.cityStat, activeCity === city.name && styles.activeCityStat]}>Projects - {city.projects}</Text>
                  <Text style={[styles.cityStat, activeCity === city.name && styles.activeCityStat]}>Available - {city.available}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>

        <View style={styles.mainContent}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Developments</Text>
          </View>
          <View style={styles.propertyGrid}>
            {featuredProperties.map(prop => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/Home')}>
          <Ionicons name="home" size={22} color="#FBB03B" />
          <Text style={[styles.navText, { color: '#FBB03B' }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/Payments')}>
          <Ionicons name="business" size={22} color="#6b7280" />
          <Text style={styles.navText}>Projects</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/Favorites')}>
          <Ionicons name="heart-outline" size={22} color="#6b7280" />
          <Text style={styles.navText}>Saved</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/Profile')}>
          <Ionicons name="person-outline" size={22} color="#6b7280" />
          <Text style={styles.navText}>Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: Platform.OS === 'web' ? 20 : 65, // Increased for maximum status bar safety
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#000',
    letterSpacing: -1,
  },
  logoTag: {
    width: 15,
    height: 15,
    backgroundColor: '#FBB03B',
    marginLeft: 4,
    transform: [{ skewX: '-20deg' }],
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  callModalContent: {
    backgroundColor: '#fff',
    width: '100%',
    maxWidth: 400,
    borderRadius: 25,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 25,
  },
  iconCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FBB03B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#000',
    marginBottom: 8,
  },
  modalSub: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  numberBox: {
    width: '100%',
    backgroundColor: '#F8F9FB',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  numberLabel: {
    fontSize: 12,
    color: '#9ca3af',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 5,
  },
  phoneNumber: {
    fontSize: 26,
    fontWeight: '900',
    color: '#000',
    letterSpacing: 1,
  },
  modalCallBtn: {
    backgroundColor: '#FBB03B',
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  modalCallBtnText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '800',
  },
  modalCloseBtn: {
    paddingVertical: 10,
  },
  modalCloseBtnText: {
    color: '#9ca3af',
    fontSize: 14,
    fontWeight: '700',
  },
  callBtn: {
    backgroundColor: '#FBB03B',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    gap: 6,
  },
  callBtnText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#000',
  },
  iconBtn: {
    padding: 4,
  },
  heroSection: {
    width: '100%',
    height: 350,
    overflow: 'hidden',
  },
  heroBg: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heroMainTitle: {
    color: '#fff',
    fontSize: 42,
    fontWeight: '900',
    textAlign: 'center',
    letterSpacing: -1,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  floatingActions: {
    position: 'absolute',
    right: 15,
    top: 50,
    gap: 10,
  },
  floatBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FBB03B',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  tabsContainer: {
    backgroundColor: '#f3f4f6',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  cityTab: {
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
    minWidth: 180,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  activeCityTab: {
    backgroundColor: '#FBB03B',
    borderRightColor: '#FBB03B',
  },
  cityName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#000',
    marginBottom: 4,
  },
  activeCityName: {
    color: '#000',
  },
  cityStat: {
    fontSize: 11,
    color: '#4b5563',
    fontWeight: '600',
  },
  activeCityStat: {
    color: '#000',
  },
  mainContent: {
    paddingTop: 40,
    paddingHorizontal: Platform.OS === 'web' ? 40 : 15,
    maxWidth: 1600,
    alignSelf: 'center',
    width: '100%',
  },
  propertyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 0,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    justifyContent: 'space-around',
    paddingBottom: Platform.OS === 'ios' ? 30 : 15,
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
  },
  navText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#6b7280',
  },
});

export default Home;
