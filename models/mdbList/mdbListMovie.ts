export interface mdbListMedia {
  ratings: Ratings[];
}

interface Ratings {
  source: string;
  value: number;
  score: number;
  votes: number;
}
