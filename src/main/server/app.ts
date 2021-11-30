import { readLines } from 'io'

export async function handleRequest(request: Request) {
  const { pathname } = new URL(request.url)

  const dataArray: Uint8Array[] = []

  const writeStream = new WritableStream({
    write(chunk) {
      return new Promise((resolve) => {
        console.log(chunk)
        dataArray.push(chunk)
        resolve()
      })
    }
  })

  const { body } = request

  if(body) {
    await body.pipeTo(writeStream)
    console.log(dataArray.reduce((acc, value) => {
      return acc + new TextDecoder('utf-8').decode(value)
    }, ''))
  }

  return new Response('hello', {
    headers: {
      'content-type': 'text/plain'
    }
  })
}
