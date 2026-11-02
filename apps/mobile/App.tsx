import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  SafeAreaView, 
  TouchableOpacity, 
  ScrollView, 
  TextInput, 
  Image, 
  Alert,
  Linking
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'categories' | 'sell' | 'messages' | 'account'>('home');
  const [language, setLanguage] = useState<'en' | 'ta'>('en');
  const [selectedDistrict, setSelectedDistrict] = useState('Chennai');
  const [searchQuery, setSearchQuery] = useState('');

  // Sell form state
  const [sellTitle, setSellTitle] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [sellCategory, setSellCategory] = useState('Cars & Vehicles');
  const [submittedAd, setSubmittedAd] = useState(false);

  const categories = [
    { id: 1, name_en: 'Mobiles', name_ta: 'மொபைல்கள்', icon: '📱' },
    { id: 2, name_en: 'Cars & Bikes', name_ta: 'வாகனங்கள்', icon: '🚗' },
    { id: 3, name_en: 'Property', name_ta: 'வீடு & நிலம்', icon: '🏠' },
    { id: 4, name_en: 'Furniture', name_ta: 'மரச்சாமான்கள்', icon: '🛋️' },
    { id: 5, name_en: 'Fashion', name_ta: 'ஆடை', icon: '👕' },
    { id: 6, name_en: 'Jobs', name_ta: 'வேலை', icon: '💼' }
  ];

  const mockListings = [
    {
      id: 'm1',
      title: 'Hyundai Creta SX Diesel Automatic 2021',
      price: '₹13,85,000',
      location: 'Anna Nagar, Chennai',
      phone: '+91 98401 23456',
      whatsapp: '919840123456',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=400&q=80',
      tag: 'TOP AD'
    },
    {
      id: 'm2',
      title: 'iPhone 15 Pro Max 256GB Natural Titanium',
      price: '₹94,000',
      location: 'RS Puram, Coimbatore',
      phone: '+91 94432 98765',
      whatsapp: '919443298765',
      image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=400&q=80',
      tag: 'FEATURED'
    }
  ];

  const openWhatsApp = (number: string, title: string) => {
    const text = encodeURIComponent(`Hello! I saw your "${title}" listing on Flacon. Is it still available?`);
    Linking.openURL(`whatsapp://send?phone=${number}&text=${text}`).catch(() => {
      Linking.openURL(`https://wa.me/${number}?text=${text}`);
    });
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your Flacon account and personal data permanently?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => Alert.alert('Account Deleted', 'Your account and listings have been removed.')
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.brandRow}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoText}>F</Text>
          </View>
          <View>
            <Text style={styles.brandTitle}>FLACON</Text>
            <Text style={styles.brandTagline}>
              {language === 'en' ? 'Buy. Sell. Connect.' : 'வாங்கு. விற்பனை செய். இணை.'}
            </Text>
          </View>
        </View>

        {/* Language & District button */}
        <TouchableOpacity 
          style={styles.langButton}
          onPress={() => setLanguage(l => l === 'en' ? 'ta' : 'en')}
        >
          <Text style={styles.langButtonText}>{language === 'en' ? 'தமிழ்' : 'English'}</Text>
        </TouchableOpacity>
      </View>

      {/* Main Tab Content */}
      <View style={styles.body}>
        
        {/* HOME TAB */}
        {currentTab === 'home' && (
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Search Bar */}
            <View style={styles.searchBox}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                style={styles.searchInput}
                placeholder={language === 'en' ? "Search cars, mobiles, property..." : "கார்கள், மொபைல்கள் தேடுக..."}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>

            {/* Category Circles */}
            <Text style={styles.sectionTitle}>
              {language === 'en' ? 'Top Categories' : 'முக்கிய பிரிவுகள்'}
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
              {categories.map((c) => (
                <TouchableOpacity key={c.id} style={styles.catCard}>
                  <Text style={styles.catEmoji}>{c.icon}</Text>
                  <Text style={styles.catName}>{language === 'en' ? c.name_en : c.name_ta}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Featured Listings */}
            <Text style={styles.sectionTitle}>
              {language === 'en' ? 'Featured in Tamil Nadu' : 'தமிழ்நாட்டில் சிறந்தவை'}
            </Text>

            {mockListings.map((item) => (
              <View key={item.id} style={styles.adCard}>
                <Image source={{ uri: item.image }} style={styles.adImage} />
                <View style={styles.adInfo}>
                  <Text style={styles.adBadge}>{item.tag}</Text>
                  <Text style={styles.adPrice}>{item.price}</Text>
                  <Text style={styles.adTitle} numberOfLines={2}>{item.title}</Text>
                  <Text style={styles.adLocation}>📍 {item.location}</Text>

                  {/* Actions */}
                  <View style={styles.adActions}>
                    <TouchableOpacity 
                      style={styles.whatsappBtn}
                      onPress={() => openWhatsApp(item.whatsapp, item.title)}
                    >
                      <Text style={styles.whatsappBtnText}>💬 WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={styles.callBtn}
                      onPress={() => Linking.openURL(`tel:${item.phone}`)}
                    >
                      <Text style={styles.callBtnText}>📞 Call</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        )}

        {/* SELL TAB */}
        {currentTab === 'sell' && (
          <ScrollView showsVerticalScrollIndicator={false} style={styles.formContainer}>
            <Text style={styles.formTitle}>
              {language === 'en' ? 'Post Free Advertisement' : 'இலவச விளம்பரம் வெளியிடுக'}
            </Text>
            
            {submittedAd ? (
              <View style={styles.successBox}>
                <Text style={styles.successEmoji}>🎉</Text>
                <Text style={styles.successTitle}>Ad Submitted for Moderation!</Text>
                <Text style={styles.successSubtitle}>Our team is reviewing your listing for publication across Tamil Nadu.</Text>
                <TouchableOpacity 
                  style={styles.primaryBtn} 
                  onPress={() => { setSubmittedAd(false); setCurrentTab('home'); }}
                >
                  <Text style={styles.primaryBtnText}>View Marketplace Feed</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.formFields}>
                <Text style={styles.label}>Select Category</Text>
                <TextInput style={styles.input} value={sellCategory} editable={false} />

                <Text style={styles.label}>Ad Title *</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="e.g. 2022 Royal Enfield Meteor 350"
                  value={sellTitle}
                  onChangeText={setSellTitle}
                />

                <Text style={styles.label}>Price (₹) *</Text>
                <TextInput 
                  style={styles.input} 
                  keyboardType="numeric"
                  placeholder="e.g. 185000"
                  value={sellPrice}
                  onChangeText={setSellPrice}
                />

                <Text style={styles.label}>Location</Text>
                <TextInput style={styles.input} value={`${selectedDistrict}, Tamil Nadu`} editable={false} />

                <TouchableOpacity 
                  style={styles.primaryBtn}
                  onPress={() => {
                    if (!sellTitle || !sellPrice) {
                      Alert.alert('Required', 'Please enter title and price.');
                      return;
                    }
                    setSubmittedAd(true);
                  }}
                >
                  <Text style={styles.primaryBtnText}>Submit Free Listing</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        )}

        {/* MESSAGES TAB */}
        {currentTab === 'messages' && (
          <View style={styles.messagesContainer}>
            <Text style={styles.sectionTitle}>Buyer Enquiries</Text>
            <TouchableOpacity style={styles.chatRow}>
              <Text style={styles.avatar}>👤</Text>
              <View style={{ flex: 1 }}>
                <Text style={styles.chatName}>Karthik Raja</Text>
                <Text style={styles.chatPreview}>Hyundai Creta: Full service record is available.</Text>
              </View>
              <Text style={styles.chatTime}>10:35 AM</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* ACCOUNT & PRIVACY TAB */}
        {currentTab === 'account' && (
          <View style={styles.accountContainer}>
            <Text style={styles.sectionTitle}>Account & Settings</Text>
            
            <View style={styles.settingCard}>
              <Text style={styles.settingLabel}>App Language</Text>
              <Text style={styles.settingValue}>{language === 'en' ? 'English' : 'தமிழ்'}</Text>
            </View>

            <View style={styles.settingCard}>
              <Text style={styles.settingLabel}>Verified Mobile</Text>
              <Text style={styles.settingValue}>+91 98401 23456</Text>
            </View>

            <TouchableOpacity 
              style={styles.deleteBtn}
              onPress={handleDeleteAccount}
            >
              <Text style={styles.deleteBtnText}>🗑 Delete Account & Data</Text>
            </TouchableOpacity>
          </View>
        )}

      </View>

      {/* Bottom Tabs */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => setCurrentTab('home')}>
          <Text style={[styles.tabIcon, currentTab === 'home' && styles.tabActive]}>🏠</Text>
          <Text style={[styles.tabLabel, currentTab === 'home' && styles.tabActiveLabel]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => setCurrentTab('categories')}>
          <Text style={[styles.tabIcon, currentTab === 'categories' && styles.tabActive]}>📂</Text>
          <Text style={[styles.tabLabel, currentTab === 'categories' && styles.tabActiveLabel]}>Categories</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.sellTabItem} onPress={() => setCurrentTab('sell')}>
          <Text style={styles.sellTabIcon}>➕</Text>
          <Text style={styles.sellTabLabel}>SELL</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => setCurrentTab('messages')}>
          <Text style={[styles.tabIcon, currentTab === 'messages' && styles.tabActive]}>💬</Text>
          <Text style={[styles.tabLabel, currentTab === 'messages' && styles.tabActiveLabel]}>Chats</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => setCurrentTab('account')}>
          <Text style={[styles.tabIcon, currentTab === 'account' && styles.tabActive]}>👤</Text>
          <Text style={[styles.tabLabel, currentTab === 'account' && styles.tabActiveLabel]}>Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoBadge: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#6ea4bf',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '900',
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0f172a',
    letterSpacing: -0.5,
  },
  brandTagline: {
    fontSize: 10,
    color: '#64748b',
    fontWeight: '600',
  },
  langButton: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  langButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0f172a',
  },
  body: {
    flex: 1,
    paddingHorizontal: 16,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    paddingHorizontal: 12,
    marginVertical: 12,
    height: 44,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0f172a',
    marginVertical: 8,
  },
  catScroll: {
    marginBottom: 16,
  },
  catCard: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 12,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    minWidth: 74,
  },
  catEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  catName: {
    fontSize: 11,
    fontWeight: '700',
    color: '#334155',
  },
  adCard: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginBottom: 14,
    overflow: 'hidden',
  },
  adImage: {
    width: '100%',
    height: 180,
  },
  adInfo: {
    padding: 12,
  },
  adBadge: {
    fontSize: 9,
    fontWeight: '900',
    color: '#b45309',
    backgroundColor: '#fef3c7',
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 4,
  },
  adPrice: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0f172a',
  },
  adTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
    marginVertical: 4,
  },
  adLocation: {
    fontSize: 11,
    color: '#64748b',
    marginBottom: 10,
  },
  adActions: {
    flexDirection: 'row',
    gap: 8,
  },
  whatsappBtn: {
    flex: 1,
    backgroundColor: '#059669',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  whatsappBtnText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  callBtn: {
    flex: 1,
    backgroundColor: '#0f172a',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  callBtnText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  formContainer: {
    paddingVertical: 12,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 12,
  },
  formFields: {
    gap: 10,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: '#334155',
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    padding: 10,
    fontSize: 13,
  },
  primaryBtn: {
    backgroundColor: '#6ea4bf',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  primaryBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '800',
  },
  successBox: {
    backgroundColor: '#f0f7fa',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    gap: 8,
  },
  successEmoji: {
    fontSize: 40,
  },
  successTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1a3e52',
  },
  successSubtitle: {
    fontSize: 12,
    color: '#3f738d',
    textAlign: 'center',
  },
  messagesContainer: {
    paddingVertical: 12,
  },
  chatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 10,
  },
  avatar: {
    fontSize: 28,
  },
  chatName: {
    fontSize: 13,
    fontWeight: '700',
  },
  chatPreview: {
    fontSize: 11,
    color: '#64748b',
  },
  chatTime: {
    fontSize: 10,
    color: '#94a3b8',
  },
  accountContainer: {
    paddingVertical: 12,
    gap: 12,
  },
  settingCard: {
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  settingLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  settingValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6ea4bf',
  },
  deleteBtn: {
    backgroundColor: '#fee2e2',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  deleteBtnText: {
    color: '#dc2626',
    fontWeight: '700',
    fontSize: 13,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingVertical: 8,
    paddingHorizontal: 8,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tabItem: {
    alignItems: 'center',
    flex: 1,
  },
  tabIcon: {
    fontSize: 18,
    opacity: 0.6,
  },
  tabActive: {
    opacity: 1,
  },
  tabLabel: {
    fontSize: 10,
    color: '#64748b',
    marginTop: 2,
    fontWeight: '600',
  },
  tabActiveLabel: {
    color: '#6ea4bf',
    fontWeight: '800',
  },
  sellTabItem: {
    backgroundColor: '#f59e0b',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  sellTabIcon: {
    fontSize: 14,
    color: '#0f172a',
  },
  sellTabLabel: {
    fontSize: 10,
    fontWeight: '900',
    color: '#0f172a',
  },
});

