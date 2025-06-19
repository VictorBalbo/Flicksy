import { Theme } from "@/constants/Theme";
import { useThemeColor } from "@/hooks";
import { StyleSheet, Text, type TextProps } from "react-native";

export enum TextType {
  Title = "title",
  Subtitle = "subtitle",
  Smalltitle = "smalltitle",
  Text = "text",
  Bold = "bold",
  Small = "small",
}

export type ThemedTextProps = TextProps & {
  type?: TextType;
};

export const ThemedText = ({
  style,
  type = TextType.Text,
  ...rest
}: ThemedTextProps) => {
  const textColor = useThemeColor("text");
  const helperTextColor = useThemeColor("helperText");
  let color;
  let typeStyle;
  switch (type) {
    case "title":
      color = textColor;
      typeStyle = styles.title;
      break;
    case "subtitle":
      color = textColor;
      typeStyle = styles.subtitle;
      break;
    case "smalltitle":
      color = textColor;
      typeStyle = styles.smalltitle;
      break;
    case "text":
      color = textColor;
      typeStyle = styles.text;
      break;
    case "bold":
      color = textColor;
      typeStyle = styles.bold;
      break;
    case "small":
      color = helperTextColor;
      typeStyle = styles.small;
      break;
  }
  return <Text style={[{ color }, typeStyle, style]} {...rest} />;
};

const styles = StyleSheet.create({
  title: {
    fontSize: Theme.base.textSize * 2,
    lineHeight: Theme.base.textSize * 2.5,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: Theme.base.textSize * 1.5,
    lineHeight: Theme.base.textSize * 1.875,
    fontWeight: "bold",
  },
  smalltitle: {
    fontSize: Theme.base.textSize * 0.75,
    lineHeight: Theme.base.textSize * 1,
    fontWeight: "bold",
  },
  text: {
    fontSize: Theme.base.textSize,
    lineHeight: Theme.base.textSize * 1.25,
  },
  bold: {
    fontSize: Theme.base.textSize,
    lineHeight: Theme.base.textSize * 1.25,
    fontWeight: "600",
  },
  small: {
    fontSize: Theme.base.textSize * 0.75,
    lineHeight: Theme.base.textSize * 0.875,
  },
});
