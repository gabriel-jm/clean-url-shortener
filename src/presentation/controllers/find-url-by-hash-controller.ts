import { FindUrlByHash } from '@/domain/usecases/index.ts'
import { Controller, HTTPResponse } from '@/presentation/protocols/index.ts'
import { ok } from '@/presentation/helpers/index.ts'

interface FindUrlByHashControllerParams {
  hash: string
}

export class FindUrlByHashController implements Controller {
  constructor(private readonly findUrlByHash: FindUrlByHash) {}

  async handle(params: FindUrlByHashControllerParams): Promise<HTTPResponse> {
    const url = await this.findUrlByHash.find(params.hash, new Date())

    return ok({ url })
  }
}
