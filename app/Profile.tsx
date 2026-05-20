import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import BottomNav from '../components/BottomNav';
import { Colors } from '../constants/theme';

const Profile = () => {
  const router = useRouter();
  const [randomNumber, setRandomNumber] = useState<number | null>(null);

  // Load saved random number on mount (Web)
  useEffect(() => {
    if (Platform.OS === 'web') {
      const saved = localStorage.getItem('real_estate_profile_token');
      if (saved) {
        setRandomNumber(Number(saved));
      }
    }
  }, []);

  const handleGenerateRandom = () => {
    const randomVal = Math.floor(100000 + Math.random() * 900000);
    setRandomNumber(randomVal);
    if (Platform.OS === 'web') {
      localStorage.setItem('real_estate_profile_token', String(randomVal));
    }
  };

  const menuItems: { id: string, title: string, icon: keyof typeof Ionicons.glyphMap, route: any }[] = [
    { id: '1', title: 'Edit Profile', icon: 'person-outline', route: '/EditProfile' },
    { id: '2', title: 'My Site Visits', icon: 'calendar-outline', route: '/SiteVisit' },
    { id: '3', title: 'Quotation & Cost Sheet', icon: 'card-outline', route: '/Payments' },
    { id: '4', title: 'My Documents', icon: 'document-text-outline', route: '/Documents' },
    { id: '5', title: 'Saved Properties', icon: 'heart-outline', route: '/Favorites' },
    { id: '6', title: 'Notifications', icon: 'notifications-outline', route: '/Notifications' },
    { id: '7', title: 'Help & Support', icon: 'help-circle-outline', route: '/Inquiry' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileCard}>
          <Image
            source={require('../assets/images/user_avatar.png')}
            style={styles.profilePic}
          />
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>John Doepreet112@gmail.com</Text>

          <View style={styles.residenceBadge}>
            <Ionicons name="business-outline" size={14} color={Colors.primary} />
            <Text style={styles.residenceText}>Tower B (Premium) • Suite 402</Text>
          </View>

          {randomNumber !== null && (
            <View style={styles.randomNumberContainer}>
              <Ionicons name="key-outline" size={14} color={Colors.primary} style={{ marginRight: 4 }} />
              <Text style={styles.randomNumberText}>Access Token: #{randomNumber}</Text>
            </View>
          )}

          <TouchableOpacity style={styles.editBadge} onPress={handleGenerateRandom}>
            <Text style={styles.editBadgeText}>Premium Member</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => router.push(item.route)}
            >
              <View style={styles.menuIconBg}>
                <Ionicons name={item.icon} size={22} color={Colors.primary} />
              </View>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            if (Platform.OS === 'web') {
              if (window.confirm('Do you want to log out?')) {
                router.replace('/');
              }
            } else {
              Alert.alert('Log Out', 'Do you want to log out?', [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Log Out', onPress: () => router.replace('/'), style: 'destructive' }
              ]);
            }
          }}
        >
          <Ionicons name="log-out-outline" size={20} color={Colors.error} />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomNav activeTab="Account" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: Platform.OS === 'web' ? 20 : 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.text,
  },
  settingsButton: {
    padding: 5,
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingBottom: 40,
  },
  profileCard: {
    alignItems: 'center',
    marginBottom: 40,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: Colors.primary,
  },
  userName: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.text,
  },
  userEmail: {
    fontSize: 14,
    color: Colors.textMuted,
    marginTop: 4,
    fontWeight: '500',
  },
  residenceBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'rgba(61, 76, 58, 0.08)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 6,
  },
  residenceText: {
    fontSize: 12,
    fontWeight: '800',
    color: Colors.primary,
  },
  randomNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: Colors.lightGray,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  randomNumberText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primary,
  },
  editBadge: {
    marginTop: 15,
    backgroundColor: Colors.primary,
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
  },
  editBadgeText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '800',
  },
  menuContainer: {
    backgroundColor: Colors.cardBg,
    borderRadius: 25,
    padding: 10,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: Colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuIconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  menuTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: Colors.text,
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 10,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.error,
  },
});

export default Profile;
