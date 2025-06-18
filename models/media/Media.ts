export interface Media {
  title: string
  tmdb_id: string
  imdb_id: string
  media_type: MediaType
  images?: MediaImages
}

export interface Ids {
  trakt: number
  tmdb: number
  slug?: string
  imdb?: string
  justwatch?: string
}

export enum MediaType {
  Movie = 'movie',
  Show = 'show',
  Season = 'season',
  Episode = 'episode',
}

export interface MediaImages {
  backdrop?: string
  poster?: string
  still?: string
}
