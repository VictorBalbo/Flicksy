import { TmdbMediaDetails } from "./TmdbMediaDetails";

export interface TmdbMovieDetails extends TmdbMediaDetails {
  belongs_to_collection: any;
  budget: number;
  original_title: string;
  release_date: string;
  revenue: number;
  runtime: number;
  title: string;
  video: boolean;
}
