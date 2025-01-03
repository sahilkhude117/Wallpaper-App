import React, { useCallback, useRef } from 'react';
import { Text, Image,StyleSheet, Button, useColorScheme, Pressable } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Wallpaper } from '@/hooks/useWallpapers';
import { View } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import {Colors} from '@/constants/Colors';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

export const DownloadPicture = ({onClose, wallpaper}: {
    onClose: () => void;
    wallpaper: Wallpaper;
}) => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);
  const theme = useColorScheme() ?? 'light';

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    //console.log('handleSheetChanges', index);
  }, []);

  // renders
  return (
      <BottomSheet
        onClose={onClose}
        snapPoints={["90%"]}
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
        handleIndicatorStyle = {{display: "none"}}
        handleStyle = {{ display: "none"}}
      >
        <BottomSheetView style={{flex : 1}}>
          <ThemedView style={{borderTopLeftRadius: 15,borderTopRightRadius:15}}>
        <Image style={styles.image} source={{ uri: wallpaper.url }} />
        <View style={styles.topbar}>
        <Ionicons
            onPress={onClose}
            name={'close'}
            size={18}
            color={theme === 'light' ? "#000000" : "#ffffff"}
        />
        <View style={styles.topbarInner}>
        <Ionicons
            name={'heart'}
            size={18}
            color={theme === 'light' ? "#000000" : "#ffffff"}
            
        />
        <Ionicons
            name={'share'}
            size={18}
            color={theme === 'light' ? "#000000" : "#ffffff"}
            style={{
              paddingLeft: 4,
              paddingTop: -3
            }}
        />
        </View>
        </View>
        <ThemedView style={styles.textContainer}>
          <ThemedText style={styles.text}>{wallpaper.name}</ThemedText>
        </ThemedView>
        
           <DownloadButton url={wallpaper.url}/>
        
       </ThemedView>
      </BottomSheetView>
      </BottomSheet>
  );
};


function DownloadButton({ url }:{ url: string }) {
  const theme = useColorScheme() ?? 'light';
  return <Pressable
    onPress={async() => {
      let date = new Date().getTime();
      let fileUri = FileSystem.documentDirectory + `${date}.jpg`;

      try {
          await FileSystem.downloadAsync(url, fileUri)
          const responce = await MediaLibrary.requestPermissionsAsync(true)
          if(responce.granted){
          MediaLibrary.createAssetAsync(fileUri);
          alert("Image saved");
          } else {
          console.error("Permission not granted");
          }
        } catch(err) {
          console.log("FileSystem Error",err);
      }

      
    }}
    style={{
    padding: 10, 
    backgroundColor:theme === 'light' ? "#000000" : "#ffffff",
    marginHorizontal:40,
    marginVertical:20,
    justifyContent: "center",
    flexDirection: "row",
    borderWidth:1,
    borderColor: theme === 'light' ? "#000000" : "#ffffff",
    borderRadius:10,
  }}>
    <Ionicons
      name={'download'}
      size={18}
      color={theme === 'light' ? "#ffffff" : "#000000"}
      style={{
        alignContent:'center'
         }}
    />
    <ThemedText style={{
       fontSize:20,
       color: theme === 'light' ? "#ffffff" : "#000000" ,
       fontWeight: "600"
    }}>Download</ThemedText>
  </Pressable>
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  image: {
    height: "70%",
    width: "100%",
    borderRadius: 15
  },
  topbar: {
    position: "absolute",
    padding: 10,
    display: "flex",
    justifyContent: "space-between",
    flexDirection:"row",
    width:"100%"
  },
  topbarInner: {
    display:"flex",
    flexDirection:"row",
  },
  textContainer: {
    width:"100%"
  },
  text: {
    paddingTop:20,
    fontSize:30,
    textAlign:"center",
    fontWeight:"600"
  }
});

