import { listenAndServe } from 'http'
import { handleRequest } from './server/app.ts'

console.log('Server is listening at http://localhost:8000')
await listenAndServe(':8000', handleRequest)
