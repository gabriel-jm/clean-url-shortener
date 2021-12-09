import { describe, it } from 'test-suite'
import { expect } from 'chai'

import { DbFindUrlByHash } from '@/data/usecases/index.ts'
import { mockFindUrlByHashRepository } from '../mocks/index.ts'

function makeSut() {
  const findUrlByHashRepositorySpy = mockFindUrlByHashRepository()
  const sut = new DbFindUrlByHash(findUrlByHashRepositorySpy)

  return {
    sut,
    findUrlByHashRepositorySpy
  }
}

describe('DbFindUrlByHash', () => {
  it('should call FindUrlByHashRepository with correct values', async () => {
    const { sut, findUrlByHashRepositorySpy } = makeSut()

    await sut.find('any_hash', new Date())

    expect(findUrlByHashRepositorySpy.findByHashParams).to.equal('any_hash')
  })

  it('should return null if FindUrlByHashRepository not finds one', async () => {
    const { sut, findUrlByHashRepositorySpy } = makeSut()
    findUrlByHashRepositorySpy.result = null

    const url = await sut.find('any_hash', new Date())

    expect(url).to.equal(null)
  })
})
