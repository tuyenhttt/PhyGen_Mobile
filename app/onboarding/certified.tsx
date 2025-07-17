import { useRouter } from 'expo-router';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function Certified() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Centered Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Download your Exam</Text>
        <Text style={styles.subtitle}>
          Earn certificates to showcase your skills.
        </Text>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.replace('/(tabs)/home')}
          style={styles.finishButton}
        >
          <Text style={styles.finishText}>Finish</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 24,
    alignItems: 'center',
  },
  backText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  finishButton: {
    backgroundColor: '#16A34A',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  finishText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
