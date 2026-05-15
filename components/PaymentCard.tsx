import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
          color={isCompleted ? "#10b981" : "#f59e0b"} 
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedBg: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  pendingBg: {
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
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
  property: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  date: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  status: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginTop: 4,
  },
  completedText: {
    color: '#10b981',
  },
  pendingText: {
    color: '#f59e0b',
  },
});

export default PaymentCard;
