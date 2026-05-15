import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  Dimensions,
  SafeAreaView,
  Platform,
  ImageBackground
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

const PropertyDetails = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState('Overview');

  const images = [
    require('../assets/images/house1.jpg'),
    require('../assets/images/house2.jpg'),
    require('../assets/images/banner.png'),
  ];

  const amenities = [
    { name: 'Swimming Pool', icon: 'water-outline' },
    { name: 'Gymnasium', icon: 'fitness-outline' },
    { name: 'Club House', icon: 'home-outline' },
    { name: 'Kids Play Area', icon: 'football-outline' },
    { name: 'Jogging Track', icon: 'walk-outline' },
    { name: '24/7 Security', icon: 'shield-checkmark-outline' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        {/* Luxury Hero Image */}
        <View style={styles.heroContainer}>
          <Image source={images[0]} style={styles.heroImage} resizeMode="cover" />
          <SafeAreaView style={styles.headerOverlay}>
            <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#000" />
            </TouchableOpacity>
            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.circleBtn}>
                <Ionicons name="share-social-outline" size={22} color="#000" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.circleBtn}>
                <Ionicons name="heart-outline" size={22} color="#000" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
          
          <View style={styles.imageCounter}>
            <Text style={styles.counterText}>1 / {images.length}</Text>
          </View>
        </View>

        <View style={styles.contentCard}>
          {/* Main Title & Status */}
          <View style={styles.mainInfo}>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>NEW LAUNCH</Text>
            </View>
            <Text style={styles.title}>Casagrand Casablanca - Luxury Residential Projects</Text>
            <View style={styles.locationRow}>
              <Ionicons name="location" size={18} color="#FBB03B" />
              <Text style={styles.locationText}>Kanakapura Road, Bengaluru</Text>
            </View>
          </View>

          {/* Pricing Section */}
          <View style={styles.priceContainer}>
            <View>
              <Text style={styles.priceLabel}>Starting Price</Text>
              <Text style={styles.priceValue}>$1.20 Cr - $3.70 Cr</Text>
            </View>
            <TouchableOpacity style={styles.emiBtn}>
              <Text style={styles.emiText}>Check EMI</Text>
            </TouchableOpacity>
          </View>

          {/* Quick Specs Grid */}
          <View style={styles.specsGrid}>
            <View style={styles.specItem}>
              <Text style={styles.specTitle}>Units</Text>
              <Text style={styles.specValueSmall}>2, 3 & 4 BHK</Text>
            </View>
            <View style={styles.specItem}>
              <Text style={styles.specTitle}>Land Area</Text>
              <Text style={styles.specValueSmall}>18 Acres</Text>
            </View>
            <View style={styles.specItem}>
              <Text style={styles.specTitle}>Status</Text>
              <Text style={styles.specValueSmall}>Under Construction</Text>
            </View>
          </View>

          {/* Navigation Tabs */}
          <View style={styles.tabContainer}>
            {['Overview', 'Amenities', 'Location'].map(tab => (
              <TouchableOpacity 
                key={tab} 
                onPress={() => setActiveTab(tab)}
                style={[styles.tab, activeTab === tab && styles.activeTab]}
              >
                <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {activeTab === 'Overview' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Project Overview</Text>
              <Text style={styles.description}>
                Experience the epitome of luxury living at Casagrand Casablanca. This prestigious 
                residential project offers sprawling 18 acres of premium development with world-class 
                amenities and signature architecture. Perfectly located on Kanakapura Road, it 
                provides seamless connectivity to major IT hubs and lifestyle destinations.
              </Text>
            </View>
          )}

          {activeTab === 'Amenities' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Signature Amenities</Text>
              <View style={styles.amenitiesGrid}>
                {amenities.map(item => (
                  <View key={item.name} style={styles.amenityItem}>
                    <View style={styles.amenityIconBg}>
                      <Ionicons name={item.icon as any} size={24} color="#000" />
                    </View>
                    <Text style={styles.amenityText}>{item.name}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {activeTab === 'Location' && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Location Advantage</Text>
              <View style={styles.mapPlaceholder}>
                <Image 
                  source={{ uri: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000' }} 
                  style={styles.mapImg}
                />
                <View style={styles.mapOverlay}>
                  <TouchableOpacity style={styles.mapBtn}>
                    <Ionicons name="map" size={20} color="#000" />
                    <Text style={styles.mapBtnText}>View on Google Maps</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          <View style={{ height: 120 }} />
        </View>
      </ScrollView>

      {/* Professional Fixed Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.iconFooterBtn}>
          <Ionicons name="call" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.siteVisitBtn} onPress={() => router.push('/SiteVisit')}>
          <Text style={styles.siteVisitText}>BOOK SITE VISIT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.enquireFooterBtn} onPress={() => router.push('/Inquiry')}>
          <Text style={styles.enquireFooterText}>ENQUIRE NOW</Text>
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
  heroContainer: {
    width: '100%',
    height: 350,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'android' ? 40 : 0,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 12,
  },
  backBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FBB03B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FBB03B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageCounter: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  counterText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '800',
  },
  contentCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    marginTop: -35,
    paddingTop: 30,
  },
  mainInfo: {
    paddingHorizontal: 25,
    marginBottom: 25,
  },
  statusBadge: {
    backgroundColor: '#FBB03B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#000',
    lineHeight: 32,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 5,
  },
  locationText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '600',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F7F8F9',
    padding: 20,
    marginHorizontal: 25,
    borderRadius: 15,
    marginBottom: 25,
  },
  priceLabel: {
    fontSize: 12,
    color: '#9ca3af',
    fontWeight: '700',
  },
  priceValue: {
    fontSize: 20,
    fontWeight: '900',
    color: '#000',
    marginTop: 2,
  },
  emiBtn: {
    borderWidth: 1,
    borderColor: '#FBB03B',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  emiText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FBB03B',
  },
  specsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 25,
    justifyContent: 'space-between',
    marginBottom: 35,
  },
  specItem: {
    alignItems: 'flex-start',
    flex: 1,
  },
  specTitle: {
    fontSize: 10,
    color: '#9ca3af',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  specValueSmall: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    paddingHorizontal: 25,
    marginBottom: 25,
  },
  tab: {
    paddingVertical: 12,
    marginRight: 25,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#FBB03B',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#9ca3af',
  },
  activeTabText: {
    color: '#000',
  },
  section: {
    paddingHorizontal: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#000',
    marginBottom: 15,
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 24,
    fontWeight: '500',
  },
  amenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  amenityItem: {
    width: (width - 80) / 3,
    alignItems: 'center',
    marginBottom: 10,
  },
  amenityIconBg: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F7F8F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  amenityText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#4b5563',
    textAlign: 'center',
  },
  mapPlaceholder: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
  },
  mapImg: {
    width: '100%',
    height: '100%',
  },
  mapOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapBtn: {
    backgroundColor: '#FBB03B',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  mapBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#000',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 25,
    paddingVertical: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    gap: 15,
  },
  iconFooterBtn: {
    width: 56,
    height: 56,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FBB03B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  siteVisitBtn: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    height: 56,
  },
  siteVisitText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#fff',
  },
  enquireFooterBtn: {
    flex: 1,
    backgroundColor: '#FBB03B',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    height: 56,
  },
  enquireFooterText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#000',
  },
});

export default PropertyDetails;
