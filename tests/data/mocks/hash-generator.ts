export function mockHashGenerator() {
  return {
    result: 'any_hash',
    hasCalledGenerate: false,

    generate() {
      this.hasCalledGenerate = true
      return this.result
    }
  }
}
