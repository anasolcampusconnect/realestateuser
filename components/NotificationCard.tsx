import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/theme';

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
        <Ionicons name={getIcon()} size={24} color={Colors.primary} />
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
    backgroundColor: Colors.cardBg,
    borderRadius: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  unreadCard: {
    backgroundColor: Colors.lightGray,
    borderColor: Colors.border,
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: Colors.cardBg,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
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
    color: Colors.text,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.error,
  },
  message: {
    fontSize: 13,
    color: Colors.textMuted,
    lineHeight: 18,
    fontWeight: '500',
  },
  time: {
    fontSize: 11,
    color: Colors.textLight,
    marginTop: 8,
    fontWeight: '600',
  },
});

export default NotificationCard;
