export type FindUrlRegistryByUrlRepositoryResult = string

export interface FindUrlRegistryByUrlRepository {
  findByUrl (url: string): Promise<FindUrlRegistryByUrlRepositoryResult>
}
