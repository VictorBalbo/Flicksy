import { useEffect, useState } from "react";
import { Pressable, StyleSheet, ViewStyle } from "react-native";
import { Icon } from "./ui/Icon/Icon";
import { ThemedText } from "./ui/ThemedText";

interface ExpandableTextProps {
  text: string;
  lines: number;
  style?: ViewStyle;
}

export const ExpandableText = ({
  text,
  style,
  lines = 2,
}: ExpandableTextProps) => {
  const [totalLines, setTotalLines] = useState(0);
  const [isExpanded, setIsExpanded] = useState(true);
  const [showExpandArrow, setShowExpandArrow] = useState(false);

  const handleTextLayout = (e: any) => {
    if (totalLines) return;
    const currentLines = e.nativeEvent.lines.length as number;
    setTotalLines(currentLines);

    if (currentLines > lines) {
      setShowExpandArrow(true);
      setIsExpanded(false);
    } else {
      setShowExpandArrow(false);
    }
  };
  useEffect(() => {
    setTotalLines(0);
  }, [text]);

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  return (
    <Pressable onPress={toggleExpand} style={[style, styles.wrapper]}>
      <ThemedText
        numberOfLines={isExpanded ? undefined : lines}
        style={styles.text}
        onTextLayout={handleTextLayout}
      >
        {text}
      </ThemedText>
      {showExpandArrow && (
        <Icon name={isExpanded ? "chevron.up" : "chevron.down"} size={16} />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    flex: 1,
  },
});
