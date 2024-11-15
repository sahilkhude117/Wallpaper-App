declare module 'react-native-masonry-list' {
  import React from 'react';
  import { FlatListProps, StyleProp, ViewStyle } from 'react-native';

  interface MasonryListProps {
      images: Array<{
          uri?: string;
          source?: { uri: string } | number;
          dimensions?: { width: number; height: number };
          width?: number;
          height?: number;
          id?: string | number;
          name?: string;
          liked?:boolean;
          suggested?:boolean;
          library?:boolean;
      }>;
      columns?: number;
      spacing?: number;
      backgroundColor?: string;
      sorted?: boolean;
      onPressImage?: (item: any, index: number) => void;
      onEndReached?: () => void;
      imageContainerStyle?: StyleProp<ViewStyle>;
  }

  export default class MasonryList extends React.Component<MasonryListProps> {}
}

  