import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface NotificationCardProps {
  notification: {
    id: string;
    title: string;
    message: string;
    time: string;
    type: string;
    unread: boolean;
  };
}

const NotificationCard = ({ notification }: NotificationCardProps) => {
  const getIcon = () => {
    switch(notification.type) {
      case 'payment': return 'card-outline';
      case 'visit': return 'calendar-outline';
      case 'offer': return 'pricetag-outline';
      default: return 'notifications-outline';
    }
  };

  return (
    <TouchableOpacity style={[styles.card, notification.unread && styles.unreadCard]}>
      <View style={styles.iconContainer}>
        <Ionicons name={getIcon()} size={24} color="#000" />
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{notification.title}</Text>
          {notification.unread && <View style={styles.dot} />}
        </View>
        <Text style={styles.message} numberOfLines={2}>{notification.message}</Text>
        <Text style={styles.time}>{notification.time}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  unreadCard: {
    backgroundColor: '#f9fafb',
    borderColor: '#e5e7eb',
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  content: {
    flex: 1,
    marginLeft: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff4b4b',
  },
  message: {
    fontSize: 13,
    color: '#6b7280',
    lineHeight: 18,
  },
  time: {
    fontSize: 11,
    color: '#9ca3af',
    marginTop: 8,
    fontWeight: '500',
  },
});

export default NotificationCard;
