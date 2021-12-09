import { describe, it } from 'test-suite'
import { expect } from 'chai'

import { DbFindUrlByHash } from '@/data/usecases/index.ts'
import { mockFindUrlRegistryByHashRepository, mockDeleteUrlRegistryRepository } from '../mocks/index.ts'

function makeSut() {
  const findUrlRegistryByHashRepositorySpy = mockFindUrlRegistryByHashRepository()
  const deleteUrlRegistryRepositorySpy = mockDeleteUrlRegistryRepository()
  const sut = new DbFindUrlByHash(
    findUrlRegistryByHashRepositorySpy,
    deleteUrlRegistryRepositorySpy
  )

  return {
    sut,
    findUrlRegistryByHashRepositorySpy,
    deleteUrlRegistryRepositorySpy
  }
}

describe('DbFindUrlByHash', () => {
  it('should call FindUrlByHashRepository with correct values', async () => {
    const { sut, findUrlRegistryByHashRepositorySpy } = makeSut()

    await sut.find('any_hash', new Date())

    expect(findUrlRegistryByHashRepositorySpy.findByHashParams).to.equal('any_hash')
  })

  it('should return null if FindUrlByHashRepository not finds one', async () => {
    const { sut, findUrlRegistryByHashRepositorySpy } = makeSut()
    findUrlRegistryByHashRepositorySpy.result = null

    const url = await sut.find('any_hash', new Date())

    expect(url).to.equal(null)
  })

  it('should call DeleteUrlRegistry if it is expired', async () => {
    const {
      sut,
      findUrlRegistryByHashRepositorySpy,
      deleteUrlRegistryRepositorySpy
    } = makeSut()

    findUrlRegistryByHashRepositorySpy.result = {
      id: 'any_id',
      url: 'any_url',
      expirationDate: new Date('2021-10-02')
    }

    await sut.find('any_hash', new Date('2021-10-03'))

    expect(deleteUrlRegistryRepositorySpy.deleteParams).to.equal('any_id')
  })
})
