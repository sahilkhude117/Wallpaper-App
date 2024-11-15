import { Wallpaper } from "@/hooks/useWallpapers"
import { ThemedView } from "./ThemedView"
import { StyleSheet,FlatList,View, Pressable, useColorScheme } from "react-native"
import { DownloadPicture } from "./BottomSheet"
import { ImageCard } from "./imageCard"
import { useState } from "react"
import Animated,{} from "react-native-reanimated";
import { finishScreenTransition } from "react-native-reanimated"
import MasonryList from "react-native-masonry-list";
import { ThemedText } from "./ThemedText"
import { Ionicons } from "@expo/vector-icons"


export function MasonryListView({wallpapers}: {
    wallpapers :Wallpaper[];
}) {
    const [selectedWallpaper, setSelectedWallpaper] = useState<null | Wallpaper>(null)

    const theme = useColorScheme();

    return <>
        <Animated.ScrollView>
            <ThemedView>
                <MasonryList
                    images={wallpapers}
                    columns={2} 
                    spacing={3} 
                    backgroundColor={theme === 'light' ?"#ffffff":"#000000"}
                    imageContainerStyle={{
                        borderRadius:15
                      }}
                    onPressImage={(item, index) => {
                        setSelectedWallpaper(item);
                    }}
                />
            </ThemedView> 
        </Animated.ScrollView>
        {selectedWallpaper && <DownloadPicture wallpaper={selectedWallpaper} 
         onClose={() => setSelectedWallpaper(null)}/>}      
    </>
}


const styles = StyleSheet.create({
    iconContainer: {
        display:"flex",
        justifyContent:"center"
    },
    image: {
        flex: 1,
        height:200,
        borderRadius: 20
    },
    label: {
        color:"white"
    },
    labelContainer: {
        position: "absolute",
        bottom:0,
        width:"100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        flexDirection:"row",
        justifyContent:"space-between",
        padding: 5,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    }
})


