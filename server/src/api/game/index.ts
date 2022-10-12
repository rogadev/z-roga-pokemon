import express from 'express'
const router = express.Router()
type Location = [number, number]

const { log } = console

class Game {
  private static instance: Game
  private constructor() {}
  static getInstance() {
    if (!Game.instance) {
      Game.instance = new Game()
    }
    return Game.instance
  }

  static nodes: Location[] = new MapNodeList().getNodes()

}

class MapNodeList {
  private static instance: MapNodeList
  private constructor() {}
  static getInstance() {
    if (!MapNodeList.instance) {
      MapNodeList.instance = new MapNodeList()
    }
    return MapNodeList.instance
  }
  getNodes(): Location[] {
    return [
      [0, 0],
    ]
  }

router.get('/init', async (req, res) => {
  const game = Game.getInstance();

  // lastly, return game state
  res.send(game)
})

export default router
