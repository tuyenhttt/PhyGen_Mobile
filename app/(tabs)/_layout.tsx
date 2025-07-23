import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name='home'
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='home' color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name='exam'
        options={{
          title: 'Exam',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='document-text' color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name='notification'
        options={{
          title: 'Notification',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='notifications' color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='person-circle' color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name='explore'
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='search' color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
