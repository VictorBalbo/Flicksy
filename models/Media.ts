export interface Media {
  title: string;
  tmdb_id?: number;
  imdb_id?: string;
  media_type: MediaType;
  release_date?: string;
  images?: MediaImages;
}

export interface MediaDetails extends Media {
  genres?: string[];
  overview?: string;
  status?: string;
  tagline?: string;
  video?: string;
  providers: Providers[];
  ratings: Ratings;
  cast: CastCrewMember[];
  crew: Crew;
}

export enum MediaType {
  Movie = "movie",
  Show = "tv",
  Season = "season",
  Episode = "episode",
}

export interface MediaImages {
  backdrop?: string;
  backdrop_clear?: string;
  poster?: string;
  poster_clear?: string;
  logo?: string;
  still?: string;
}

export interface Ratings {
  imdb?: number;
  tmdb?: number;
  trakt?: number;
  metacritics?: number;
  metacriticsUser?: number;
  rottenTomatoes?: number;
  rottenTomatoesUser?: number;
}
export interface Providers {}

export interface CastCrewMember {
  name: string;
  profile_path?: string;
  character?: string;
  department?: string;
  job?: string;
}
export interface Crew {
  directing: CastCrewMember[];
  writing: CastCrewMember[];
  created_by?: CastCrewMember[];
}