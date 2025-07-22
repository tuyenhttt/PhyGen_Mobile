import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type FilterOption = {
  label: string;
  selected: boolean;
};

type FilterSectionProps = {
  onApply: (filters: any) => void;
  onClose: () => void;
};

export default function FilterSection({ onApply, onClose }: FilterSectionProps) {
  const [grade, setGrade] = useState<string[]>([]);
  const [examCategory, setExamCategory] = useState<string[]>([]);
  const [year, setYear] = useState<string[]>([]);

  const toggleSelection = (value: string, list: string[], setList: (v: string[]) => void) => {
    if (list.includes(value)) {
      setList(list.filter(item => item !== value));
    } else {
      setList([...list, value]);
    }
  };

  const applyFilters = () => {
    onApply({
      grade,
      examCategory,
      year,
    });
    onClose();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lọc theo Lớp</Text>
      <View style={styles.optionRow}>
        {['Lớp 10', 'Lớp 11', 'Lớp 12'].map(item => (
          <TouchableOpacity
            key={item}
            style={[styles.option, grade.includes(item) && styles.optionSelected]}
            onPress={() => toggleSelection(item, grade, setGrade)}
          >
            <Ionicons
              name={grade.includes(item) ? 'checkbox' : 'square-outline'}
              size={20}
              color={grade.includes(item) ? '#2563eb' : '#999'}
            />
            <Text style={styles.optionText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.header}>Lọc theo Kỳ thi</Text>
      <View style={styles.optionRow}>
        {['Giữa kỳ 1', 'Cuối kỳ 1', 'Giữa kỳ 2', 'Cuối kỳ 2'].map(item => (
          <TouchableOpacity
            key={item}
            style={[styles.option, examCategory.includes(item) && styles.optionSelected]}
            onPress={() => toggleSelection(item, examCategory, setExamCategory)}
          >
            <Ionicons
              name={examCategory.includes(item) ? 'checkbox' : 'square-outline'}
              size={20}
              color={examCategory.includes(item) ? '#2563eb' : '#999'}
            />
            <Text style={styles.optionText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.header}>Lọc theo Năm</Text>
      <View style={styles.optionRow}>
        {['2023', '2024', '2025'].map(item => (
          <TouchableOpacity
            key={item}
            style={[styles.option, year.includes(item) && styles.optionSelected]}
            onPress={() => toggleSelection(item, year, setYear)}
          >
            <Ionicons
              name={year.includes(item) ? 'checkbox' : 'square-outline'}
              size={20}
              color={year.includes(item) ? '#2563eb' : '#999'}
            />
            <Text style={styles.optionText}>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
          <Text style={styles.cancelText}>Hủy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.applyBtn} onPress={applyFilters}>
          <Text style={styles.applyText}>Áp dụng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 12,
    marginBottom: 8,
  },
  optionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  optionSelected: {},
  optionText: {
    marginLeft: 6,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  cancelBtn: {
    padding: 10,
  },
  cancelText: {
    color: '#666',
  },
  applyBtn: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  applyText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
