import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Alert, SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import Loading from '../../components/ui/Loading';
import ProfileHeaderSection, { UserProfile } from '../../components/ui/ProfileHeaderSection';
import ProfileSection from '../../components/ui/ProfileSection';

const BASE_API_URL = 'https://phygen-a3c0gpa8c8gxgmbx.southeastasia-01.azurewebsites.net'

export default function ProfileScreen() {
  const [loading, setLoading] = useState<boolean>(true);
  const [token, setToken] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<UserProfile>({
    fullName: '',
    avatarUrl: '',
    email: '',
    phone: '',
    gender: '',
    dateOfBirth: '',
  });

  useEffect(() => {
  const fetchUserProfile = async (token: string) => {
    try {
      if (!token) return;

      const response = await axios.get(`${BASE_API_URL}/api/users/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const profileData = response.data;
      if (profileData) {
        setProfileData({
          fullName: profileData.lastName + ' ' + profileData.firstName || '',
          avatarUrl: profileData.photoURL ? { uri: profileData.photoURL } : require('../../assets/images/avatar.png'),
          email: profileData.email || '',
          phone: profileData.phone || '',
          gender: profileData.gender || '',
          dateOfBirth: profileData.dateOfBirth ? new Date(profileData.dateOfBirth).toLocaleDateString() : '',
        });
      }
    } catch (error) {
      console.error('Lỗi tải thông tin người dùng:', error);
    }
  };
  
  const getStoredToken = async () => {
    try {
      const savedToken = await AsyncStorage.getItem('token');
      if (!savedToken) {
        console.warn('Không tìm thấy token trong AsyncStorage');
        return null;
      }
      setToken(savedToken);
      await fetchUserProfile(savedToken);
    } catch (err) {
      console.error('Lỗi đọc token:', err);
      Alert.alert('Lỗi', 'Không thể đọc token người dùng');
    } finally {
      setLoading(false);
    }
  };
  getStoredToken();
}, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      {loading ? (
        <Loading />
      ) : (
        <ScrollView style={styles.container}>
          <ProfileHeaderSection userProfile={profileData} />

          <ProfileSection
            title="Họ và tên"
            icon={require('../../assets/images/user.png')}
            details={profileData.fullName}
          />

          <ProfileSection
            title="Email"
            icon={require('../../assets/images/mail.png')}
            details={profileData.email}
          />

          <ProfileSection
            title="Số điện thoại"
            icon={require('../../assets/images/phone.png')}
            details={profileData.phone}
          />

          <ProfileSection
            title="Giới tính"
            icon={require('../../assets/images/gender.png')}
            details={profileData.gender}
          />

          <ProfileSection
            title="Ngày sinh"
            icon={require('../../assets/images/calendar.png')}
            details={profileData.dateOfBirth}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
