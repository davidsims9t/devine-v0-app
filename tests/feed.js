import { getRelationalData, getItem, updateStats } from '../app/actions/feed'
import feed from '../app/reducers/feed'

describe("Feed", () => {
  // it("it should update the feed stats", (done) => {
  //   const obj = {"className": "Inspiration", "objectId": "j7xZqoqsPq"}
  //
  //   getItem(obj).payload.promise.then(res => {
  //     const props = {
  //       className: "Inspiration",
  //       rowData: res.results[0],
  //       colName: "likes"
  //     }
  //
  //     updateStats(props).payload.promise.then((res) => {
  //       console.log(res)
  //       done()
  //     }, (error) => {
  //       console.log(error)
  //       done()
  //     })
  //   })
  // })

  // it("it should return the relational data for a give feed item", (done) => {
  //   getItem("Inspiration", null).payload.promise.then((res) => {
  //     console.log(res)
  //     done()
  //   }, (error) => {
  //     console.log(error)
  //     done()
  //   })
  // })

  // it("it should return the relational data for a give feed item", (done) => {
  //   const obj = {"className": "Inspiration", "objectId": "j7xZqoqsPq"}
  //
  //   getRelationalData(obj, "Media", "media").payload.promise.then((res) => {
  //     console.log(res)
  //     done()
  //   }, (error) => {
  //     console.log(error)
  //     done()
  //   })
  // })
})
