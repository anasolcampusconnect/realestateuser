import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface BottomNavProps {
  activeTab: 'Home' | 'Estates' | 'Projects' | 'Saved' | 'Account';
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab }) => {
  const router = useRouter();

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navItem} onPress={() => router.push('/Home')}>
        <Ionicons name={activeTab === 'Home' ? 'home' : 'home-outline'} size={22} color={activeTab === 'Home' ? '#FBB03B' : '#6b7280'} />
        <Text style={[styles.navText, { color: activeTab === 'Home' ? '#FBB03B' : '#6b7280' }]}>Home</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.navItem} onPress={() => router.push('/Estates' as any)}>
        <Ionicons name={activeTab === 'Estates' ? 'business' : 'business-outline'} size={22} color={activeTab === 'Estates' ? '#FBB03B' : '#6b7280'} />
        <Text style={[styles.navText, { color: activeTab === 'Estates' ? '#FBB03B' : '#6b7280' }]}>Estates</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.navItem} onPress={() => router.push('/Payments')}>
        <Ionicons name={activeTab === 'Projects' ? 'card' : 'card-outline'} size={22} color={activeTab === 'Projects' ? '#FBB03B' : '#6b7280'} />
        <Text style={[styles.navText, { color: activeTab === 'Projects' ? '#FBB03B' : '#6b7280' }]}>Payments</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.navItem} onPress={() => router.push('/Favorites')}>
        <Ionicons name={activeTab === 'Saved' ? 'heart' : 'heart-outline'} size={22} color={activeTab === 'Saved' ? '#FBB03B' : '#6b7280'} />
        <Text style={[styles.navText, { color: activeTab === 'Saved' ? '#FBB03B' : '#6b7280' }]}>Saved</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.navItem} onPress={() => router.push('/Profile')}>
        <Ionicons name={activeTab === 'Account' ? 'person' : 'person-outline'} size={22} color={activeTab === 'Account' ? '#FBB03B' : '#6b7280'} />
        <Text style={[styles.navText, { color: activeTab === 'Account' ? '#FBB03B' : '#6b7280' }]}>Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
    justifyContent: 'space-around',
    paddingBottom: Platform.OS === 'web' ? 15 : (Platform.OS === 'ios' ? 34 : 26),
  },
  navItem: {
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
  },
  navText: {
    fontSize: 10,
    fontWeight: '700',
  },
});

export default BottomNav;
