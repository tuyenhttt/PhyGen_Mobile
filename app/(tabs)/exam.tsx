import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    FlatList,
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import ExamBox from '../../components/ui/ExamBox';
import FilterSection from '../../components/ui/FilterSection';

type ExamItem = {
  id: number;
  title: string;
  description: string;
  grade: string; // Lớp 10/11/12
  examCategory: string; // Giữa kỳ 1 / Cuối kỳ 1 ...
  year: string; // 2023/2024/2025
};

const allExamData: ExamItem[] = [
  { id: 1, title: 'Đề Vật Lý Kì 1', description: 'Lớp 12 - 50 câu - 60 phút', grade: 'Lớp 12', examCategory: 'Cuối kỳ 1', year: '2024' },
  { id: 2, title: 'Đề Vật Lý Kì 2', description: 'Lớp 11 - 40 câu - 50 phút', grade: 'Lớp 11', examCategory: 'Giữa kỳ 2', year: '2023' },
  { id: 3, title: 'Đề Hóa Học Kì 1', description: 'Lớp 10 - 30 câu - 45 phút', grade: 'Lớp 10', examCategory: 'Giữa kỳ 1', year: '2025' },
];

export default function ExamScreen() {
  const [searchText, setSearchText] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [filteredExams, setFilteredExams] = useState(allExamData);

  const handleSearch = (text: string) => {
    setSearchText(text);
    const filtered = allExamData.filter(exam =>
      exam.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredExams(filtered);
  };

  const handleApplyFilter = (filters: any) => {
    let filtered = allExamData;

    if (filters.grade.length) {
      filtered = filtered.filter(e => filters.grade.includes(e.grade));
    }
    if (filters.examCategory.length) {
      filtered = filtered.filter(e => filters.examCategory.includes(e.examCategory));
    }
    if (filters.year.length) {
      filtered = filtered.filter(e => filters.year.includes(e.year));
    }

    setFilteredExams(filtered);
    setShowFilter(false);
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={18} color="#999" />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm đề thi..."
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>

      {/* Buttons: Filter + Create Exam */}
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.filterBtn} onPress={() => setShowFilter(true)}>
          <Ionicons name="filter" size={18} color="#fff" />
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.createBtn}>
          <Ionicons name="add-circle" size={18} color="#fff" />
          <Text style={styles.createText}>Create Exam</Text>
        </TouchableOpacity>
      </View>

      {/* List Exams */}
      <FlatList
        data={filteredExams}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ExamBox
            title={item.title}
            description={item.description}
            color="#4ade80"
          />
        )}
      />

      {/* Modal Filter */}
      <Modal
        visible={showFilter}
        animationType="slide"
        transparent
        onRequestClose={() => setShowFilter(false)}
      >
        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.3)' }}>
          <FilterSection onApply={handleApplyFilter} onClose={() => setShowFilter(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 12 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 12,
  },
  searchInput: { marginLeft: 8, flex: 1 },
  actionRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  filterBtn: {
    flexDirection: 'row',
    backgroundColor: '#3b82f6',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  filterText: { color: '#fff', marginLeft: 4 },
  createBtn: {
    flexDirection: 'row',
    backgroundColor: '#22c55e',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  createText: { color: '#fff', marginLeft: 4 },
});
