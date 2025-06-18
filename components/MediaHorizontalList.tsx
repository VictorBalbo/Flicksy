import { getThemeProperty } from "@/hooks";
import { Media } from "@/models/media";
import {
  FlatList,
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { ThemedView } from "./ui/ThemedView";

type Props = {
  data: Media[];
  itemSize?: number; // Optional: Allows you to control size of the images
  style?: StyleProp<ViewStyle>;
};

const HorizontalContentList = ({ data, itemSize = 120, style }: Props) => {
  const aspectRatio = 2 / 3;
  return (
    <ThemedView>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[style, styles.listContainer]}
        data={data}
        keyExtractor={(item) => item.tmdb_id}
        renderItem={({ item }) => (
          <Pressable>
            <Image
              source={{ uri: item.images?.poster }}
              style={[
                styles.image,
                {
                  width: itemSize,
                  height: itemSize / aspectRatio,
                },
              ]}
              resizeMode="cover"
            />
          </Pressable>
        )}
      />
    </ThemedView>
  );
};

const smallSpacing = getThemeProperty("smallSpacing");

const styles = StyleSheet.create({
  listContainer: {
    gap: smallSpacing,
  },
  image: {
    borderRadius: smallSpacing,
    backgroundColor: "#ccc", // Placeholder background while loading
  },
});

export default HorizontalContentList;
