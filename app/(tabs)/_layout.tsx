import { ThemedView } from '@/components/ThemedView';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ThemeProvider } from '@react-navigation/native';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function TabLayout() {
  const theme = useColorScheme()?? 'light';
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor:"red",
      tabBarStyle: {
        backgroundColor: theme === 'light' ? "#ffffff": "#000000"
      },
      }}>
      <Tabs.Screen
        name="foryou"
        options={{
          title: "For You",
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="feed" color={color} />,
        }}
      />
      
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="user" color={color} />,
        }}
      />
      
      
    </Tabs>
  );
}