import React from 'react';
import { Pressable, Text, StyleSheet, type ViewStyle,type TextProps, type TextStyle } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedButtonProps = {
  title: string;
  onPress: () => void;
  lightColor?: string;
  darkColor?: string;
  type?: 'primary' | 'secondary' | 'outline';
  style?: ViewStyle;
  textStyle?: TextStyle;
};

function ThemedButton({
  title,
  onPress,
  lightColor,
  darkColor,
  type = 'primary',
  style,
  textStyle,
}: ThemedButtonProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor },"text");
  const textColor = useThemeColor({ light: lightColor, dark: darkColor },"text");

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        type === 'primary' ? styles.primaryButton : undefined,
        type === 'secondary' ? styles.secondaryButton : undefined,
        type === 'outline' ? [styles.outlineButton, { borderColor: textColor }] : undefined,
        { backgroundColor },
        style,
      ]}
    >
      <Text style={[styles.buttonText, { color: textColor }, textStyle]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
  },
  secondaryButton: {
    backgroundColor: '#5856D6',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export { ThemedButton };

