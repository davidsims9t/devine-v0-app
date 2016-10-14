import { postPushInstallation } from '../app/actions/push'

describe("Push Notification", () => {
  it("it should register an installation device", (done) => {
    postPushInstallation({
      GCMSenderId: null,
      deviceToken: "test",
      user: "test",
      deviceType: "ios",
      channels: ["test"],
      installationId: "test",
      timeZone: "test"
    }).payload.promise.then((res) => {
      console.log(res)
      done()
    }, (error) => {
      console.log(error)
      done()
    })
  })
})
