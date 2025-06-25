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
  providers: Providers[]
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

export interface Providers {
  
}
