import { describe, it } from 'test-suite'
import { expect } from 'chai'

import { DbCreateShortUrl } from '@/data/usecases/index.ts'
import { mockCheckUrlRegistryRepository } from '@tests/data/mocks/index.ts'

function makeSut() {
  const checkUrlRegistryRepositorySpy = mockCheckUrlRegistryRepository()
  
  const sut = new DbCreateShortUrl(checkUrlRegistryRepositorySpy)

  return {
    sut,
    checkUrlRegistryRepositorySpy
  }
}

describe('DbCreateShortUrl', () => {
  it('should call CheckUrlRegistryRepository with correct values', async () => {
    const { sut, checkUrlRegistryRepositorySpy } = makeSut()

    await sut.create('any_url')

    expect(checkUrlRegistryRepositorySpy.checkByUrlParams).to.equal('any_url')
  })
})
