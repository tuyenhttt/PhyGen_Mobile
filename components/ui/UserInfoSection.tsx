import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

type UserInfoSectionProps = {
  fullName: string;
  avatarUrl: string;
};

export default function UserInfoSection({ fullName, avatarUrl }: UserInfoSectionProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Xin chào,</Text>
        <Text style={styles.name}>{fullName}.</Text>
      </View>
      <Image
        source={avatarUrl ? { uri: avatarUrl } : require('../../assets/images/j97.png')}
        style={styles.avatar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 20,
    fontWeight: '300',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
