export interface PluginStreamResponse {
  streams: ContentStream[];
  cacheMaxAge: number;
  staleRevalidate: number;
  staleError: number;
}
export interface ContentStream {
  name: string;
  title?: string;
  description?: string;
  url: string;
}
