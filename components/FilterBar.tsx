import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Text, View } from 'react-native';

interface FilterBarProps {
  activeFilter: string;
  onSelect: (filter: string) => void;
}

const FilterBar = ({ activeFilter, onSelect }: FilterBarProps) => {
  const filters = ['All', 'House', 'Apartment', 'Villa', 'Rent', 'Buy'];

  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        {filters.map((filter) => (
          <TouchableOpacity 
            key={filter} 
            style={[
              styles.filterItem,
              activeFilter === filter && styles.activeFilterItem
            ]}
            onPress={() => onSelect(filter)}
          >
            <Text style={[
              styles.filterText,
              activeFilter === filter && styles.activeFilterText
            ]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  scrollContent: {
    paddingHorizontal: 25,
    gap: 12,
  },
  filterItem: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  activeFilterItem: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  activeFilterText: {
    color: '#fff',
  },
});

export default FilterBar;
