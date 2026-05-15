import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import PaymentCard from '../components/PaymentCard';

const Payments = () => {
  const router = useRouter();

  const transactions = [
    {
      id: '1',
      title: 'Booking Advance',
      property: 'Redwood Villas',
      amount: '$10,000',
      date: 'Oct 12, 2024',
      status: 'Completed'
    },
    {
      id: '2',
      title: 'EMI - Installment 1',
      property: 'Redwood Villas',
      amount: '$2,500',
      date: 'Nov 01, 2024',
      status: 'Pending'
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Payments</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Total Paid</Text>
          <Text style={styles.balanceAmount}>$12,500.00</Text>
          <View style={styles.balanceRow}>
            <View>
              <Text style={styles.subLabel}>Next EMI</Text>
              <Text style={styles.subValue}>$2,500.00</Text>
            </View>
            <View style={styles.divider} />
            <View>
              <Text style={styles.subLabel}>Due Date</Text>
              <Text style={styles.subValue}>Dec 01, 2024</Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Transaction History</Text>
          <TouchableOpacity>
            <Ionicons name="filter" size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>

        {transactions.map(item => (
          <PaymentCard key={item.id} transaction={item} />
        ))}
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
  balanceCard: {
    backgroundColor: '#FBB03B',
    borderRadius: 25,
    padding: 25,
    marginBottom: 40,
  },
  balanceLabel: {
    color: 'rgba(0,0,0,0.6)',
    fontSize: 14,
    marginBottom: 5,
    fontWeight: '700',
  },
  balanceAmount: {
    color: '#000',
    fontSize: 32,
    fontWeight: '900',
    marginBottom: 25,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
    paddingTop: 20,
  },
  subLabel: {
    color: 'rgba(0,0,0,0.6)',
    fontSize: 12,
    marginBottom: 4,
    fontWeight: '700',
  },
  subValue: {
    color: '#000',
    fontSize: 15,
    fontWeight: '800',
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
  },
});

export default Payments;
