import { getThemeProperty } from "@/hooks";
import { StyleSheet, ViewProps } from "react-native";
import { ThemedView } from "./ThemedView";

export type CardViewProps = ViewProps & {};
const CardView = ({ ...otherProps }: ViewProps) => {
  return <ThemedView softBackground style={styles.card} {...otherProps} />;
};
export default CardView;

const largeSpacing = getThemeProperty("largeSpacing");
const smallSpacing = getThemeProperty("smallSpacing");
const borderRadius = getThemeProperty("borderRadius");
const styles = StyleSheet.create({
  card: {
    marginHorizontal: largeSpacing,
    marginVertical: smallSpacing,
    padding: smallSpacing,
    borderRadius: borderRadius,
  },
});
