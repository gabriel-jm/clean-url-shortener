export interface Controller {
  handle(params: unknown): Promise<Record<string, unknown>>
}
