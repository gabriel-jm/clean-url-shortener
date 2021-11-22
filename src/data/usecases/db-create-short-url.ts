import { CreateShortUrl } from '@/domain/usecases/index.ts'
import { FindUrlRegistryByUrlRepository } from '@/data/protocols/db/index.ts'
import { HashGenerator } from '@/data/protocols/cryptography/index.ts'

export class DbCreateShortUrl implements CreateShortUrl {
  constructor(
    private readonly findUrlRegistryByUrlRepository: FindUrlRegistryByUrlRepository,
    private readonly hashGenerator: HashGenerator
  ) {}
  
  async create (url: string) {
    const urlRegistry = await this.findUrlRegistryByUrlRepository.findByUrl(url)

    if (urlRegistry) return urlRegistry

    this.hashGenerator.generate()

    return ''
  }
}
