import { Colors } from "@/constants/Theme";
import { getThemeProperty } from "@/hooks";
import { SFSymbol } from "expo-symbols";
import { useRef } from "react";
import {
  Animated,
  Pressable,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { Icon } from "./Icon/Icon";
import { TextType, ThemedText } from "./ThemedText";

export enum ButtonType {
  Primary = "primary",
  Secondary = "secondary",
  Tertiary = "tertiary",
  Delete = "delete",
}

interface ButtonProps {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  type?: ButtonType;
  title?: string;
  icon?: SFSymbol;
}

export const ThemedButton = ({
  onPress,
  style,
  type,
  title,
  icon,
}: ButtonProps) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  let backgroundColor;
  let textColor;

  switch (type) {
    case ButtonType.Secondary:
      backgroundColor = Colors.whiteLight;
      textColor = Colors.black;
      break;
    case ButtonType.Tertiary:
      backgroundColor = Colors.blackLight;
      textColor = Colors.white;
      break;
    case ButtonType.Delete:
      backgroundColor = Colors.red;
      textColor = Colors.white;
      break;
    case ButtonType.Primary:
    default:
      backgroundColor = Colors.blue;
      textColor = Colors.white;
      break;
  }

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.95, // Scale down
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0.7, // Reduce opacity
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1, // Return to normal size
        friction: 4,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1, // Restore opacity
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Animated.View
      style={[
        styles.button,
        {
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        style={[styles.pressable, style, { backgroundColor }]}
      >
        {icon && <Icon color={textColor} name={icon} size={title ? undefined : 20}/>}
        {title && (
          <ThemedText type={TextType.Bold} style={{ color: textColor }}>
            {title}
          </ThemedText>
        )}
      </Pressable>
    </Animated.View>
  );
};
const smallSpacing = getThemeProperty("smallSpacing");
const borderRadius = getThemeProperty("borderRadius");
const styles = StyleSheet.create({
  pressable: {
    borderRadius: borderRadius,
    padding: smallSpacing,
    flexDirection: "row",
    gap: smallSpacing,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {},
});
