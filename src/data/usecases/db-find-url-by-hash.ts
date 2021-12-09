import { FindUrlByHash } from '@/domain/usecases/index.ts'
import { FindUrlRegistryByHashRepository, DeleteUrlRegistryRepository } from '@/data/protocols/db/index.ts'

export class DbFindUrlByHash implements FindUrlByHash {
  constructor(
    private readonly findUrlByHashRepository: FindUrlRegistryByHashRepository,
    private readonly deleteUrlRegistryRepository: DeleteUrlRegistryRepository
  ) {}
  
  async find(hash: string, today: Date) {
    const urlRegistry = await this.findUrlByHashRepository.findByHash(hash)

    if (!urlRegistry) return null

    const isExpired = today > urlRegistry.expirationDate

    if (isExpired) {
      await this.deleteUrlRegistryRepository.delete(urlRegistry.id)
    }

    return ''
  }
}
