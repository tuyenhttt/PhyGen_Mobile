import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import BannerSection from '../../components/ui/BannerSection';
import ExamSection, { ExamItem } from '../../components/ui/ExamSection';
import Loading from '../../components/ui/Loading';
import UserInfoSection from '../../components/ui/UserInfoSection';


const BASE_API_URL = 'https://phygen-a3c0gpa8c8gxgmbx.southeastasia-01.azurewebsites.net'
const EXAM_API_URL = '/api/exams';

type UserProfile = {
  fullName: string;
  avatarUrl: string;
};

const userProfile: UserProfile = {
  fullName: 'MTP',
  avatarUrl: 'https://media.baoquangninh.vn/upload/image/202310/medium/2137902_206e4abf2005d61abfe7561705cc8ce1.png',
};

const colorPalette = ['#60a5fa', '#facc15', '#f87171', '#34d399', '#c084fc'];
const getColorByIndex = (index: number): string => {
  return colorPalette[index % colorPalette.length];
};

const HomeScreen: React.FC = () => {

  const [examData, setExamData] = useState<ExamItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

useEffect(() => {
  const fetchExams = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_API_URL}${EXAM_API_URL}`, {
        params: {
          pageSize: 5,
          pageIndex: 1,
        },
      });

      const rawItems = response.data?.data?.data;

      if (Array.isArray(rawItems)) {
        const mappedItems: ExamItem[] = rawItems.map((item: any, index: number) => ({
          title: item.title,
          grade: item.grade,
          year: item.year,
          description: item.description || '',
          color: getColorByIndex(index),
          img: item.imgUrl ? { uri: item.imgUrl } : require('../../assets/images/h97.png'),
        }));

        setExamData(mappedItems);
      } else {
        console.warn('Không đúng định dạng mảng:', rawItems);
      } 
    } catch (error) {
      console.error('Lỗi tải dữ liệu đề thi:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchExams();
}, []);


  return (
    <SafeAreaView style={styles.safeArea}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Loading />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollView}>
          <StatusBar barStyle="dark-content" backgroundColor="#F8F8F8" />
          <View style={styles.container}>
            <UserInfoSection
              fullName={userProfile.fullName}
              avatarUrl={userProfile.avatarUrl}
            />
            <BannerSection
              title={'Tạo đề với PhyGen'}
              buttonText={'Xem thêm'}
              imageUrl={'https://media.baoquangninh.vn/upload/image/202310/medium/2137902_206e4abf2005d61abfe7561705cc8ce1.png'}
            />

            <View style={styles.sectionHeader}>
              <Text style={styles.title}>Đề thi</Text>
              <TouchableOpacity style={styles.button} onPress={() => {}}>
                <Text style={styles.buttonText}>Xem tất cả</Text>
              </TouchableOpacity>
            </View>

            <ExamSection data={examData} />
          </View>
        </ScrollView>
      )}
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
    sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'transparent',
    paddingVertical: 5,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgb(40, 144, 241)',
    borderRadius: 25,
    overflow: 'hidden',
  },

  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgb(40, 144, 241)',
    textAlign: 'center',
  },
});
