import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

type ExamBoxProps = {
  title: string;
  description?: string;
  grade: number;
  year: number;
  color: string;
  img?: any;
  pageIndex?: number;
  pageSize?: number;
};

export default function ExamBox({ title, description, grade, year, color, img }: ExamBoxProps) {
  return (
    <View style={[styles.container, { borderLeftColor: color }]}>
      {img && <Image source={img} style={styles.icon} />}
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{`Lớp ${grade} - Năm ${year}`}</Text>
        <Text style={styles.description} numberOfLines={1} ellipsizeMode="tail">{description}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 8,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    borderLeftWidth: 5,
  },
  icon: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 8,
    marginRight: 18,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
});
