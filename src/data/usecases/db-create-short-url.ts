import { CreateShortUrl } from '@/domain/usecases/index.ts'
import { CheckUrlRegistryRepository } from '@/data/protocols/db/index.ts'

export class DbCreateShortUrl implements CreateShortUrl {
  constructor(private readonly checkUrlRegistryRepository: CheckUrlRegistryRepository) {}
  
  async create (url: string) {
    await this.checkUrlRegistryRepository.checkByUrl(url)

    return ''
  }
}
