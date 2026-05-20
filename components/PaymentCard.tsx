import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/theme';

interface PaymentCardProps {
  transaction: {
    id: string;
    title: string;
    property: string;
    amount: string;
    date: string;
    status: string;
  };
}

const PaymentCard = ({ transaction }: PaymentCardProps) => {
  const isCompleted = transaction.status === 'Completed';

  return (
    <TouchableOpacity style={styles.card}>
      <View style={[styles.iconBg, isCompleted ? styles.completedBg : styles.pendingBg]}>
        <Ionicons 
          name={isCompleted ? "checkmark-circle" : "time"} 
          size={24} 
          color={isCompleted ? "#1E4C3C" : "#D97706"} 
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{transaction.title}</Text>
        <Text style={styles.property}>{transaction.property}</Text>
        <Text style={styles.date}>{transaction.date}</Text>
      </View>
      <View style={styles.rightContent}>
        <Text style={styles.amount}>{transaction.amount}</Text>
        <Text style={[styles.status, isCompleted ? styles.completedText : styles.pendingText]}>
          {transaction.status}
        </Text>
      </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedBg: {
    backgroundColor: 'rgba(30, 76, 60, 0.12)',
  },
  pendingBg: {
    backgroundColor: 'rgba(217, 119, 6, 0.12)',
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
  property: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: 2,
    fontWeight: '500',
  },
  date: {
    fontSize: 12,
    color: Colors.textLight,
    marginTop: 4,
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.text,
  },
  status: {
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    marginTop: 4,
  },
  completedText: {
    color: '#1E4C3C',
  },
  pendingText: {
    color: '#D97706',
  },
});

export default PaymentCard;
