import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ProfileHeaderSection from '../../components/ui/ProfileHeaderSection';
import ProfileSection from '../../components/ui/ProfileSection';

export default function ProfileScreen() {
  const navigation = useNavigation();

  const userProfile = {
    fullName: 'Trịnh Trần Phương Tuấn',
    avatarUrl: require('../../assets/images/j97.png'),
    email: 'jack97@gmail.com.vn',
    phone: '0123456789',
    gender : 'Nam',
    dateOfBirth: '01/01/2000',
  };

  return (
    <ScrollView style={styles.container}>
      <ProfileHeaderSection userProfile={userProfile} />

      <ProfileSection
        title="Họ và tên"
        icon={require('../../assets/images/user.png')}
        details={userProfile.fullName}
      />

      <ProfileSection
        title="Email"
        icon={require('../../assets/images/mail.png')}
        details={userProfile.email}
      />

      <ProfileSection
        title="Số điện thoại"
        icon={require('../../assets/images/phone.png')}
        details={userProfile.phone}
      />

      <ProfileSection
        title="Giới tính"
        icon={require('../../assets/images/gender.png')}
        details={userProfile.gender}
      />

      <ProfileSection
        title="Ngày sinh"
        icon={require('../../assets/images/calendar.png')}
        details={userProfile.dateOfBirth}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
