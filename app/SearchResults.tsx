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

const { width } = Dimensions.get('window');

const SearchResults = () => {
  const router = useRouter();
  const { query } = useLocalSearchParams();

  // Mock filtered data
  const results = [
    { id: '1', title: 'Casagrand Zenith', location: 'Chennai, TN', price: '$44L to $80L', beds: 2, image: require('../assets/images/house1.jpg'), status: 'Ongoing', acres: '2.5' },
    { id: '2', title: 'Casagrand Bloom', location: 'Bengaluru, KA', price: '$85L to $1.2Cr', beds: 3, image: require('../assets/images/house2.jpg'), status: 'New Launch', acres: '5.0' },
    { id: '4', title: 'Casagrand Casablanca', location: 'Coimbatore, TN', price: '$1.2Cr to $3.7Cr', beds: 4, image: require('../assets/images/house1.jpg'), status: 'Ongoing', acres: '18.0' },
    { id: '5', title: 'Casagrand Highcity', location: 'Hyderabad, TS', price: '$49L to $67L', beds: 2, image: require('../assets/images/house2.jpg'), status: 'Ongoing', acres: '41.0' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.headerTitle}>Search Results</Text>
            <Text style={styles.headerSub}>{results.length} Properties Found</Text>
          </View>
          <TouchableOpacity style={styles.filterBtn} onPress={() => router.push('/Search')}>
            <Ionicons name="options-outline" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.filterSummary}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>Villas</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>2+ BHK</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>Under $1Cr</Text>
          </View>
        </View>

        <View style={styles.grid}>
          {results.map(item => (
            <PropertyCard key={item.id} property={item} />
          ))}
        </View>

        <View style={{ height: 50 }} />
      </ScrollView>
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
    color: '#000',
  },
  headerSub: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '600',
  },
  filterBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#FBB03B',
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
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  tagText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#4b5563',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
  },
});

export default SearchResults;
