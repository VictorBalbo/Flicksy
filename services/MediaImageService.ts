import { MediaImages } from "@/models/media";
import { PixelRatio } from "react-native";

export class MediaImageService {
  static imageSizes = {
    backdrop: [300, 780, 1280],
    backdrop_clear: [300, 780, 1280],
    poster: [92, 154, 185, 342, 500, 780],
    poster_clear: [92, 154, 185, 342, 500, 780],
    logo: [45, 92, 154, 185, 300, 500],
    still: [92, 185, 300],
  };
  static imageBasePath = "https://image.tmdb.org/t/p";

  static getImageSrc = (
    images: MediaImages | undefined,
    imageType: keyof MediaImages,
    imageSize: number
  ) => {
    const imagePath = images?.[imageType];
    const deviceDPI = PixelRatio.get();
    const targetWidth = imageSize * deviceDPI;
    const targetSize = this.imageSizes[imageType].find((s) => s > targetWidth);

    if (targetSize) {
      return `${this.imageBasePath}/w${targetSize}/${imagePath}`;
    } else {
      return `${this.imageBasePath}/original/${imagePath}`;
    }
  };
}
