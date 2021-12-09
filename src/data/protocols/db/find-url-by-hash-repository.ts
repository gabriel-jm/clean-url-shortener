export type FindUrlByHashRepositoryResult = string | null

export interface FindUrlByHashRepository {
  findByHash(hash: string): Promise<FindUrlByHashRepositoryResult>
}
