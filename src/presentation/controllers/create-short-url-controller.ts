import { Controller } from '@/presentation/protocols/index.ts'
import { CreateShortUrl } from '@/domain/usecases/index.ts'
import { ok } from '@/presentation/helpers/index.ts'

interface RequestModel {
  url: string
}

export class CreateShortUrlController implements Controller {
  constructor(private readonly createShortUrl: CreateShortUrl) {}

  async handle({ url }: RequestModel) {
    const urlHash = await this.createShortUrl.create(url)

    return ok({ url: urlHash})
  }
}
