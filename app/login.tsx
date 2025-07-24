import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    Modal,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

export default function LoginScreen() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
const [otpModalVisible, setOtpModalVisible] = useState(false);
const [otpText, setOtpText] = useState('');
  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      showAlert('Lỗi', 'Vui lòng nhập email và mật khẩu');
      return;
    }

    try {
      const res = await fetch(
        'https://phygen-a3c0gpa8c8gxgmbx.southeastasia-01.azurewebsites.net/api/auths/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
          },
          body: JSON.stringify(form),
        }
      );

      const text = await res.text();
      let result;
      try {
        result = JSON.parse(text);
      } catch {
        result = { message: text };
      }
    if (result.statusCode === 2258) {
      showAlert('Thông báo', 'Tài khoản chưa xác nhận. Vui lòng nhập mã OTP.');
      setOtpModalVisible(true); // 👉 mở modal nhập OTP
      return;
    }
      if (res.ok) {
        showAlert('Thành công', 'Đăng nhập thành công!');
        router.push('/home'); // 👉 chuyển hướng nếu muốn
        const token = result.token;
        await AsyncStorage.setItem('token', token);
      } else {
        showAlert('Lỗi', result?.message || 'Đăng nhập thất bại');
      }
    } catch (err: any) {
      console.error('Đăng nhập lỗi:', err);
      showAlert('Lỗi kết nối', 'Không thể kết nối đến máy chủ');
    }
  };
// Hàm xác nhận OTP
const handleConfirmOTP = async () => {
  try {
    const confirmResponse = await axios.post('https://phygen-a3c0gpa8c8gxgmbx.southeastasia-01.azurewebsites.net/api/auths/confirmlogin', {
      email: form.email,
      otptext: otpText,
    });    
    showAlert('Thành công', 'Xác nhận OTP thành công!');
    setOtpModalVisible(false);
    router.push('/home');
  } catch (error: any) {
    console.error(error);
    showAlert('Lỗi', error?.response?.data?.message || 'Xác nhận OTP thất bại');
  }
};
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo.jpeg')} style={styles.logo} />
      <Text style={styles.title}>Đăng Nhập</Text>

      <View style={styles.inputWithIcon}>
        <Ionicons name="mail-outline" size={20} color="#6A0DAD" style={styles.icon} />
        <TextInput
          placeholder="Email"
          style={styles.inputNoBorder}
          keyboardType="email-address"
          value={form.email}
          onChangeText={(text) => handleChange('email', text)}
        />
      </View>

      <View style={styles.inputWithIcon}>
  <Ionicons name="key-outline" size={20} color="#6A0DAD" style={styles.icon} />
  <TextInput
    placeholder="Mật khẩu"
    style={styles.inputNoBorder}
    secureTextEntry={!showPassword}
    value={form.password}
    onChangeText={(text) => handleChange('password', text)}
  />
  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
    <Ionicons
      name={showPassword ? 'eye' : 'eye-off'}
      size={20}
      color="#6A0DAD"
      style={styles.iconRight}
    />
  </TouchableOpacity>
</View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>ĐĂNG NHẬP</Text>
      </TouchableOpacity>

<Modal
  visible={otpModalVisible}
  transparent
  animationType="slide"
  onRequestClose={() => setOtpModalVisible(false)}
>
  <View style={styles.modalOverlay}>
    <View style={styles.otpModal}>
      <Text style={styles.otpTitle}>Xác nhận OTP</Text>
      <Text style={styles.otpDescription}>Vui lòng nhập mã OTP đã được gửi đến email của bạn.</Text>
      <TextInput
        style={styles.otpInput}
        placeholder="Nhập mã OTP"
        keyboardType="numeric"
        value={otpText}
        onChangeText={setOtpText}
        maxLength={6}
      />
      <TouchableOpacity style={styles.button} onPress={handleConfirmOTP}>
        <Text style={styles.buttonText}>Xác nhận</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

      <Text style={styles.footerText}>
        Chưa có tài khoản?
        <Text style={styles.link} onPress={() => router.push('/register')}>
          {' '}Đăng ký
        </Text>
      </Text>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6A0DAD',
    marginBottom: 30,
  },
  inputWithIcon: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#6A0DAD',
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 10,
    width: '100%',
    marginBottom: 12,
  },
  inputNoBorder: {
    flex: 1,
    height: 48,
  },
  icon: {
    marginRight: 10,
  },
  iconRight: {
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#6A0DAD',
    borderRadius: 8,
    paddingVertical: 12,
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  footerText: {
    marginTop: 16,
    fontSize: 14,
    color: '#333',
  },
  link: {
    color: '#6A0DAD',
    fontWeight: 'bold',
  },
  otpModal: {
  backgroundColor: '#fff',
  borderRadius: 10,
  padding: 20,
  width: '80%',
  alignItems: 'center',
},
otpTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#6A0DAD',
  marginBottom: 10,
},
otpDescription: {
  fontSize: 14,
  color: '#555',
  marginBottom: 15,
  textAlign: 'center',
},
otpInput: {
  borderWidth: 1,
  borderColor: '#6A0DAD',
  borderRadius: 8,
  padding: 10,
  width: '100%',
  marginBottom: 15,
  textAlign: 'center',
  fontSize: 16,
},
});
export const showAlert = (title: string, message: string) => {
  if (Platform.OS === 'web') {
    window.alert(`${title}\n${message}`);
  } else {
    Alert.alert(title, message);
  }
};
