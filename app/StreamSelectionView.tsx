import { TextType, ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import { getThemeProperty, useThemeColor } from "@/hooks";
import { MediaType } from "@/models";
import { ContentStream } from "@/models/plugins";
import { PlayerService } from "@/services/PlayerService";
import { PluginService } from "@/services/PluginService";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";

const StreamSelectionView = () => {
  const accentColor = useThemeColor("helperText");
  const backgroundSoft = useThemeColor("backgroundSoft");

  const [isLoading, setIsLoading] = useState<boolean>();
  const [streams, setStreams] = useState<ContentStream[]>();
  const navigation = useNavigation();
  const { imdb_id, title, media_type } = useLocalSearchParams<{
    imdb_id?: string;
    media_type?: MediaType;
    title?: string;
  }>();

  useLayoutEffect(() => {
    if (title) {
      navigation.setOptions({ title: decodeURIComponent(title as string) });
    }
  }, [title]);

  useEffect(() => {
    const getStreamsDetails = async () => {
      if (media_type && imdb_id) {
        setIsLoading(true);
        const streams = await PluginService.getStreamSources(
          media_type,
          imdb_id
        );
        console.log("Streams", streams);
        setStreams(streams);
        setIsLoading(false);
      }
    };
    getStreamsDetails();
  }, [imdb_id, media_type]);

  if (isLoading) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={streams}
        style={styles.list}
        ItemSeparatorComponent={() => (
          <ThemedView
            style={[styles.separator, { backgroundColor: accentColor }]}
          />
        )}
        renderItem={(stream) => {
          const description = stream.item.title ?? stream.item.description;
          const [title, ...tokens] = description?.split("\n") ?? [];
          return (
            <ThemedView
              style={[styles.item, { backgroundColor: backgroundSoft }]}
            >
              <Pressable
                onPress={() =>
                  PlayerService.playContentOnInfuse(stream.item.url)
                }
              >
                <ThemedText type={TextType.Bold}>
                  {title.replaceAll(".", " ")}
                </ThemedText>
                {tokens.map((t, i) => (
                  <ThemedText key={i} type={TextType.Small}>
                    {t}
                  </ThemedText>
                ))}
              </Pressable>
            </ThemedView>
          );
        }}
      />
    </ThemedView>
  );
};
export default StreamSelectionView;

const smallSpacing = getThemeProperty("smallSpacing");
const largeSpacing = getThemeProperty("largeSpacing");
const borderRadius = getThemeProperty("borderRadius");
const styles = StyleSheet.create({
  container: {
    padding: largeSpacing,
  },
  list: {},
  item: {
    padding: smallSpacing,
    borderRadius: borderRadius,
  },
  separator: {
    backgroundColor: "red",
    width: "100%",
    height: 0,
    marginTop: smallSpacing,
  },
});
