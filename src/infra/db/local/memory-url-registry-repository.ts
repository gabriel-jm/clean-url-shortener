import {
  FindUrlRegistryByUrlRepository,
  SaveUrlRegistryRepository,
  SaveUrlRegistryRepositoryParams,
  FindUrlRegistryByHashRepository,
  DeleteUrlRegistryRepository
} from '@/data/protocols/db/index.ts'

interface UrlRegistry {
  id: string
  url: string
  hash: string
  expirationDate: Date
}

const db: UrlRegistry[] = []

type Repository = (
  FindUrlRegistryByUrlRepository
  & SaveUrlRegistryRepository
  & FindUrlRegistryByHashRepository
  & DeleteUrlRegistryRepository
)

export class MemoryUrlRegistryRepository implements Repository {
  findByUrl(url: string) {
    const urlRegistry = db.find(urlRegistry => {
      return urlRegistry.url === url
    })

    return Promise.resolve(urlRegistry?.url ?? null)
  }

  findByHash(hash: string) {
    const urlRegistry = db.find(urlRegistry => {
      return urlRegistry.hash === hash
    })

    return Promise.resolve(urlRegistry ?? null)
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

  delete(id: string) {
    const itemIndex = db.findIndex(item => item.id === id)
    db.splice(itemIndex, 1)

    return Promise.resolve()
  }
}
