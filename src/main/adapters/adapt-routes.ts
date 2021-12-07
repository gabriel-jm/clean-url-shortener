import { Controller } from '@/presentation/protocols/index.ts'
import { RequestData } from '../server/router.ts'

export function adaptRoute(controller: Controller) {
  return async ({ request, params, body }: RequestData) => {
    const requestData = {
      ...params,
      ...(typeof body === 'object' ? body : { data: body })
    }

    const response = await controller.handle(requestData)

    if (response.statusCode === 200) {
      const body = {
        url: `${new URL(request.url).origin}/${response.body.url}`
      }

      return new Response(JSON.stringify(body), {
        status: response.statusCode,
        headers: {
          'content-type': 'application/json'
        }
      })
    }

    return new Response(JSON.stringify(body), {
      status: response.statusCode
    })
  }
}
