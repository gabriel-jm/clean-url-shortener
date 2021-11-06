import { listenAndServe } from 'https://deno.land/std@0.113.0/http/mod.ts'

console.log('Server is listening at http://localhost:8000')
await listenAndServe(':8000', () => {
  return new Response('Hello World', {
    headers: {
      'Content-Type': 'text/html'
    }
  })
})