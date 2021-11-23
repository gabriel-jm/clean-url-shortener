import { describe, it } from 'test-suite'
import { expect } from 'chai'
import sinon from 'sinon'

import { DbCreateShortUrl } from '@/data/usecases/index.ts'
import {
  mockFindUrlRegistryByUrlRepository,
  mockHashGenerator,
  mockSaveUrlRegistryRepository
} from '../mocks/index.ts'

function makeSut() {
  const findUrlRegistryByUrlRepositorySpy = mockFindUrlRegistryByUrlRepository()
  const hashGeneratorSpy = mockHashGenerator()
  const saveUrlRegistryRepositorySpy = mockSaveUrlRegistryRepository()
  
  const sut = new DbCreateShortUrl(
    findUrlRegistryByUrlRepositorySpy,
    hashGeneratorSpy,
    saveUrlRegistryRepositorySpy
  )

  return {
    sut,
    findUrlRegistryByUrlRepositorySpy,
    hashGeneratorSpy,
    saveUrlRegistryRepositorySpy
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

  it('should call SaveUrlRegistryRepository with correct values', async () => {
    const { sut, hashGeneratorSpy, saveUrlRegistryRepositorySpy } = makeSut()

    const fakeDate = new Date('2021-05-01')

    sinon.stub(globalThis, 'Date').returns(fakeDate as unknown as string)

    await sut.create('any_url')

    expect(saveUrlRegistryRepositorySpy.saveParams).to.eql({
      url: 'any_url',
      hash: hashGeneratorSpy.result,
      expirationDate: fakeDate.setDate(fakeDate.getDate() + 15)
    })
  })
})
