import React, { useState, useEffect, useRef } from 'react';
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
  ImageBackground,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFavorites } from '../context/FavoritesContext';

const { width } = Dimensions.get('window');

const PropertyDetails = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState('Overview');
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const propertyId = typeof id === 'string' ? id : 'default-id';
  const isFav = isFavorite(propertyId);

  const images = [
    require('../assets/images/house1.jpg'),
    require('../assets/images/house2.jpg'),
    require('../assets/images/banner.png'),
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(width);
  const scrollViewRef = useRef<ScrollView>(null);
  // Smooth scroll to active image when currentImageIndex changes
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: currentImageIndex * containerWidth,
        animated: true,
      });
    }
  }, [currentImageIndex, containerWidth]);

  const handleLayout = (event: any) => {
    const { width: layoutWidth } = event.nativeEvent.layout;
    if (layoutWidth > 0) {
      setContainerWidth(layoutWidth);
    }
  };

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / containerWidth);
    if (newIndex !== currentImageIndex && newIndex >= 0 && newIndex < images.length) {
      setCurrentImageIndex(newIndex);
    }
  };

  const amenities = [
    { name: 'Swimming Pool', icon: 'water-outline' },
    { name: 'Gymnasium', icon: 'fitness-outline' },
    { name: 'Club House', icon: 'home-outline' },
    { name: 'Kids Play Area', icon: 'football-outline' },
    { name: 'Jogging Track', icon: 'walk-outline' },
    { name: '24/7 Security', icon: 'shield-checkmark-outline' },
  ];

  const toggleFavorite = () => {
    if (isFav) {
      removeFavorite(propertyId);
    } else {
      addFavorite({
        id: propertyId,
        title: 'Real Nest Casablanca',
        location: 'Kanakapura Road, Bengaluru',
        price: '₹ 1.20 Cr - ₹ 3.70 Cr',
        beds: 3,
        image: images[0],
        status: 'NEW LAUNCH',
        acres: '18 Acres'
      });
      if (Platform.OS === 'web') {
        window.alert('Added to wishlist');
      } else {
        Alert.alert('Wishlist', 'Added to wishlist');
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <View style={styles.mainWrapper}>
        {/* Left Side: Immersive Image (Web) / Top: Hero (Mobile) */}
        <View style={styles.leftColumn}>
          <View style={styles.heroContainer} onLayout={handleLayout}>
            <ScrollView
              ref={scrollViewRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={handleScroll}
              style={{ width: '100%', height: '100%' }}
            >
              {images.map((img, idx) => (
                <TouchableOpacity
                  key={idx}
                  activeOpacity={0.95}
                  onPress={() => {
                    setCurrentImageIndex((prev) => (prev + 1) % images.length);
                  }}
                  style={{ width: containerWidth, height: '100%' }}
                >
                  <Image source={img} style={styles.heroImage} resizeMode="cover" />
                </TouchableOpacity>
              ))}
            </ScrollView>

            <SafeAreaView style={styles.headerOverlay}>
              <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color="#000" />
              </TouchableOpacity>
              <View style={styles.headerRight}>
                <TouchableOpacity style={styles.circleBtn}>
                  <Ionicons name="share-social-outline" size={22} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.circleBtn} onPress={toggleFavorite}>
                  <Ionicons name={isFav ? "heart" : "heart-outline"} size={22} color={isFav ? "#ff4b4b" : "#000"} />
                </TouchableOpacity>
              </View>
            </SafeAreaView>
            
            <View style={styles.imageCounter}>
              <Text style={styles.counterText}>{currentImageIndex + 1} / {images.length}</Text>
            </View>
          </View>
        </View>

        {/* Right Side: Description & Details */}
        <View style={styles.rightColumn}>
          <ScrollView showsVerticalScrollIndicator={false} bounces={false} style={styles.detailsScroll}>
            <View style={styles.contentCard}>
              {/* Main Title & Status */}
              <View style={styles.mainInfo}>
                <View style={styles.statusBadge}>
                  <Text style={styles.statusText}>NEW LAUNCH</Text>
                </View>
                <Text style={styles.title}>Real Nest Casablanca - Luxury Residential Projects</Text>
                <View style={styles.locationRow}>
                  <Ionicons name="location" size={18} color="#FBB03B" />
                  <Text style={styles.locationText}>Kanakapura Road, Bengaluru</Text>
                </View>
              </View>

              {/* Pricing Section */}
              <View style={styles.priceContainer}>
                <View>
                  <Text style={styles.priceLabel}>Starting Price</Text>
                  <Text style={styles.priceValue}>₹ 1.20 Cr - ₹ 3.70 Cr</Text>
                </View>
                <TouchableOpacity style={styles.emiBtn} onPress={() => router.push('/Payments')}>
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
              <View style={styles.tabOuterContainer}>
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.tabScrollContent}
                >
                  {['Overview', 'Amenities', 'Documents', 'Payments', 'Location'].map(tab => (
                    <TouchableOpacity 
                      key={tab} 
                      onPress={() => setActiveTab(tab)}
                      style={[styles.tab, activeTab === tab && styles.activeTab]}
                    >
                      <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {activeTab === 'Overview' && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Project Overview</Text>
                  <Text style={styles.description}>
                    Experience the epitome of luxury living at Real Nest Casablanca. This prestigious 
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

              {activeTab === 'Documents' && (
                <View style={styles.section}>
                  <View style={styles.sectionHeaderRow}>
                    <Text style={styles.sectionTitle}>Official Agreements</Text>
                    <TouchableOpacity style={styles.viewMoreLink} onPress={() => router.push('/Documents')}>
                      <Text style={styles.viewMoreText}>View All Page</Text>
                      <Ionicons name="arrow-forward" size={14} color="#FBB03B" />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.sectionSub}>Review or download essential legal documentation for this property.</Text>
                  
                  <View style={styles.detailDocList}>
                    <View style={styles.detailDocCard}>
                      <View style={styles.detailDocIconBg}>
                        <Ionicons name="document-text" size={20} color="#000" />
                      </View>
                      <View style={styles.detailDocMeta}>
                        <Text style={styles.detailDocTitle}>Sale Agreement Draft</Text>
                        <Text style={styles.detailDocInfo}>PDF • 2.4 MB • Approved</Text>
                      </View>
                      <TouchableOpacity style={styles.detailDocActionBtn} onPress={() => router.push('/Documents')}>
                        <Ionicons name="download-outline" size={18} color="#000" />
                      </TouchableOpacity>
                    </View>

                    <View style={styles.detailDocCard}>
                      <View style={styles.detailDocIconBg}>
                        <Ionicons name="shield-checkmark" size={20} color="#000" />
                      </View>
                      <View style={styles.detailDocMeta}>
                        <Text style={styles.detailDocTitle}>Title Deed & Patta</Text>
                        <Text style={styles.detailDocInfo}>PDF • 4.1 MB • Verified</Text>
                      </View>
                      <TouchableOpacity style={styles.detailDocActionBtn} onPress={() => router.push('/Documents')}>
                        <Ionicons name="download-outline" size={18} color="#000" />
                      </TouchableOpacity>
                    </View>

                    <View style={styles.detailDocCard}>
                      <View style={styles.detailDocIconBg}>
                        <Ionicons name="business" size={20} color="#000" />
                      </View>
                      <View style={styles.detailDocMeta}>
                        <Text style={styles.detailDocTitle}>RERA Certificate</Text>
                        <Text style={styles.detailDocInfo}>PDF • 950 KB • Approved</Text>
                      </View>
                      <TouchableOpacity style={styles.detailDocActionBtn} onPress={() => router.push('/Documents')}>
                        <Ionicons name="download-outline" size={18} color="#000" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}

              {activeTab === 'Payments' && (
                <View style={styles.section}>
                  <View style={styles.sectionHeaderRow}>
                    <Text style={styles.sectionTitle}>Booking & Payments</Text>
                    <TouchableOpacity style={styles.viewMoreLink} onPress={() => router.push('/Payments')}>
                      <Text style={styles.viewMoreText}>View Ledger</Text>
                      <Ionicons name="arrow-forward" size={14} color="#FBB03B" />
                    </TouchableOpacity>
                  </View>
                  
                  {/* EMI Calculator Preview */}
                  <View style={styles.paymentCardPreview}>
                    <Text style={styles.paymentCardLabel}>Estimated EMI Details</Text>
                    <View style={styles.emiPreviewGrid}>
                      <View style={styles.emiPreviewItem}>
                        <Text style={styles.emiPreviewTitle}>Loan Amount (80%)</Text>
                        <Text style={styles.emiPreviewVal}>₹ 96.0 Lakhs</Text>
                      </View>
                      <View style={styles.emiPreviewItem}>
                        <Text style={styles.emiPreviewTitle}>Interest Rate</Text>
                        <Text style={styles.emiPreviewVal}>8.5% p.a.</Text>
                      </View>
                      <View style={styles.emiPreviewItem}>
                        <Text style={styles.emiPreviewTitle}>Tenure</Text>
                        <Text style={styles.emiPreviewVal}>20 Years</Text>
                      </View>
                      <View style={styles.emiPreviewItem}>
                        <Text style={styles.emiPreviewTitle}>Monthly EMI</Text>
                        <Text style={styles.emiPreviewValGold}>₹ 83,300/mo</Text>
                      </View>
                    </View>
                    <TouchableOpacity style={styles.cardPayBtn} onPress={() => router.push('/Payments')}>
                      <Text style={styles.cardPayBtnText}>Check Detailed EMI Calculator</Text>
                      <Ionicons name="calculator-outline" size={15} color="#000" />
                    </TouchableOpacity>
                  </View>

                  {/* Advance Booking Trigger */}
                  <View style={styles.paymentCardPreviewDark}>
                    <View style={styles.paymentDarkRow}>
                      <View>
                        <Text style={styles.darkLabel}>Advance Booking Token</Text>
                        <Text style={styles.darkPrice}>₹ 50,000</Text>
                      </View>
                      <TouchableOpacity style={styles.darkActionBtn} onPress={() => router.push('/Payments')}>
                        <Text style={styles.darkActionBtnText}>PAY ADVANCE</Text>
                      </TouchableOpacity>
                    </View>
                    <Text style={styles.darkSub}>Secure your preferred apartment unit immediately. Fully refundable in 48 hours.</Text>
                  </View>
                </View>
              )}

              {activeTab === 'Location' && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Location Advantage</Text>
                  <View style={styles.mapPlaceholder}>
                    <Image 
                      source={require('../assets/images/map_placeholder.png')} 
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

          {/* Fixed Footer within Right Column for Web */}
          <View style={styles.footer}>
            <TouchableOpacity 
              style={styles.iconFooterBtn}
              onPress={() => {
                const referenceId = Math.floor(100000 + Math.random() * 900000);
                if (Platform.OS === 'web') {
                  window.alert(`Calling Support: +91 98765 43210\nYour Call Query Reference: #${referenceId}`);
                } else {
                  Alert.alert(
                    'Calling Support', 
                    `Initiating call to +91 98765 43210\n\nYour Call Query Reference: #${referenceId}`,
                    [{ text: 'OK' }]
                  );
                }
              }}
            >
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainWrapper: {
    flex: 1,
    flexDirection: Platform.OS === 'web' && width > 900 ? 'row' : 'column',
  },
  leftColumn: {
    flex: Platform.OS === 'web' && width > 900 ? 1.2 : undefined,
    height: Platform.OS === 'web' && width > 900 ? '100%' : undefined,
  },
  rightColumn: {
    flex: 1,
    backgroundColor: '#fff',
  },
  detailsScroll: {
    flex: 1,
  },
  heroContainer: {
    width: '100%',
    height: Platform.OS === 'web' && width > 900 ? '100%' : 350,
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
    paddingTop: Platform.OS === 'android' ? 50 : 50, // Increased for status bar safety
    zIndex: 10,
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
    bottom: Platform.OS === 'web' && width > 900 ? 40 : 50,
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
    borderTopLeftRadius: Platform.OS === 'web' && width > 900 ? 0 : 35,
    borderTopRightRadius: Platform.OS === 'web' && width > 900 ? 0 : 35,
    marginTop: Platform.OS === 'web' && width > 900 ? 0 : -35,
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
  tabOuterContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    marginBottom: 25,
  },
  tabScrollContent: {
    paddingHorizontal: 25,
    flexDirection: 'row',
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
    width: '30%',
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
    paddingBottom: Platform.OS === 'web' ? 20 : (Platform.OS === 'ios' ? 42 : 30),
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
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  viewMoreLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewMoreText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FBB03B',
  },
  sectionSub: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 20,
    fontWeight: '500',
  },
  detailDocList: {
    gap: 12,
  },
  detailDocCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F8F9',
    borderRadius: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  detailDocIconBg: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: '#FBB03B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailDocMeta: {
    flex: 1,
    marginLeft: 12,
  },
  detailDocTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
  },
  detailDocInfo: {
    fontSize: 11,
    color: '#6b7280',
    marginTop: 2,
    fontWeight: '600',
  },
  detailDocActionBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentCardPreview: {
    backgroundColor: '#F7F8F9',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 20,
  },
  paymentCardLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  emiPreviewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 15,
  },
  emiPreviewItem: {
    width: '46%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  emiPreviewTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: '#9ca3af',
  },
  emiPreviewVal: {
    fontSize: 13,
    fontWeight: '800',
    color: '#000',
    marginTop: 2,
  },
  emiPreviewValGold: {
    fontSize: 13,
    fontWeight: '900',
    color: '#FBB03B',
    marginTop: 2,
  },
  cardPayBtn: {
    backgroundColor: '#FBB03B',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 12,
  },
  cardPayBtnText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#000',
  },
  paymentCardPreviewDark: {
    backgroundColor: '#000',
    borderRadius: 18,
    padding: 18,
  },
  paymentDarkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  darkLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#9ca3af',
    textTransform: 'uppercase',
  },
  darkPrice: {
    fontSize: 22,
    fontWeight: '900',
    color: '#FBB03B',
    marginTop: 2,
  },
  darkActionBtn: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  darkActionBtnText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#000',
  },
  darkSub: {
    fontSize: 11,
    color: '#9ca3af',
    lineHeight: 15,
    fontWeight: '500',
  },
});

export default PropertyDetails;
