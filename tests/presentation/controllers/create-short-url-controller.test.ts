import { describe, it } from 'test-suite'
import { expect } from 'chai'

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
})
