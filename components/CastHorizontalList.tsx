import { getThemeProperty } from "@/hooks";
import { CastCrewMember } from "@/models/Media";
import { MediaImageService } from "@/services/MediaImageService";
import { useRouter } from "expo-router";
import {
  FlatList,
  Image,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { TextType, ThemedText } from "./ui/ThemedText";
import { ThemedView } from "./ui/ThemedView";

type Props = {
  data: CastCrewMember[];
  name: string;
  itemSize?: number; // Optional: Allows you to control size of the images
  style?: StyleProp<ViewStyle>;
};

const HorizontalContentList = ({
  data,
  name,
  itemSize = 100,
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
        keyExtractor={(item, i) => `${i}`}
        renderItem={({ item }) => (
          <ThemedView style={{ width: itemSize }}>
            <Image
              source={
                item.profile_path
                  ? {
                      uri: MediaImageService.getProfileImageSrc(
                        item.profile_path ?? "",
                        itemSize
                      ),
                    }
                  : require("@/assets/images/avatar.png")
              }
              style={styles.image}
            />
            <ThemedText type={TextType.Smalltitle} numberOfLines={1}>
              {item.name}
            </ThemedText>
            {(item.character ?? item.job) && (
              <ThemedText type={TextType.Small}>
                {item.character ?? item.job}
              </ThemedText>
            )}
          </ThemedView>
        )}
      />
    </ThemedView>
  );
};

const smallSpacing = getThemeProperty("smallSpacing");
const borderRadius = getThemeProperty("borderRadius");

const styles = StyleSheet.create({
  listContainer: {
    gap: smallSpacing,
  },
  image: {
    borderRadius: borderRadius,
    backgroundColor: "#ccc",
    width: "100%",
    height: "auto",
    aspectRatio: 2 / 3,
    resizeMode: "contain",
  },
});

export default HorizontalContentList;
