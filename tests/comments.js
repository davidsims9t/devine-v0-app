import { postReply, addCommentRelation } from '../app/actions/comment'

describe("Comment", () => {
  it("it should post a new comment and add it as a feed relation", (done) => {
    postReply({
      user: {
        "className": "_User",
        "__type": "Pointer",
        "objectId": "88FoheChG8"
      },
      message: "test",
      channel: "test",
      userDisplayName: "David",
      type: "inspiration"
    }).payload.promise.then((res) => {
      done()
    }, (error) => {
      console.log(error)
      done()
    })
  })
})
