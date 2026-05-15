import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
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
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => router.push({
        pathname: '/PropertyDetails',
        params: { id: property.id }
      })}
    >
      <View style={styles.imageContainer}>
        <Image source={propertyImages[currentImgIndex]} style={styles.image} resizeMode="cover" />
        <View style={styles.statusRibbon}>
          <Text style={styles.statusText}>{property.status || 'New Launch'}</Text>
        </View>
      </View>
      
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{property.title}</Text>
        <Text style={styles.priceRange}>{property.price}</Text>

        <View style={styles.detailItem}>
          <Ionicons name="location-outline" size={12} color="#000" />
          <Text style={styles.detailValue} numberOfLines={1}>{property.location}</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Ionicons name="resize-outline" size={12} color="#6b7280" />
            <Text style={styles.statValue}>{property.acres || '2.4 Ac'}</Text>
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 20,
    marginHorizontal: 5,
    width: CARD_WIDTH,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#eee',
  },
  imageContainer: {
    width: '100%',
    height: 120,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  statusRibbon: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#FBB03B',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderBottomRightRadius: 4,
  },
  statusText: {
    color: '#000',
    fontSize: 9,
    fontWeight: '800',
  },
  info: {
    padding: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  priceRange: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FBB03B',
    marginBottom: 10,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  detailValue: {
    fontSize: 11,
    color: '#6b7280',
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 5,
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 8,
    justifyContent: 'space-between',
  },
  statBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statValue: {
    fontSize: 10,
    color: '#6b7280',
    fontWeight: '700',
  },
});

export default PropertyCard;
