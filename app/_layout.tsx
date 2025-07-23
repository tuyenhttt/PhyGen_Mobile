import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
// ví dụ trong onboarding/index.tsx hoặc splash.tsx
import { useRouter } from 'expo-router';
import { Button } from 'react-native';

const router = useRouter();
<Button title="Đăng ký" onPress={() => router.push('/register')} />

export default function Layout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaProvider>
  );
}
