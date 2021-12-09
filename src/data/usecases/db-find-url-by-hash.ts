import { FindUrlByHash } from '@/domain/usecases/index.ts'
import { FindUrlByHashRepository } from '@/data/protocols/db/index.ts'

export class DbFindUrlByHash implements FindUrlByHash {
  constructor(private readonly findUrlByHashRepository: FindUrlByHashRepository) {}
  
  async find(hash: string, today: Date) {
    const url = await this.findUrlByHashRepository.findByHash(hash)

    if (url) return url

    return ''
  }
}
