import { getThemeProperty, useThemeColor } from '@/hooks';
import { SymbolView, SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { StyleProp, ViewStyle } from 'react-native';

export function Icon({
  name,
  size,
  color,
  style,
  weight = 'regular',
}: {
  name: SymbolViewProps['name'];
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}) {
  const defaultColor = useThemeColor('activeTint');
  const fontSize = getThemeProperty('fontSize');
  if (!color) {
    color = defaultColor;
  }
  return (
    <SymbolView
      weight={weight}
      tintColor={color}
      resizeMode="scaleAspectFit"
      name={name}
      style={[
        {
          width: size ?? fontSize,
          height: size ?? fontSize,
        },
        style,
      ]}
    />
  );
}
