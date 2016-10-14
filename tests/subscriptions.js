import { subscribe, unsubscribe } from '../app/actions/subscriptions'

describe("Subscriptions", () => {
  it("should subscribe to a channel", (done) => {
    subscribe('presence-test', 'test', '123').payload.promise.then(res => {
      console.log(res)
    }, error => {
      console.log(error)
    })
  })
})
