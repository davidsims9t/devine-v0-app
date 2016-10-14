import { logIn, logInFacebook } from '../app/actions/user'

describe("Login", () => {
  // it("should login a user", (done) => {
    // logIn("test", "test").payload.then((res) => {
    //   console.log(res)
    //   done()
    // }, (error) => {
    //   console.log(error)
    //   done()
    // })
  // })
  //
  it("should login a user via Facebook", (done) => {
    const facebookData = {
      fbPhoto: 'https://scontent.xx.fbcdn.net/hprofile-xpl1/v/t1.0-1/p50x50/10403173_10205294883265958_1013384594707033554_n.jpg?oh=58736cc59a8825077d0737fac406ac01&oe=576608F5',
      username: '10205746019104072',
      gender: 'male',
      authData: {
        facebook: {
          id: '10205746019104072',
          access_token: 'CAALNcIT8DLoBACJWxjFiaqwZBCamByRqqS0mMuzDLl2SfAHHv8iGFtNU8OkmesSyhjeZCtiYoCi7NiklnLtrwVmshWSVREpqol2x4DvF8XxQeF8P2sZBRG1ZCmGtINpZBAlS2pT3UaxYdZCnvsqsl9IPMLZAOIMXEn9hbnJbQMXabhZCzg3Qihbx6qtOqWTwAz9JnHRUXhMz4blMhRZC0kvMfBIhn4CJo30UZD',
          expiration_date: '2016-04-19T08:01:21.598Z'
        }
      }
    }

    logInFacebook(facebookData).payload.promise.then(res => {
      console.log(res)
    })
  })
})
