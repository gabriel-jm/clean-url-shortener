import { listenAndServe } from 'http'

console.log('Server is listening at http://localhost:8000')
await listenAndServe(':8000', () => {
  return new Response('Hello World', {
    headers: {
      'Content-Type': 'text/html'
    }
  })
})