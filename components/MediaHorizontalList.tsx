import { getThemeProperty } from "@/hooks";
import { Media } from "@/models";
import { MediaImageService } from "@/services/MediaImageService";
import { useRouter } from "expo-router";
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
  name: string;
  itemSize?: number; // Optional: Allows you to control size of the images
  style?: StyleProp<ViewStyle>;
};

const HorizontalContentList = ({
  data,
  name,
  itemSize = 120,
  style,
}: Props) => {
  const router = useRouter();
  return (
    <ThemedView style={style}>
      <ThemedText type={TextType.Subtitle}>{name}</ThemedText>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        data={data}
        keyExtractor={(item) => `${item.tmdb_id}${item.imdb_id}`}
        renderItem={({ item }) => (
          <Pressable
            style={{ width: itemSize }}
            onPress={() =>
              router.navigate({
                pathname: "/(tabs)/MovieDetailView",
                params: { imdb_id: item.imdb_id, tmdb_id: item.tmdb_id },
              })
            }
          >
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
                {new Date(item.release_date).getUTCFullYear()}
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
