export interface PluginCatalogResponse {
  metas: PluginCatalogMedia[];
  hasMore: boolean;
  cacheMaxAge: number;
  staleRevalidate: number;
  staleError: number;
}

export interface PluginCatalogMedia {
  moviedb_id: number;
  imdb_id: string;
  id: string;
  name: string;
  poster: string;
  background: string;
  released?: string;
  releaseInfo?: string
  type: "movie";
}
