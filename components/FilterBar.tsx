import { Colors } from '../constants/theme';

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
    backgroundColor: Colors.cardBg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  activeFilterItem: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textMuted,
  },
  activeFilterText: {
    color: Colors.white, // Crisp high-contrast white text on green active background
    fontWeight: '700',
  },
});

export default FilterBar;
