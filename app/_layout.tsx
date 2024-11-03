import { DownloadPicture } from "@/components/BottomSheet";
import { useWallpapers } from "@/hooks/useWallpapers";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout(){
    const wallpapers = useWallpapers();
    return <GestureHandlerRootView>

       <Stack screenOptions={{
        headerShown:false
       }}>
            {/* <Stack.Screen name="(nobottombar)/accountinfo" options={{headerShown:true,
                headerTitle: "Account info" , headerBackTitle:"Go back"
            }}/> */}
        </Stack>
  </GestureHandlerRootView>
}