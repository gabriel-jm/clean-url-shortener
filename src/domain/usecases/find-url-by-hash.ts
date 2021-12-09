export type FindUrlByHashResult = string | null

export interface FindUrlByHash {
  find(hash: string, today: Date): Promise<string | null>
}
