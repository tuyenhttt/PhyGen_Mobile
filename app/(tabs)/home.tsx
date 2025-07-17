import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2; // 2 columns with 16px margins

// Dummy data
const featuredTopics = [
  {
    id: '1',
    title: 'Ôn tập chuyên đề Dao động',
    image: require('../../assets/images/logo.jpeg'),
  },
  {
    id: '2',
    title: 'Chuyên đề Điện xoay chiều',
    image: require('../../assets/images/logo.jpeg'),
  },
  {
    id: '3',
    title: 'Bài tập Điện trường',
    image: require('../../assets/images/logo.jpeg'),
  },
  {
    id: '4',
    title: 'Bài tập Quang học',
    image: require('../../assets/images/logo.jpeg'),
  },
];

const stats = [
  { id: 's1', label: 'Tỷ lệ đậu', value: '95%' },
  { id: 's2', label: 'Nội dung chuẩn', value: '100 bài' },
  { id: 's3', label: 'AI hỗ trợ', value: '24/7' },
];

const HomeScreen: React.FC = () => {
  const renderTopic = ({ item }: any) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.8}>
      <Image source={item.image} style={styles.cardImage} resizeMode='cover' />
      <Text style={styles.cardTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView>
        {/* Hero with background */}
        <ImageBackground
          source={require('../../assets/images/icon.png')}
          style={styles.hero}
          resizeMode='cover'
        >
          <Text style={styles.heroTitle}>PhyGen</Text>
          <Text style={styles.heroSubtitle}>
            Tạo đề thi Vật Lý lớp 11 THPT theo chuẩn, nhanh chóng với AI
          </Text>
          <TouchableOpacity style={styles.heroButton} onPress={() => {}}>
            <Text style={styles.heroButtonText}>Tạo đề ngay</Text>
          </TouchableOpacity>
        </ImageBackground>

        {/* Featured grid */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tính năng nổi bật</Text>
          <FlatList
            data={featuredTopics}
            renderItem={renderTopic}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={styles.row}
            scrollEnabled={false}
          />
        </View>

        {/* Popular exercises button */}
        <TouchableOpacity style={styles.allButton}>
          <Text style={styles.allButtonText}>Xem tất cả chuyên đề</Text>
        </TouchableOpacity>

        {/* Statistics */}
        <View style={[styles.section, styles.statsSection]}>
          {stats.map(s => (
            <View key={s.id} style={styles.statItem}>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F9FAFB' },
  hero: {
    width: '100%',
    paddingVertical: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 16,
  },
  heroButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  heroButtonText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
  section: { paddingHorizontal: 16, marginTop: 24 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  row: { justifyContent: 'space-between', marginBottom: 16 },
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  cardImage: { width: '100%', height: CARD_WIDTH * 0.6 },
  cardTitle: { padding: 12, fontSize: 14, fontWeight: '500', color: '#1F2937' },
  allButton: {
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 24,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#4F46E5',
    borderRadius: 8,
  },
  allButtonText: { fontSize: 14, fontWeight: '500', color: '#4F46E5' },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    paddingVertical: 24,
    borderRadius: 12,
    marginHorizontal: 16,
  },
  statItem: { alignItems: 'center' },
  statValue: { fontSize: 24, fontWeight: 'bold', color: '#111827' },
  statLabel: { fontSize: 12, color: '#6B7280', marginTop: 4 },
});

export default HomeScreen;
