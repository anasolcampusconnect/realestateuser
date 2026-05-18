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
  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
  const [selectedTime, setSelectedTime] = useState('10:00 AM');

  // Generate next 14 days
  const getDays = () => {
    const days = [];
    for (let i = 0; i < 14; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push({
        full: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNum: date.getDate(),
        month: date.toLocaleDateString('en-US', { month: 'short' }),
      });
    }
    return days;
  };

  const days = getDays();
  const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'];

  const handleRequest = () => {
    Alert.alert('Success', `Site visit scheduled for ${selectedDate} at ${selectedTime}`);
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

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.propertyPreview}>
          <View style={styles.propertyInfo}>
            <Text style={styles.propertyName}>Real Nest Casablanca</Text>
            <Text style={styles.propertyLocation}>Kanakapura Road, Bengaluru</Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Verified Property</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Select Date</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dateScroller}>
          {days.map((item, idx) => (
            <TouchableOpacity 
              key={idx}
              style={[
                styles.dateItem,
                selectedDate === item.full && styles.selectedDateItem
              ]}
              onPress={() => setSelectedDate(item.full)}
            >
              <Text style={[styles.dayName, selectedDate === item.full && styles.selectedDateText]}>{item.dayName}</Text>
              <Text style={[styles.dayNum, selectedDate === item.full && styles.selectedDateText]}>{item.dayNum}</Text>
              <Text style={[styles.monthName, selectedDate === item.full && styles.selectedDateText]}>{item.month}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  propertyInfo: {
    flex: 1,
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
  badge: {
    backgroundColor: '#ecfdf5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    color: '#059669',
    fontSize: 11,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 20,
    marginTop: 10,
  },
  dateScroller: {
    marginBottom: 35,
  },
  dateItem: {
    width: 65,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 15,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  selectedDateItem: {
    backgroundColor: '#FBB03B',
    borderColor: '#FBB03B',
    elevation: 4,
    shadowColor: '#FBB03B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  dayName: {
    fontSize: 11,
    color: '#94a3b8',
    fontWeight: '700',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  dayNum: {
    fontSize: 20,
    color: '#1e293b',
    fontWeight: '900',
    marginBottom: 2,
  },
  monthName: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '700',
  },
  selectedDateText: {
    color: '#000',
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
