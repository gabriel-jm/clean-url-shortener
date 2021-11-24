import {
  FindUrlRegistryByUrlRepository,
  SaveUrlRegistryRepository,
  SaveUrlRegistryRepositoryParams
} from '@/data/protocols/db/index.ts'

interface UrlRegistry {
  id: string
  url: string
  hash: string
  expirationDate: Date
}

const db: UrlRegistry[] = []

export class MemoryUrlRegistryRepository implements FindUrlRegistryByUrlRepository, SaveUrlRegistryRepository {
  findByUrl(url: string) {
    const urlRegistry = db.find(urlRegistry => {
      return urlRegistry.url === url
    })

    return Promise.resolve(urlRegistry?.url ?? null)
  }

  save({ url, hash, expirationDate }: SaveUrlRegistryRepositoryParams) {
    db.push({
      id: crypto.randomUUID(),
      url,
      hash,
      expirationDate
    })
    
    return Promise.resolve()
  }
}
