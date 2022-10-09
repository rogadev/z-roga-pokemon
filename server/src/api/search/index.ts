import express from 'express'
const router = express.Router()
type Location = [number, number]

const { log } = console

router.get('/:query', async (req, res) => {
  try {
    const query = req.params.query
    const endpoint = 'mapbox.places'
    const latitude = 49.16094
    const longitude = -123.95698

    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/${endpoint}/${longitude},${latitude}.json?&access_token=${process.env.MAPBOX_API_TOKEN}`
    )
    const data = await response.json()

    res.send(data)
  } catch (e: any) {
    res.status(500).send(e.message!)
  }
})

export default router
