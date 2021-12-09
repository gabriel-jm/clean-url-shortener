import { SaveUrlRegistryRepositoryParams } from '@/data/protocols/db/index.ts'

export function mockFindUrlRegistryByUrlRepository() {
  return {
    result: <string | null> null,
    findByUrlParams: <string | null> null,
    
    findByUrl(url: string) {
      this.findByUrlParams = url
      return Promise.resolve(this.result)
    }
  }
}

export function mockFindUrlByHashRepository() {
  return {
    findByHashParams: <string | null> 'any_url',
    result: <string | null> null,

    findByHash(hash: string) {
      this.findByHashParams = hash
      return Promise.resolve(this.result)
    }
  }
}

export function mockSaveUrlRegistryRepository() {
  return {
    saveParams: {} as SaveUrlRegistryRepositoryParams,

    save(params: SaveUrlRegistryRepositoryParams) {
      this.saveParams = params
      return Promise.resolve()
    }
  }
}
