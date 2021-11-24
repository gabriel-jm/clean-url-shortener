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

  it('should throw if FindUrlRegistryByUrlRepository throws', () => {
    const { sut, findUrlRegistryByUrlRepositorySpy } = makeSut()
    sinon.stub(findUrlRegistryByUrlRepositorySpy, 'findByUrl').throws(new Error())

    sut.create('any_url')
      .catch(error => expect(error).to.be.instanceOf(Error))
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

  it('should throw if HashGenerator throws', () => {
    const { sut, hashGeneratorSpy } = makeSut()
    sinon.stub(hashGeneratorSpy, 'generate').throws(new Error())

    sut.create('any_url')
      .catch(error => expect(error).to.be.instanceOf(Error))
  })

  it('should call SaveUrlRegistryRepository with correct values', async () => {
    const { sut, saveUrlRegistryRepositorySpy } = makeSut()

    await sut.create('any_url')

    const fakeDate = new Date()
    fakeDate.setDate(fakeDate.getDate() + 15)

    expect(saveUrlRegistryRepositorySpy.saveParams?.expirationDate.getDate())
      .to.equal(fakeDate.getDate())
    expect(saveUrlRegistryRepositorySpy.saveParams).to.have.property('hash', 'any_hash')
    expect(saveUrlRegistryRepositorySpy.saveParams).to.have.property('url', 'any_url')
  })

  it('should throw if SaveUrlRegistryRepository throws', () => {
    const { sut, saveUrlRegistryRepositorySpy } = makeSut()
    sinon.stub(saveUrlRegistryRepositorySpy, 'save').throws(new Error())

    sut.create('any_url')
      .catch(error => expect(error).to.be.instanceOf(Error))
  })

  it('should return the hash on success', async () => {
    const { sut } = makeSut()

    const response = await sut.create('any_url')

    expect(response).to.equal('any_hash')
  })
})
