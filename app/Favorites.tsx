import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import PropertyCard from '../components/PropertyCard';

const Favorites = () => {
  const router = useRouter();

  const favoriteProperties = [
    {
      id: '1',
      title: 'Redwood Villas',
      location: 'Mississauga, ON',
      price: '$785,000',
      beds: 3,
      baths: 2,
      garage: 1,
      image: require('../assets/images/house1.jpg'),
      type: 'House'
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Favorites</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {favoriteProperties.length > 0 ? (
          favoriteProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="heart-outline" size={80} color="#e5e7eb" />
            <Text style={styles.emptyTitle}>No Favorites Yet</Text>
            <Text style={styles.emptyText}>Start exploring properties and save them here.</Text>
            <TouchableOpacity style={styles.exploreButton} onPress={() => router.push('/Home')}>
              <Text style={styles.exploreButtonText}>Explore Properties</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingBottom: 40,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 15,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 40,
  },
  exploreButton: {
    marginTop: 30,
    backgroundColor: '#E4FF63',
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 20,
  },
  exploreButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default Favorites;
