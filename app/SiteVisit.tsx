import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity,
  TextInput,
  Alert,
  Dimensions,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/theme';

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
    if (Platform.OS === 'web') {
      window.alert(`Site visit scheduled successfully for ${selectedDate} at ${selectedTime}`);
    } else {
      Alert.alert('Success', `Site visit scheduled for ${selectedDate} at ${selectedTime}`);
    }
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
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
          placeholderTextColor={Colors.textLight}
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
    backgroundColor: Colors.background,
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
    fontWeight: '800',
    color: Colors.text,
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingBottom: 40,
  },
  propertyPreview: {
    backgroundColor: Colors.cardBg,
    padding: 20,
    borderRadius: 20,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  propertyInfo: {
    flex: 1,
  },
  propertyName: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.text,
  },
  propertyLocation: {
    fontSize: 14,
    color: Colors.textMuted,
    marginTop: 4,
    fontWeight: '500',
  },
  badge: {
    backgroundColor: Colors.lightGray,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    color: Colors.primary,
    fontSize: 11,
    fontWeight: '800',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
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
    backgroundColor: Colors.cardBg,
    borderRadius: 15,
    marginRight: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selectedDateItem: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
    elevation: 4,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  dayName: {
    fontSize: 11,
    color: Colors.textMuted,
    fontWeight: '700',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  dayNum: {
    fontSize: 20,
    color: Colors.text,
    fontWeight: '900',
    marginBottom: 2,
  },
  monthName: {
    fontSize: 11,
    color: Colors.textLight,
    fontWeight: '700',
  },
  selectedDateText: {
    color: Colors.white,
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
    backgroundColor: Colors.cardBg,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  selectedSlot: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  slotText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textMuted,
  },
  selectedSlotText: {
    color: Colors.white,
  },
  notesInput: {
    backgroundColor: Colors.cardBg,
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
    minHeight: 120,
    textAlignVertical: 'top',
    marginBottom: 40,
  },
  requestButton: {
    backgroundColor: Colors.primary,
    borderRadius: 50,
    padding: 18,
    alignItems: 'center',
  },
  requestButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '800',
  },
});

export default SiteVisit;
