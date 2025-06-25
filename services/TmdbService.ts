import { TmdbKey } from "@/constants";
import { Media, MediaType } from "@/models";
import { getMovieFromTmdbMovie } from "@/models/MovieDetails";
import {
  TmdbListResponse,
  TmdbMovieDetails,
  TmdbShowDetails,
} from "@/models/tmdb";

export class TmdbService {
  static baseUrl = "https://api.themoviedb.org/3";
  static language = "en";

  static getMediaDetail = async <T>(mediaType: MediaType, tmdb_id: string) => {
    let url = `/${mediaType}/${tmdb_id}?append_to_response=external_ids,images&language=${this.language},null`;
    const watchlist = await this.sendTmdbGetRequest<T>(url);
    return watchlist;
  };

  static getMovieDetail = async (tmdb_id: string) => {
    let url = `/movie/${tmdb_id}?append_to_response=external_ids,videos,images&language=${this.language},null`;
    const tmdbMovie = await this.sendTmdbGetRequest<TmdbMovieDetails>(url);
    return getMovieFromTmdbMovie(tmdbMovie, this.language);
  };

  static getPopularMovies = async () => {
    let url = `/trending/movie/week`;
    const tmdbPopularMovie = await this.sendTmdbGetRequest<
      TmdbListResponse<TmdbMovieDetails>
    >(url);
    const popularMovies = tmdbPopularMovie.results.map(
      (t): Media => ({
        title: t.title,
        tmdb_id: t.id,
        media_type: MediaType.Movie,
        release_date: t.release_date,
        images: {
          backdrop: t.backdrop_path,
          poster: t.poster_path,
        },
      })
    );
    return popularMovies;
  };

  static getPopularShows = async () => {
    let url = `/trending/tv/week`;
    const tmdbPopularMovie = await this.sendTmdbGetRequest<
      TmdbListResponse<TmdbShowDetails>
    >(url);
    const popularMovies = tmdbPopularMovie.results.map(
      (t): Media => ({
        title: t.name,
        tmdb_id: t.id,
        media_type: MediaType.Movie,
        release_date: t.first_air_date,
        images: {
          backdrop: t.backdrop_path,
          poster: t.poster_path,
        },
      })
    );
    return popularMovies;
  };

  private static sendTmdbGetRequest = async <T>(uri: string) => {
    const options = this.getRequestOptions();
    const response = await fetch(`${this.baseUrl}/${uri}`, options);
    if (response.ok) {
      const value = await response.json();
      return value as T;
    } else {
      throw new Error(
        `Error on sending command to Tmdb. Uri: ${uri} - Code: ${response.status} - Message: ${response.statusText}`
      );
    }
  };

  private static getRequestOptions = () => {
    return {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TmdbKey}`,
      },
    };
  };
}
