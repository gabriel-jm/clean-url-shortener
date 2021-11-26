export function mockCreateShortUrl() {
  return {
    result: 'any_hash',
    createParams: <string | null> null,

    create(url: string) {
      this.createParams = url
      return Promise.resolve(this.result)
    }
  }
}
