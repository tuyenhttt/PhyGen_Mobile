import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type ProfileSectionProps = {
  title: string;
  icon: any;
  details: string | any;
};

export default function ProfileSection({ title, icon, details }: ProfileSectionProps) {
  const detailsList =
    typeof details === 'string'
      ? [details]
      : Array.isArray(details)
        ? details.map(String)
        : details
          ? [String(details)]
          : [];

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Image source={icon} style={styles.icon} />

        <View style={styles.textContainer}>
          {detailsList.length > 0 ? (
            detailsList.map((item, index) => (
              <Text key={index} style={styles.lineText}>
                <Text style={styles.title}>{title}: </Text>
                <Text style={styles.detail}>{item}</Text>
              </Text>
            ))
          ) : (
            <Text style={styles.lineText}>
              <Text style={styles.title}>{title}: </Text>
              <Text style={styles.detail}>Không có thông tin chi tiết.</Text>
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    padding: 16,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 18,
    height: 18,
    tintColor: '#FFA726',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  lineText: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  detail: {
    fontSize: 16,
    color: '#555',
  },
});
