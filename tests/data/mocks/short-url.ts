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

export function mockSaveUrlRegistryRepository() {
  return {
    result: 'any_shortened_url',
    saveParams: {},

    save(params: SaveUrlRegistryRepositoryParams) {
      this.saveParams = params
      return Promise.resolve(this.result)
    }
  }
}
