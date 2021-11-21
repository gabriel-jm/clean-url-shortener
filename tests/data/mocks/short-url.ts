export const mockFindUrlRegistryByUrlRepository = () => {
  return {
    result: <string | null> null,
    findByUrlParams: <string | null> null,
    
    findByUrl(url: string) {
      this.findByUrlParams = url
      return Promise.resolve(this.result)
    }
  }
}