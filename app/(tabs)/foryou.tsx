import { SplitView } from '@/components/SplitView';
import { ThemedSafeAreaView } from '@/components/ThemedSafeAreaView';
import { ThemedView } from '@/components/ThemedView';
import { useLibraryWallpapers, useLikedWallpapers, useSuggestedWallpapers, useWallpapers } from '@/hooks/useWallpapers';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ThemeProvider } from '@react-navigation/native';
import { View,Text,StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Tab = createMaterialTopTabNavigator();

export default function ForYou() {
  const theme = useColorScheme() ??'light';
  return (
    <ThemedSafeAreaView style={{flex:1}}>
    <Tab.Navigator style={{
      flex:1,
    }} screenOptions={{
      tabBarActiveTintColor : Colors[theme].tint,
      tabBarStyle: {
        backgroundColor: Colors[theme].background
      },
      tabBarIndicatorStyle: {
        backgroundColor: Colors[theme].indicator,
        height:5
      }
      
    }}>
      <Tab.Screen name="Library" component={LibraryScreen} />
      <Tab.Screen name="Liked" component={LikedScreen} />
      <Tab.Screen name="Suggested" component={SuggestedScreen} />
    </Tab.Navigator>
    </ThemedSafeAreaView>
  );
}

function LibraryScreen() {
  const wallpapers = useLibraryWallpapers();
  return <ThemedView style={styles.container}>
      <SplitView wallpapers={wallpapers}/>
  </ThemedView>
}

function LikedScreen() {
  const wallpapers = useLikedWallpapers();
  return <ThemedView style={styles.container}>
      <SplitView wallpapers={wallpapers}/>
  </ThemedView>
}

function SuggestedScreen() {
  const wallpapers = useSuggestedWallpapers();
  return <ThemedView style={styles.container}>
      <SplitView wallpapers={wallpapers}/>
  </ThemedView>
}

const styles = StyleSheet.create({
  tabContainer: {

  },
  container: {
    flex: 1
  }
});