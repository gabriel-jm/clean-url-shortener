import { Controller } from '@/presentation/protocols/index.ts'
import { CreateShortUrl } from '@/domain/usecases/index.ts'

interface RequestModel {
  url: string
}

export class CreateShortUrlController implements Controller {
  constructor(private readonly createShortUrl: CreateShortUrl) {}

  async handle({ url }: RequestModel) {
    await this.createShortUrl.create(url)

    return Promise.resolve({ url })
  }
}