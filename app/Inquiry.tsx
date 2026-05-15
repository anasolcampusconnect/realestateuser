import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Inquiry = () => {
  const router = useRouter();
  const [message, setMessage] = useState('');

  const handleSend = () => {
    Alert.alert('Sent', 'Your inquiry has been sent to the agent.');
    router.back();
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Contact Agent</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.agentBanner}>
          <View style={styles.agentImagePlaceholder}>
            <Ionicons name="person" size={40} color="#d1d5db" />
          </View>
          <View style={styles.agentMeta}>
            <Text style={styles.agentName}>Luxe Realty Group</Text>
            <Text style={styles.agentStatus}>Online</Text>
          </View>
          <TouchableOpacity style={styles.callButton}>
            <Ionicons name="call" size={20} color="#000" />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Subject</Text>
        <View style={styles.subjectBox}>
          <Text style={styles.subjectText}>Inquiry regarding Redwood Villas</Text>
        </View>

        <Text style={styles.label}>Message</Text>
        <TextInput
          style={styles.messageInput}
          placeholder="Type your questions here..."
          value={message}
          onChangeText={setMessage}
          multiline
          numberOfLines={8}
        />

        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send Message</Text>
          <Ionicons name="send" size={18} color="#000" />
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
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
  agentBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    padding: 15,
    borderRadius: 20,
    marginBottom: 30,
  },
  agentImagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  agentMeta: {
    flex: 1,
    marginLeft: 15,
  },
  agentName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  agentStatus: {
    fontSize: 12,
    color: '#10b981',
    fontWeight: '600',
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FBB03B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 10,
  },
  subjectBox: {
    padding: 15,
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 20,
  },
  subjectText: {
    fontSize: 15,
    color: '#1a1a1a',
  },
  messageInput: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    minHeight: 180,
    textAlignVertical: 'top',
    marginBottom: 40,
  },
  sendButton: {
    backgroundColor: '#FBB03B',
    borderRadius: 50,
    padding: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  sendButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '800',
  },
});

export default Inquiry;
