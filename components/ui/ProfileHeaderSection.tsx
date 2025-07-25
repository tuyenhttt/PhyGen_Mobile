import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';

export type UserProfile = {
  fullName?: string;
  avatarUrl?: string | number;
  email: string;
  phone?: string;
  gender?: string;
  dateOfBirth?: string;
}

type Props = {
  userProfile: UserProfile;
};

export default function ProfileHeaderSection({ userProfile }: Props) {
  return (
    <ImageBackground
      source={ require('../../assets/images/background-profile.png') }
      style={styles.headerContainer}
    >
      <View style={styles.headerContent}>
        <View style={styles.row}>
          <Image
            source={
              userProfile.avatarUrl
                ? typeof userProfile.avatarUrl === 'string'
                  ? { uri: userProfile.avatarUrl }
                  : userProfile.avatarUrl
                : require('../../assets/images/avatar.png')
            }
            style={styles.avatar}
          />
        </View>

        <Text style={styles.fullName}>{userProfile.fullName ?? 'Unknown'}</Text>
        <Text style={styles.location}>{userProfile.email ?? 'No email provided'}</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 220,
    width: '100%',
    marginBottom: 10,
  },
  headerContent: {
    paddingHorizontal: 25,
    paddingVertical: 40,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'white',
  },
  settingIcon: {
    width: 40,
    height: 40,
    tintColor: 'white',
  },
  fullName: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  location: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  subscription: {
    position: 'absolute',
    right: 16,
    bottom: 99,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  subscriptionText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  subscriptionIcon: {
    width: 20,
    height: 20,
    marginLeft: 6,
    tintColor: 'white',
  },
});
