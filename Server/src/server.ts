import * as express from "express"
import * as cors from 'cors'
import * as swt from './swt.router'
import { corsOptions, corsMiddleware } from './cors/cors'

const server = express()
const port = process.env.PORT || 9000
const origins = ['http://localhost:3000', 'http://localhost:3001']

server.use(express.json())

server.use(cors(corsOptions(origins)), corsMiddleware)

server.use('/swt', swt.router)

server.listen(port, () => console.log(`Server running on port ${port}`))

module.exports = server