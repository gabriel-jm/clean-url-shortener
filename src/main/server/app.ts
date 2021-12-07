import '../routes/short-url.ts'
import { matchRoute } from './router.ts'

async function parseIncomingBody(request: Request) {
  const { body } = request
  
  if (!body) return null
  
  const dataArray: Uint8Array[] = []

  const writeStream = new WritableStream({
    write(chunk) {
      return new Promise((resolve) => {
        dataArray.push(chunk)
        resolve()
      })
    }
  })

  await body.pipeTo(writeStream)
  const textData = dataArray.reduce((acc, value) => {
    return acc + new TextDecoder('utf-8').decode(value)
  }, '')

  return JSON.parse(textData)
}

export async function handleRequest(request: Request) {
  const { pathname } = new URL(request.url)

  const body = await parseIncomingBody(request)

  const routeMatch = matchRoute(request.method.toLowerCase(), pathname)

  if (routeMatch) {
    return routeMatch.handler({ params: routeMatch.params, body })
  }

  return new Response('Not Found', {
    status: 404,
    headers: {
      'content-type': 'text/plain'
    }
  })
}
