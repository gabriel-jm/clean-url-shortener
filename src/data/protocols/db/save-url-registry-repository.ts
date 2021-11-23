export interface SaveUrlRegistryRepositoryParams {
  url: string
  hash: string
  expirationDate: Date
}

export interface SaveUrlRegistryRepository {
  save(params: SaveUrlRegistryRepositoryParams): Promise<string>
}
