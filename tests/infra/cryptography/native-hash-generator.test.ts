import { describe, it } from 'test-suite'
import { expect } from 'chai'
import { NativeHashGenerator } from '@/infra/cryptography/index.ts'

function makeSut() {
  const sut = new NativeHashGenerator()

  return { sut }
}

describe('Native Hash Generator', () => {
  it('should generate a unique string hash with 8 chars', () => {
    const { sut } = makeSut()
    const arrayLength = 15

    const hashs = Array.from({ length: arrayLength }).map(() => sut.generate())

    for (const hash of hashs) {
      const isUnique = hashs.filter(otherHash => hash !== otherHash)

      expect(isUnique).to.have.lengthOf(arrayLength - 1)
      expect(hash).to.be.string
      expect(hash).to.have.lengthOf(8)
    }
  })
})
