export interface PluginManifest {
  id: string
  version: string
  name: string
  description: string
  resources: string[] | Resources[]
  types: string[]
  idPrefixes: string[]
  catalogs: PluginCatalog[]
  behaviorHints: BehaviorHints
}

interface Resources {
  name: string
  types: string[]
  idPrefixes: string[]
}

export interface PluginCatalog {
  url: string | null
  type: string
  id: string
  genres?: string[]
  extra: Extra[]
  extraSupported: string[]
  name: string
  extraRequired?: string[]
}

interface Extra {
  name: string
  options?: string[]
  isRequired?: boolean
  optionsLimit?: number
}

interface BehaviorHints {
  newEpisodeNotifications: boolean
}

