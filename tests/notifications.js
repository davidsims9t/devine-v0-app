import { getNotifications, markUserNotificationAsSeen } from '../app/actions/notifications'

describe("UserNotification", () => {
  it("it should return user notifications", (done) => {
    markUserNotificationAsSeen(['BWWZIphOt9']).payload.promise.then((res) => {
      console.log(res)
      done()
    }, (error) => {
      console.log(error)
      done()
    })
  })

  // it("it should return user notifications", (done) => {
  //   getNotifications('a39XXDFCF2').payload.promise.then((res) => {
  //     console.log(res)
  //     done()
  //   }, (error) => {
  //     console.log(error)
  //     done()
  //   })
  // })
})
