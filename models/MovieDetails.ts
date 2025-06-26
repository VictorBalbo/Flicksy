import { MediaDetails, MediaType } from ".";
import { TmdbMovieDetails } from "./tmdb";

export interface MovieDetails extends MediaDetails {
  media_type: MediaType.Movie;
  original_title: string;
  runtime: number;
  release_date: string;
}

export const getMovieFromTmdbMovie = (
  tmdbMovie: TmdbMovieDetails,
  language: string = "en"
): MovieDetails => ({
  title: tmdbMovie.title,
  media_type: MediaType.Movie,
  original_title: tmdbMovie.original_title,
  runtime: tmdbMovie.runtime,
  release_date: tmdbMovie.release_date,
  genres: tmdbMovie.genres.map((g) => g.name),
  overview: tmdbMovie.overview,
  status: tmdbMovie.status,
  tagline: tmdbMovie.tagline,
  tmdb_id: tmdbMovie.id,
  imdb_id: tmdbMovie.external_ids.imdb_id,
  images: {
    logo: tmdbMovie.images.logos?.[0]?.file_path,
    backdrop: tmdbMovie.images.backdrops?.find((i) => i.iso_639_1 === language)
      ?.file_path,
    backdrop_clear: tmdbMovie.images.backdrops?.find(
      (i) => i.iso_639_1 === null
    )?.file_path,
    poster: tmdbMovie.images.posters?.find((i) => i.iso_639_1 === language)
      ?.file_path,
    poster_clear: tmdbMovie.images.posters?.find((i) => i.iso_639_1 === null)
      ?.file_path,
  },
  video: tmdbMovie.videos?.results.find(
    (v) =>
      v.official &&
      v.site.toLowerCase() === "youtube" &&
      v.type.toLowerCase() === "trailer"
  )?.key,
  cast: tmdbMovie.credits.cast?.filter(c => c.character),
  crew: {
    directing: tmdbMovie.credits.crew.filter(
      (d) => d.department === "Directing" && d.job === 'Director'
    ),
    writing: tmdbMovie.credits.crew.filter((d) => d.department === "Writing"),
  },
  providers: [],
  ratings: {},
});
