import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import NotificationCard from '../components/NotificationCard';
import { Colors } from '../constants/theme';

const Notifications = () => {
  const router = useRouter();

  const notifications = [
    {
      id: '1',
      title: 'Payment Reminder',
      message: 'Your EMI for Redwood Villas is due in 3 days.',
      time: '2 hours ago',
      type: 'payment',
      unread: true
    },
    {
      id: '2',
      title: 'Visit Confirmed',
      message: 'Agent has confirmed your visit for Oct 24 at 10 AM.',
      time: 'Yesterday',
      type: 'visit',
      unread: false
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Notifications</Text>
        <TouchableOpacity>
          <Text style={styles.markAll}>Clear</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {notifications.map(item => (
          <NotificationCard key={item.id} notification={item} />
        ))}
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
  markAll: {
    fontSize: 14,
    color: Colors.textMuted,
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingBottom: 40,
  },
});

export default Notifications;
