import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'

import * as middleware from '../middleware'
import api from '../api'
import MessageResponse from '../interface/MessageResponse'

require('dotenv').config()

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use('/favicon.ico', express.static('images/favicon.ico'))

app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'Welcome. Try the test route: http://localhost:3000/test',
  })
})

app.get<{}, MessageResponse>('/test', (req, res) => {
  res.json({
    message: 'Success.',
  })
})

app.use('/api/v1', api)

app.use(middleware.notFound)
app.use(middleware.errorHandler)

export default app
