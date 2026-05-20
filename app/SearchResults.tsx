import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions,
  SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import PropertyCard from '../components/PropertyCard';
import { StatusBar } from 'expo-status-bar';
import { Colors } from '../constants/theme';

const { width } = Dimensions.get('window');

const SearchResults = () => {
  const router = useRouter();
  const { query } = useLocalSearchParams();

  const allProperties = [
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

  const searchQuery = query ? query.toString().toLowerCase() : '';
  const results = allProperties.filter(prop => 
    prop.title.toLowerCase().includes(searchQuery) || 
    prop.location.toLowerCase().includes(searchQuery)
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={Colors.secondary} />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.headerTitle}>Search Results</Text>
            <Text style={styles.headerSub}>{results.length} Properties Found</Text>
          </View>
          <TouchableOpacity style={styles.filterBtn} onPress={() => router.push('/Search')}>
            <Ionicons name="options-outline" size={20} color={Colors.white} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.filterSummary}>
          {query && (
            <View style={styles.tag}>
              <Text style={styles.tagText}>Search: "{query}"</Text>
            </View>
          )}
          <View style={styles.tag}>
            <Text style={styles.tagText}>All Projects</Text>
          </View>
        </View>

        <View style={styles.grid}>
          {results.length > 0 ? (
            results.map(item => (
              <PropertyCard key={item.id} property={item} />
            ))
          ) : (
            <View style={{ marginTop: 50, alignItems: 'center' }}>
              <Ionicons name="search-outline" size={60} color={Colors.border} />
              <Text style={{ marginTop: 20, fontSize: 16, color: Colors.textMuted, fontWeight: '600' }}>
                No properties found matching "{query}"
              </Text>
            </View>
          )}
        </View>

        <View style={{ height: 50 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    justifyContent: 'space-between',
  },
  titleContainer: {
    flex: 1,
    marginLeft: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.text,
  },
  headerSub: {
    fontSize: 12,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  filterBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingTop: 20,
  },
  filterSummary: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    gap: 8,
    marginBottom: 20,
  },
  tag: {
    backgroundColor: Colors.cardBg,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textMuted,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
    paddingHorizontal: 10,
  },
});

export default SearchResults;
