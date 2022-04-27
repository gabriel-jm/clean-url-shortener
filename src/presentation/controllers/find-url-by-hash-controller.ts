import { Controller, HTTPResponse } from '@/presentation/protocols/index.ts'

export class FindUrlByHashController implements Controller {
  handle(params: unknown): Promise<HTTPResponse> {
    throw new Error("Method not implemented.");
  }
}
