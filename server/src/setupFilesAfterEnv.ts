// NOTE this is DB related and we commented out the requirement for this file for the time being. Testing will continue without access to db because we haven't built one yet.
import { client } from './db'

global.afterAll(async () => {
  await client.close()
})
