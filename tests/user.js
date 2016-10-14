import { signUpUser, signUpFacebook, getUser, logIn } from '../app/actions/user'

describe("User", () => {
  it("it should sign up a user", (done) => {
    signUpFacebook({}).payload.promise.then((res) => {
      console.log(res)
      done()
    }, (error) => {
      console.log(error)
      done()
    })

    // logIn("7lczHQk7fbuA7Aa7mhtjdfqB", "test").payload.promise.then((res) => {
    //   console.log(res)
    //   done()
    // }, (error) => {
    //   console.log(error)
    //   done()
    // })

    // getUser({
    //   email: "test@example.com",
    //   password: "test"
    // }).payload.promise.then((res) => {
    //   console.log(res)
    //   done()
    // }, (error) => {
    //   console.log(error)
    //   done()
    // })
  })
})
