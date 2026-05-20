import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Platform,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BottomNav from '../components/BottomNav';
import { Colors } from '../constants/theme';

const { width } = Dimensions.get('window');

const Payments = () => {
  const router = useRouter();

  // Quotation Interactive State
  const [propertyCost, setPropertyCost] = useState(12000000); // Base Selling Price: 1.20 Cr default
  const [carParking, setCarParking] = useState(300000); // 3L
  const [infrastructure, setInfrastructure] = useState(250000); // 2.5L
  const [interestRate, setInterestRate] = useState(8.5); // 8.5%
  const [tenureYears, setTenureYears] = useState(20); // 20 years
  const [downPaymentPercent, setDownPaymentPercent] = useState(20); // 20% down payment

  // Totals calculations
  const subTotal = propertyCost + carParking + infrastructure;
  const gstAmount = Math.round(subTotal * 0.12); // 12% GST
  const totalCost = subTotal + gstAmount;

  // Downpayment & Loan Amount
  const downPayment = Math.round(totalCost * (downPaymentPercent / 100));
  const loanAmount = totalCost - downPayment;

  // Monthly EMI
  const monthlyRate = (interestRate / 12) / 100;
  const totalMonths = tenureYears * 12;

  let emi = 0;
  if (monthlyRate > 0) {
    emi = Math.round(
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1)
    );
  } else {
    emi = Math.round(loanAmount / totalMonths);
  }

  // Format Helper
  const formatCurrency = (val: number) => {
    return `₹ ${val.toLocaleString('en-IN')}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <Text style={styles.title}>Quotation & Cost Sheet</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Cost Sheet Configuration Controls */}
        <View style={styles.controlBox}>
          <Text style={styles.controlHeader}>Adjust Quotation Factors</Text>
          
          {/* Base cost step control */}
          <View style={styles.controlRow}>
            <Text style={styles.controlLabel}>Base Selling Price (BSP)</Text>
            <View style={styles.controlButtons}>
              <TouchableOpacity 
                style={styles.stepBtn} 
                onPress={() => setPropertyCost(Math.max(5000000, propertyCost - 500000))}
              >
                <Ionicons name="remove" size={16} color={Colors.text} />
              </TouchableOpacity>
              <Text style={styles.controlValue}>{formatCurrency(propertyCost)}</Text>
              <TouchableOpacity 
                style={styles.stepBtn} 
                onPress={() => setPropertyCost(propertyCost + 500000)}
              >
                <Ionicons name="add" size={16} color={Colors.text} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Down Payment % control */}
          <View style={styles.controlRow}>
            <Text style={styles.controlLabel}>Down Payment %</Text>
            <View style={styles.controlButtons}>
              <TouchableOpacity 
                style={styles.stepBtn} 
                onPress={() => setDownPaymentPercent(Math.max(10, downPaymentPercent - 5))}
              >
                <Ionicons name="remove" size={16} color={Colors.text} />
              </TouchableOpacity>
              <Text style={styles.controlValue}>{downPaymentPercent}%</Text>
              <TouchableOpacity 
                style={styles.stepBtn} 
                onPress={() => setDownPaymentPercent(Math.min(90, downPaymentPercent + 5))}
              >
                <Ionicons name="add" size={16} color={Colors.text} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Interest rate step control */}
          <View style={styles.controlRow}>
            <Text style={styles.controlLabel}>Bank Interest Rate (p.a.)</Text>
            <View style={styles.controlButtons}>
              <TouchableOpacity 
                style={styles.stepBtn} 
                onPress={() => setInterestRate(Math.max(5, interestRate - 0.2))}
              >
                <Ionicons name="remove" size={16} color={Colors.text} />
              </TouchableOpacity>
              <Text style={styles.controlValue}>{interestRate.toFixed(1)}%</Text>
              <TouchableOpacity 
                style={styles.stepBtn} 
                onPress={() => setInterestRate(Math.min(15, interestRate + 0.2))}
              >
                <Ionicons name="add" size={16} color={Colors.text} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Tenure step control */}
          <View style={styles.controlRow}>
            <Text style={styles.controlLabel}>Loan Tenure (Years)</Text>
            <View style={styles.controlButtons}>
              <TouchableOpacity 
                style={styles.stepBtn} 
                onPress={() => setTenureYears(Math.max(5, tenureYears - 1))}
              >
                <Ionicons name="remove" size={16} color={Colors.text} />
              </TouchableOpacity>
              <Text style={styles.controlValue}>{tenureYears} Yrs</Text>
              <TouchableOpacity 
                style={styles.stepBtn} 
                onPress={() => setTenureYears(Math.min(30, tenureYears + 1))}
              >
                <Ionicons name="add" size={16} color={Colors.text} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Live Calculated Results Panel */}
          <View style={styles.resultsPanel}>
            <Text style={styles.resultsHeader}>Live Quotation Summary</Text>
            
            <View style={styles.resultsGrid}>
              <View style={styles.resultItem}>
                <Text style={styles.resultLabel}>TOTAL PRICE (INCL. GST)</Text>
                <Text style={styles.resultValue}>{formatCurrency(totalCost)}</Text>
              </View>
              <View style={styles.resultItem}>
                <Text style={styles.resultLabel}>DOWN PAYMENT</Text>
                <Text style={styles.resultValue}>{formatCurrency(downPayment)}</Text>
              </View>
            </View>

            <View style={styles.resultsGrid}>
              <View style={styles.resultItem}>
                <Text style={styles.resultLabel}>LOAN AMOUNT</Text>
                <Text style={styles.resultValue}>{formatCurrency(loanAmount)}</Text>
              </View>
              <View style={styles.resultItem}>
                <Text style={styles.resultLabel}>MONTHLY EMI</Text>
                <Text style={[styles.resultValue, { color: Colors.primary, fontSize: 16 }]}>
                  {formatCurrency(emi)}
                  <Text style={{ fontSize: 10, fontWeight: '700' }}>/mo</Text>
                </Text>
              </View>
            </View>
          </View>
        </View>

      </ScrollView>

      <BottomNav activeTab="Projects" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background, // Luxury Warm Cashmere Sand background
    paddingTop: Platform.OS === 'web' ? 20 : 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    marginBottom: 20,
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
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  controlBox: {
    backgroundColor: Colors.cardBg,
    borderRadius: 20,
    padding: 18,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 3,
  },
  controlHeader: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.text,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingBottom: 8,
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  controlLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textMuted,
  },
  controlButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  controlValue: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.text,
    minWidth: 90,
    textAlign: 'center',
  },
  stepBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultsPanel: {
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  resultsHeader: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  resultsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    gap: 10,
  },
  resultItem: {
    flex: 1,
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  resultLabel: {
    fontSize: 8,
    fontWeight: '800',
    color: Colors.textMuted,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  resultValue: {
    fontSize: 13,
    fontWeight: '800',
    color: Colors.text,
  },
});

export default Payments;
