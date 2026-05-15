import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Profile = () => {
  const router = useRouter();

  const menuItems: { id: string, title: string, icon: keyof typeof Ionicons.glyphMap, route: any }[] = [
    { id: '1', title: 'Edit Profile', icon: 'person-outline', route: '/Profile' },
    { id: '2', title: 'My Site Visits', icon: 'calendar-outline', route: '/SiteVisit' },
    { id: '3', title: 'Payment History', icon: 'card-outline', route: '/Payments' },
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
          <Ionicons name="settings-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.avatarContainer}>
          <Image 
            source={require('../assets/images/user_avatar.png')} 
            style={styles.avatar} 
          />
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>john.doe@example.com</Text>
          <TouchableOpacity style={styles.editBadge}>
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
                <Ionicons name={item.icon} size={22} color="#000" />
              </View>
              <Text style={styles.menuTitle}>{item.title}</Text>
              <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={() => router.replace('/')}
        >
          <Ionicons name="log-out-outline" size={20} color="#ff4b4b" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
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
    borderColor: '#f3f4f6',
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  userEmail: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  editBadge: {
    marginTop: 15,
    backgroundColor: '#000',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
  },
  editBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  menuContainer: {
    backgroundColor: '#f9fafb',
    borderRadius: 25,
    padding: 10,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  menuIconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  menuTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
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
    fontWeight: '600',
    color: '#ff4b4b',
  },
});

export default Profile;
