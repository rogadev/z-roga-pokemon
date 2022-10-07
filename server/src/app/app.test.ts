import request from 'supertest'
import app from '../app'

// Test that we get not found message when we hit an invalid route
describe('app', () => {
  it('responds with a not found message', (done) => {
    request(app)
      .get('/this-is-not-a-route')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, done)
  })
})

// Test that our root route to our app returns successfully
describe('GET /', () => {
  it('root route responds', (done) => {
    request(app)
      .get('/test')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})

// Test that we get a success message when we hit the test route
describe('GET /', () => {
  it('responds with a json message', (done) => {
    request(app)
      .get('/test')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(
        200,
        {
          message: 'Success.',
        },
        done
      )
  })
})
