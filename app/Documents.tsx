import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Documents = () => {
  const router = useRouter();

  const docs = [
    { id: '1', title: 'Sale Agreement - Redwood', type: 'PDF', size: '2.4 MB', date: 'Oct 15, 2024' },
    { id: '2', title: 'NOC Certificate', type: 'PDF', size: '1.1 MB', date: 'Oct 18, 2024' },
    { id: '3', title: 'Possession Letter', type: 'DOC', size: '540 KB', date: 'Pending' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Documents</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {docs.map(doc => (
          <TouchableOpacity key={doc.id} style={styles.docCard}>
            <View style={styles.iconBg}>
              <Ionicons name="document-text" size={24} color="#000" />
            </View>
            <View style={styles.docMeta}>
              <Text style={styles.docTitle}>{doc.title}</Text>
              <Text style={styles.docInfo}>{doc.type} • {doc.size} • {doc.date}</Text>
            </View>
            <TouchableOpacity style={styles.downloadButton}>
              <Ionicons name="download-outline" size={22} color="#6b7280" />
            </TouchableOpacity>
          </TouchableOpacity>
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
  docCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f9fafb',
    borderRadius: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#f3f4f6',
  },
  iconBg: {
    width: 50,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#FBB03B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  docMeta: {
    flex: 1,
    marginLeft: 15,
  },
  docTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  docInfo: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
    fontWeight: '600',
  },
  downloadButton: {
    padding: 10,
  },
});

export default Documents;
