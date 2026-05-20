import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Platform, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/theme';

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
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
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
      style={[
        styles.container,
        {
          width: isMobile ? '98%' : '31%', // dynamic width based on breakpoint
          marginHorizontal: isMobile ? 3 : 0,
        }
      ]}
      activeOpacity={0.9}
      onPress={() => router.push({
        pathname: '/PropertyDetails',
        params: { id: property.id }
      })}
    >
      <View style={[styles.imageContainer, { height: isMobile ? 180 : 160 }]}>
        <Image source={propertyImages[currentImgIndex]} style={styles.image} resizeMode="cover" />
        <View style={styles.redRibbon}>
          <Text style={styles.redRibbonText}>Launching</Text>
        </View>
        <View style={styles.statusRibbon}>
          <Text style={styles.statusText}>{property.status || 'New Launch'}</Text>
        </View>
      </View>
      
      <View style={[styles.info, { padding: isMobile ? 12 : 15 }]}>
        <Text style={[styles.title, { fontSize: isMobile ? 15 : 18, marginBottom: isMobile ? 4 : 6 }]} numberOfLines={1}>{property.title}</Text>
        <Text style={[styles.priceRange, { fontSize: isMobile ? 14 : 17, marginBottom: isMobile ? 10 : 15 }]}>{property.price}</Text>

        <View style={[styles.detailItem, { gap: isMobile ? 6 : 8, marginBottom: isMobile ? 8 : 12 }]}>
          <Ionicons name="location" size={16} color={Colors.primary} />
          <Text style={[styles.detailValue, { fontSize: isMobile ? 11 : 13 }]} numberOfLines={1}>{property.location}</Text>
        </View>

        <View style={[styles.servingSection, { marginBottom: isMobile ? 10 : 15, padding: isMobile ? 8 : 8 }]}>
          <View style={[styles.servingHeader, { gap: isMobile ? 4 : 6, marginBottom: isMobile ? 4 : 4 }]}>
            <Ionicons name="navigate-outline" size={14} color={Colors.textMuted} />
            <Text style={[styles.servingLabel, { fontSize: isMobile ? 10 : 11 }]}>Serving Location :</Text>
          </View>
          <Text style={[styles.servingText, { fontSize: isMobile ? 10 : 11, lineHeight: isMobile ? 14 : 16 }]} numberOfLines={2}>
            {property.servingLocations || 'Selaiyur, Tambaram, Chromepet, Pallavaram, Sittalapakkam'}
          </Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Ionicons name="resize-outline" size={12} color={Colors.textMuted} />
            <Text style={styles.statValue}>{property.acres || '2.5'} Ac</Text>
          </View>
          <View style={styles.statBox}>
            <Ionicons name="business-outline" size={12} color={Colors.textMuted} />
            <Text style={styles.statValue}>{property.beds} BHK</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.cardBg,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: Colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  imageContainer: {
    width: '100%',
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
    backgroundColor: Colors.error,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    zIndex: 10,
  },
  redRibbonText: {
    color: Colors.white,
    fontSize: 8,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  statusRibbon: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderTopRightRadius: 10,
  },
  statusText: {
    color: Colors.secondary,
    fontSize: 10,
    fontWeight: '900',
  },
  info: {},
  title: {
    fontWeight: '800',
    color: Colors.text,
  },
  priceRange: {
    fontWeight: '900',
    color: Colors.primary,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailValue: {
    color: Colors.text,
    fontWeight: '700',
  },
  servingSection: {
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
  },
  servingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  servingLabel: {
    color: Colors.textMuted,
    fontWeight: '800',
  },
  servingText: {
    color: Colors.text,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 5,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
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
    color: Colors.text,
    fontWeight: '800',
  },
});

export default PropertyCard;
