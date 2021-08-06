require('dotenv').config();
import * as express from "express"
import * as cors from 'cors'
import * as swt from './swt.router'
import { corsOptions, corsMiddleware } from './cors/cors'

const app = express()

const port = process.env.PORT || 9000

app.use(express.json())
app.use(cors())

const origins = ['http://localhost:3000', process.env.APP_ORIGIN]
app.use(cors(corsOptions(origins)), corsMiddleware)

app.use('/swt', swt.router)

app.listen(port, () => console.log(`Server running on port ${port}`))

module.exports = app
