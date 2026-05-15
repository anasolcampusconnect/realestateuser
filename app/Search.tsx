import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  TextInput, 
  Dimensions,
  SafeAreaView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const { width } = Dimensions.get('window');

const Search = () => {
  const router = useRouter();
  const [activeType, setActiveType] = useState('Buy');
  const [propertyType, setPropertyType] = useState('Apartment');
  const [bedrooms, setBedrooms] = useState('2');
  const [furnished, setFurnished] = useState('Semi');

  const propertyTypes = ['Apartment', 'Villa', 'Plot', 'Office'];
  const bedroomOptions = ['1', '2', '3', '4+'];
  const furnishingOptions = ['Unfurnished', 'Semi', 'Fully'];
  const facilities = ['Gym', 'Pool', 'Park', 'Security', 'Parking'];

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#6b7280" />
            <TextInput 
              placeholder="Search by location..." 
              style={styles.searchInput}
              placeholderTextColor="#9ca3af"
            />
          </View>
        </View>
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Buy/Rent Toggle */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity 
            style={[styles.toggleBtn, activeType === 'Buy' && styles.activeToggle]} 
            onPress={() => setActiveType('Buy')}
          >
            <Text style={[styles.toggleText, activeType === 'Buy' && styles.activeToggleText]}>BUY</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.toggleBtn, activeType === 'Rent' && styles.activeToggle]} 
            onPress={() => setActiveType('Rent')}
          >
            <Text style={[styles.toggleText, activeType === 'Rent' && styles.activeToggleText]}>RENT</Text>
          </TouchableOpacity>
        </View>

        {/* Budget Range */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Budget Range</Text>
          <View style={styles.budgetRow}>
            <View style={styles.budgetBox}>
              <Text style={styles.budgetLabel}>Min</Text>
              <Text style={styles.budgetValue}>$ 40L</Text>
            </View>
            <Ionicons name="remove" size={20} color="#d1d5db" />
            <View style={styles.budgetBox}>
              <Text style={styles.budgetLabel}>Max</Text>
              <Text style={styles.budgetValue}>$ 2.5Cr</Text>
            </View>
          </View>
        </View>

        {/* Property Type */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Property Type</Text>
          <View style={styles.optionsRow}>
            {propertyTypes.map(type => (
              <TouchableOpacity 
                key={type} 
                style={[styles.optionBtn, propertyType === type && styles.activeOption]}
                onPress={() => setPropertyType(type)}
              >
                <Text style={[styles.optionText, propertyType === type && styles.activeOptionText]}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Bedrooms */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Bedrooms (BHK)</Text>
          <View style={styles.optionsRow}>
            {bedroomOptions.map(opt => (
              <TouchableOpacity 
                key={opt} 
                style={[styles.circleOption, bedrooms === opt && styles.activeCircle]}
                onPress={() => setBedrooms(opt)}
              >
                <Text style={[styles.optionText, bedrooms === opt && styles.activeOptionText]}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Furnishing Status */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Furnishing Status</Text>
          <View style={styles.optionsRow}>
            {furnishingOptions.map(opt => (
              <TouchableOpacity 
                key={opt} 
                style={[styles.optionBtn, furnished === opt && styles.activeOption]}
                onPress={() => setFurnished(opt)}
              >
                <Text style={[styles.optionText, furnished === opt && styles.activeOptionText]}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Nearby Facilities */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nearby Facilities</Text>
          <View style={styles.facilitiesRow}>
            {facilities.map(facility => (
              <View key={facility} style={styles.facilityTag}>
                <Ionicons name="checkmark-circle" size={16} color="#FBB03B" />
                <Text style={styles.facilityText}>{facility}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.applyBtn} onPress={() => router.back()}>
          <Text style={styles.applyBtnText}>APPLY FILTERS</Text>
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
  header: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    paddingBottom: 15,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    gap: 15,
    marginTop: 10,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 10,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  scrollContent: {
    padding: 25,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 4,
    marginBottom: 35,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeToggle: {
    backgroundColor: '#FBB03B',
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#6b7280',
  },
  activeToggleText: {
    color: '#000',
  },
  section: {
    marginBottom: 35,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#000',
    marginBottom: 15,
  },
  budgetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 15,
  },
  budgetBox: {
    flex: 1,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 15,
    borderRadius: 8,
  },
  budgetLabel: {
    fontSize: 10,
    color: '#9ca3af',
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  budgetValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginTop: 5,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionBtn: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
  },
  activeOption: {
    backgroundColor: '#FBB03B',
    borderColor: '#FBB03B',
  },
  optionText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#4b5563',
  },
  activeOptionText: {
    color: '#000',
  },
  circleOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeCircle: {
    backgroundColor: '#FBB03B',
    borderColor: '#FBB03B',
  },
  facilitiesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  facilityTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  facilityText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4b5563',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  applyBtn: {
    backgroundColor: '#FBB03B',
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyBtnText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#000',
  },
});

export default Search;
