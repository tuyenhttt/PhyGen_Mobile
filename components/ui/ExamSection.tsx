import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ExamBox from './ExamBox';

type ExamItem = {
  title: string;
  description: string;
  color: string;
  img?: any;
};

type ExamSectionProps = {
  data: ExamItem[];
};

export default function ExamSection({ data }: ExamSectionProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đề thi</Text>
      {data.map((item, index) => (
        <ExamBox
          key={index}
          title={item.title}
          description={item.description}
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
