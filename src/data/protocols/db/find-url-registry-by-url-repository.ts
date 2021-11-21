export type FindUrlRegistryByUrlRepositoryResult = string | null

export interface FindUrlRegistryByUrlRepository {
  findByUrl (url: string): Promise<FindUrlRegistryByUrlRepositoryResult>
}
