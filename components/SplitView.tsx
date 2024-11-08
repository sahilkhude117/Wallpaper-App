import { Wallpaper } from "@/hooks/useWallpapers"
import { ThemedView } from "./ThemedView"
import { StyleSheet,FlatList,View } from "react-native"
import { DownloadPicture } from "./BottomSheet"
import { ImageCard } from "./imageCard"
import { useState } from "react"
import { finishScreenTransition } from "react-native-reanimated"


export function SplitView({wallpapers, onScroll}: {
    wallpapers :Wallpaper[];
    onScroll?: (yOffSet: number) => void;
}) {
    const [selectedWallpaper, setSelectedWallpaper] = useState<null | Wallpaper>(null)
    return <>
        <FlatList
            onScroll={(e) => {
                let yOffSet = e.nativeEvent.contentOffset.y/1;
                onScroll?.(yOffSet)
            }}
            data = {wallpapers.filter((_,index) => index % 2 === 0).map((_,index) => [wallpapers[index],
            wallpapers[index + 1]])}
            renderItem={({item: [first,second]}) => <ThemedView style={styles.container}>
                <ThemedView style={styles.innerContainer}>
                    <View style={styles.imageContainer}><ImageCard onPress={() => {
                        setSelectedWallpaper(first)
                    }}wallpaper={first} /></View>
                </ThemedView>   
                <ThemedView style={styles.innerContainer}>
                    {second && <View style={styles.imageContainer}><ImageCard wallpaper={second} onPress=
                    {() => {
                            setSelectedWallpaper(second);
                    }} /></View>}
                </ThemedView>
            </ThemedView>        
                
            } 
            keyExtractor={item => item[0].name}   
        /> 
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