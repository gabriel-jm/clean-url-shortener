import { HashGenerator } from '@/data/protocols/cryptography/index.ts'

export class NativeHashGenerator implements HashGenerator {
  generate() {
    const numbersArray = new Uint16Array(3)

    const randomHash = crypto
      .getRandomValues(numbersArray)
      .reduce((acc, value) => acc + Number(value).toString(16), '')

    const eightCharsHash = randomHash.substring(0, 8)

    return eightCharsHash
  }
}