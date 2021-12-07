import { describe, it } from 'test-suite'
import { expect } from 'chai'
import sinon from 'sinon'

import { CreateShortUrlController } from '@/presentation/controllers/index.ts'
import { mockCreateShortUrl } from '../mocks/index.ts'

function makeSut() {
  const createShortUrlSpy = mockCreateShortUrl()

  const sut = new CreateShortUrlController(createShortUrlSpy)

  return {
    sut,
    createShortUrlSpy
  }
}

describe('Create Short URL Controller', () => {
  it('should call CreateShortUrl with correct values', async () => {
    const { sut, createShortUrlSpy } = makeSut()

    await sut.handle({ url: 'any_url' })

    expect(createShortUrlSpy.createParams).to.equal('any_url')
  })

  it('should throw if CreateShortUrl throws', () => {
    const { sut, createShortUrlSpy } = makeSut()
    sinon.stub(createShortUrlSpy, 'create').throws(new Error())

    sut.handle({ url: 'any_url' })
      .catch(error => {
        expect(error).to.be.instanceOf(Error)
      })
  })

  it('should return a redirect response on success', async () => {
    const { sut } = makeSut()

    const response = await sut.handle({ url: 'any_url' })

    expect(response).to.eql({
      statusCode: 200,
      body: {
        url: 'any_hash'
      }
    })
  })
})
