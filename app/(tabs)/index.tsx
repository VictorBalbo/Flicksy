import { Carousel, WindowDimensions } from "@/components/Carousel/Carousel";
import { ThemedText } from "@/components/ui/ThemedText";
import { useThemeColor } from "@/hooks";
import { useCallback, useState } from "react";
import {
  Dimensions,
  LayoutChangeEvent,
  SafeAreaView,
  StyleSheet,
} from "react-native";

export default function Home() {
  const backgroundColor = useThemeColor("backgroundSoft");

  const data = [
    {
      id: "1",
      title: "Movie A",
      imageUrl:
        "https://image.tmdb.org/t/p/original/9n2tJBplPbgR2ca05hS5CKXwP2c.jpg",
    },
    {
      id: "2",
      title: "Movie B",
      imageUrl:
        "https://image.tmdb.org/t/p/original/7Zx3wDG5bBtcfk8lcnCWDOLM4Y4.jpg",
    },
    {
      id: "3",
      title: "Movie C",
      imageUrl:
        "https://image.tmdb.org/t/p/original/aESb695wTIF0tB7RTGRebnYrjFK.jpg",
    },
    {
      id: "4",
      title: "Movie D",
      imageUrl:
        "https://image.tmdb.org/t/p/original/kYgQzzjNis5jJalYtIHgrom0gOx.jpg",
    },
    {
      id: "5",
      title: "Movie E",
      imageUrl:
        "https://image.tmdb.org/t/p/original/uQ4lG7E7mlyKsGvbASftQ6Hu2IX.jpg",
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

      <ThemedText>Teste4</ThemedText>

      <ThemedText>Teste2</ThemedText>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
