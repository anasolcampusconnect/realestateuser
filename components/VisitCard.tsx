import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface VisitCardProps {
  visit: {
    property: string;
    date: string;
    time: string;
    status: string;
  };
}

const VisitCard = ({ visit }: VisitCardProps) => {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.iconBg}>
        <Ionicons name="calendar" size={24} color="#000" />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{visit.property}</Text>
        <View style={styles.row}>
          <Ionicons name="time-outline" size={14} color="#6b7280" />
          <Text style={styles.text}>{visit.date} • {visit.time}</Text>
        </View>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{visit.status}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.actionButton}>
        <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  iconBg: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: '#f9fafb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    marginLeft: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  text: {
    fontSize: 12,
    color: '#6b7280',
  },
  statusBadge: {
    alignSelf: 'flex-start',
    marginTop: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#4b5563',
    textTransform: 'uppercase',
  },
  actionButton: {
    padding: 5,
  },
});

export default VisitCard;
