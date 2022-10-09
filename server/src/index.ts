import app from './app'
import api from './api'
const port = process.env.PORT || 5000

app.use('/api', api)

app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`)
})
