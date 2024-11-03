import { useState } from "react";
import { Image, StyleSheet, View, Dimensions, Text } from "react-native";
import Carousel from 'react-native-reanimated-carousel';
import { LinearGradient } from 'expo-linear-gradient';
import { useWallpapers } from "@/hooks/useWallpapers";
import { useCarousel } from "@/hooks/useCarousel";
import Animated, { interpolate, useAnimatedStyle } from "react-native-reanimated";
import { SplitView } from "@/components/SplitView";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";

const TOPBAR_HEIGHT = 400;
const { width: screenWidth } = Dimensions.get('window');

export default function Explore() {
  const wallpapers = useWallpapers();
  const carouselItems = useCarousel();
  const [yOffset, setYOffset] = useState(0);

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{
      scale: interpolate(yOffset, [-TOPBAR_HEIGHT, 0, TOPBAR_HEIGHT], [1.5, 1, 1]),
    }],
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(yOffset, [-TOPBAR_HEIGHT, TOPBAR_HEIGHT / 2, TOPBAR_HEIGHT], [1.5, 1, 1]),
  }));

  return (
    <ThemedSafeAreaView style={styles.safeArea}>
      <Animated.View style={[styles.carouselContainer, headerAnimatedStyle]}>
        <Carousel
          loop
          width={screenWidth}
          data={carouselItems}
          scrollAnimationDuration={1000}
          onSnapToItem={(index) => console.log('Current index:', index)}
          renderItem={({ index }) => (
            <View style={styles.carouselItemContainer}>
              <Image source={{ uri: carouselItems[index].image }} style={styles.carouselImage} />
              <LinearGradient colors={['transparent', 'black']} style={styles.gradientOverlay}>
                <Animated.View style={textAnimatedStyle}>
                  <Text style={styles.carouselText}>{carouselItems[index].title}</Text>
                </Animated.View>
              </LinearGradient>
            </View>
          )}
        />
      </Animated.View>
      <View style={styles.splitViewContainer}>
        <SplitView
          onScroll={(offset) => setYOffset(offset)}
          wallpapers={wallpapers}
        />
      </View>
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  carouselContainer: {
    height: TOPBAR_HEIGHT,
  },
  carouselItemContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  carouselImage: {
    height: TOPBAR_HEIGHT,
    width: '100%',
  },
  gradientOverlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: TOPBAR_HEIGHT / 2,
    zIndex: 10,
  },
  carouselText: {
    color: "white",
    paddingTop: TOPBAR_HEIGHT / 3,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
  },
  splitViewContainer: {
    flex: 1,
    borderRadius: 20,
  },
});








/**
 * <ParallaxScrollView 
            headerBackgroundColor={{ dark: "black", light: "white" }}
            headerImage={<Image style={{ flex: 1 }} source={{ uri: wallpapers[0]?.url ??"" }} />}
        >
          <ThemedView style = {styles.container}>   
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
       
        </ParallaxScrollView>
        {selectedWallpaper && <DownloadPicture wallpaper={selectedWallpaper} 
        onClose={() => setSelectedWallpaper(null)}/>}
 */