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
          <Ionicons name="arrow-back" size={24} color="#000" />
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
                <Ionicons name="remove" size={16} color="#000" />
              </TouchableOpacity>
              <Text style={styles.controlValue}>{formatCurrency(propertyCost)}</Text>
              <TouchableOpacity 
                style={styles.stepBtn} 
                onPress={() => setPropertyCost(propertyCost + 500000)}
              >
                <Ionicons name="add" size={16} color="#000" />
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
                <Ionicons name="remove" size={16} color="#000" />
              </TouchableOpacity>
              <Text style={styles.controlValue}>{downPaymentPercent}%</Text>
              <TouchableOpacity 
                style={styles.stepBtn} 
                onPress={() => setDownPaymentPercent(Math.min(90, downPaymentPercent + 5))}
              >
                <Ionicons name="add" size={16} color="#000" />
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
                <Ionicons name="remove" size={16} color="#000" />
              </TouchableOpacity>
              <Text style={styles.controlValue}>{interestRate.toFixed(1)}%</Text>
              <TouchableOpacity 
                style={styles.stepBtn} 
                onPress={() => setInterestRate(Math.min(15, interestRate + 0.2))}
              >
                <Ionicons name="add" size={16} color="#000" />
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
                <Ionicons name="remove" size={16} color="#000" />
              </TouchableOpacity>
              <Text style={styles.controlValue}>{tenureYears} Yrs</Text>
              <TouchableOpacity 
                style={styles.stepBtn} 
                onPress={() => setTenureYears(Math.min(30, tenureYears + 1))}
              >
                <Ionicons name="add" size={16} color="#000" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Formal Bill / Quotation Document */}
        <View style={styles.billPaper}>
          {/* Decorative invoice side bars */}
          <View style={styles.billSideHoles}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(h => (
              <View key={h} style={styles.paperHole} />
            ))}
          </View>

          <View style={styles.billContent}>
            {/* Bill Title / Watermark Header */}
            <View style={styles.billHeader}>
              <Text style={styles.companyName}>REAL NEST DEVELOPERS PVT. LTD.</Text>
              <Text style={styles.companyMeta}>100, Prime Residency Towers, MG Road, Bengaluru</Text>
              <Text style={styles.companyMeta}>CIN: U45201KA2026PTC123456 | Support: +91 98765 43210</Text>
            </View>

            <View style={styles.billDividerDashed} />

            {/* Invoice meta info */}
            <View style={styles.metaRow}>
              <View>
                <Text style={styles.metaLabel}>DOCUMENT TYPE</Text>
                <Text style={styles.metaValue}>ESTIMATED COST SHEET</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.metaLabel}>REF NO</Text>
                <Text style={styles.metaValue}>RN/2026/CS-9842</Text>
              </View>
            </View>

            <View style={styles.metaRow}>
              <View>
                <Text style={styles.metaLabel}>DATE PREPARED</Text>
                <Text style={styles.metaValue}>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.metaLabel}>ESTATE / PROJECT</Text>
                <Text style={styles.metaValue}>Real Nest Casablanca (Unit 402)</Text>
              </View>
            </View>

            <View style={styles.billDividerSolid} />

            {/* Line items Table */}
            <Text style={styles.tableTitle}>Schedule A: Cost Breakdown</Text>
            
            <View style={styles.tableHeader}>
              <Text style={[styles.tableCol, { flex: 2 }]}>DESCRIPTION</Text>
              <Text style={[styles.tableCol, { textAlign: 'right', flex: 1.5 }]}>AMOUNT (INR)</Text>
            </View>

            {/* Item 1 */}
            <View style={styles.tableRow}>
              <Text style={[styles.tableRowText, { flex: 2 }]}>Base Selling Price (BSP)</Text>
              <Text style={[styles.tableRowVal, { flex: 1.5 }]}>{formatCurrency(propertyCost)}</Text>
            </View>

            {/* Item 2 */}
            <View style={styles.tableRow}>
              <Text style={[styles.tableRowText, { flex: 2 }]}>Car Parking Slot (1 Assigned)</Text>
              <Text style={[styles.tableRowVal, { flex: 1.5 }]}>{formatCurrency(carParking)}</Text>
            </View>

            {/* Item 3 */}
            <View style={styles.tableRow}>
              <Text style={[styles.tableRowText, { flex: 2 }]}>Infrastructure & Amenities</Text>
              <Text style={[styles.tableRowVal, { flex: 1.5 }]}>{formatCurrency(infrastructure)}</Text>
            </View>

            <View style={styles.billDividerDashed} />

            {/* Subtotal */}
            <View style={styles.totalSumRow}>
              <Text style={styles.sumLabel}>Subtotal</Text>
              <Text style={styles.sumVal}>{formatCurrency(subTotal)}</Text>
            </View>

            {/* GST */}
            <View style={styles.totalSumRow}>
              <Text style={styles.sumLabel}>GST (12% of Subtotal)</Text>
              <Text style={styles.sumVal}>{formatCurrency(gstAmount)}</Text>
            </View>

            <View style={styles.billDividerSolid} />

            {/* Total Selling Price */}
            <View style={[styles.totalSumRow, { marginVertical: 5 }]}>
              <Text style={styles.grandLabel}>TOTAL ACQUISITION COST</Text>
              <Text style={styles.grandVal}>{formatCurrency(totalCost)}</Text>
            </View>

            <View style={styles.billDividerSolid} />

            {/* Schedule B: Financial Funding & EMI Details */}
            <Text style={[styles.tableTitle, { marginTop: 15 }]}>Schedule B: Funding & EMI Scheme</Text>

            <View style={styles.tableRow}>
              <Text style={[styles.tableRowText, { flex: 2 }]}>Down Payment ({downPaymentPercent}%)</Text>
              <Text style={[styles.tableRowVal, { flex: 1.5 }]}>{formatCurrency(downPayment)}</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={[styles.tableRowText, { flex: 2 }]}>Requested Bank Loan (Balance)</Text>
              <Text style={[styles.tableRowVal, { flex: 1.5 }]}>{formatCurrency(loanAmount)}</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={[styles.tableRowText, { flex: 2 }]}>Interest Rate Applied</Text>
              <Text style={[styles.tableRowVal, { flex: 1.5 }]}>{interestRate.toFixed(1)}% p.a.</Text>
            </View>

            <View style={styles.tableRow}>
              <Text style={[styles.tableRowText, { flex: 2 }]}>Repayment Tenure</Text>
              <Text style={[styles.tableRowVal, { flex: 1.5 }]}>{tenureYears} Years ({totalMonths} Months)</Text>
            </View>

            <View style={styles.billDividerDashed} />

            {/* EMI Display Box */}
            <View style={styles.emiHighlightBox}>
              <View>
                <Text style={styles.emiHighlightLabel}>MONTHLY EMI REPAYMENT</Text>
                <Text style={styles.emiHighlightDesc}>Direct bank auto-debit starting next month</Text>
              </View>
              <Text style={styles.emiHighlightValue}>{formatCurrency(emi)}<Text style={{ fontSize: 13, fontWeight: '700' }}> /mo</Text></Text>
            </View>

            <View style={styles.billDividerDashed} />

            {/* Signatures & Seal */}
            <View style={styles.signatureSection}>
              <View style={styles.stampBox}>
                <Text style={styles.stampText}>REAL NEST</Text>
                <Text style={styles.stampSub}>VERIFIED</Text>
                <Text style={styles.stampDate}>{new Date().getFullYear()}</Text>
              </View>
              <View style={styles.sigLineBlock}>
                <View style={styles.sigLine} />
                <Text style={styles.sigLabel}>Authorized Representative</Text>
                <Text style={styles.sigSubLabel}>Real Nest Finance Cell</Text>
              </View>
            </View>

            {/* Footer terms */}
            <Text style={styles.termsText}>
              * This is an automated cost estimation based on prevailing interest parameters. Actual bank sanction depends on customer credit scoring and terms of funding.
            </Text>
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
    backgroundColor: '#f3f4f6', // Light gray background for paper to pop out
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
    color: '#1a1a1a',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  controlBox: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  controlHeader: {
    fontSize: 14,
    fontWeight: '800',
    color: '#000',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
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
    color: '#4b5563',
  },
  controlButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  controlValue: {
    fontSize: 13,
    fontWeight: '800',
    color: '#000',
    minWidth: 90,
    textAlign: 'center',
  },
  stepBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  billPaper: {
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    flexDirection: 'row',
  },
  billSideHoles: {
    width: 25,
    backgroundColor: '#f9fafb',
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 30,
  },
  paperHole: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  billContent: {
    flex: 1,
    padding: 20,
  },
  billHeader: {
    alignItems: 'center',
    marginBottom: 15,
  },
  companyName: {
    fontSize: 16,
    fontWeight: '900',
    color: '#000',
    letterSpacing: -0.5,
  },
  companyMeta: {
    fontSize: 9,
    color: '#6b7280',
    fontWeight: '600',
    marginTop: 2,
    textAlign: 'center',
  },
  billDividerDashed: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderStyle: 'dashed',
    borderRadius: 1,
    marginVertical: 15,
  },
  billDividerSolid: {
    height: 1,
    backgroundColor: '#d1d5db',
    marginVertical: 12,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  metaLabel: {
    fontSize: 8,
    fontWeight: '800',
    color: '#9ca3af',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  metaValue: {
    fontSize: 11,
    fontWeight: '700',
    color: '#111827',
    marginTop: 1,
  },
  tableTitle: {
    fontSize: 13,
    fontWeight: '900',
    color: '#000',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f9fafb',
    padding: 8,
    borderRadius: 5,
    marginBottom: 8,
  },
  tableCol: {
    fontSize: 9,
    fontWeight: '900',
    color: '#4b5563',
    letterSpacing: 0.5,
  },
  tableRow: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 7,
  },
  tableRowText: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '600',
  },
  tableRowVal: {
    fontSize: 12,
    color: '#111827',
    fontWeight: '800',
    textAlign: 'right',
  },
  totalSumRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  sumLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4b5563',
  },
  sumVal: {
    fontSize: 12,
    fontWeight: '800',
    color: '#111827',
  },
  grandLabel: {
    fontSize: 13,
    fontWeight: '900',
    color: '#000',
    letterSpacing: 0.5,
  },
  grandVal: {
    fontSize: 15,
    fontWeight: '900',
    color: '#000',
  },
  emiHighlightBox: {
    backgroundColor: '#faf5ff',
    borderWidth: 1,
    borderColor: '#e8d5f5',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  emiHighlightLabel: {
    fontSize: 11,
    fontWeight: '900',
    color: '#7c3aed',
    letterSpacing: 0.5,
  },
  emiHighlightDesc: {
    fontSize: 8,
    color: '#6b7280',
    fontWeight: '600',
    marginTop: 2,
  },
  emiHighlightValue: {
    fontSize: 18,
    fontWeight: '900',
    color: '#7c3aed',
  },
  signatureSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  stampBox: {
    borderWidth: 2,
    borderColor: 'rgba(251, 176, 59, 0.4)',
    borderRadius: 8,
    padding: 8,
    transform: [{ rotate: '-8deg' }],
    alignItems: 'center',
    justifyContent: 'center',
  },
  stampText: {
    fontSize: 12,
    fontWeight: '900',
    color: 'rgba(251, 176, 59, 0.6)',
    letterSpacing: 0.5,
  },
  stampSub: {
    fontSize: 9,
    fontWeight: '900',
    color: 'rgba(251, 176, 59, 0.6)',
    marginTop: 1,
  },
  stampDate: {
    fontSize: 8,
    color: 'rgba(251, 176, 59, 0.4)',
    fontWeight: '700',
  },
  sigLineBlock: {
    alignItems: 'center',
    minWidth: 150,
  },
  sigLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#9ca3af',
    marginBottom: 6,
  },
  sigLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#374151',
  },
  sigSubLabel: {
    fontSize: 8,
    color: '#6b7280',
    fontWeight: '600',
    marginTop: 1,
  },
  termsText: {
    fontSize: 8,
    color: '#9ca3af',
    fontWeight: '500',
    lineHeight: 12,
    textAlign: 'center',
    marginTop: 15,
  },
});

export default Payments;
