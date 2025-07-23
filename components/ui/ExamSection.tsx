import React from 'react';
import { StyleSheet, View } from 'react-native';
import ExamBox from './ExamBox';

export type ExamItem = {
  title: string;
  description?: string;
  grade: number;
  year: number;
  color: string;
  img?: any;
  pageIndex?: number;
  pageSize?: number;
};

export type ExamSectionProps = {
  data: ExamItem[];
};

export default function ExamSection({ data }: ExamSectionProps) {
  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <ExamBox
          key={index}
          title={item.title}
          description={item.description}
          grade={item.grade}
          year={item.year}
          color={item.color}
          img={item.img}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 12,
  },
});
