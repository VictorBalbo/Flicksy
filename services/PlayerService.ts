import { Linking } from "react-native";

export class PlayerService {
  static playContentOnInfuse = async (contentUrl: string) => {
    const url = `infuse://x-callback-url/play?url=${contentUrl}`;
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.error("Failed to open Infuse app:", error);
    }
  }
}