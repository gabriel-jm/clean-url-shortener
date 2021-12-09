import { SaveUrlRegistryRepositoryParams, FindUrlRegistryByHashRepositoryResult } from '@/data/protocols/db/index.ts'

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

export function mockFindUrlRegistryByHashRepository() {
  return {
    findByHashParams: <string | null> 'any_url',
    result: <FindUrlRegistryByHashRepositoryResult | null> {
      id: 'any_id',
      url: 'any_url',
      expirationDate: new Date()
    },

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

export function mockDeleteUrlRegistryRepository() {
  return {
    deleteParams: <string|null> null,

    delete(id: string) {
      this.deleteParams = id
      return Promise.resolve()
    }
  }
}
