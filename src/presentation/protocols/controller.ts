import { HTTPResponse } from './http.ts'

export interface Controller {
  handle(params: unknown): Promise<HTTPResponse>
}
