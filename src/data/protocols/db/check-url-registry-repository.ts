export type CheckUrlRegistryRepositoryResult = boolean

export interface CheckUrlRegistryRepository {
  checkByUrl (url: string): Promise<CheckUrlRegistryRepositoryResult>
}
