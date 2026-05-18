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
  Modal,
  TextInput,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import PropertyCard from '../components/PropertyCard';
import BottomNav from '../components/BottomNav';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

const Home = () => {
  const router = useRouter();
  const [activeCity, setActiveCity] = useState('All');
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const cities = [
    { id: '1', name: 'All', projects: 171, available: 80 },
    { id: '2', name: 'Chennai', projects: 117, available: 44 },
    { id: '3', name: 'Bengaluru', projects: 20, available: 13 },
    { id: '4', name: 'Coimbatore', projects: 21, available: 10 },
    { id: '5', name: 'Hyderabad', projects: 10, available: 10 },
    { id: '6', name: 'Dubai', projects: 1, available: 1 },
    { id: '7', name: 'Pune', projects: 2, available: 2 },
    { id: '8', name: 'Delhi', projects: 'NA', available: 'NA' },
  ];

  const featuredProperties = [
    { id: '1', title: 'Real Nest Zenith', location: 'Chennai, TN', price: '$44L to $80L', beds: 2, image: require('../assets/images/house1.jpg'), status: 'Ongoing', acres: '2.5' },
    { id: '2', title: 'Real Nest Bloom', location: 'Bengaluru, KA', price: '$85L to $1.2Cr', beds: 3, image: require('../assets/images/house2.jpg'), status: 'New Launch', acres: '5.0' },
    { id: '3', title: 'Real Nest Estia', location: 'Chennai, TN', price: '$53L to $73L', beds: 2, image: require('../assets/images/banner.png'), status: 'Launching', acres: '2.4' },
    { id: '4', title: 'Real Nest Casablanca', location: 'Coimbatore, TN', price: '$1.2Cr to $3.7Cr', beds: 4, image: require('../assets/images/house1.jpg'), status: 'Ongoing', acres: '18.0' },
    { id: '5', title: 'Real Nest Highcity', location: 'Hyderabad, TS', price: '$49L to $67L', beds: 2, image: require('../assets/images/house2.jpg'), status: 'Ongoing', acres: '41.0' },
    { id: '6', title: 'Royal Paradise', location: 'Dubai, UAE', price: '$2.5Cr to $5Cr', beds: 5, image: require('../assets/images/banner.png'), status: 'Ready to Move', acres: '10.0' },
    { id: '7', title: 'Green Meadows', location: 'Pune, MH', price: '$35L to $60L', beds: 1, image: require('../assets/images/house1.jpg'), status: 'Ongoing', acres: '3.5' },
    { id: '8', title: 'Skyline Terrace', location: 'Mumbai, MH', price: '$1.5Cr to $3Cr', beds: 3, image: require('../assets/images/house2.jpg'), status: 'New Launch', acres: '1.2' },
    { id: '9', title: 'Ocean View', location: 'Goa, GA', price: '$80L to $1.5Cr', beds: 2, image: require('../assets/images/banner.png'), status: 'Ongoing', acres: '2.0' },
    { id: '10', title: 'Urban Heights', location: 'Gurgaon, HR', price: '$90L to $2Cr', beds: 3, image: require('../assets/images/house1.jpg'), status: 'New Launch', acres: '4.5' },
    { id: '11', title: 'Elite Enclave', location: 'Noida, UP', price: '$70L to $1.2Cr', beds: 3, image: require('../assets/images/house2.jpg'), status: 'Ongoing', acres: '3.8' },
    { id: '12', title: 'The Grand', location: 'Kolkata, WB', price: '$50L to $95L', beds: 2, image: require('../assets/images/banner.png'), status: 'Launching', acres: '2.2' },
  ];

  const filteredProperties = activeCity === 'All' 
    ? featuredProperties 
    : featuredProperties.filter(prop => prop.location.includes(activeCity));

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

      {/* Hamburger Menu Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isMenuVisible}
        onRequestClose={() => setIsMenuVisible(false)}
      >
        <TouchableOpacity 
          style={styles.menuOverlay} 
          activeOpacity={1} 
          onPress={() => setIsMenuVisible(false)}
        >
          <View style={styles.menuDropdown}>
            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={() => { setIsMenuVisible(false); setIsSearchVisible(true); }}
            >
              <Ionicons name="search-outline" size={20} color="#000" />
              <Text style={styles.menuItemText}>Search</Text>
            </TouchableOpacity>
            
            <View style={styles.menuDivider} />

            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={() => { setIsMenuVisible(false); router.push('/Profile'); }}
            >
              <Ionicons name="person-outline" size={20} color="#000" />
              <Text style={styles.menuItemText}>Profile</Text>
            </TouchableOpacity>

            <View style={styles.menuDivider} />

            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={() => { 
                setIsMenuVisible(false); 
                if (Platform.OS === 'web') {
                  if (window.confirm('Do you want to log out?')) {
                    router.replace('/');
                  }
                } else {
                  Alert.alert('Log Out', 'Do you want to log out?', [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Log Out', onPress: () => router.replace('/'), style: 'destructive' }
                  ]);
                }
              }}
            >
              <Ionicons name="log-out-outline" size={20} color="#ff4b4b" />
              <Text style={[styles.menuItemText, { color: '#ff4b4b' }]}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
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
            <TouchableOpacity style={styles.iconBtn} onPress={() => setIsMenuVisible(true)}>
              <Ionicons name="menu-outline" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      {/* Conditionally Rendered Search Bar */}
      {isSearchVisible && (
        <View style={styles.searchContainer}>
          <View style={styles.searchInputWrapper}>
            <Ionicons name="search" size={20} color="#6b7280" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search properties, locations..."
              placeholderTextColor="#9ca3af"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={() => {
                setIsSearchVisible(false);
                router.push({ pathname: '/SearchResults', params: { query: searchQuery } });
                setSearchQuery('');
              }}
              autoFocus
            />
            <TouchableOpacity onPress={() => { setIsSearchVisible(false); setSearchQuery(''); }}>
              <Ionicons name="close-circle" size={20} color="#9ca3af" />
            </TouchableOpacity>
          </View>
        </View>
      )}

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
                <TouchableOpacity style={styles.floatBtn} onPress={() => router.push('/Inquiry')}>
                  <Ionicons name="create-outline" size={20} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.floatBtn} onPress={() => setIsCallModalVisible(true)}>
                  <Ionicons name="call-outline" size={20} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.floatBtn, { backgroundColor: '#25D366' }]}
                  onPress={() => {
                    if (Platform.OS === 'web') {
                      window.alert('Opening WhatsApp Support chat with +91 98765 43210...');
                    } else {
                      Alert.alert('WhatsApp Support', 'Opening WhatsApp Support chat with +91 98765 43210...');
                    }
                  }}
                >
                  <Ionicons name="logo-whatsapp" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.mainContent}>
          {/* City Stats Tabs - Moved outside hero for overlap or distinct styling */}
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

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Developments</Text>
          </View>
          <View style={styles.propertyGrid}>
            {filteredProperties.length > 0 ? (
              filteredProperties.slice(0, 9).map(prop => (
                <PropertyCard key={prop.id} property={prop} />
              ))
            ) : (
              <View style={{ padding: 40, alignItems: 'center' }}>
                <Text style={{ fontSize: 16, color: '#6b7280' }}>No properties found for {activeCity}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Professional Advertisement Section */}
        <View style={styles.adContainer}>
          <ImageBackground
            source={require('../assets/images/happy_family.png')}
            style={styles.adBg}
            imageStyle={{ borderRadius: 20 }}
          >
            <View style={styles.adOverlay}>
              <View style={styles.adHeaderRow}>
                <View style={styles.adBadge}>
                  <Text style={styles.adBadgeText}>EXCLUSIVE OFFER</Text>
                </View>
                <View style={styles.ratingBadge}>
                  <Ionicons name="star" size={12} color="#000" />
                  <Text style={styles.ratingBadgeText}>4.9/5 (15k+ Happy Customers)</Text>
                </View>
              </View>
              
              <Text style={styles.adTitle}>Upgrade to Premium Luxury</Text>
              <Text style={styles.adSubTitle}>
                Join over 15,000+ happy customers who found their dream residential spaces through Real Nest. Discover premium properties with zero brokerage today!
              </Text>

              {/* Happy Customer Stats Pills */}
              <View style={styles.trustGrid}>
                <View style={styles.trustPill}>
                  <Ionicons name="people" size={14} color="#FBB03B" />
                  <Text style={styles.trustPillText}>15k+ Happy Families</Text>
                </View>
                <View style={styles.trustPill}>
                  <Ionicons name="checkmark-circle" size={14} color="#FBB03B" />
                  <Text style={styles.trustPillText}>100% Verified Sites</Text>
                </View>
                <View style={styles.trustPill}>
                  <Ionicons name="ribbon" size={14} color="#FBB03B" />
                  <Text style={styles.trustPillText}>Premium Quality</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.adBtn} onPress={() => router.push('/Estates' as any)}>
                <Text style={styles.adBtnText}>Discover Estates</Text>
                <Ionicons name="arrow-forward" size={18} color="#000" />
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav activeTab="Home" />
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
  searchContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    zIndex: 5,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: '#111827',
    outlineStyle: 'none' as any, // For web
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
  menuOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  menuDropdown: {
    position: 'absolute',
    top: Platform.OS === 'web' ? 70 : 100,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    minWidth: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    gap: 12,
  },
  menuItemText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#f3f4f6',
    marginVertical: 2,
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
    backgroundColor: '#d1d5db',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    marginBottom: 35,
    marginTop: -20,
    zIndex: 10,
  },
  cityTab: {
    paddingHorizontal: 25,
    paddingVertical: 20,
    minWidth: 150,
    backgroundColor: '#d1d5db',
    alignItems: 'flex-start',
  },
  activeCityTab: {
    backgroundColor: '#FBB03B',
  },
  cityName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#000',
    marginBottom: 8,
  },
  activeCityName: {
    color: '#000',
  },
  cityStat: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '600',
    marginBottom: 2,
  },
  activeCityStat: {
    color: '#000',
  },
  mainContent: {
    paddingTop: 10,
    paddingHorizontal: Platform.OS === 'web' ? 40 : 15,
    maxWidth: 1600,
    alignSelf: 'center',
    width: '100%',
  },
  propertyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
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
  adContainer: {
    paddingHorizontal: Platform.OS === 'web' ? 40 : 15,
    maxWidth: 1600,
    alignSelf: 'center',
    width: '100%',
    marginTop: 40,
    marginBottom: 20,
  },
  adBg: {
    width: '100%',
    minHeight: 250,
  },
  adOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    borderRadius: 20,
    padding: 35,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  adBadge: {
    backgroundColor: '#FBB03B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginBottom: 15,
  },
  adBadgeText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#000',
    letterSpacing: 1,
  },
  adTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 10,
    maxWidth: '80%',
  },
  adSubTitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 22,
    marginBottom: 25,
    maxWidth: Platform.OS === 'web' ? '60%' : '100%',
    fontWeight: '500',
  },
  adBtn: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 14,
    borderRadius: 8,
    gap: 8,
  },
  adBtnText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '800',
  },
  adHeaderRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  ratingBadge: {
    backgroundColor: '#FBB03B',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  ratingBadgeText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#000',
  },
  trustGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 25,
  },
  trustPill: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  trustPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
});

export default Home;
