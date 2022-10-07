import express from 'express'

import MessageResponse from '../interface/MessageResponse'
// TODO import todos from './todos/todos.routes'

const router = express.Router()

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API Test - Success',
  })
})

// TODO router.use('/todos', todos)

export default router
