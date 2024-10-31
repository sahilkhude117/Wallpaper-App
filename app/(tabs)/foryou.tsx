import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { View,Text } from 'react-native';

const Tab = createMaterialTopTabNavigator();

export default function ForYou() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Library" component={LibraryScreen} />
      <Tab.Screen name="Liked" component={LikedScreen} />
      <Tab.Screen name="Suggested" component={SuggestedScreen} />
    </Tab.Navigator>
  );
}

function LibraryScreen() {
    return <View>
        <Text>Hi there from the Library screen</Text>
    </View>
}

function LikedScreen() {
    return <View>
        <Text>Hi there from the Liked screen</Text>
    </View>
}

function SuggestedScreen() {
    return <View>
        <Text>Hi there from the Suggested screen</Text>
    </View>
}