import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export type UserInfo = {
  fullName: string;
  avatarUrl: string | number;
};

export default function UserInfoSection({ fullName, avatarUrl }: UserInfo) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const router = useRouter();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleProfilePress = () => {
    // TODO: Navigate to profile screen
    console.log('Đi tới trang cá nhân');
    setDropdownVisible(false);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setDropdownVisible(false);
      router.replace('/splash');
    } catch (error) {
      console.error('Lỗi khi đăng xuất:', error);
      Alert.alert('Lỗi', 'Không thể đăng xuất. Vui lòng thử lại.');
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Xin chào,</Text>
        <Text style={styles.name}>{fullName}.</Text>
      </View>

      <View>
        <TouchableOpacity onPress={toggleDropdown}>
          <Image
            source={typeof avatarUrl === 'string' ? { uri: avatarUrl } : avatarUrl}
            style={styles.avatar}
          />
        </TouchableOpacity>

        {dropdownVisible && (
          <View style={styles.dropdown}>
            <Pressable onPress={handleProfilePress} style={({ pressed }) => [
                styles.dropdownItem,
                pressed && styles.dropdownItemPressed,
              ]}
            >
              <Image source={require('../../assets/images/coin.png')} style={styles.dropdownIcon} />
              <Text style={styles.dropdownText}>Nạp xu</Text>
            </Pressable>

            <Pressable onPress={handleLogout} style={({ pressed }) => [
                styles.dropdownItem,
                pressed && styles.dropdownItemPressed,
              ]}
            >
              <Image source={require('../../assets/images/logout.png')} style={styles.dropdownIcon} />
              <Text style={styles.dropdownText}>Đăng xuất</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
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
  dropdown: {
    position: 'absolute',
    top: 60,
    right: 0,
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    minWidth: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  dropdownIcon: {
    width: 18,
    height: 18,
    tintColor: '#FFA726',
    marginRight: 10,
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownItemPressed: {
    backgroundColor: '#f0f0f0',
    borderRadius: 6,
  },
});
