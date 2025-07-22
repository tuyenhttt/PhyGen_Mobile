import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace('/onboarding');
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/logo.jpeg')}
        style={styles.logo}
      />
      <Text style={styles.title}>PHYGEN</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.buttonWrapper, styles.loginButton]}
          onPress={() => router.replace('/login')}
        >
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonWrapper, styles.registerButton]}
          onPress={() => router.replace('/register')}
        >
          <Text style={styles.buttonText}>Đăng ký</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2c1172ff',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    gap: 16,
  },
  buttonWrapper: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  loginButton: {
    backgroundColor: '#ffffff',
  },
  registerButton: {
    backgroundColor: '#ffcc00',
  },
  buttonText: {
    color: '#2c1172ff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
