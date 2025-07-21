import React, { useState } from 'react';
import {
  Image,
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

type ProfileSectionProps = {
  title: string;
  icon: any;
  details: string | string[];
};

export default function ProfileSection({ title, icon, details, }: ProfileSectionProps) {
  const [expanded, setExpanded] = useState(true);
  const detailsList = typeof details === 'string' ? [details] : details ?? [];

  return (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          setExpanded(!expanded);
        }}
        style={styles.header}
        activeOpacity={0.7}
      >
        <View style={styles.headerLeft}>
          <Image source={icon} style={styles.icon} />
          <Text style={styles.title}>{title}</Text>
        </View>

        <View style={styles.actions}>
          <Image
            source={
              expanded
                ? require('../../assets/images/up-arrow.png')
                : require('../../assets/images/down-arrow.png')
            }
            style={styles.actionIcon}
          />
        </View>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.details}>
          {detailsList.length > 0 ? (
            detailsList.map((item, index) => (
              <Text key={index} style={styles.detailText}>
                {item}
              </Text>
            ))
          ) : (
            <Text style={styles.detailText}>Không có thông tin chi tiết.</Text>
          )}
        </View>
      )}
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#FFA726',
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    width: 22,
    height: 22,
    tintColor: '#FFA726',
    marginLeft: 10,
  },
  details: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  detailText: {
    fontSize: 15,
    color: '#555',
    marginTop: 4,
  },
});
