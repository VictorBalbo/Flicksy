import { getThemeProperty } from "@/hooks";
import { Media } from "@/models/media";
import { MediaImageService } from "@/services/MediaImageService";
import {
  FlatList,
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { TextType, ThemedText } from "./ui/ThemedText";
import { ThemedView } from "./ui/ThemedView";

type Props = {
  data: Media[];
  itemSize?: number; // Optional: Allows you to control size of the images
  style?: StyleProp<ViewStyle>;
};

const HorizontalContentList = ({ data, itemSize = 120, style }: Props) => {
  return (
    <ThemedView>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[style, styles.listContainer]}
        data={data}
        keyExtractor={(item) => item.tmdb_id.toString()}
        renderItem={({ item }) => (
          <Pressable style={{ width: itemSize }}>
            <Image
              source={{
                uri: MediaImageService.getImageSrc(
                  item.images,
                  "poster",
                  itemSize
                ),
              }}
              style={styles.image}
            />
            <ThemedText type={TextType.Smalltitle} numberOfLines={1}>
              {item.title}
            </ThemedText>
            {item.release_date && (
              <ThemedText type={TextType.Small}>
                {new Date(item.release_date).getFullYear()}
              </ThemedText>
            )}
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
    backgroundColor: "#ccc",
    width: "100%",
    aspectRatio: 2 / 3,
    resizeMode: "cover",
  },
});

export default HorizontalContentList;
