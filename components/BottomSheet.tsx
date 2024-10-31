import React, { useCallback, useRef } from 'react';
import { Text, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

export const DownloadPicture = ({onClose}: {
    onClose: () => void;
}) => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    //console.log('handleSheetChanges', index);
  }, []);

  // renders
  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheet
        onClose={onClose}
        snapPoints={["99%"]}
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        enablePanDownToClose={true}
        handleIndicatorStyle = {{height: 0}}
      >
        <BottomSheetView style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  },
});

