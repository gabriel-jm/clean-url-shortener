export const mockCheckUrlRegistryRepository = () => {
  return {
    result: true,
    checkByUrlParams: <string | null> null,
    
    checkByUrl(url: string) {
      this.checkByUrlParams = url
      return Promise.resolve(this.result)
    }
  }
}