export const mockFindUrlRegistryByUrlRepository = () => {
  return {
    result: 'any_hash',
    findByUrlParams: <string | null> null,
    
    findByUrl(url: string) {
      this.findByUrlParams = url
      return Promise.resolve(this.result)
    }
  }
}