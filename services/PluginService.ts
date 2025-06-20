import { Catalog, Media, MediaType } from "@/models";
import {
  PluginCatalog,
  PluginCatalogResponse,
  PluginManifest,
} from "@/models/plugins";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";

export class PluginService {
  private static readonly STORED_PLUGINS_KEY = "storedPlugins";

  static getMediaFromCatalogs = async () => {
    const catalogs = await this.getCatalogs();
    const catalogsPromise = catalogs.map(async (c) => {
      console.log(`${c.url}/catalog/${c.type}/${c.id}.json`);
      const mediasResponse = await fetch(
        `${c.url}/catalog/${c.type}/${c.id}.json`
      );
      const pluginMedias =
        (await mediasResponse.json()) as PluginCatalogResponse;
      const medias = pluginMedias.metas.map((m): Media => {
        return {
          title: m.name,
          tmdb_id: m.moviedb_id,
          imdb_id: m.imdb_id,
          media_type: MediaType.Movie,
          release_date: m.released ?? (m.releaseInfo && parseInt(m.releaseInfo).toString()),
          images: {
            backdrop_clear: m.background,
            poster: m.poster,
          },
        };
      });
      const catalog: Catalog = {
        medias: medias,
        name: c.name
      }
      return catalog;
    });
    return await Promise.all(catalogsPromise);
  };

  static getCatalogs = async () => {
    const storedplugins = await this.getStoredPlugins();
    const catalogPlugins = storedplugins.filter((plugin) =>
      plugin.resources.some((resource) =>
        typeof resource === "string"
          ? resource === "catalog"
          : resource.name === "catalog"
      )
    );

    const catalogs = catalogPlugins.map(async (p) => {
      const pluginUrl = await SecureStore.getItemAsync(
        `${this.STORED_PLUGINS_KEY}-${p.id}`
      );
      return p.catalogs.map((c): PluginCatalog => ({ ...c, url: pluginUrl }));
    });
    return (await Promise.all(catalogs)).flat();
  };

  static getStoredPlugins = async () => {
    const pluginsJson = await AsyncStorage.getItem(this.STORED_PLUGINS_KEY);
    if (!pluginsJson) return [];
    try {
      return JSON.parse(pluginsJson) as PluginManifest[];
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
