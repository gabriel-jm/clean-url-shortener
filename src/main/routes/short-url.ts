import { router } from '@/main/server/router.ts'

router.post('/hash', ({ body }) => {
  return new Response(JSON.stringify(body), {
    headers: {
      'content-type': 'application/json'
    }
  })
})
