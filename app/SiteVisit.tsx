import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const SiteVisit = () => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState('Oct 24, 2024');
  const [selectedTime, setSelectedTime] = useState('10:00 AM');

  const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];

  const handleRequest = () => {
    Alert.alert('Success', 'Your site visit request has been sent to the agent.');
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Request Site Visit</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.propertyPreview}>
          <Text style={styles.propertyName}>Brookside Haven</Text>
          <Text style={styles.propertyLocation}>Oakville, ON</Text>
        </View>

        <Text style={styles.sectionTitle}>Select Date</Text>
        <View style={styles.calendarPlaceholder}>
          <Text style={styles.dateText}>{selectedDate}</Text>
          <Ionicons name="calendar-outline" size={20} color="#6b7280" />
        </View>

        <Text style={styles.sectionTitle}>Available Slots</Text>
        <View style={styles.slotsGrid}>
          {timeSlots.map(slot => (
            <TouchableOpacity 
              key={slot}
              style={[
                styles.slotItem,
                selectedTime === slot && styles.selectedSlot
              ]}
              onPress={() => setSelectedTime(slot)}
            >
              <Text style={[
                styles.slotText,
                selectedTime === slot && styles.selectedSlotText
              ]}>{slot}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Additional Notes</Text>
        <TextInput
          style={styles.notesInput}
          placeholder="Anything you'd like to tell the agent..."
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.requestButton} onPress={handleRequest}>
          <Text style={styles.requestButtonText}>Send Request</Text>
        </TouchableOpacity>
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
    marginBottom: 30,
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
  propertyPreview: {
    backgroundColor: '#f9fafb',
    padding: 20,
    borderRadius: 20,
    marginBottom: 30,
  },
  propertyName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  propertyLocation: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 15,
    marginTop: 10,
  },
  calendarPlaceholder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    marginBottom: 30,
  },
  dateText: {
    fontSize: 16,
    color: '#1a1a1a',
  },
  slotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 30,
  },
  slotItem: {
    width: (width - 74) / 3,
    paddingVertical: 12,
    backgroundColor: '#f9fafb',
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  selectedSlot: {
    backgroundColor: '#FBB03B',
    borderColor: '#FBB03B',
  },
  slotText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6b7280',
  },
  selectedSlotText: {
    color: '#000',
  },
  notesInput: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    minHeight: 120,
    textAlignVertical: 'top',
    marginBottom: 40,
  },
  requestButton: {
    backgroundColor: '#FBB03B',
    borderRadius: 50,
    padding: 18,
    alignItems: 'center',
  },
  requestButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '800',
  },
});

export default SiteVisit;
