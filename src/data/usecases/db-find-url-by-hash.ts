import { FindUrlByHash } from '@/domain/usecases/index.ts'
import { FindUrlByHashRepository } from '@/data/protocols/db/index.ts'

export class DbFindUrlByHash implements FindUrlByHash {
  constructor(private readonly findUrlByHashRepository: FindUrlByHashRepository) {}
  
  async find(hash: string,today: Date) {
    await this.findUrlByHashRepository.findByHash(hash)

    return ''
  }
}
