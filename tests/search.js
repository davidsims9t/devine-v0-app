import { getSearchResults } from '../app/actions/search'

describe("Search", () => {
  it("it should run a search query", (done) => {
    const indices = [
      {
        name: 'inspiration',
        hitsPerPage: 8
      },
      {
        name: 'idea',
        hitsPerPage: 2
      }
    ]

    getSearchResults('test', indices).payload.promise.then((res) => {
      console.log(res)
      done()
    }, (error) => {
      console.log(error)
      done()
    })
  })
})
