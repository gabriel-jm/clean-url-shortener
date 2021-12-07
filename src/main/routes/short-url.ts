import { router } from '@/main/server/router.ts'
import { adaptRoute } from '@/main/adapters/adapt-routes.ts'
import { makeCreateShortURLController } from '@/main/factories/index.ts'

router.post('/short-url', adaptRoute(makeCreateShortURLController()))
