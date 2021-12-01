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
  return dataArray.reduce((acc, value) => {
    return acc + new TextDecoder('utf-8').decode(value)
  }, '')
}

export async function handleRequest(request: Request) {
  const { pathname } = new URL(request.url)

  const body = await parseIncomingBody(request)

  return new Response('hello', {
    headers: {
      'content-type': 'text/plain'
    }
  })
}
