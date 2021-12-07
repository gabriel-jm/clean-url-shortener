import { DbCreateShortUrl } from '@/data/usecases/index.ts'
import { CreateShortUrlController } from '@/presentation/controllers/index.ts'
import { MemoryUrlRegistryRepository } from '@/infra/db/local/index.ts'
import { NativeHashGenerator } from '@/infra/cryptography/index.ts'

export function makeCreateShortURLController() {
  const urlRegistryRepository = new MemoryUrlRegistryRepository()
  const hashGenerator = new NativeHashGenerator()
  const dbCreateShortUrl = new DbCreateShortUrl(
    urlRegistryRepository,
    hashGenerator,
    urlRegistryRepository
  )

  const createShortUrlController = new CreateShortUrlController(dbCreateShortUrl)

  return createShortUrlController
}
