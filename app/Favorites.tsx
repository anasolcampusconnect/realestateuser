import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import PropertyCard from '../components/PropertyCard';
import BottomNav from '../components/BottomNav';
import { useFavorites } from '../context/FavoritesContext';
import { Colors } from '../constants/theme';

const Favorites = () => {
  const router = useRouter();
  const { favorites } = useFavorites();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Favorites</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {favorites.length > 0 ? (
          <View style={styles.grid}>
            {favorites.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="heart-outline" size={80} color={Colors.border} />
            <Text style={styles.emptyTitle}>No Favorites Yet</Text>
            <Text style={styles.emptyText}>Start exploring properties and save them here.</Text>
            <TouchableOpacity style={styles.exploreButton} onPress={() => router.push('/Home')}>
              <Text style={styles.exploreButtonText}>Explore Properties</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <BottomNav activeTab="Saved" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: Platform.OS === 'web' ? 20 : 60,
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
    color: Colors.text,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 20,
    paddingHorizontal: 15,
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
    color: Colors.text,
    marginTop: 20,
  },
  emptyText: {
    fontSize: 15,
    color: Colors.textMuted,
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 40,
  },
  exploreButton: {
    marginTop: 30,
    backgroundColor: Colors.primary,
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 20,
  },
  exploreButtonText: {
    color: Colors.secondary,
    fontSize: 16,
    fontWeight: '700',
  },
});

export default Favorites;
