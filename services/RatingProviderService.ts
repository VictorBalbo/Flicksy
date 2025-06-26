import { mdbListMedia } from "@/models/mdbList/mdbListMovie";
import { MediaType, Ratings } from "@/models/Media";
import { UserSettingsService } from "./UserSettingsService";

export class RatingProviderService {
  private static readonly ServiceUrl = "https://api.mdblist.com/tmdb";

  static getRatings = async (tmdb_id: string, media_type: MediaType) => {
    const ratingProviderKey = await UserSettingsService.getSensitiveSetting(
      "mdbListKey"
    );

    const type = media_type === MediaType.Movie ? "movie" : "show";
    const url = `${this.ServiceUrl}/${type}/${tmdb_id}?apikey=${ratingProviderKey}`;

    const ratingsResponse = await fetch(url);
    const mdbListRatings: mdbListMedia = await ratingsResponse.json();

    const ratings: Ratings = {
      imdb: mdbListRatings.ratings.find((r) => r.source === "imdb")?.score,
      tmdb: mdbListRatings.ratings.find((r) => r.source === "tmdb")?.score,
      trakt: mdbListRatings.ratings.find((r) => r.source === "trakt")?.score,
      metacritics: mdbListRatings.ratings.find((r) => r.source === "metacritic")
        ?.score,
      metacriticsUser: mdbListRatings.ratings.find(
        (r) => r.source === "metacriticuser"
      )?.score,
      rottenTomatoes: mdbListRatings.ratings.find(
        (r) => r.source === "tomatoes"
      )?.score,
      rottenTomatoesUser: mdbListRatings.ratings.find(
        (r) => r.source === "popcorn"
      )?.score,
    };
    return ratings;
  };
}
