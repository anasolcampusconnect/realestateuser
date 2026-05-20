import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/theme';

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
        <Ionicons name="calendar" size={24} color={Colors.primary} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{visit.property}</Text>
        <View style={styles.row}>
          <Ionicons name="time-outline" size={14} color={Colors.textMuted} />
          <Text style={styles.text}>{visit.date} • {visit.time}</Text>
        </View>
        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>{visit.status}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.actionButton}>
        <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: Colors.cardBg,
    borderRadius: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconBg: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: Colors.lightGray,
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
    color: Colors.text,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  text: {
    fontSize: 12,
    color: Colors.textMuted,
    fontWeight: '500',
  },
  statusBadge: {
    alignSelf: 'flex-start',
    marginTop: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: Colors.lightGray,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '800',
    color: Colors.text,
    textTransform: 'uppercase',
  },
  actionButton: {
    padding: 5,
  },
});

export default VisitCard;
