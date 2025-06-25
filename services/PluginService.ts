import { Catalog, Media, MediaType } from "@/models";
import {
  PluginCatalogResponse,
  PluginManifest,
  PluginStreamResponse,
} from "@/models/plugins";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

export class PluginService {
  private static readonly STORED_PLUGINS_KEY = "storedPlugins";

  static getMediaFromCatalogs = async () => {
    const storedplugins = await this.getStoredPlugins("catalog");
    const catalogsPromise = storedplugins.map(async (p) => {
      const pluginUrl = await SecureStore.getItemAsync(
        `${this.STORED_PLUGINS_KEY}-${p.id}`
      );
      const catalogsPromise = p.catalogs.map(async (c) => {
        const mediasResponse = await fetch(
          `${pluginUrl}/catalog/${c.type}/${c.id}.json`
        );
        const pluginMedias =
          (await mediasResponse.json()) as PluginCatalogResponse;
        const medias = pluginMedias.metas.map((m): Media => {
          return {
            title: m.name,
            tmdb_id: m.moviedb_id,
            imdb_id: m.imdb_id,
            media_type: MediaType.Movie,
            release_date:
              m.released ??
              (m.releaseInfo && parseInt(m.releaseInfo).toString()),
            images: {
              backdrop_clear: m.background,
              poster: m.poster,
            },
          };
        });
        const catalog: Catalog = {
          medias: medias,
          name: c.name,
        };
        return catalog;
      });
      return await Promise.all(catalogsPromise);
    });
    const mediaCatalogs = await Promise.all(catalogsPromise);
    return mediaCatalogs.flatMap((c) => c);
  };

  static getStreamSources = async (media_type: MediaType, imdb_id: string) => {
    const storedplugins = await this.getStreamPlugins();
    const streamsPromise = storedplugins.map(async (p) => {
      const pluginUrl = await SecureStore.getItemAsync(
        `${this.STORED_PLUGINS_KEY}-${p.id}`
      );
      const streamsResponse = await fetch(
        `${pluginUrl}/stream/${media_type}/${imdb_id}.json`
      );
      const contentStreams =
        (await streamsResponse.json()) as PluginStreamResponse;
      return contentStreams.streams;
    });
    const streams = await Promise.all(streamsPromise);
    return streams.flatMap((s) => s);
  };

  static getStreamPlugins = async () => {
    const storedplugins = await this.getStoredPlugins("stream");
    return storedplugins;
  };

  static getStoredPlugins = async (resourceName?: string) => {
    const pluginsJson = await AsyncStorage.getItem(this.STORED_PLUGINS_KEY);
    if (!pluginsJson) return [];
    try {
      let plugins = JSON.parse(pluginsJson) as PluginManifest[];
      if (resourceName) {
        plugins = plugins.filter((plugin) =>
          plugin.resources.some((resource) =>
            typeof resource === "string"
              ? resource === resourceName
              : resource.name === resourceName
          )
        );
      }
      return plugins;
    } catch (e) {
      console.warn("Error parsing saved addons:", e);
      return [];
    }
  };

  static addStoredPlugin = async (manifestUrl: string) => {
    const manifestRequest = await fetch(manifestUrl);
    const plugin = (await manifestRequest.json()) as PluginManifest;
    const pluginUrl = manifestUrl.replace("/manifest.json", "");

    const currentplugins = await this.getStoredPlugins();
    const updatedPlugins = [
      ...currentplugins.filter((a) => a.id !== plugin.id),
      plugin,
    ];
    try {
      await SecureStore.setItemAsync(
        `${this.STORED_PLUGINS_KEY}-${plugin.id}`,
        pluginUrl
      );
      await AsyncStorage.setItem(
        this.STORED_PLUGINS_KEY,
        JSON.stringify(updatedPlugins)
      );
    } catch (e) {
      console.error("Failed to save plugin:", e);
    }
  };
}

// const getPluginContentUrl = (
//   pluginUrl: string,
//   contentId: string,
//   contentType: string
// ) => `${pluginUrl}/stream/${contentType}/${contentId}.json`;

// const getContentStreams = async (contentId: string, contentType: string) => {
//   const plugins = await getStoredPlugins();
//   const contentOptions = plugins.map(async (p) => {
//     const contentUrl = getPluginContentUrl(p, contentId, contentType);
//     const contentResponse = await fetch(contentUrl);
//     const contentJson = (await contentResponse.json()) as ContentResponse;
//     return contentJson.streams;
//   });
//   const contentStreams = await Promise.all(contentOptions);
//   return contentStreams.flatMap((c) => c);
// };
