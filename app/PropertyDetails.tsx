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
  Alert,
  Modal
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFavorites } from '../context/FavoritesContext';
import { Colors } from '../constants/theme';

const { width } = Dimensions.get('window');

const PropertyDetails = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState('Overview');
  const [selectedAmenity, setSelectedAmenity] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const propertyId = typeof id === 'string' ? id : 'default-id';
  const isFav = isFavorite(propertyId);

  // Quotation Interactive State
  const [propertyCost, setPropertyCost] = useState(12000000); // Base Selling Price: 1.20 Cr default
  const [carParking, setCarParking] = useState(300000); // 3L
  const [infrastructure, setInfrastructure] = useState(250000); // 2.5L
  const [interestRate, setInterestRate] = useState(8.5); // 8.5%
  const [tenureYears, setTenureYears] = useState(20); // 20 years
  const [downPaymentPercent, setDownPaymentPercent] = useState(20); // 20% down payment

  // Totals calculations
  const subTotal = propertyCost + carParking + infrastructure;
  const gstAmount = Math.round(subTotal * 0.12); // 12% GST
  const totalCost = subTotal + gstAmount;

  // Downpayment & Loan Amount
  const downPayment = Math.round(totalCost * (downPaymentPercent / 100));
  const loanAmount = totalCost - downPayment;

  // Monthly EMI
  const monthlyRate = (interestRate / 12) / 100;
  const totalMonths = tenureYears * 12;

  let emi = 0;
  if (monthlyRate > 0) {
    emi = Math.round(
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1)
    );
  } else {
    emi = Math.round(loanAmount / totalMonths);
  }

  // Format Helper
  const formatCurrency = (val: number) => {
    return `₹ ${val.toLocaleString('en-IN')}`;
  };

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
    { 
      name: 'Swimming Pool', 
      icon: 'water-outline', 
      distance: '50m away (Tower A Deck)', 
      image: require('../assets/images/swimming_pool.jpg'), 
      desc: 'Temperature-controlled infinity swimming pool with separate kids\' splash zone, poolside cabanas, and sun decks.',
      blocks: [
        { name: 'Tower A (Luxe)', distance: '20m away', route: 'Direct Poolside Deck' },
        { name: 'Tower B (Premium)', distance: '85m away', route: 'Main Garden Walkway' },
        { name: 'Tower C (Classic)', distance: '140m away', route: 'West Canopy Walkway' },
        { name: 'Tower D (Signature)', distance: '200m away', route: 'North Pathway' }
      ]
    },
    { 
      name: 'Gymnasium', 
      icon: 'fitness-outline', 
      distance: '100m away (Club House L1)', 
      image: require('../assets/images/gymnasium.jpg'), 
      desc: 'State-of-the-art health club powered by premium fitness gear, cardio zones, yoga studio, and personal training experts.',
      blocks: [
        { name: 'Tower A (Luxe)', distance: '110m away', route: 'East Arcade Corridor' },
        { name: 'Tower B (Premium)', distance: '15m away', route: 'Direct Podium Lift' },
        { name: 'Tower C (Classic)', distance: '70m away', route: 'Central Plaza Lift' },
        { name: 'Tower D (Signature)', distance: '120m away', route: 'West Gardens Path' }
      ]
    },
    { 
      name: 'Club House', 
      icon: 'home-outline', 
      distance: '80m away (Central Plaza)', 
      image: require('../assets/images/club_house.jpg'), 
      desc: 'Sprawling 25,000 sq.ft. luxury club house featuring a grand reception lobby, lounge bar, billiards table, and party hall.',
      blocks: [
        { name: 'Tower A (Luxe)', distance: '80m away', route: 'Central Plaza Walkway' },
        { name: 'Tower B (Premium)', distance: '40m away', route: 'Main Plaza Entrance' },
        { name: 'Tower C (Classic)', distance: '90m away', route: 'West Canopy Walk' },
        { name: 'Tower D (Signature)', distance: '15m away', route: 'Direct Lobby Level Access' }
      ]
    },
    { 
      name: 'Kids Play Area', 
      icon: 'football-outline', 
      distance: '120m away (East Lawn)', 
      image: require('../assets/images/kids_play.jpg'), 
      desc: 'Safe, cushioned outdoor kids\' play park with slides, swings, sandbox, and active adventure zones surrounded by green hedges.',
      blocks: [
        { name: 'Tower A (Luxe)', distance: '160m away', route: 'Main Gate Promenade' },
        { name: 'Tower B (Premium)', distance: '110m away', route: 'North Meadow Walk' },
        { name: 'Tower C (Classic)', distance: '30m away', route: 'Direct Courtyard Access' },
        { name: 'Tower D (Signature)', distance: '85m away', route: 'East Arcade Walkway' }
      ]
    },
    { 
      name: 'Jogging Track', 
      icon: 'walk-outline', 
      distance: '10m away (Garden Loop)', 
      image: require('../assets/images/jogging_track.jpg'), 
      desc: 'A scenic, 1.2-kilometer rubberized jogging track winding through landscaped sensory gardens and reflexology pathways.',
      blocks: [
        { name: 'Tower A (Luxe)', distance: '10m away', route: 'Direct Garden Gate' },
        { name: 'Tower B (Premium)', distance: '10m away', route: 'Direct Ground Floor Deck' },
        { name: 'Tower C (Classic)', distance: '10m away', route: 'Direct Garden Loop Entry' },
        { name: 'Tower D (Signature)', distance: '10m away', route: 'Direct Plaza Exit' }
      ]
    },
    { 
      name: '24/7 Security', 
      icon: 'shield-checkmark-outline', 
      distance: 'On-site (All Gates & Towers)', 
      image: require('../assets/images/security.jpg'), 
      desc: 'Multi-tier smart security system including CCTV coverage, video door phones, RFID vehicle access, and 24/7 manned guard posts.',
      blocks: [
        { name: 'Tower A (Luxe)', distance: 'On-site Guard', route: 'RFID Lift Lobby Access' },
        { name: 'Tower B (Premium)', distance: 'On-site Guard', route: 'Smart RFID Lobby Access' },
        { name: 'Tower C (Classic)', distance: 'On-site Guard', route: 'Biometric Entrance Lobby' },
        { name: 'Tower D (Signature)', distance: 'On-site Guard', route: '24/7 Concierge Portal' }
      ]
    },
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
                <Ionicons name="arrow-back" size={24} color={Colors.white} />
              </TouchableOpacity>
              <View style={styles.headerRight}>
                <TouchableOpacity style={styles.circleBtn}>
                  <Ionicons name="share-social-outline" size={22} color={Colors.white} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.circleBtn} onPress={toggleFavorite}>
                  <Ionicons name={isFav ? "heart" : "heart-outline"} size={22} color={isFav ? Colors.error : Colors.white} />
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

              {/* Resident Unit Banner Card */}
              <View style={styles.residentHeaderBanner}>
                <View style={styles.residentHeaderLeft}>
                  <View style={styles.residentHeaderIconBg}>
                    <Ionicons name="home" size={20} color="#C5A880" />
                  </View>
                  <View style={{ marginLeft: 12, flex: 1 }}>
                    <View style={styles.residentHeaderTitleRow}>
                      <Text style={styles.residentHeaderLabel}>YOUR RESERVED UNIT</Text>
                      <View style={styles.residentHeaderStatusPill}>
                        <Text style={styles.residentHeaderStatusText}>75% Built</Text>
                      </View>
                    </View>
                    <Text style={styles.residentHeaderUnitText}>
                      Tower B (Premium) • Suite 402
                    </Text>
                    <Text style={styles.residentHeaderSubText}>
                      3 BHK Elite Condo • 4th Floor • East-Facing
                    </Text>
                  </View>
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

                  {/* Towers & Sub-Projects list */}
                  <View style={styles.towersSection}>
                    <Text style={styles.towersSectionTitle}>Residential Towers & Layouts</Text>
                    <Text style={styles.towersSectionSub}>
                      Browse configurations, construction status, and possession details for the active phases of the development.
                    </Text>

                    {[
                      {
                        name: 'Tower A (Luxe)',
                        type: 'Luxury Residential',
                        configs: '3 & 4 BHK',
                        sizes: '2,200 - 3,400 Sq.Ft.',
                        status: 'Plinth Level Complete',
                        progress: 40,
                        handover: 'Dec 2027',
                        badge: 'LIMITED ACCESS',
                        badgeColor: Colors.accent,
                      },
                      {
                        name: 'Tower B (Premium)',
                        type: 'Elite Condominiums',
                        configs: '2.5 & 3 BHK',
                        sizes: '1,650 - 2,100 Sq.Ft.',
                        status: '12th Floor Slab Cast',
                        progress: 75,
                        handover: 'Aug 2026',
                        badge: 'YOUR RESIDENCE TOWER',
                        badgeColor: '#C5A880', // Rich gold/champagne color
                        isUserTower: true,
                      },
                      {
                        name: 'Tower C (Classic)',
                        type: 'Comfort Homes',
                        configs: '2 BHK Only',
                        sizes: '1,200 - 1,450 Sq.Ft.',
                        status: 'Finishing Stage',
                        progress: 90,
                        handover: 'Jan 2026',
                        badge: 'SOLD OUT',
                        badgeColor: Colors.error,
                        isSoldOut: true,
                      },
                      {
                        name: 'Tower D (Signature)',
                        type: 'Ultra Duplexes & Penthouses',
                        configs: '4 BHK Duplex',
                        sizes: '4,100 - 5,600 Sq.Ft.',
                        status: 'Launch & Excavation',
                        progress: 10,
                        handover: 'June 2028',
                        badge: 'NEW LAUNCH',
                        badgeColor: Colors.primary,
                      },
                    ].map((tower, idx) => (
                      <View 
                        key={idx} 
                        style={[
                          styles.towerCard, 
                          tower.isUserTower && styles.userTowerCard,
                          tower.isSoldOut && styles.soldOutTowerCard
                        ]}
                      >
                        {/* Card Header */}
                        <View style={styles.towerCardHeader}>
                          <View style={{ flex: 1, paddingRight: 8 }}>
                            <Text style={[styles.towerCardName, tower.isSoldOut && styles.soldOutTextMuted]}>
                              {tower.name}
                            </Text>
                            <Text style={styles.towerCardType}>{tower.type}</Text>
                          </View>
                          {tower.badge && (
                            <View 
                              style={[
                                styles.towerBadge, 
                                { backgroundColor: tower.badgeColor },
                                tower.isUserTower && styles.userTowerBadge
                              ]}
                            >
                              {tower.isUserTower && (
                                <Ionicons name="home" size={10} color={Colors.white} style={{ marginRight: 4 }} />
                              )}
                              <Text style={styles.towerBadgeText}>{tower.badge}</Text>
                            </View>
                          )}
                        </View>

                        {/* Specs Grid */}
                        <View style={styles.towerSpecsGrid}>
                          <View style={styles.towerSpecCol}>
                            <Text style={styles.towerSpecLabel}>CONFIGURATIONS</Text>
                            <Text style={[styles.towerSpecValue, tower.isSoldOut && styles.soldOutTextMuted]}>
                              {tower.configs}
                            </Text>
                          </View>
                          <View style={styles.towerSpecCol}>
                            <Text style={styles.towerSpecLabel}>SIZE RANGE</Text>
                            <Text style={[styles.towerSpecValue, tower.isSoldOut && styles.soldOutTextMuted]}>
                              {tower.sizes}
                            </Text>
                          </View>
                          <View style={styles.towerSpecCol}>
                            <Text style={styles.towerSpecLabel}>EST. HANDOVER</Text>
                            <Text style={[styles.towerSpecValue, tower.isSoldOut && styles.soldOutTextMuted]}>
                              {tower.handover}
                            </Text>
                          </View>
                        </View>

                        {/* Construction Progress */}
                        <View style={styles.towerProgressSection}>
                          <View style={styles.towerProgressTextRow}>
                            <Text style={styles.towerProgressLabel}>Construction Status</Text>
                            <Text style={[styles.towerProgressVal, tower.isSoldOut && styles.soldOutTextMuted]}>
                              {tower.status} ({tower.progress}%)
                            </Text>
                          </View>
                          <View style={styles.towerProgressBarBg}>
                            <View 
                              style={[
                                styles.towerProgressBarActive, 
                                { width: `${tower.progress}%` },
                                tower.isSoldOut && { backgroundColor: Colors.textLight },
                                tower.isUserTower && { backgroundColor: Colors.primary }
                              ]} 
                            />
                          </View>
                        </View>

                        {/* User Suite Specific Callout (Highlight for Tower B) */}
                        {tower.isUserTower && (
                          <View style={styles.userTowerCallout}>
                            <Ionicons name="star" size={14} color="#C5A880" />
                            <Text style={styles.userTowerCalloutText}>
                              Your reserved residence <Text style={{ fontWeight: '800' }}>Suite 402</Text> is located on the 4th floor of this tower.
                            </Text>
                          </View>
                        )}
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {activeTab === 'Amenities' && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Signature Amenities</Text>
                  <Text style={styles.sectionSub}>
                    Tap any amenity below to view its premium features and check exact walking distances from Block A, B, C & D flat towers.
                  </Text>
                  
                  <View style={styles.visualAmenitiesGrid}>
                    {amenities.map(item => {
                      return (
                        <TouchableOpacity 
                          key={item.name} 
                          style={styles.visualAmenityCard}
                          onPress={() => {
                            setSelectedAmenity(item);
                            setModalVisible(true);
                          }}
                          activeOpacity={0.9}
                        >
                          <ImageBackground 
                            source={item.image} 
                            style={styles.visualAmenityImage}
                            imageStyle={{ borderRadius: 16 }}
                            resizeMode="cover"
                          >
                            {/* Glassmorphic dark overlay for readability */}
                            <View style={styles.visualAmenityOverlay}>
                              <View style={styles.visualAmenityHeaderRow}>
                                <View style={styles.visualAmenityIconContainer}>
                                  <Ionicons 
                                    name={item.icon as any} 
                                    size={16} 
                                    color={Colors.white} 
                                  />
                                </View>
                                <Text style={styles.visualAmenityName} numberOfLines={1}>{item.name}</Text>
                              </View>
                              <View style={styles.visualAmenityDistanceRow}>
                                <Ionicons name="location" size={10} color="#C5A880" />
                                <Text style={styles.visualAmenityDistanceText} numberOfLines={1}>
                                  {item.distance.split(' (')[0]}
                                </Text>
                              </View>
                            </View>
                          </ImageBackground>
                        </TouchableOpacity>
                      );
                    })}
                  </View>

                  <TouchableOpacity 
                    style={styles.connectivityPromoCard}
                    onPress={() => {
                      if (!selectedAmenity) {
                        setSelectedAmenity(amenities[0]);
                      }
                      setModalVisible(true);
                    }}
                  >
                    <View style={styles.connectivityPromoLeft}>
                      <View style={styles.connectivityPromoIconBg}>
                        <Ionicons name="map-outline" size={22} color={Colors.primary} />
                      </View>
                      <View style={{ marginLeft: 12, flex: 1 }}>
                        <Text style={styles.connectivityPromoTitle}>Interactive Block Connectivity</Text>
                        <Text style={styles.connectivityPromoSub}>Check exact walking distances from Block A, B, C & D towers.</Text>
                      </View>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color={Colors.primary} style={{ marginRight: 5 }} />
                  </TouchableOpacity>
                </View>
              )}

              {activeTab === 'Documents' && (
                <View style={styles.section}>
                  <View style={styles.sectionHeaderRow}>
                    <Text style={styles.sectionTitle}>Official Agreements</Text>
                    <TouchableOpacity style={styles.viewMoreLink} onPress={() => router.push('/Documents')}>
                      <Text style={styles.viewMoreText}>View All Page</Text>
                      <Ionicons name="arrow-forward" size={14} color={Colors.accent} />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.sectionSub}>Review or download essential legal documentation for this property.</Text>
                  
                  <View style={styles.detailDocList}>
                    <View style={styles.detailDocCard}>
                      <View style={styles.detailDocIconBg}>
                        <Ionicons name="document-text" size={20} color={Colors.white} />
                      </View>
                      <View style={styles.detailDocMeta}>
                        <Text style={styles.detailDocTitle}>Sale Agreement Draft</Text>
                        <Text style={styles.detailDocInfo}>PDF • 2.4 MB • Approved</Text>
                      </View>
                      <TouchableOpacity style={styles.detailDocActionBtn} onPress={() => router.push('/Documents')}>
                        <Ionicons name="download-outline" size={18} color={Colors.secondary} />
                      </TouchableOpacity>
                    </View>

                    <View style={styles.detailDocCard}>
                      <View style={styles.detailDocIconBg}>
                        <Ionicons name="shield-checkmark" size={20} color={Colors.white} />
                      </View>
                      <View style={styles.detailDocMeta}>
                        <Text style={styles.detailDocTitle}>Title Deed & Patta</Text>
                        <Text style={styles.detailDocInfo}>PDF • 4.1 MB • Verified</Text>
                      </View>
                      <TouchableOpacity style={styles.detailDocActionBtn} onPress={() => router.push('/Documents')}>
                        <Ionicons name="download-outline" size={18} color={Colors.secondary} />
                      </TouchableOpacity>
                    </View>

                    <View style={styles.detailDocCard}>
                      <View style={styles.detailDocIconBg}>
                        <Ionicons name="business" size={20} color={Colors.white} />
                      </View>
                      <View style={styles.detailDocMeta}>
                        <Text style={styles.detailDocTitle}>RERA Certificate</Text>
                        <Text style={styles.detailDocInfo}>PDF • 950 KB • Approved</Text>
                      </View>
                      <TouchableOpacity style={styles.detailDocActionBtn} onPress={() => router.push('/Documents')}>
                        <Ionicons name="download-outline" size={18} color={Colors.secondary} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}

              {activeTab === 'Payments' && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Quotation & Cost Sheet</Text>
                  
                  {/* Cost Sheet Configuration Controls */}
                  <View style={styles.controlBox}>
                    <Text style={styles.controlHeader}>Adjust Quotation Factors</Text>
                    
                    {/* Base cost step control */}
                    <View style={styles.controlRow}>
                      <Text style={styles.controlLabel}>Base Selling Price (BSP)</Text>
                      <View style={styles.controlButtons}>
                        <TouchableOpacity 
                          style={styles.stepBtn} 
                          onPress={() => setPropertyCost(Math.max(5000000, propertyCost - 500000))}
                        >
                          <Ionicons name="remove" size={16} color={Colors.text} />
                        </TouchableOpacity>
                        <Text style={styles.controlValue}>{formatCurrency(propertyCost)}</Text>
                        <TouchableOpacity 
                          style={styles.stepBtn} 
                          onPress={() => setPropertyCost(propertyCost + 500000)}
                        >
                          <Ionicons name="add" size={16} color={Colors.text} />
                        </TouchableOpacity>
                      </View>
                    </View>

                    {/* Down Payment % control */}
                    <View style={styles.controlRow}>
                      <Text style={styles.controlLabel}>Down Payment %</Text>
                      <View style={styles.controlButtons}>
                        <TouchableOpacity 
                          style={styles.stepBtn} 
                          onPress={() => setDownPaymentPercent(Math.max(10, downPaymentPercent - 5))}
                        >
                          <Ionicons name="remove" size={16} color={Colors.text} />
                        </TouchableOpacity>
                        <Text style={styles.controlValue}>{downPaymentPercent}%</Text>
                        <TouchableOpacity 
                          style={styles.stepBtn} 
                          onPress={() => setDownPaymentPercent(Math.min(90, downPaymentPercent + 5))}
                        >
                          <Ionicons name="add" size={16} color={Colors.text} />
                        </TouchableOpacity>
                      </View>
                    </View>

                    {/* Interest rate step control */}
                    <View style={styles.controlRow}>
                      <Text style={styles.controlLabel}>Bank Interest Rate (p.a.)</Text>
                      <View style={styles.controlButtons}>
                        <TouchableOpacity 
                          style={styles.stepBtn} 
                          onPress={() => setInterestRate(Math.max(5, interestRate - 0.2))}
                        >
                          <Ionicons name="remove" size={16} color={Colors.text} />
                        </TouchableOpacity>
                        <Text style={styles.controlValue}>{interestRate.toFixed(1)}%</Text>
                        <TouchableOpacity 
                          style={styles.stepBtn} 
                          onPress={() => setInterestRate(Math.min(15, interestRate + 0.2))}
                        >
                          <Ionicons name="add" size={16} color={Colors.text} />
                        </TouchableOpacity>
                      </View>
                    </View>

                    {/* Tenure step control */}
                    <View style={styles.controlRow}>
                      <Text style={styles.controlLabel}>Loan Tenure (Years)</Text>
                      <View style={styles.controlButtons}>
                        <TouchableOpacity 
                          style={styles.stepBtn} 
                          onPress={() => setTenureYears(Math.max(5, tenureYears - 1))}
                        >
                          <Ionicons name="remove" size={16} color={Colors.text} />
                        </TouchableOpacity>
                        <Text style={styles.controlValue}>{tenureYears} Yrs</Text>
                        <TouchableOpacity 
                          style={styles.stepBtn} 
                          onPress={() => setTenureYears(Math.min(30, tenureYears + 1))}
                        >
                          <Ionicons name="add" size={16} color={Colors.text} />
                        </TouchableOpacity>
                      </View>
                    </View>

                    {/* Live Calculated Results Panel */}
                    <View style={styles.resultsPanel}>
                      <Text style={styles.resultsHeader}>Live Quotation Summary</Text>
                      
                      <View style={styles.resultsGrid}>
                        <View style={styles.resultItem}>
                          <Text style={styles.resultLabel}>TOTAL PRICE (INCL. GST)</Text>
                          <Text style={styles.resultValue}>{formatCurrency(totalCost)}</Text>
                        </View>
                        <View style={styles.resultItem}>
                          <Text style={styles.resultLabel}>DOWN PAYMENT</Text>
                          <Text style={styles.resultValue}>{formatCurrency(downPayment)}</Text>
                        </View>
                      </View>

                      <View style={styles.resultsGrid}>
                        <View style={styles.resultItem}>
                          <Text style={styles.resultLabel}>LOAN AMOUNT</Text>
                          <Text style={styles.resultValue}>{formatCurrency(loanAmount)}</Text>
                        </View>
                        <View style={styles.resultItem}>
                          <Text style={styles.resultLabel}>MONTHLY EMI</Text>
                          <Text style={[styles.resultValue, { color: Colors.primary, fontSize: 16 }]}>
                            {formatCurrency(emi)}
                            <Text style={{ fontSize: 10, fontWeight: '700' }}>/mo</Text>
                          </Text>
                        </View>
                      </View>
                    </View>
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
                        <Ionicons name="map" size={20} color={Colors.secondary} />
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
              <Ionicons name="call" size={20} color={Colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.siteVisitBtn} onPress={() => router.push('/SiteVisit')}>
              <Text style={styles.siteVisitText}>BOOK SITE VISIT</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.enquireFooterBtn} onPress={() => router.push('/Inquiry')}>
              <Text style={styles.enquireFooterText}>ENQUIRE NOW</Text>
            </TouchableOpacity>
          </View>
      {/* Premium Block-wise Connectivity Popup Modal */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            {/* Modal Hero Image */}
            <ImageBackground 
              source={selectedAmenity?.image} 
              style={styles.modalHeroImage}
              resizeMode="cover"
            >
              <SafeAreaView style={styles.modalHeaderRow}>
                <TouchableOpacity 
                  style={styles.modalCloseButton} 
                  onPress={() => setModalVisible(false)}
                >
                  <Ionicons name="close" size={24} color={Colors.white} />
                </TouchableOpacity>
              </SafeAreaView>
            </ImageBackground>

            {/* Modal Body */}
            <ScrollView style={styles.modalBody} showsVerticalScrollIndicator={false}>
              <View style={styles.modalMainHeader}>
                <Text style={styles.modalTitle}>{selectedAmenity?.name}</Text>
                <View style={styles.modalDistanceBadge}>
                  <Ionicons name="location" size={12} color={Colors.white} />
                  <Text style={styles.modalDistanceBadgeText}>{selectedAmenity?.distance}</Text>
                </View>
              </View>

              <Text style={styles.modalDesc}>{selectedAmenity?.desc}</Text>

              {/* Personalized Resident Route Card */}
              <View style={styles.residentPersonalCard}>
                <View style={styles.residentCardHeader}>
                  <View style={styles.residentBadge}>
                    <Ionicons name="person" size={14} color={Colors.white} />
                    <Text style={styles.residentBadgeText}>Resident: Tower B (Premium) • Suite 402</Text>
                  </View>
                  <Text style={styles.residentRouteSub}>Custom-computed route from your block:</Text>
                </View>
                
                <View style={styles.residentRouteRow}>
                  <View style={styles.residentRouteDetail}>
                    <Text style={styles.residentRouteLabel}>Direct Distance</Text>
                    <Text style={styles.residentRouteValue}>
                      {selectedAmenity?.blocks?.find((b: any) => b.name.includes("Tower B"))?.distance || "45m away"}
                    </Text>
                  </View>
                  <View style={styles.residentRouteDivider} />
                  <View style={styles.residentRouteDetail}>
                    <Text style={styles.residentRouteLabel}>Private Pathway</Text>
                    <Text style={styles.residentRouteValue}>
                      {selectedAmenity?.blocks?.find((b: any) => b.name.includes("Tower B"))?.route || "Main Plaza Pathway"}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Block-wise distances list */}
              <View style={styles.modalBlocksSection}>
                <View style={styles.modalSectionTitleRow}>
                  <Ionicons name="business" size={18} color={Colors.primary} />
                  <Text style={styles.modalBlocksTitle}>Block-wise Distance & Routes</Text>
                </View>
                
                <Text style={styles.modalBlocksSubText}>
                  Walking distance and pathway route map from each residential flat block:
                </Text>

                <View style={styles.modalBlocksList}>
                  {selectedAmenity?.blocks?.map((block: any, idx: number) => (
                    <View key={idx} style={styles.modalBlockCard}>
                      <View style={styles.modalBlockLeft}>
                        <View style={styles.modalBlockIconBg}>
                          <Text style={styles.modalBlockLetter}>{block.name.split(' ')[1][0]}</Text>
                        </View>
                        <View style={styles.modalBlockMeta}>
                          <Text style={styles.modalBlockName}>{block.name}</Text>
                          <Text style={styles.modalBlockRoute}>Route: {block.route}</Text>
                        </View>
                      </View>
                      <View style={styles.modalBlockRight}>
                        <Text style={styles.modalBlockDistanceText}>{block.distance}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </ScrollView>

            {/* Modal Footer */}
            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={styles.modalFooterCloseBtn} 
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalFooterCloseText}>Close Connectivity Details</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
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
    backgroundColor: Colors.background,
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
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageCounter: {
    position: 'absolute',
    bottom: Platform.OS === 'web' && width > 900 ? 40 : 50,
    right: 20,
    backgroundColor: 'rgba(28, 25, 23, 0.65)',
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
    backgroundColor: Colors.background,
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
    backgroundColor: Colors.accent,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '900',
    color: Colors.secondary,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.text,
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
    color: Colors.textMuted,
    fontWeight: '600',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 20,
    marginHorizontal: 25,
    borderRadius: 15,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  priceLabel: {
    fontSize: 12,
    color: Colors.textMuted,
    fontWeight: '700',
  },
  priceValue: {
    fontSize: 20,
    fontWeight: '900',
    color: Colors.text,
    marginTop: 2,
  },
  emiBtn: {
    borderWidth: 1,
    borderColor: Colors.accent,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  emiText: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.accent,
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
    color: Colors.textLight,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  specValueSmall: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.text,
    marginTop: 4,
  },
  tabOuterContainer: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
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
    borderBottomColor: Colors.accent,
  },
  tabText: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textLight,
  },
  activeTabText: {
    color: Colors.text,
  },
  section: {
    paddingHorizontal: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 15,
  },
  description: {
    fontSize: 14,
    color: Colors.textMuted,
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
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  amenityText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textMuted,
    textAlign: 'center',
  },
  mapPlaceholder: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  mapImg: {
    width: '100%',
    height: '100%',
  },
  mapOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(28, 25, 23, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapBtn: {
    backgroundColor: Colors.primary,
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
    color: Colors.secondary,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    paddingHorizontal: 25,
    paddingVertical: 20,
    paddingBottom: Platform.OS === 'web' ? 20 : (Platform.OS === 'ios' ? 42 : 30),
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    gap: 15,
  },
  iconFooterBtn: {
    width: 56,
    height: 56,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  siteVisitBtn: {
    flex: 1,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    height: 56,
  },
  siteVisitText: {
    fontSize: 12,
    fontWeight: '900',
    color: Colors.white,
  },
  enquireFooterBtn: {
    flex: 1,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    height: 56,
  },
  enquireFooterText: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.secondary,
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
    color: Colors.accent,
  },
  sectionSub: {
    fontSize: 13,
    color: Colors.textMuted,
    marginBottom: 20,
    fontWeight: '500',
  },
  detailDocList: {
    gap: 12,
  },
  detailDocCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  detailDocIconBg: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: Colors.primary,
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
    color: Colors.text,
  },
  detailDocInfo: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 2,
    fontWeight: '600',
  },
  detailDocActionBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paymentCardPreview: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 20,
  },
  paymentCardLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.textMuted,
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
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  emiPreviewTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.textLight,
  },
  emiPreviewVal: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.text,
    marginTop: 2,
  },
  emiPreviewValGold: {
    fontSize: 13,
    fontWeight: '900',
    color: Colors.accent,
    marginTop: 2,
  },
  cardPayBtn: {
    backgroundColor: Colors.primary,
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
    color: Colors.white,
  },
  paymentCardPreviewDark: {
    backgroundColor: Colors.secondary,
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
    color: Colors.textLight,
    textTransform: 'uppercase',
  },
  darkPrice: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.accent,
    marginTop: 2,
  },
  darkActionBtn: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  darkActionBtnText: {
    fontSize: 11,
    fontWeight: '900',
    color: Colors.secondary,
  },
  darkSub: {
    fontSize: 11,
    color: Colors.textLight,
    lineHeight: 15,
    fontWeight: '500',
  },
  activeAmenityIconBg: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  activeAmenityText: {
    color: Colors.primary,
    fontWeight: '900',
  },
  amenityDetailCard: {
    backgroundColor: Colors.cardBg,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: 25,
    overflow: 'hidden',
    shadowColor: Colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  amenityDetailImage: {
    width: '100%',
    height: Platform.OS === 'web' ? 220 : 160,
  },
  amenityDetailContent: {
    padding: 20,
  },
  amenityDetailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 10,
  },
  amenityDetailTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.text,
  },
  amenityDetailDistance: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 30,
    gap: 4,
  },
  amenityDetailDistanceText: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.white,
  },
  amenityDetailDesc: {
    fontSize: 13,
    color: Colors.textMuted,
    lineHeight: 20,
    fontWeight: '500',
  },
  amenityPlaceholderCard: {
    backgroundColor: Colors.cardBg,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: 25,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
  },
  amenityHelperText: {
    fontSize: 13,
    color: Colors.textMuted,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 18,
    maxWidth: 280,
  },
  connectivityPromoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.cardBg,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 16,
    marginTop: 20,
  },
  connectivityPromoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  connectivityPromoIconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(61, 76, 58, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectivityPromoTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.text,
  },
  connectivityPromoSub: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 2,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(37, 43, 32, 0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: Platform.OS === 'web' ? 520 : '100%',
    maxHeight: '90%',
    backgroundColor: Colors.background,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.secondary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeroImage: {
    width: '100%',
    height: 180,
    justifyContent: 'flex-start',
  },
  modalHeaderRow: {
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalCloseButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(37, 43, 32, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBody: {
    padding: 20,
    flexGrow: 0,
  },
  modalMainHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.text,
  },
  modalDistanceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 30,
    gap: 4,
  },
  modalDistanceBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.white,
  },
  modalDesc: {
    fontSize: 14,
    color: Colors.textMuted,
    lineHeight: 22,
    fontWeight: '500',
    marginBottom: 25,
  },
  modalBlocksSection: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 20,
    marginBottom: 10,
  },
  modalSectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 5,
  },
  modalBlocksTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.text,
  },
  modalBlocksSubText: {
    fontSize: 12,
    color: Colors.textMuted,
    lineHeight: 16,
    fontWeight: '500',
    marginBottom: 15,
  },
  modalBlocksList: {
    gap: 10,
  },
  modalBlockCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.cardBg,
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  modalBlockLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 10,
  },
  modalBlockIconBg: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBlockLetter: {
    fontSize: 14,
    fontWeight: '900',
    color: Colors.white,
  },
  modalBlockMeta: {
    flex: 1,
  },
  modalBlockName: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.text,
  },
  modalBlockRoute: {
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: 2,
    fontWeight: '600',
  },
  modalBlockRight: {
    backgroundColor: 'rgba(61, 76, 58, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  modalBlockDistanceText: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.primary,
  },
  modalFooter: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.background,
  },
  modalFooterCloseBtn: {
    backgroundColor: Colors.secondary,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalFooterCloseText: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.white,
  },
  residentPersonalCard: {
    backgroundColor: Colors.cardBg,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    padding: 16,
    marginBottom: 25,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  residentCardHeader: {
    marginBottom: 12,
  },
  residentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    alignSelf: 'flex-start',
    gap: 6,
    marginBottom: 6,
  },
  residentBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.white,
  },
  residentRouteSub: {
    fontSize: 12,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  residentRouteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  residentRouteDetail: {
    flex: 1,
  },
  residentRouteLabel: {
    fontSize: 10,
    color: Colors.textMuted,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  residentRouteValue: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.text,
  },
  residentRouteDivider: {
    width: 1,
    height: 30,
    backgroundColor: Colors.border,
    marginHorizontal: 15,
  },
  controlBox: {
    backgroundColor: Colors.cardBg,
    borderRadius: 20,
    padding: 18,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 3,
  },
  controlHeader: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.text,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingBottom: 8,
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  controlLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textMuted,
  },
  controlButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  controlValue: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.text,
    minWidth: 90,
    textAlign: 'center',
  },
  stepBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultsPanel: {
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  resultsHeader: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  resultsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    gap: 10,
  },
  resultItem: {
    flex: 1,
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  resultLabel: {
    fontSize: 8,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  resultValue: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.text,
  },
  towersSection: {
    marginTop: 25,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: 20,
  },
  towersSectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 8,
  },
  towersSectionSub: {
    fontSize: 12,
    color: Colors.textMuted,
    lineHeight: 16,
    fontWeight: '500',
    marginBottom: 20,
  },
  towerCard: {
    backgroundColor: Colors.cardBg,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 15,
    shadowColor: Colors.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 2,
  },
  userTowerCard: {
    borderColor: '#C5A880',
    borderWidth: 1.5,
    backgroundColor: '#FAF6ED', // slightly warmer cream highlight
  },
  soldOutTowerCard: {
    opacity: 0.65,
    borderColor: Colors.border,
  },
  towerCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  towerCardName: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.text,
  },
  towerCardType: {
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 2,
    fontWeight: '500',
  },
  towerBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userTowerBadge: {
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  towerBadgeText: {
    fontSize: 9,
    fontWeight: '900',
    color: Colors.white,
    letterSpacing: 0.5,
  },
  towerSpecsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  towerSpecCol: {
    flex: 1,
    alignItems: 'flex-start',
  },
  towerSpecLabel: {
    fontSize: 8,
    fontWeight: '800',
    color: Colors.textLight,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  towerSpecValue: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.text,
  },
  towerProgressSection: {
    marginBottom: 5,
  },
  towerProgressTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  towerProgressLabel: {
    fontSize: 11,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  towerProgressVal: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.text,
  },
  towerProgressBarBg: {
    height: 6,
    backgroundColor: Colors.lightGray,
    borderRadius: 3,
    overflow: 'hidden',
  },
  towerProgressBarActive: {
    height: '100%',
    backgroundColor: Colors.accent,
    borderRadius: 3,
  },
  userTowerCallout: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(197, 168, 128, 0.1)',
    borderRadius: 10,
    padding: 10,
    marginTop: 15,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(197, 168, 128, 0.2)',
  },
  userTowerCalloutText: {
    fontSize: 11,
    color: Colors.text,
    fontWeight: '500',
    flex: 1,
    lineHeight: 15,
  },
  soldOutTextMuted: {
    color: Colors.textMuted,
    textDecorationLine: 'none',
  },
  residentHeaderBanner: {
    backgroundColor: '#FAF6ED', // silk cream warm highlight
    borderWidth: 1.5,
    borderColor: '#C5A880', // elegant gold accent border
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 25,
    marginBottom: 25,
    shadowColor: '#C5A880',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  residentHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  residentHeaderIconBg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(197, 168, 128, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  residentHeaderTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  residentHeaderLabel: {
    fontSize: 9,
    fontWeight: '900',
    color: '#C5A880',
    letterSpacing: 0.75,
  },
  residentHeaderStatusPill: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  residentHeaderStatusText: {
    fontSize: 8,
    fontWeight: '800',
    color: Colors.white,
  },
  residentHeaderUnitText: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 2,
  },
  residentHeaderSubText: {
    fontSize: 11,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  visualAmenitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 10,
  },
  visualAmenityCard: {
    width: '48%',
    height: 140,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 5,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  visualAmenityImage: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  visualAmenityOverlay: {
    backgroundColor: 'rgba(28, 25, 23, 0.75)', // Elegant dark glassmorphism
    padding: 10,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  visualAmenityHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  visualAmenityIconContainer: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  visualAmenityName: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.white,
    flex: 1,
  },
  visualAmenityDistanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  visualAmenityDistanceText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#C5A880', // elegant gold accent text
    flex: 1,
  },
});

export default PropertyDetails;
