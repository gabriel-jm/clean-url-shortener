export type FindUrlRegistryByHashRepositoryResult = null | {
  id: string
  url: string
  expirationDate: Date
}

export interface FindUrlRegistryByHashRepository {
  findByHash(hash: string): Promise<FindUrlRegistryByHashRepositoryResult>
}
