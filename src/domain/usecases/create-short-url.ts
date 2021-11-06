export type CreateShortUrlResult = string

export interface CreateShortUrl {
  create (url: string): Promise<CreateShortUrlResult>
}
