import express from 'express'
const router = express.Router()

import search from './search'
import MessageResponse from '../interface/MessageResponse'

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API Test - Success',
  })
})

router.use('/search', search)

export default router
