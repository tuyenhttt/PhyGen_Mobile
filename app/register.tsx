import { Ionicons } from '@expo/vector-icons';
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

export default function RegisterScreen() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [genderModalVisible, setGenderModalVisible] = useState(false);
const [otpModalVisible, setOtpModalVisible] = useState(false);
const [otpText, setOtpText] = useState('');

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleRegister = async () => {
    if (!form.firstName || !form.lastName || !form.email || !form.password || !form.confirmPassword || !form.gender) {
      showAlert('Lỗi', 'Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (form.password !== form.confirmPassword) {
      showAlert('Lỗi', 'Mật khẩu không khớp');
      return;
    }
    try {
    
    // Gọi API đăng ký
    const registerResponse = await axios.post('https://phygen-a3c0gpa8c8gxgmbx.southeastasia-01.azurewebsites.net/api/auths/register', {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
      confirmPassword: form.confirmPassword,
      gender: form.gender,
    });
    showAlert('Thành công', 'Đăng ký thành công, vui lòng kiểm tra email để nhận mã OTP');
    setOtpModalVisible(true);
    } 
    catch (error: any) {
    console.error(error);
    showAlert('Lỗi', error?.response?.data?.message || 'Đăng ký thất bại');
  }
  };
// Hàm xác nhận OTP
const handleConfirmOTP = async () => {
  try {
    const confirmResponse = await axios.post('https://phygen-a3c0gpa8c8gxgmbx.southeastasia-01.azurewebsites.net/api/auths/confirmregistration', {
      email: form.email,
      otptext: otpText,
    });    
    showAlert('Thành công', 'Xác nhận OTP thành công, bạn có thể đăng nhập!');
    setOtpModalVisible(false);
    router.push('/login');
  } catch (error: any) {
    console.error(error);
    showAlert('Lỗi', error?.response?.data?.message || 'Xác nhận OTP thất bại');
  }
};

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo.jpeg')} style={styles.logo} />
      <Text style={styles.title}>Đăng Ký</Text>

      {/* Họ */}
      <View style={styles.inputWithIcon}>
        <Ionicons name="person-outline" size={20} color="#6A0DAD" style={styles.icon} />
        <TextInput
          placeholder="Họ"
          placeholderTextColor="#aaa"
          style={styles.inputNoBorder}
          value={form.lastName}
          onChangeText={(text) => handleChange('lastName', text)}
        />
      </View>

      {/* Tên */}
      <View style={styles.inputWithIcon}>
        <Ionicons name="person-circle-outline" size={20} color="#6A0DAD" style={styles.icon} />
        <TextInput
          placeholder="Tên"
          placeholderTextColor="#aaa"
          style={styles.inputNoBorder}
          value={form.firstName}
          onChangeText={(text) => handleChange('firstName', text)}
        />
      </View>

      {/* Email */}
      <View style={styles.inputWithIcon}>
        <Ionicons name="mail-outline" size={20} color="#6A0DAD" style={styles.icon} />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#aaa"
          style={styles.inputNoBorder}
          keyboardType="email-address"
          value={form.email}
          onChangeText={(text) => handleChange('email', text)}
        />
      </View>

{/* Giới tính */}
      <TouchableOpacity
        style={styles.inputWithIcon}
        onPress={() => setGenderModalVisible(true)}
      >
        <Ionicons name="transgender-outline" size={20} color="#6A0DAD" style={styles.icon} />
        <Text style={{ flex: 1, color: form.gender ? '#000' : '#aaa' }}>
          {form.gender || 'Chọn giới tính'}
        </Text>
        <Ionicons name="chevron-down-outline" size={18} color="#6A0DAD" />
      </TouchableOpacity>

      {/* Modal chọn giới tính */}
      <Modal
        visible={genderModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setGenderModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setGenderModalVisible(false)}
        >
          <View style={styles.modalContent}>
            {[
              { label: 'Nam', value: 'Nam' },
              { label: 'Nữ', value: 'Nữ' },
              { label: 'Khác', value: 'Khác' },
            ].map((option) => (
              <TouchableOpacity
                key={option.value}
                style={styles.modalOption}
                onPress={() => {
                  handleChange('gender', option.value);
                  setGenderModalVisible(false);
                }}
              >
                <Text style={styles.modalText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>

      </Modal>

      {/* Mật khẩu */}
      <View style={styles.inputWithIcon}>
        <Ionicons name="key-outline" size={20} color="#6A0DAD" style={styles.icon} />
        <TextInput
          placeholder="Mật khẩu"
          placeholderTextColor="#aaa"
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

      {/* Nhập lại mật khẩu */}
      <View style={styles.inputWithIcon}>
        <Ionicons name="lock-closed-outline" size={20} color="#6A0DAD" style={styles.icon} />
        <TextInput
          placeholder="Nhập lại mật khẩu"
          placeholderTextColor="#aaa"
          style={styles.inputNoBorder}
          secureTextEntry={!showConfirmPassword}
          value={form.confirmPassword}
          onChangeText={(text) => handleChange('confirmPassword', text)}
        />
        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
          <Ionicons
            name={showConfirmPassword ? 'eye' : 'eye-off'}
            size={20}
            color="#6A0DAD"
            style={styles.iconRight}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>ĐĂNG KÝ</Text>
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
        Đã có tài khoản?
        <Text style={styles.link} onPress={() => router.push('/login')}>
          {' '}Đăng nhập
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
    height: 48,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: 250,
    borderRadius: 10,
    paddingVertical: 10,
  },
  modalOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  modalText: {
    fontSize: 16,
    color: '#333',
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

// 👇 Alert riêng để hiển thị trên cả web và mobile
export const showAlert = (title: string, message: string) => {
  if (Platform.OS === 'web') {
    window.alert(`${title}\n${message}`);
  } else {
    Alert.alert(title, message);
  }
};
