import { Wallpaper } from "@/hooks/useWallpapers"
import { ThemedView } from "./ThemedView"
import { StyleSheet,FlatList,View } from "react-native"
import { DownloadPicture } from "./BottomSheet"
import { ImageCard } from "./imageCard"
import { useState } from "react"
import Animated,{} from "react-native-reanimated";
import { finishScreenTransition } from "react-native-reanimated"


export function SplitView({wallpapers}: {
    wallpapers :Wallpaper[];
}) {
    const [selectedWallpaper, setSelectedWallpaper] = useState<null | Wallpaper>(null)
    return <>
        <Animated.ScrollView>
            <ThemedView style = {styles.container}>   
                    <ThemedView style = {styles.innerContainer}>
                        <FlatList
                            data={wallpapers.filter((_,index)=>index%2 ===0)}
                            renderItem={({item}) => <View style={styles.imageContainer}><ImageCard onPress={()=>{
                                    setSelectedWallpaper(item)
                                }}wallpaper={item} /></View>}
                            keyExtractor={item => item.name}
                            horizontal={true}
                    /> 
                </ThemedView>
                <ThemedView style = {styles.innerContainer}>
                    <FlatList
                        data={wallpapers.filter((_,index)=>index%2 === 1)}
                        renderItem={({item}) => <View style={styles.imageContainer}><ImageCard onPress={() => {
                                setSelectedWallpaper(item)
                            }}wallpaper={item} /></View>}
                        keyExtractor={item => item.name}
                        horizontal={true}
                    />
                    </ThemedView>
        </ThemedView>
        </Animated.ScrollView>
        {selectedWallpaper && <DownloadPicture wallpaper={selectedWallpaper} onClose={() => setSelectedWallpaper(null)}/>}      
    </>
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flex: 1
    },
    innerContainer: {
        flex: 0.5,
        padding:5
    },
    imageContainer: {
        paddingVertical: 10,
    }
});



/**
 * <ThemedView style = {styles.container}>   
            <ThemedView style = {styles.innerContainer}>
                <FlatList
                    data={wallpapers.filter((_,index)=>index%2 ===0)}
                        renderItem={({item}) => <View style={styles.imageContainer}><ImageCard onPress={()=>{
                            setSelectedWallpaper(item)
                        }}wallpaper={item} /></View>}
                    keyExtractor={item => item.name}
            /> 
        </ThemedView>
        <ThemedView style = {styles.innerContainer}>
            <FlatList
                data={wallpapers.filter((_,index)=>index%2 === 1)}
                    renderItem={({item}) => <View style={styles.imageContainer}><ImageCard onPress={() => {
                        setSelectedWallpaper(item)
                    }}wallpaper={item} /></View>}
                keyExtractor={item => item.name}
            />
            </ThemedView>
        </ThemedView>
        {selectedWallpaper && <DownloadPicture wallpaper={selectedWallpaper} 
        onClose={() => setSelectedWallpaper(null)}/>}
 */