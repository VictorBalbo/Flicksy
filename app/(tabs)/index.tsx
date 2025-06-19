import { Carousel, WindowDimensions } from "@/components/MediaCarousel";
import HorizontalContentList from "@/components/MediaHorizontalList";
import { ThemedText } from "@/components/ui/ThemedText";
import { getThemeProperty, useThemeColor } from "@/hooks";
import { Media, MediaType } from "@/models/media";
import { TmdbService } from "@/services/TmdbService";
import { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  LayoutChangeEvent,
  SafeAreaView,
  StyleSheet,
} from "react-native";

export default function Home() {
  const backgroundColor = useThemeColor("backgroundSoft");
  const [popularMovies, setPopularMovies] = useState<Media[]>([]);
  const [popularShows, setPopularShows] = useState<Media[]>([]);
  useEffect(() => {
    const getPopularMovies = async () => {
      const movies = await TmdbService.getPopularMovies();
      setPopularMovies(movies);
    };
    const getPopularShows = async () => {
      const shows = await TmdbService.getPopularShows();
      setPopularShows(shows);
    };
    
    getPopularMovies();
    getPopularShows()
  }, []);

  const data: Media[] = [
    {
      tmdb_id: 1,
      imdb_id: "1",
      media_type: MediaType.Movie,
      title: "Movie A",
      images: {
        poster:
          "https://image.tmdb.org/t/p/original/dDsRyuDgRNOcsxe8369kRVshmuj.jpg",
        backdrop:
          "https://image.tmdb.org/t/p/original/9n2tJBplPbgR2ca05hS5CKXwP2c.jpg",
      },
    },
    {
      tmdb_id: 2,
      imdb_id: "2",
      media_type: MediaType.Movie,
      title: "Movie B",
      images: {
        poster:
          "https://image.tmdb.org/t/p/original/gHohVoi3cWvhVIni86Esf5o1f3i.jpg",
        backdrop:
          "https://image.tmdb.org/t/p/original/7Zx3wDG5bBtcfk8lcnCWDOLM4Y4.jpg",
      },
    },
    {
      tmdb_id: 3,
      imdb_id: "3",
      media_type: MediaType.Movie,
      title: "Movie C",
      images: {
        poster:
          "https://image.tmdb.org/t/p/original/p0eqJ2U3opmouheu1M9pxU2JpZl.jpg",
        backdrop:
          "https://image.tmdb.org/t/p/original/aESb695wTIF0tB7RTGRebnYrjFK.jpg",
      },
    },
    {
      tmdb_id: 4,
      imdb_id: "4",
      media_type: MediaType.Movie,
      title: "Movie D",
      images: {
        poster:
          "https://image.tmdb.org/t/p/original/AupJ3wrZF6iF07B8WY90gpapEQz.jpg",
        backdrop:
          "https://image.tmdb.org/t/p/original/kYgQzzjNis5jJalYtIHgrom0gOx.jpg",
      },
    },
    {
      tmdb_id: 5,
      imdb_id: "5",
      media_type: MediaType.Movie,
      title: "Movie E",
      images: {
        poster:
          "https://image.tmdb.org/t/p/original/qD7rmFLD5ZChiVP13uqnTeypYEF.jpg",
        backdrop:
          "https://image.tmdb.org/t/p/original/uQ4lG7E7mlyKsGvbASftQ6Hu2IX.jpg",
      },
    },
  ];

  const [dimensions, setDimentions] = useState<WindowDimensions>(
    Dimensions.get("window")
  );

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    setDimentions({ width, height });
  }, []);

  return (
    <SafeAreaView
      style={[{ backgroundColor }, styles.container]}
      onLayout={onLayout}
    >
      <Carousel data={data} dimensions={dimensions} />
      <HorizontalContentList data={popularMovies} style={styles.contentList} />
      <HorizontalContentList data={popularShows} style={styles.contentList} />

      <ThemedText>Teste4</ThemedText>

      <ThemedText>Teste2</ThemedText>
    </SafeAreaView>
  );
}

const smallSpacing = getThemeProperty("smallSpacing");
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentList: {
    marginTop: smallSpacing,
    paddingHorizontal: smallSpacing,
  },
});
