import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 60) / 3; // 3 columns with padding

interface PropertyCardProps {
  property: {
    id: string;
    title: string;
    location: string;
    price: string;
    beds: number;
    baths?: number;
    garage?: number;
    image: any;
    type?: string;
    rating?: string;
    status?: string;
    acres?: string;
    servingLocations?: string;
  };
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const router = useRouter();
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  // Mock array for moving images
  const propertyImages = [
    property.image,
    require('../assets/images/house2.jpg'),
    require('../assets/images/banner.png'),
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImgIndex((prev) => (prev + 1) % propertyImages.length);
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <TouchableOpacity 
      style={styles.container}
      activeOpacity={0.9}
      onPress={() => router.push({
        pathname: '/PropertyDetails',
        params: { id: property.id }
      })}
    >
      <View style={styles.imageContainer}>
        <Image source={propertyImages[currentImgIndex]} style={styles.image} resizeMode="cover" />
        <View style={styles.redRibbon}>
          <Text style={styles.redRibbonText}>Launching</Text>
        </View>
        <View style={styles.statusRibbon}>
          <Text style={styles.statusText}>{property.status || 'New Launch'}</Text>
        </View>
      </View>
      
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{property.title}</Text>
        <Text style={styles.priceRange}>{property.price}</Text>

        <View style={styles.detailItem}>
          <Ionicons name="location" size={16} color="#000" />
          <Text style={styles.detailValue} numberOfLines={1}>{property.location}</Text>
        </View>

        <View style={styles.servingSection}>
          <View style={styles.servingHeader}>
            <Ionicons name="navigate-outline" size={14} color="#6b7280" />
            <Text style={styles.servingLabel}>Serving Location :</Text>
          </View>
          <Text style={styles.servingText} numberOfLines={2}>
            {property.servingLocations || 'Selaiyur, Tambaram, Chromepet, Pallavaram, Sittalapakkam'}
          </Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Ionicons name="resize-outline" size={12} color="#6b7280" />
            <Text style={styles.statValue}>{property.acres || '2.5'} Ac</Text>
          </View>
          <View style={styles.statBox}>
            <Ionicons name="business-outline" size={12} color="#6b7280" />
            <Text style={styles.statValue}>{property.beds} BHK</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20,
    marginHorizontal: Platform.OS === 'web' ? 0 : 3,
    width: Platform.OS === 'web' ? '31%' : '98%', // 3 columns on web, singularly (full width) on phone
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  imageContainer: {
    width: '100%',
    height: Platform.OS === 'web' ? 160 : 180, 
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  redRibbon: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#ff4b4b',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 10,
  },
  redRibbonText: {
    color: '#fff',
    fontSize: 8,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  statusRibbon: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: '#FBB03B',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderTopRightRadius: 10,
  },
  statusText: {
    color: '#000',
    fontSize: 10,
    fontWeight: '900',
  },
  info: {
    padding: Platform.OS === 'web' ? 15 : 12,
  },
  title: {
    fontSize: Platform.OS === 'web' ? 18 : 15,
    fontWeight: '800',
    color: '#111827',
    marginBottom: Platform.OS === 'web' ? 6 : 4,
  },
  priceRange: {
    fontSize: Platform.OS === 'web' ? 17 : 14,
    fontWeight: '900',
    color: '#FBB03B',
    marginBottom: Platform.OS === 'web' ? 15 : 10,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Platform.OS === 'web' ? 8 : 6,
    marginBottom: Platform.OS === 'web' ? 12 : 8,
  },
  detailValue: {
    fontSize: Platform.OS === 'web' ? 13 : 11,
    color: '#1f2937',
    fontWeight: '700',
  },
  servingSection: {
    marginBottom: Platform.OS === 'web' ? 15 : 10,
    backgroundColor: '#f9fafb',
    padding: Platform.OS === 'web' ? 8 : 8,
    borderRadius: 8,
  },
  servingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Platform.OS === 'web' ? 6 : 4,
    marginBottom: Platform.OS === 'web' ? 4 : 4,
  },
  servingLabel: {
    fontSize: Platform.OS === 'web' ? 11 : 10,
    color: '#6b7280',
    fontWeight: '800',
  },
  servingText: {
    fontSize: Platform.OS === 'web' ? 11 : 10,
    color: '#4b5563',
    fontWeight: '600',
    lineHeight: Platform.OS === 'web' ? 16 : 14,
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 5,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: '#f9fafb',
    paddingTop: 12,
    justifyContent: 'space-between',
  },
  statBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 10,
    color: '#1f2937',
    fontWeight: '800',
  },
});

export default PropertyCard;
