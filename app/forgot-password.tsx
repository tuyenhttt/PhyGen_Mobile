import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function ForgotPasswordScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showOtpPopup, setShowOtpPopup] = useState(false);

  const handleForgotPassword = async () => {
    if (!email) {
      showAlert('Lỗi', 'Vui lòng nhập email.');
      return;
    }

    try {
      const res = await axios.post(
  'https://phygen-a3c0gpa8c8gxgmbx.southeastasia-01.azurewebsites.net/api/auths/forgetpassword',
  { email }
      );

      showAlert('Thành công', 'Nếu email tồn tại, OTP đã được gửi.');
      setShowOtpPopup(true); // 👉 mở popup nhập OTP + mật khẩu mới
    } catch (error: any) {
      console.error(error);
      showAlert('Lỗi', error?.response?.data?.message || 'Không thể gửi yêu cầu quên mật khẩu');
    }
  };

  const handleUpdatePassword = async () => {
    if (!otp || !newPassword) {
      showAlert('Lỗi', 'Vui lòng nhập đầy đủ OTP và mật khẩu mới.');
      return;
    }

    try {
      const res = await axios.post('https://phygen-a3c0gpa8c8gxgmbx.southeastasia-01.azurewebsites.net/api/auths/updatepassword', {
        email,
        new_password: newPassword,
        otptext: otp,
      });

      showAlert('Thành công', 'Cập nhật mật khẩu thành công.');
      setShowOtpPopup(false);
      router.replace('/login'); // 👉 chuyển về login
    } catch (error: any) {
      console.error(error);
      showAlert('Lỗi', error?.response?.data?.message || 'Không thể cập nhật mật khẩu');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quên mật khẩu</Text>
      <Text style={styles.subtitle}>Nhập email để nhận hướng dẫn đặt lại mật khẩu</Text>
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
        <Text style={styles.buttonText}>Gửi yêu cầu</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/login')}>
        <Text style={styles.backButtonText}>← Quay lại đăng nhập</Text>
      </TouchableOpacity>

      {/* ======= MODAL NHẬP OTP ======= */}
      <Modal visible={showOtpPopup} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Xác thực OTP</Text>
            <TextInput
              placeholder="OTP"
              value={otp}
              onChangeText={setOtp}
              style={styles.input}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="Mật khẩu mới"
              value={newPassword}
              onChangeText={setNewPassword}
              style={styles.input}
              secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleUpdatePassword}>
              <Text style={styles.buttonText}>Cập nhật mật khẩu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, textAlign: 'center', color: '#6A0DAD' },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1,
    borderColor: '#6A0DAD',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#6A0DAD',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  backButton: { alignItems: 'center' },
  backButtonText: {
    color: '#6A0DAD',
    fontSize: 14,
    textDecorationLine: 'underline',
    marginTop: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    elevation: 5,
  },
});

export const showAlert = (title: string, message: string) => {
  if (Platform.OS === 'web') {
    window.alert(`${title}\n${message}`);
  } else {
    Alert.alert(title, message);
  }
};
