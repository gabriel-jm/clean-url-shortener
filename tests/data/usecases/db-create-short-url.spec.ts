import { describe, it } from 'test-suite'
import { expect } from 'chai'

import { DbCreateShortUrl } from '@/data/usecases/index.ts'
import { mockFindUrlRegistryByUrlRepository } from '@tests/data/mocks/index.ts'

function makeSut() {
  const findUrlRegistryByUrlRepositorySpy = mockFindUrlRegistryByUrlRepository()
  
  const sut = new DbCreateShortUrl(findUrlRegistryByUrlRepositorySpy)

  return {
    sut,
    findUrlRegistryByUrlRepositorySpy
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
})
