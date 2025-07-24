// app/(tabs)/notification.tsx
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { showAlert } from '../register';

type Notification = {
  id: number;
  title: string;
  message: string;
  createdAt: string;
  isRead: boolean;
};

type JwtPayload = {
  sub: string; // Đây là userId
};

export default function NotificationScreen() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const fetchNotifications = async (userId: string, token: string) => {
    try {
      const response = await axios.get(
        `https://phygen-a3c0gpa8c8gxgmbx.southeastasia-01.azurewebsites.net/api/notification?userId=${userId}&pageIndex=1`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const notificationList = response.data?.data?.data || [];
      setNotifications(notificationList);
    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi', 'Không thể tải thông báo');
    } finally {
      setLoading(false);
    }
  };

  const markAllAsRead = async (userId: string, token: string) => {
  try {
    await axios.put(
      `https://phygen-a3c0gpa8c8gxgmbx.southeastasia-01.azurewebsites.net/api/notification/maskasread?UserId=${userId}`,
      {}, // PUT nhưng không cần body
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('Đánh dấu đã đọc');
  } catch (error) {
    console.error('Lỗi đánh dấu đã đọc:', error);
  }
};

  const init = async () => {
  try {
    const savedToken = await AsyncStorage.getItem('token');
    if (!savedToken) {
      showAlert('Lỗi', 'Không tìm thấy token người dùng');
      return;
    }

    const decoded: JwtPayload = jwtDecode(savedToken);
    const userId = decoded.sub;

    // Lưu vào state
    setUserId(userId);
    setToken(savedToken);

    // Gọi GET trước, rồi PUT sau
    await fetchNotifications(userId, savedToken);
    await markAllAsRead(userId, savedToken);
  } catch (error) {
    console.error(error);
    Alert.alert('Lỗi', 'Không thể khởi tạo dữ liệu');
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    init();
  }, []);

  const handleNotificationPress = async () => {
    if (!userId || !token) return;

    await fetchNotifications(userId, token);
    await markAllAsRead(userId, token);
  };

  const renderItem = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      onPress={handleNotificationPress}
      style={[styles.item, item.isRead ? styles.read : styles.read]}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.message}>{item.message}</Text>
      <Text style={styles.date}>
        {new Date(item.createdAt).toLocaleString()}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Thông báo</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#6A0DAD" />
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={styles.empty}>Không có thông báo nào</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#6A0DAD',
  },
  list: {
    paddingBottom: 20,
  },
  item: {
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },
  unread: {
    backgroundColor: '#f4f0fb',
  },
  read: {
    backgroundColor: '#eee',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c1172',
  },
  message: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
  date: {
    fontSize: 12,
    color: '#888',
    marginTop: 8,
    textAlign: 'right',
  },
  empty: {
    textAlign: 'center',
    color: '#888',
    marginTop: 40,
    fontSize: 16,
  },
});
