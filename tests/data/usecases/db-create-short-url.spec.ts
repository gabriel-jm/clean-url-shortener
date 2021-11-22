import { describe, it } from 'test-suite'
import { expect } from 'chai'

import { DbCreateShortUrl } from '@/data/usecases/index.ts'
import { mockFindUrlRegistryByUrlRepository, mockHashGenerator } from '../mocks/index.ts'

function makeSut() {
  const findUrlRegistryByUrlRepositorySpy = mockFindUrlRegistryByUrlRepository()
  const hashGeneratorSpy = mockHashGenerator()

  console.log(mockHashGenerator())
  
  const sut = new DbCreateShortUrl(findUrlRegistryByUrlRepositorySpy, hashGeneratorSpy)

  return {
    sut,
    findUrlRegistryByUrlRepositorySpy,
    hashGeneratorSpy
  }
}

describe('DbCreateShortUrl', () => {
  it('should call FindUrlRegistryByUrlRepository with correct values', async () => {
    const { sut, findUrlRegistryByUrlRepositorySpy } = makeSut()

    await sut.create('any_url')

    expect(findUrlRegistryByUrlRepositorySpy.findByUrlParams).to.equal('any_url')
  })

  it('should return the url registry if FindUrlRegistryByUrlRepository finds one', async () => {
    const { sut, findUrlRegistryByUrlRepositorySpy } = makeSut()
    findUrlRegistryByUrlRepositorySpy.result = 'any_url_registry'

    const response = await sut.create('any_url')

    expect(response).to.equal('any_url_registry')
  })

  it('should call HashGenerator with correct values', async () => {
    const { sut, hashGeneratorSpy } = makeSut()
    
    await sut.create('any_url')

    expect(hashGeneratorSpy.hasCalledGenerate).to.equal(true)
  })
})
