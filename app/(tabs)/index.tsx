//https://ideogram.ai/assets/progressive-image/balanced/response/DIwPDvgJQ-ioTttMSNC5Mg
//https://ideogram.ai/assets/progressive-image/balanced/response/1XL49TjTQsmWOMTjYYuYNg
//https://ideogram.ai/assets/progressive-image/balanced/response/ylEX3TEuTzm47geUCEVmzw

import { ImageCard } from "@/components/imageCard";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedView } from "@/components/ThemedView";
import { useWallpapers,Wallpaper } from "@/hooks/useWallpapers";
import { Text,Image,StyleSheet,View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function explore(){
    const wallpapers = useWallpapers();
    
    return <SafeAreaView style={{ flex: 1 }}>
        <ParallaxScrollView 
            headerBackgroundColor={{ dark: "black", light: "white" }}
            headerImage={<Image style={{ flex: 1 }} source={{ uri: wallpapers[0]?.url ??"" }} />}
        >
            <ThemedView style = {styles.container}>   
                <ThemedView style = {styles.innerContainer}>
                    <FlatList
                    data={wallpapers.filter((_,index)=>index%2 ===0)}
                    renderItem={({item}) => <View style={styles.imageContainer}><ImageCard wallpaper={item} /></View>}
                    keyExtractor={item => item.name}
                    /> 
                </ThemedView>
                <ThemedView style = {styles.innerContainer}>
                    <FlatList
                        data={wallpapers.filter((_,index)=>index%2 === 1)}
                        renderItem={({item}) => <View style={styles.imageContainer}><ImageCard wallpaper={item} /></View>}
                        keyExtractor={item => item.name}
                    />
                </ThemedView>
            </ThemedView>
        </ParallaxScrollView>
    </SafeAreaView>
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
})