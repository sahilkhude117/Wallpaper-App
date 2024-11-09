import { useState } from "react";
import { Image, StyleSheet, View, Dimensions, Text } from "react-native";
import Carousel from 'react-native-reanimated-carousel';
import { LinearGradient } from 'expo-linear-gradient';
import { useWallpapers, Wallpaper } from "@/hooks/useWallpapers";
import { useCarousel } from "@/hooks/useCarousel";
import Animated, { interpolate, useAnimatedRef, useAnimatedScrollHandler, useAnimatedStyle, useScrollViewOffset, useSharedValue } from "react-native-reanimated";
import { SplitView } from "@/components/SplitView";
import { ThemedSafeAreaView } from "@/components/ThemedSafeAreaView";
import { ThemedView } from "@/components/ThemedView";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { DownloadPicture } from "@/components/BottomSheet";
import { ImageCard } from "@/components/imageCard";

const HEADER_HEIGHT = 400;
const { width: screenWidth } = Dimensions.get('window');

export default function Explore() {
  const wallpapers = useWallpapers();
  const carouselItems = useCarousel();
  const yOffset = useSharedValue(0);
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);


  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });
  

  const scrollHandler = useAnimatedScrollHandler((event) => {
    yOffset.value = event.contentOffset.y;
  });
  

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(yOffset.value, [-HEADER_HEIGHT, HEADER_HEIGHT / 2, HEADER_HEIGHT], [1.5, 1, 1]),
  }));

  const [selectedWallpaper, setSelectedWallpaper] = useState<null | Wallpaper>(null)

  return (
    <ThemedSafeAreaView style={styles.safeArea}>
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
      <Animated.View style={[styles.carouselContainer, headerAnimatedStyle]}>
        <Carousel
          loop
          width={screenWidth}
          data={carouselItems}
          autoPlay={true}
          scrollAnimationDuration={1000}
          // onSnapToItem={(index) => console.log('Current index:', index)}
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
        </Animated.ScrollView>

        {selectedWallpaper && <DownloadPicture wallpaper={selectedWallpaper} 
        onClose={() => setSelectedWallpaper(null)}/>}
    </ThemedSafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  carouselContainer: {
    height: HEADER_HEIGHT,
  },
  carouselItemContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  carouselImage: {
    height: HEADER_HEIGHT,
    width: '100%',
  },
  gradientOverlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: HEADER_HEIGHT / 2,
    zIndex: 10,
  },
  carouselText: {
    color: "white",
    paddingTop: HEADER_HEIGHT / 3,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
  },
  splitViewContainer: {
    flex: 1,
    borderRadius: 20,
  },
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