import { CreateShortUrl } from '@/domain/usecases/index.ts'
import {
  FindUrlRegistryByUrlRepository,
  SaveUrlRegistryRepository
} from '@/data/protocols/db/index.ts'
import { HashGenerator } from '@/data/protocols/cryptography/index.ts'

export class DbCreateShortUrl implements CreateShortUrl {
  constructor(
    private readonly findUrlRegistryByUrlRepository: FindUrlRegistryByUrlRepository,
    private readonly hashGenerator: HashGenerator,
    private readonly saveUrlRegistryRepository: SaveUrlRegistryRepository
  ) {}
  
  async create (url: string) {
    const urlRegistry = await this.findUrlRegistryByUrlRepository.findByUrl(url)

    if (urlRegistry) return urlRegistry

    const hash = this.hashGenerator.generate()

    const HOW_MANY_DAYS_FORWARD = 15
    const expirationDate = new Date()
    expirationDate.setDate(expirationDate.getDate() + HOW_MANY_DAYS_FORWARD)

    await this.saveUrlRegistryRepository.save({
      url,
      hash,
      expirationDate
    })

    return hash
  }
}
