import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View
} from 'react-native';

import BannerSection from '../../components/ui/BannerSection';
import ExamSection from '../../components/ui/ExamSection';
import UserInfoSection from '../../components/ui/UserInfoSection';

type UserProfile = {
  fullName: string;
  avatarUrl: string;
};

const userProfile: UserProfile = {
  fullName: 'Hack97',
  avatarUrl: require('../../assets/images/h97.png'),
};

const examData = [
  {
    title: 'Đề Vật Lý Kì 1',
    description: 'Lớp 12 - 50 câu - 60 phút',
    color: '#4ade80',
    img: require('../../assets/images/h97.png'),
  },
];

const HomeScreen: React.FC = () => {

  // if (loading) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <ActivityIndicator size="large" color="#FF6F61" />
  //     </View>
  //   );
  // }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <StatusBar barStyle="dark-content" backgroundColor="#F8F8F8" />
        <View style={styles.container}>
          <UserInfoSection
            fullName={userProfile.fullName}
            avatarUrl={userProfile.avatarUrl}
          />
          <BannerSection />
          <ExamSection data={examData} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  wrapper: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  container: {
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
