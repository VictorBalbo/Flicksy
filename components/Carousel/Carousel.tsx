import { getThemeProperty } from "@/hooks";
import { ImageStyle, StyleSheet, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import ReanimatedCarousel, {
  Pagination,
} from "react-native-reanimated-carousel";

export interface WindowDimensions {
  width: number;
  height: number;
}
export interface CarouselItem {
  id: string;
  title: string;
  imageUrl: string;
}
interface CarouselProps {
  data: CarouselItem[];
  dimensions: WindowDimensions;
}
export const Carousel = ({ data, dimensions }: CarouselProps) => {
  const screenWidth = dimensions.width;
  const screenHeight = dimensions.height;

  const aspectRatio = 16 / 9;
  const maxHeight = screenHeight * 0.5;

  const slideHeight = Math.min(screenWidth / aspectRatio, maxHeight);
  const slideWidth = slideHeight * aspectRatio;
  const useParalax = slideWidth >= screenWidth;

  const progress = useSharedValue<number>(0);

  return (
    <View style={styles.container}>
      <ReanimatedCarousel
        width={screenWidth}
        height={slideHeight}
        data={data}
        {...(!useParalax && {
          mode: "parallax",
          modeConfig: {
            parallaxScrollingScale: 1,
            parallaxAdjacentItemScale: 0.9,
            parallaxScrollingOffset: screenWidth - slideWidth,
          },
        })}
        onProgressChange={progress}
        autoPlay
        autoPlayInterval={5000}
        loop
        scrollAnimationDuration={1000}
        renderItem={({ item, animationValue }) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const imageParallaxStyle = useAnimatedStyle<ImageStyle>(() => {
            const parallaxOffset = slideWidth / 2;
            const translateX = interpolate(
              animationValue.value,
              [-1, 0, 1],
              [parallaxOffset, 0, -parallaxOffset],
              Extrapolation.CLAMP
            );
            return {
              transform: [{ translateX }],
            };
          });

          return (
            <Animated.View style={[styles.card]}>
              <Animated.Image
                source={{ uri: item.imageUrl }}
                style={[
                  styles.image,
                  useParalax && [imageParallaxStyle],
                  !useParalax && { borderRadius },
                ]}
              />
            </Animated.View>
          );
        }}
      />
      <View style={styles.pagination}>
        <Pagination.Basic
          progress={progress}
          data={data}
          size={10}
          dotStyle={styles.dotStyle}
          activeDotStyle={styles.activeDotStyle}
          containerStyle={{
            gap: smallSpacing,
          }}
        />
      </View>
    </View>
  );
};
const borderRadius = getThemeProperty("borderRadius");
const smallSpacing = getThemeProperty("smallSpacing");
const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  card: {
    overflow: "hidden",
    alignItems: "center",
  },
  image: {
    height: "100%",
    aspectRatio: 16 / 9,
    resizeMode: "cover",
  },
  pagination: {
    position: "absolute",
    bottom: smallSpacing,
    left: 0,
    right: 0,
  },
  dotStyle: {
    borderRadius: borderRadius,
    backgroundColor: "#262626",
  },
  activeDotStyle: {
    borderRadius: borderRadius,
    backgroundColor: "#f1f1f1",
  },
});
