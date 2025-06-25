import { ExpandableText } from "@/components/ExpandableText";
import { Icon } from "@/components/ui/Icon/Icon";
import { ButtonType, ThemedButton } from "@/components/ui/ThemedButton";
import { TextType, ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import { TimeHelper } from "@/helpers";
import { getThemeProperty, useThemeColor } from "@/hooks";
import { MovieDetails } from "@/models/MovieDetails";
import { MediaImageService } from "@/services/MediaImageService";
import { PluginService } from "@/services/PluginService";
import { TmdbService } from "@/services/TmdbService";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";

import {
  ActivityIndicator,
  Dimensions,
  Image,
  LayoutChangeEvent,
  Linking,
  SafeAreaView,
  StyleSheet,
} from "react-native";

interface WindowDimensions {
  width: number;
  height: number;
}

const MovieDetailView = () => {
  const backgroundColor = useThemeColor("background");
  const { imdb_id, tmdb_id } = useLocalSearchParams<{
    imdb_id?: string;
    tmdb_id?: string;
  }>();
  const [movie, setMovie] = useState<MovieDetails>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [logoAspectRatio, setLogoAspectRatio] = useState<number>();
  const router = useRouter()

  const [dimensions, setDimentions] = useState<WindowDimensions>(
    Dimensions.get("window")
  );

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setDimentions({ width, height });
  }, []);

  const wideAspectRatio = 16 / 9;
  const tallAspectRatio = 2 / 3;

  const breakHeight = dimensions.height * 0.3;
  const useWidePoster = dimensions.width / wideAspectRatio >= breakHeight;

  useEffect(() => {
    const getMovieDetails = async () => {
      if (tmdb_id) {
        setIsLoading(true);
        const movie = await TmdbService.getMovieDetail(tmdb_id);
        const streams = await PluginService.getStreamSources(movie.media_type, movie.imdb_id!);
        setMovie(movie);
        setIsLoading(false);
      }
    };
    getMovieDetails();
  }, [tmdb_id]);
  useEffect(() => {
    const getLogoSize = async () => {
      const logoUrl = MediaImageService.getImageSrc(
        movie?.images,
        "logo",
        dimensions.width
      );
      const { width, height } = await Image.getSize(logoUrl);
      setLogoAspectRatio(width / height);
    };
    if (movie?.images) {
      getLogoSize();
    }
  }, [movie?.images]);

  if (isLoading) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </ThemedView>
    );
  } else if (!movie) {
    return <></>;
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }} onLayout={onLayout}>
      <ThemedView style={styles.header}>
        <Image
          source={{
            uri: MediaImageService.getImageSrc(
              movie.images,
              useWidePoster ? "backdrop_clear" : "poster_clear",
              dimensions.width
            ),
          }}
          style={[
            styles.poster,
            { aspectRatio: useWidePoster ? wideAspectRatio : tallAspectRatio },
          ]}
        />
        <LinearGradient
          colors={["transparent", backgroundColor]}
          style={styles.gradient}
        />
        <ThemedView style={styles.details}>
          {movie.images?.logo && logoAspectRatio && (
            <Image
              source={{
                uri: MediaImageService.getImageSrc(
                  movie.images,
                  "logo",
                  dimensions.width
                ),
              }}
              style={[styles.logo, { aspectRatio: logoAspectRatio }]}
            />
          )}
          {(!movie.images?.logo || !logoAspectRatio) && (
            <ThemedText type={TextType.Title} style={styles.logoFallback}>{movie.title}</ThemedText>
          )}
          <ThemedText type={TextType.Small}>
            {movie.genres?.slice(0, 2).join(" · ")}
            {" • "}
            {TimeHelper.formatMinutesToTime(movie.runtime)}
            {" • "}
            {new Date(movie.release_date).getUTCFullYear()}
          </ThemedText>
          <ThemedView style={styles.actions}>
            <ThemedButton
              type={ButtonType.Secondary}
              title="Play"
              icon="play.fill"
              style={styles.playButton}
              onPress={() => {
                router.navigate({
                pathname: "/StreamSelectionView",
                params: { imdb_id: movie.imdb_id, media_type: movie.media_type },
              })
              }}
            />
            <ThemedButton
              type={ButtonType.Tertiary}
              icon="bookmark"
              onPress={() => {
                console.log("click");
              }}
            />
            <ThemedButton
              type={ButtonType.Tertiary}
              icon="eye"
              onPress={() => {
                console.log("click");
              }}
            />
            <ThemedButton
              type={ButtonType.Tertiary}
              icon="movieclapper"
              onPress={async () => {
                try {
                  await Linking.openURL(`youtube://watch?v=${movie.video}`);
                } catch {
                  Linking.openURL(`https://youtube.com/watch?v=${movie.video}`);
                }
              }}
            />
          </ThemedView>
          {movie.tagline && (
            <ThemedView style={styles.taglineContainer}>
              <Icon name="quote.opening" size={fontSize} />
              <ThemedText type={TextType.Bold} style={styles.tagline}>
                {movie.tagline}
              </ThemedText>
              <Icon name="quote.closing" size={fontSize} />
            </ThemedView>
          )}
          {movie.overview && <ExpandableText text={movie.overview} lines={2} />}
        </ThemedView>
      </ThemedView>
    </SafeAreaView>
  );
};
export default MovieDetailView;

const smallSpacing = getThemeProperty("smallSpacing");
const largeSpacing = getThemeProperty("largeSpacing");
const fontSize = getThemeProperty("fontSize");
const styles = StyleSheet.create({
  header: {
    position: "relative",
  },
  poster: {
    width: "100%",
    resizeMode: "cover",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "50%",
  },
  details: {
    position: "absolute",
    bottom: 0,
    alignItems: "center",
    paddingHorizontal: largeSpacing,
    width: "100%",
    justifyContent: "flex-end",
    gap: smallSpacing,
  },
  logo: {
    width: "75%",
    maxHeight: 10 * fontSize,
    resizeMode: "contain",
  },
  logoFallback: {
    textAlign: 'center'
  },
  actions: {
    flexDirection: "row",
    gap: smallSpacing,
  },
  playButton: {
    width: 150,
  },
  taglineContainer: {
    flexDirection: "row",
    gap: smallSpacing,
    justifyContent: "center",
  },
  tagline: {
    flexShrink: 1,
    textAlign: "center",
  },
});
